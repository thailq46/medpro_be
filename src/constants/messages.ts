export const USERS_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  EMAIL_IS_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email',
  GENDER_IS_REQUIRED: 'Gender is required',
  GENDER_MUST_BE_NUMBER: 'Gender must be a number',
  INVALID_GENDER: 'Gender must be 0 or 1',
  INVALID_DATE_OF_BIRTH: 'Date of birth must be in ISO8601 format',
  DATE_BIRTH_IS_REQUIRED: 'Date of birth is required',

  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be strong 6-50 characters, and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character',
  OLD_PASSWORD_INCORRECT: 'Old password is incorrect',

  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be strong 6-50 characters, and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character',
  PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH: 'Password and confirm password do not match',

  EMAIL_ALREADY_EXIST: 'Email already exist',
  REGISTER_SUCCESS: 'Register success',
  LOGIN_SUCCESS: 'Login success',
  EMAIL_DOES_NOT_EXIST: 'Email does not exist',
  LOGOUT_SUCCESS: 'Logout success',

  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password is incorrect',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_MUST_BE_STRING: 'Forgot password token must be a string',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',

  REFRESH_TOKEN_MUST_BE_STRING: 'Refresh token must be a string',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  USED_REFRESH_TOKEN_OR_NOT_EXISTS: 'Used refresh token or not exists',
  ACCESS_TOKEN_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',

  USER_NOT_FOUND: 'User not found',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',

  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_MUST_BE_STRING: 'Email verify token must be a string',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  RESEND_EMAIL_VERIFY_SUCCESS: 'Resend email verify success',

  GET_ME_SUCCESS: 'Get information account in use success',
  USER_NOT_VERIFIED: 'User not verified',
  UPDATE_ME_SUCCESS: 'Update information account in use success',

  ADDRESS_MUST_BE_STRING: 'Address must be a string',
  AVATAR_MUST_BE_STRING: 'Avatar must be a string',
  PHONE_NUMBER_MUST_BE_STRING: 'Phone number must be a string',
  INVALID_PHONE_NUMBER: 'Invalid phone number',
  INVALID_POSITION: 'Invalid position',
  POSITION_IS_REQUIRED: 'Position is required',
  USERNAME_MUST_BE_STRING: 'Username must be a string',
  USERNAME_ALREADY_EXIST: 'Username already exist',
  GET_LIST_USERS_SUCCESS: 'Get list users success',
  GET_USER_BY_USERNAME_SUCCESS: 'Get user by username success',
  VERIFY_IS_REQUIRED: 'Verify is required',
  ROLE_IS_REQUIRED: 'Role is required',
  UPDATE_SUCCESS: 'Update success',
  POSITION_MUST_BE_NUMBER: 'Position must be a number',
  VERIFY_MUST_BE_A_NUMBER: 'Verify must be a number',
  ROLE_MUST_BE_NUMBER: 'Role must be a number',
  INVALID_ROLE: 'Invalid role',
  INVALID_VERIFY: 'Invalid verify',
  DELETE_SUCCESS: 'Delete success',
  CHANGE_PASSWORD_SUCCESS: 'Change password success'
}

export const CATEGORIES_MESSAGE = {
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_MUST_BE_LENGTH_1_255: 'Name must be from 1 to 255 characters',
  SLUG_IS_REQUIRED: 'Slug is required',
  SLUG_MUST_BE_STRING: 'Slug must be a string',
  SLUG_NOT_CONTAIN_SPACE: 'Slug must not contain only whitespace',
  SLUG_NOT_EXCEED_255: 'Slug must not exceed 255 characters',
  SLUG_ALREADY_EXIST: 'Slug already exist',
  PARENT_ID_MUST_BE_STRING: 'Parent id must be a string',
  INVALID_PARENT_ID: 'Invalid parent id',
  CREATE_SUCCESS: 'Create category successfully',
  UPDATE_SUCCESS: 'Update category successfully',
  DELETE_SUCCESS: 'Delete category successfully',
  CATEGORY_NOT_FOUND: 'Category not found',
  CATEGORY_IS_PARENT: 'Category is parent',
  GET_SUCCESS: 'Get categories successfully'
}

export const MEDICAL_BOOKING_FORMS_MESSAGE = {
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_NOT_EXCEED_255: 'Name must not exceed 255 characters',
  IMAGE_MUST_BE_STRING: 'Image must be a string',
  IMAGE_URL_LENGTH: 'Image length must be from 1 to 500 characters',
  CREATE_SUCCESS: 'Create medical booking form successfully',
  UPDATE_SUCCESS: 'Update medical booking form successfully',
  DELETE_SUCCESS: 'Delete medical booking form successfully',
  MEDICAL_BOOKING_FORMS_NOT_FOUND: 'Medical booking form not found',
  GET_SUCCESS: 'Get medical booking forms successfully',
  NAME_ALREADY_EXIST: 'Name already exist'
}
