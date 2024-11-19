const createUser = async (req, res) => {

    // Check if the user already exists
    const duplicateUser = await User.findByEmail(req.body.email)
    if (duplicateUser) {
        return res.status(400).json({ message: 'The email address is already in use.' })
    }

    // Create a new user and save it in the database
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        try {
            sendActivationEmail(user.email, user.activationToken)
            res.json({ message: 'User created successfully. Check your mail to activate yor account' })
        } catch (error) {
            res.status(400).json({ message: 'Error sending activation email' })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = createUser