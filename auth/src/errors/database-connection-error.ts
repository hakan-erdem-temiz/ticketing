import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connection to database'

  constructor() {
    super('Error connectiong to db');

    // Only becasue we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason }
    ]
  }
}