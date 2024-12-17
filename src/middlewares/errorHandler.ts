import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // return the error
    res.status(err.status || 500).json({ error: err.message })
}
