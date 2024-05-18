"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeScheduleType = exports.HospitalsType = exports.MediaType = exports.TokenType = exports.UserVerifyStatus = exports.PositionType = exports.RoleType = exports.GenderType = void 0;
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (exports.GenderType = GenderType = {}));
var RoleType;
(function (RoleType) {
    RoleType[RoleType["Admin"] = 0] = "Admin";
    RoleType[RoleType["Doctor"] = 1] = "Doctor";
    RoleType[RoleType["User"] = 2] = "User";
})(RoleType || (exports.RoleType = RoleType = {}));
var PositionType;
(function (PositionType) {
    PositionType[PositionType["None"] = 0] = "None";
    PositionType[PositionType["Master"] = 1] = "Master";
    PositionType[PositionType["Doctor"] = 2] = "Doctor";
    PositionType[PositionType["AssociateProfessor"] = 3] = "AssociateProfessor";
    PositionType[PositionType["Professor"] = 4] = "Professor"; // Giáo sư
})(PositionType || (exports.PositionType = PositionType = {}));
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus[UserVerifyStatus["Unverified"] = 0] = "Unverified";
    UserVerifyStatus[UserVerifyStatus["Verified"] = 1] = "Verified";
    UserVerifyStatus[UserVerifyStatus["Banned"] = 2] = "Banned"; // bị khoá
})(UserVerifyStatus || (exports.UserVerifyStatus = UserVerifyStatus = {}));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["AccessToken"] = 0] = "AccessToken";
    TokenType[TokenType["RefreshToken"] = 1] = "RefreshToken";
    TokenType[TokenType["ForgotPasswordToken"] = 2] = "ForgotPasswordToken";
    TokenType[TokenType["EmailVerifyToken"] = 3] = "EmailVerifyToken";
})(TokenType || (exports.TokenType = TokenType = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Image"] = 0] = "Image";
    MediaType[MediaType["Video"] = 1] = "Video";
    MediaType[MediaType["HLS"] = 2] = "HLS";
})(MediaType || (exports.MediaType = MediaType = {}));
var HospitalsType;
(function (HospitalsType) {
    HospitalsType[HospitalsType["Benhviencong"] = 0] = "Benhviencong";
    HospitalsType[HospitalsType["Benhvientu"] = 1] = "Benhvientu";
    HospitalsType[HospitalsType["Phongkham"] = 2] = "Phongkham";
    HospitalsType[HospitalsType["Phongmach"] = 3] = "Phongmach";
    HospitalsType[HospitalsType["Xetnghiem"] = 4] = "Xetnghiem";
    HospitalsType[HospitalsType["Ytetainha"] = 5] = "Ytetainha";
    HospitalsType[HospitalsType["Tiemchung"] = 6] = "Tiemchung";
})(HospitalsType || (exports.HospitalsType = HospitalsType = {}));
var TimeScheduleType;
(function (TimeScheduleType) {
    TimeScheduleType["T1"] = "8:00 AM - 9:00 AM";
    TimeScheduleType["T2"] = "9:00 AM - 10:00 AM";
    TimeScheduleType["T3"] = "10:00 AM - 11:00 AM";
    TimeScheduleType["T4"] = "1:00 PM - 2:00 PM";
    TimeScheduleType["T5"] = "2:00 PM - 3:00 PM";
    TimeScheduleType["T6"] = "3:00 PM - 4:00 PM";
    TimeScheduleType["T7"] = "4:00 PM - 5:00 PM";
})(TimeScheduleType || (exports.TimeScheduleType = TimeScheduleType = {}));
