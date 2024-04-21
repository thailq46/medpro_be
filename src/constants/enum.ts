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
