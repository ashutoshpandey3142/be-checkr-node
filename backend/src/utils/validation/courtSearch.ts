import { body } from 'express-validator';
import * as validationConstants from '../constants';

export const validateCourtSearchRequestBody = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 45 })
    .withMessage(validationConstants.ERROR_COURT_SEARCH_NAME_LENGTH),

  body('status')
    .trim()
    .notEmpty()
    .withMessage(validationConstants.ERROR_COURT_SEARCH_STATUS_REQUIRED)
    .isIn(['CLEAR', 'CONSIDER'])
    .withMessage(validationConstants.ERROR_COURT_SEARCH_STATUS_INVALID),

  body('verification_date')
    .trim()
    .notEmpty()
    .withMessage(validationConstants.ERROR_VERIFICATION_DATE_REQUIRED)
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_VERIFICATION_DATE_INVALID),
];
