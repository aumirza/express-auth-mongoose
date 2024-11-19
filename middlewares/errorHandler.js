const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // return the error 
    res.status(err.status || 500)
        .json({ error: err.message })
}

module.exports = errorHandler