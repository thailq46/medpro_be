import {HospitalsType, TimeScheduleType} from '~/constants/enum'
import {numberEnumToArray} from '~/utils/common'

export const COMMON_MESSAGE = {
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_NOT_EXCEED_255: 'Name must not exceed 255 characters',
  SLUG_IS_REQUIRED: 'Slug is required',
  SLUG_MUST_BE_STRING: 'Slug must be a string',
  SLUG_NOT_CONTAIN_SPACE: 'Slug must not contain only whitespace',
  SLUG_NOT_EXCEED_255: 'Slug must not exceed 255 characters',
  DESC_IS_REQUIRED: 'Description is required',
  DESC_MUST_BE_STRING: 'Description must be a string',
  DESC_NOT_EXCEED_500: 'Description must not exceed 500 characters',
  SESSION_IS_REQUIRED: 'Session is required',
  SESSION_MUST_BE_STRING: 'Session must be a string',
  SESSION_NOT_EXCEED_255: 'Session must not exceed 255 characters'
}

export const USERS_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  EMAIL_IS_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email',
  GENDER_IS_REQUIRED: 'Gender is required',
  GENDER_MUST_BE_NUMBER: 'Gender must be a number',
  INVALID_GENDER: 'Gender must be 0 or 1',
  INVALID_DATE_OF_BIRTH: 'Date of birth must be in ISO8601 format',
  DATE_BIRTH_IS_REQUIRED: 'Date of birth is required',
  AVATAR_NOT_EXCEED_255: 'Avatar must not exceed 255 characters',
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
  GMAIL_NOT_VERIFIED: 'Gmail not verified',

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
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  IMAGE_NOT_FOUND: 'Image not found',
  ADDRESS_NOT_EXCEED_255: 'Address must not exceed 255 characters'
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
  GET_SUCCESS: 'Get categories successfully',
  CATEGORY_DEPEND_ON_HOSPITAL: 'Category depend on hospital'
}

export const MEDICAL_BOOKING_FORMS_MESSAGE = {
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_NOT_EXCEED_255: 'Name must not exceed 255 characters',
  IMAGE_MUST_BE_STRING: 'Image must be a string',
  IMAGE_URL_LENGTH: 'Image length must must not exceed 500 characters',
  CREATE_SUCCESS: 'Create medical booking form successfully',
  UPDATE_SUCCESS: 'Update medical booking form successfully',
  DELETE_SUCCESS: 'Delete medical booking form successfully',
  MEDICAL_BOOKING_FORMS_NOT_FOUND: 'Medical booking form not found',
  GET_SUCCESS: 'Get medical booking forms successfully',
  NAME_ALREADY_EXIST: 'Name already exist',
  NOT_FOUND: 'Medical booking form not found',
  INVALID_ID: 'Invalid id',
  SLUG_ALREADY_EXIST: 'Slug already exist',
  MEDICAL_BOOKING_FORMS_DEPEND_ON_HOSPITAL: 'Medical booking form depend on hospital'
}

export const MEDIAS_MESSAGE = {
  UPLOAD_SUCCESS: 'Upload media successfully'
}

export const HOSPITALS_MESSAGE = {
  CATEGORY_ID_IS_REQUIRED: 'CategoryId is required',
  SLUG_IS_REQUIRED: 'Slug is required',
  INVALID_CATEGORY_ID: 'Invalid categoryId',
  CATEGORY_NOT_FOUND: 'Category not found',
  NAME_ALREADY_EXIST: 'Name already exist',
  TIME_MUST_BE_STRING: 'Start time must be a string',
  TIME_LENGTH_MUST_BE_5: 'Start time length must be 5 characters',
  HOTLINE_MUST_BE_STRING: 'Hotline must be a string',
  INVALID_PHONE_NUMBER: 'Invalid phone number',
  IMAGES_MUST_BE_ARRAY: 'Images must be an array',
  IMAGE_MUST_BE_STRING: 'Image must be a string',
  ADDRESS_IS_REQUIRED: 'Address is required',
  BOOKING_FORMS_MUST_BE_ARRAY: 'Booking forms must be an array',
  BOOKING_FORMS_IS_REQUIRED: 'Booking forms is required',
  TYPES_IS_REQUIRED: 'Types is required',
  TYPES_MUST_BE_ARRAY: 'Types must be an array',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  CREATE_HOSPITAL_SUCCESS: 'Create hospital successfully',
  GET_HOSPITALS_SUCCESS: 'Get hospitals successfully',
  UPDATE_HOSPITAL_SUCCESS: 'Update hospital successfully',
  DELETE_HOSPITAL_SUCCESS: 'Delete hospital successfully',
  SLUG_ALREADY_EXIST: 'Slug already exist',
  HOSPITAL_NOT_FOUND: 'Hospital not found',
  HOSPITAL_ID_IS_REQUIRED: 'HospitalId is required',
  BOOKING_FORM_NOT_FOUND: 'Some booking forms not found in medicalBookingForms collection.',
  INVALID_TYPES: `Types must be ${numberEnumToArray(HospitalsType).join(', ')}`,
  DESCRIPTION_DETAIL_MUST_BE_STRING: 'Description detail must be a string'
}

