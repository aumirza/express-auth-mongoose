import { sendPasswordResetEmail } from "../mails/passwordReset";

class UserController {
  getProfile = (req, res) => res.json(req.user);

  getTokens = (req, res) => res.json(req.user.tokens);

  activateUser = (req, res) => {};

  requestResetPassword = (req, res) => {
    const user = req.user;
    const resetToken = user.generateResetToken();

    try {
      sendPasswordResetEmail(user.email, resetToken);
      res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
      res.status(500).json({ message: "Error sending reset password email" });
    }
  };

  resetPassword = (req, res) => {
    const { resetToken, password } = req.body;
    const user = req.user;

    if (user.resetToken === resetToken) {
      user.password = password;
      user.resetToken = null;

      try {
        user.save();
        res.json({ msg: "Password has been reset." });
      } catch (err) {
        return res.status(400).json({ msg: err });
      }
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

export default new UserController();
