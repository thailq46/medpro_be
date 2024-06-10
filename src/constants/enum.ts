export enum GenderType {
  Male = 0,
  Female = 1
}

export enum RoleType {
  Admin = 0,
  Doctor = 1,
  User = 2
}

export enum PositionType {
  None = 0,
  Master = 1, // Thạc sĩ
  Doctor = 2, // Tiến sĩ
  AssociateProfessor = 3, // Phó giáo sư
  Professor = 4 // Giáo sư
}

export enum PositionDoctorType {
  Master = 1, // Thạc sĩ
  Doctor = 2, // Tiến sĩ
  AssociateProfessor = 3, // Phó giáo sư
  Professor = 4 // Giáo sư
}

export enum UserVerifyStatus {
  Unverified = 0, // chưa xác thực email, mặc định = 0
  Verified = 1, // đã xác thực emails
  Banned = 2 // bị khoá
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum MediaType {
  Image = 0,
  Video = 1,
  HLS = 2
}

export interface Media {
  url: string
  type: MediaType
}

export enum HospitalsType {
  Benhviencong = 0,
  Benhvientu = 1,
  Phongkham = 2,
  Phongmach = 3,
  Xetnghiem = 4,
  Ytetainha = 5,
  Tiemchung = 6
}

export enum TimeScheduleType {
  T1 = '8:00 AM - 9:00 AM',
  T2 = '9:00 AM - 10:00 AM',
  T3 = '10:00 AM - 11:00 AM',
  T4 = '1:00 PM - 2:00 PM',
  T5 = '2:00 PM - 3:00 PM',
  T6 = '3:00 PM - 4:00 PM',
  T7 = '4:00 PM - 5:00 PM'
}