export const SERVICES_MESSAGE = {
  HOSPITAL_ID_IS_REQUIRED: 'HospitalId is required',
  ID_IS_REQUIRED: 'Id is required',
  INVALID_HOSPITAL_ID: 'Invalid hospitalId',
  HOSPITAL_NOT_FOUND: 'Hospital not found',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  SPECIALTY_NOT_FOUND: 'Specialty not found',
  NOTE_NOT_EXCEED_255: 'Note must not exceed 255 characters',
  PRICE_IS_REQUIRED: 'Price is required',
  PRICE_MUST_BE_NUMBER: 'Price must be a number',
  NOTE_MUST_BE_STRING: 'Note must be a string',
  SERVICES_NOT_FOUND: 'Services not found',
  CREATE_SERVICES_SUCCESS: 'Create services successfully',
  UPDATE_SERVICES_SUCCESS: 'Update services successfully',
  DELETE_SERVICES_SUCCESS: 'Delete services successfully',
  GET_SERVICES_SUCCESS: 'Get services successfully',
  SPECIALTY_NOT_BELONG_TO_HOSPITAL: 'Specialty not belong to hospital',
  TYPE_IS_REQUIRED: 'Type is required',
  TYPE_MUST_BE_STRING: 'Type must be a string'
}

export const SPECIALTIES_MESSAGE = {
  HOSPITAL_ID_IS_REQUIRED: 'HospitalId is required',
  HOSPITAL_ID_MUST_BE_STRING: 'HospitalId must be a string',
  INVALID_HOSPITAL_ID: 'Invalid hospitalId',
  HOSPITAL_NOT_FOUND: 'Hospital not found',
  CREATE_SPECIALTY_SUCCESS: 'Create specialty successfully',
  GET_SPECIALTIES_SUCCESS: 'Get specialties successfully',
  UPDATE_SPECIALTY_SUCCESS: 'Update specialty successfully',
  DELETE_SPECIALTY_SUCCESS: 'Delete specialty successfully',
  SPECIALTY_NOT_FOUND: 'Specialty not found',
  SPECIALTY_ID_IS_REQUIRED: 'SpecialtyId is required',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  ID_IS_REQUIRED: 'Id is required',
  SPECIALTIES_NOT_FOUND: 'Specialties not found'
}

export const DOCTORS_MESSAGE = {
  HOSPITAL_ID_MUST_BE_STRING: 'HospitalId must be a string',
  INVALID_HOSPITAL_ID: 'Invalid hospitalId',
  HOSPITAL_ID_IS_REQUIRED: 'HospitalId is required',
  HOSPITAL_NOT_FOUND: 'Hospital not found',
  ID_IS_REQUIRED: 'Id is required',
  DOCTOR_ID_IS_REQUIRED: 'DoctorId is required',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  DOCTOR_NOT_FOUND: 'Doctor not found',
  YOU_ARE_NOT_A_DOCTOR: 'You are not a doctor',
  SPECIALTY_ID_IS_REQUIRED: 'SpecialtyId is required',
  SPECIALTY_NOT_FOUND: 'Specialty not found',
  THERAPY_IS_REQUIRED: 'Therapy is required',
  THERAPY_MUST_BE_STRING: 'Therapy must be a string',
  THERAPY_NOT_EXCEED_255: 'Therapy must not exceed 255 characters',
  PRICE_IS_REQUIRED: 'Price is required',
  PRICE_MUST_BE_NUMBER: 'Price must be a number',
  CREATE_DOCTORS_SUCCESS: 'Create doctors successfully',
  UPDATE_DOCTORS_SUCCESS: 'Update doctors successfully',
  DELETE_DOCTORS_SUCCESS: 'Delete doctors successfully',
  GET_DOCTORS_SUCCESS: 'Get doctors successfully'
}

