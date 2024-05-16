
import { body, param } from 'express-validator';
import * as validationConstants from '../constants';

export const createUserRequestValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage(validationConstants.ERROR_NAME_REQUIRED),

  body('email')
    .trim()
    .isEmail()
    .withMessage(validationConstants.ERROR_INVALID_EMAIL),

  body('password')
    .trim()
    .custom((password) => {
        if (!validationConstants.PASSWORD_REGEX.test(password)) {
            throw new Error(validationConstants.ERROR_PASSWORD_REQUIREMENTS);
        }
        return true;
    })
    .withMessage(validationConstants.ERROR_PASSWORD_REQUIREMENTS),
];

export const updateUserRequestValidation = [
    body('newPassword')
    .trim()
    .custom((password) => {
        if (!validationConstants.PASSWORD_REGEX.test(password)) {
            throw new Error(validationConstants.ERROR_PASSWORD_REQUIREMENTS);
        }
        return true;
    })
    .withMessage(validationConstants.ERROR_PASSWORD_REQUIREMENTS),
    param('userId')
    .isString(),
];