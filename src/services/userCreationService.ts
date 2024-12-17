import { Request, Response } from "express";
import { Error as mongooseError } from "mongoose";
import User from "../models/userModel";
import { handleValidationError } from "./handleValidationError";
import { sendActivationEmail } from "../mails/accountActivation";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if the user already exists
  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    return res
      .status(400)
      .json({ message: "The email address is already in use." });
  }

  // Create a new user and save it in the database
  try {
    const user = await User.create({ name, email, password, confirmPassword });

    try {
      sendActivationEmail(user.email, user.activationToken);
      return res.json({
        message:
          "User created successfully. Check your mail to activate yor account",
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error sending activation email" });
    }
  } catch (error) {
    if (error instanceof mongooseError.ValidationError) {
      return handleValidationError(error, res);
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
