const app = require("./app")
const db = require("./config/mongoose")

db.on('connected', () => {
    app.listen(5000, () => { console.log('Server running on : 5000') })
})