export const SCHEDULES_MESSAGE = {
  DOCTOR_ID_IS_REQUIRED: 'DoctorId is required',
  DOCTOR_ID_MUST_BE_A_STRING: 'DoctorId must be a string',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  DOCTOR_NOT_FOUND: 'Doctor not found',
  MAX_NUMBER_IS_REQUIRED: 'Max number is required',
  MAX_NUMBER_MUST_BE_A_NUMBER: 'Max number must be a number',
  MAX_NUMBER_MUST_BE_LESS_THAN_100: 'Max number must be less than 100',
  DATE_IS_REQUIRED: 'Date is required',
  DATE_MUST_BE_A_STRING: 'Date must be a string',
  DATE_MUST_BE_LESS_THAN_10_CHARACTERS: 'Date must be less than 10 characters',
  TIME_TYPE_IS_REQUIRED: 'Time type is required',
  TIME_TYPE_MUST_BE_AN_ARRAY: 'Time type must be an array',
  TIME_TYPE_MUST_NOT_BE_EMPTY: 'Time type must not be empty',
  TIME_TYPE_MUST_BE_IN_THE_RANGE: `Time type must be in the range ${[TimeScheduleType.T1, TimeScheduleType.T2, TimeScheduleType.T3, TimeScheduleType.T4, TimeScheduleType.T5, TimeScheduleType.T6, TimeScheduleType.T7].join(', ')}`,
  CURRENT_NUMBER_MUST_BE_A_NUMBER: 'Current number must be a number',
  CURRENT_NUMBER_MUST_BE_LESS_THAN_100: 'Current number must be less than 100',
  SCHEDULE_ID_IS_REQUIRED: 'ScheduleId is required',
  SCHEDULE_ID_MUST_BE_A_STRING: 'ScheduleId must be a string',
  SCHEDULE_NOT_FOUND: 'Schedule not found',
  SCHEDULE_ALREADY_EXISTS: 'Schedule already exists',
  CREATE_SCHEDULES_SUCCESSFULLY: 'Create schedules successfully',
  UPDATE_SCHEDULES_SUCCESSFULLY: 'Update schedules successfully',
  DELETE_SCHEDULES_SUCCESSFULLY: 'Delete schedules successfully',
  GET_SCHEDULES_SUCCESSFULLY: 'Get schedules successfully',
  DOCTOR_NOT_BELONG_TO_HOSPITAL: 'Doctor not belong to hospital'
}

export const APPOINTMENTS_MESSAGE = {
  DOCTOR_ID_REQUIRED: 'Doctor id is required',
  DOCTOR_NOT_FOUND: 'Doctor not found',
  DOCTOR_ID_MUST_BE_STRING: 'Doctor id must be a string',
  PATIENT_ID_REQUIRED: 'Patient id is required',
  PATIENT_NOT_FOUND: 'Patient not found',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  SERVICE_ID_REQUIRED: 'Service id is required',
  SERVICE_NOT_FOUND: 'Service not found',
  DATE_REQUIRED: 'Date is required',
  DATE_MUST_BE_STRING: 'Date must be a string',
  TIME_REQUIRED: 'Time is required',
  TIME_MUST_BE_STRING: 'Time must be a string',
  REASON_REQUIRED: 'Reason is required',
  REASON_MUST_BE_STRING: 'Reason must be a string',
  REASON_NOT_EXCEED_500: 'Reason must not exceed 500 characters',
  STATUS_REQUIRED: 'Status is required',
  STATUS_MUST_BE_BOOLEAN: 'Status must be a boolean',
  IS_PAYMENT_REQUIRED: 'Is payment is required',
  IS_PAYMENT_MUST_BE_BOOLEAN: 'Is payment must be a boolean',
  CREATE_SUCCESS: 'Create appointment successfully',
  IS_BOOKED: 'You have already booked an appointment, please choose another service or select a different date',
  GET_SUCCESS: 'Get appointments successfully',
  APPOINTMENT_ID_REQUIRED: 'Appointment id is required',
  APPOINTMENT_NOT_FOUND: 'Appointment not found',
  DELETE_SUCCESS: 'Delete appointment successfully',
  UPDATE_STATUS_SUCCESS: 'Update status appointment successfully',
  ORDER_ID_MUST_BE_STRING: 'Order id must be a string',
  ORDER_ID_REQUIRED: 'Order id is required',
  UPDATE_ORDER_ID_SUCCESS: 'Update order appointment successfully',
  UPDATE_PAYMENT_SUCCESS: 'Update payment appointment successfully'
}

export const CONVERSATION_MESSAGE = {
  RECEIVER_ID_IS_REQUIRED: 'Receiver id is required',
  INVALID_OBJECT_ID: 'Invalid ObjectId',
  RECEIVER_NOT_FOUND: 'Receiver not found'
}
