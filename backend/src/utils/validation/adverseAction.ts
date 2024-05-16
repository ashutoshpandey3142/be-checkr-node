import { body } from 'express-validator';
import * as validationConstants from '../constants';

export const validateAdverseActionRequestBody = [
  body('status')
    .notEmpty()
    .withMessage(validationConstants.ERROR_STATUS_REQUIRED)
    .isIn(['SCHEDULE'])
    .withMessage(validationConstants.ERROR_STATUS_INVALID),

  body('preNoticeDate')
    .notEmpty()
    .withMessage(validationConstants.ERROR_PRE_NOTICE_DATE_REQUIRED)
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_PRE_NOTICE_DATE_INVALID),

  body('postNoticeDate')
    .notEmpty()
    .withMessage(validationConstants.ERROR_POST_NOTICE_DATE_REQUIRED)
    .isISO8601()
    .toDate()
    .withMessage(validationConstants.ERROR_POST_NOTICE_DATE_INVALID),

  body('candidatesId')
    .notEmpty()
    .withMessage(validationConstants.ERROR_CANDIDATE_ID_REQUIRED)
    .isUUID()
    .withMessage(validationConstants.ERROR_CANDIDATE_ID_INVALID)
];
