export interface IGlobalError {
    statusCode: number
    message: string
}
export class GlobalError extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, GlobalError.prototype)
    }
}
export class NotFoundError extends Error {
    statusCode: number
    constructor( message: string) {
        super(message)
        this.statusCode = 404
        Object.setPrototypeOf(this, GlobalError.prototype)
    }
}