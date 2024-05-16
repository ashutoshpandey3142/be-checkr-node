export const ROUTE_PREFIX_CANDIDATE = '/candidate';
export const ROUTE_PREFIX_USER = '/user';
export const ROUTE_PREFIX_ADVERSE_ACTION = '/adverse-action';
export const ROUTE_PREFIX_COURT_SEARCH = '/court-search';
export const ROUTE_PREFIX_SWAGGER_DOC = '/swagger-doc';


export const ERROR_INTERNAL_SERVER = 'Internal server error';
export const ERROR_DATABASE_CONNECT = 'Error while connecting database';

// validationConstants.ts

export const ERROR_STATUS_REQUIRED = 'Status is required';
export const ERROR_STATUS_INVALID = 'Status must be "SCHEDULE"';
export const ERROR_PRE_NOTICE_DATE_REQUIRED = 'Pre-notice date is required';
export const ERROR_PRE_NOTICE_DATE_INVALID = 'Invalid pre-notice date';
export const ERROR_POST_NOTICE_DATE_REQUIRED = 'Post-notice date is required';
export const ERROR_POST_NOTICE_DATE_INVALID = 'Invalid post-notice date';
export const ERROR_CANDIDATE_ID_REQUIRED = 'Candidate ID is required';
export const ERROR_CANDIDATE_ID_INVALID = 'Invalid candidate ID';


export const ERROR_NAME_LENGTH = 'Name must be between 1 and 80 characters';
export const ERROR_ADJUDICATION_INVALID = 'Adjudication must be "-", "ENGAGED", or "ADVERSE ACTION"';
export const ERROR_CANDIDATE_STATUS_INVALID = 'Status must be "CLEAR" or "CONSIDER"';
export const ERROR_LOCATION_LENGTH = 'Location must be between 1 and 30 characters';
export const ERROR_APPLICATION_DATE_INVALID = 'Invalid application date';
export const ERROR_EMAIL_INVALID = 'Invalid email address';
export const ERROR_PHONE_INVALID = 'Phone number must be numeric and between 1 and 15 characters';
export const ERROR_ZIPCODE_LENGTH = 'Zipcode must be between 1 and 15 characters';
export const ERROR_SOCIAL_SECURITY_INVALID = 'Social security number must be numeric and between 1 and 15 characters';
export const ERROR_DRIVERS_LICENSE_LENGTH = 'Drivers license must be between 1 and 15 characters';
export const ERROR_PACKAGE_LENGTH = 'Package must be between 1 and 20 characters';
export const ERROR_CREATED_AT_INVALID = 'Invalid created at date';
export const ERROR_DOB_INVALID = 'Invalid dob';
export const ERROR_COMPLETED_AT_INVALID = 'Invalid completed at date';


export const ERROR_COURT_SEARCH_NAME_LENGTH = 'Name must be between 1 and 45 characters';
export const ERROR_COURT_SEARCH_STATUS_REQUIRED = 'Status is required';
export const ERROR_COURT_SEARCH_STATUS_INVALID = 'Status must be either "CLEAR" or "CONSIDER"';
export const ERROR_VERIFICATION_DATE_REQUIRED = 'Verification date is required';
export const ERROR_VERIFICATION_DATE_INVALID = 'Invalid verification date';


export const ERROR_NAME_REQUIRED = 'Name is required';
export const ERROR_INVALID_EMAIL = 'Invalid email address';
export const ERROR_PASSWORD_REQUIREMENTS = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.';

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
