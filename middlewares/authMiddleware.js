const authMiddleWare = async function (req, res, next) {
    try {
        // const token = req.headers['x-access-token']
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken.id)
        if (!user) {
            return res.status(401).json({ message: 'You are not authenticated' })
        }
        req.user = user
        next()

    } catch (err) {
        res.status(401).json({ message: 'You are not authenticated' })
    }
}

module.exports = authMiddleWare