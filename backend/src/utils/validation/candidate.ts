import { body, param, query } from 'express-validator';
import * as validationConstants from '../constants';

export const validateCandidateRequestBody = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage(validationConstants.ERROR_NAME_LENGTH),

  body('adjudication')
    .isIn(['-', 'ENGAGED', 'ADVERSE ACTION'])
    .withMessage(validationConstants.ERROR_ADJUDICATION_INVALID),

  body('status')
    .isIn(['CLEAR', 'CONSIDER'])
    .withMessage(validationConstants.ERROR_CANDIDATE_STATUS_INVALID),

  body('location')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(validationConstants.ERROR_LOCATION_LENGTH),

  body('application_date')
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_APPLICATION_DATE_INVALID),

  body('email')
    .trim()
    .isEmail()
    .withMessage(validationConstants.ERROR_EMAIL_INVALID),

  body('phone')
    .trim()
    .isNumeric()
    .isLength({ min: 1, max: 15 })
    .withMessage(validationConstants.ERROR_PHONE_INVALID),

  body('zipcode')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(validationConstants.ERROR_ZIPCODE_LENGTH),

  body('social_security')
    .optional({ nullable: true })
    .isNumeric()
    .isLength({ min: 1, max: 15 })
    .withMessage(validationConstants.ERROR_SOCIAL_SECURITY_INVALID),

  body('drivers_license')
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(validationConstants.ERROR_DRIVERS_LICENSE_LENGTH),

  body('package')
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(validationConstants.ERROR_PACKAGE_LENGTH),

  body('created_at')
    .optional({ nullable: true })
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_CREATED_AT_INVALID),

  body('dob')
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_DOB_INVALID),

  body('completed_at')
    .optional({ nullable: true })
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_COMPLETED_AT_INVALID)
];

export const validateCandidateUpdateRequest = [
  body('adjudication')
    .optional()
    .isIn(['-', 'ENGAGED', 'ADVERSE ACTION'])
    .withMessage(validationConstants.ERROR_ADJUDICATION_INVALID),

  body('status')
    .optional()
    .isIn(['CLEAR', 'CONSIDER'])
    .withMessage(validationConstants.ERROR_STATUS_INVALID),

  param('candidateId')
    .isUUID(),
];

export const pageAndLimitValidationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];
