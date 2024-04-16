## Connect DB

```js
const connection = `mongodb+srv://thailq:thailq123@twitter.hdyolge.mongodb.net/`
```

### Authentication

[[P1]: Basic Authentication](https://duthanhduoc.com/blog/p1-giai-ngo-authentication-basic-authentication)
[[P2]: Cookie và Session Authentication](https://duthanhduoc.com/blog/p2-giai-ngo-authentication-session)
[[P3]: JWT ](https://duthanhduoc.com/blog/p3-giai-ngo-authentication-jwt)

`Token là một chuỗi ký tự được tạo ra để đại diện cho một đối tượng hoặc một quyền truy cập nào đó`

# Thiết kế Schema Medpro bằng MongoDB

Một số ghi chú nhỏ

- Tên collection nên được đặt theo dạng số nhiều, kiểu snake_case, ví dụ `users`, `refresh_tokens`
- Tên field nên được đặt theo dạng snake_case, ví dụ `email_verify_token`, `forget_password_token`
- `_id` là trường được MongoDB tự động tạo ra, không cần phải thêm trường `_id` vào. Cũng không nên tìm mọi cách để đổi tên `_id` thành `id` hay thay đổi cơ chế của nó. Vì sẽ làm giảm hiệu suất của MongoDB
- Trường `created_at` , `updated_at` nên có kiểu `Date` để dễ dàng sắp xếp, tìm kiếm, lọc theo thời gian
- Trường `created_at` nên luôn luôn được thêm vào khi tạo mới document
- Trường `updated_at` thì optional
- Tất cả trường đại diện id của document thì nên có kiểu `ObjectId`

## Phân tích chức năng

### Users

- Người dùng đăng ký nhập `name`, `email`, `day_of_birth`, `password` là được. Vậy `name`, `email`, `day_of_birth`, `password` là những trường bắt buộc phải có bên cạnh `_id` là trường tự động tạo ra bởi MongoDB

- Tương tự ta có chức năng quên mật khẩu thì sẽ gửi mail về để reset mật khẩu, ta cũng dùng `forgot_password_token` để xác thực (`lequangthai.com?forgot-password?forgot_password_token=123123`). Vậy ta cũng lưu thêm trường `forgot_password_token` vào schema `Users`. Trường này có kiểu `String`, nếu user reset mật khẩu thì ta sẽ set `''`

  (Khi upload không nên lưu ảnh vào database mà chỉ lưu url string)

- Cuối cùng là trường `created_at`, `updated_at` để biết thời gian tạo và cập nhập user. Vậy ta lưu thêm 2 trường này vào schema `Users` với kiểu `Date`. 2 trường này luôn luôn có giá trị

```ts
enum GenderType {
  Male,
  Female
}
enum RoleIdType {
  Admin
  Doctor
  Patient
}
enum PositionType{
  None,
  Master, // Thạc sĩ
  Doctor, // Tiến sĩ
  Associate Professor, // Phó giáo sư
  Professor // Giáo sư
}
```

```ts
interface User {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: Date
  gender: GenderType
  password: string
  created_at: Date
  updated_at: Date
  forgot_password_token: string
  email_verify_token: string
  address: string // optional
  username: string // optional
  avatar: string
  role: RoleIdType
  phone_number: string
  position: PositionType
}
```

**Format response trả về**
Đây là ví dụ về response trả về khi thành công

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluQHN1cGVyYWRtaW4uY29tIiwidWF2IjoiMSIsImlhdCI6MTcxMjE5ODU4NSwiZXhwIjoxNzE0NzkwNTg1fQ.zna-DPcHW-jPg_3M5h5f4tHK8zLm7qvxJSiLGeYUCgQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluQHN1cGVyYWRtaW4uY29tIiwidWF2IjoiMSIsImlhdCI6MTcxMjE5ODU4NSwiZXhwIjoxNzEyODAzMzg1fQ.jRmIe7scz-COvneP8VtozJg1QdPxHDzfk-Ifiw3DUwk"
  }
}
```

Trong trường hợp lỗi thì nếu lỗi liên quan đến việc body gửi lên không đúng định dạng thì server sẽ trả về lỗi `422` và thông tin lỗi như sau

```json
{
  "success": false,
  "message": "Email hoặc mật khẩu sai",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "email",
      "received": "undefined",
      "path": ["email"],
      "message": "Required",
      "field": "email"
    }
  ],
  "code": "AUTH000202",
  "statusCode": 422
}
```

Trong trường hợp lỗi khác, server sẽ trả về lỗi trong trường `message`, ví dụ

```json
{
  "success": false,
  "message": "Không tìm thấy dữ liệu!",
  "statusCode": 404
}
```

### Refresh_tokens

- Hệ thống sẽ dùng JWT để xác thực người dùng. Vậy mỗi lần người dùng đăng nhập thành công thì sẽ tạo ra 1 JWT access token và 1 refresh token

- JWT access token thì không cần lưu vào database, vì chúng sẽ cho nó stateless
- Còn refresh token thì cần lưu vào database để tăng tính bảo mật

Một user thì có thể có nhiều refresh token (Không giới hạn), nên không thể lưu hết vào trong collection `users` được => Quan hệ 1 - rất nhiều

Và đôi lúc chúng ta chỉ quan tâm đến refresh token mà không cần biết user là ai. Vậy nên ta tạo ra một collection riêng để lưu refresh token

```ts
interface RefreshToken {
  _id: ObjectId
  token: string
  created_at: string
  user_id: ObjectId
}
```

### Categories

- 1 Web có thể có nhiều category và trong category lại có category con
- Khi chọn vào category con hiển thị ra list thông tin bệnh viện thuộc category con

```ts
interface Categories {
  _id: ObjectId
  name: string
  slug: string
  parent_id: ObjectId | null
  created_at: Date
  updated_at: Date
}
```

```ts
// Các hình thức đặt khám
interface MedicalBookingFormType {
  _id: ObjectId
  name: string
  image: string
  created_at: Date
  updated_at: Date
}
```

```ts
interface HospitalTrees {
  _id: ObjectId
  categoryId: ObjectId
  name: string
  slug: string
  session: string // Thời gian làm việc : Thứ 2 -> Thứ 6
  start_time: string // "08:00"
  end_time: string // "17:30"
  hotline: string
  address: string
  avatar: string
  banner: string
  images: string[]
  types: MedicalBookingFormType[]
  created_at: Date
  updated_at: Date
}
```

### Specialties

- Khi chọn bệnh viện và ấn vào đặt lịch khám sẽ chọn các hình thức đặt khám là theo chuyên khoa và đặt khám theo bác sĩ
- Mỗi 1 bệnh viện sẽ có từng chuyên khoa khác nhau, và mỗi chuyên khoa đó sẽ có các bác sĩ khác nhau

```ts
// Chuyên khoa
interface Specialties {
  _id: ObjectId
  hostipal_id: ObjectId
  name: string
  description: string
  services: Services[] | null
  created_at: Date
  updated_at: Date
}
```

- Nếu is_service là false thì services là null thì Chuyên khoa đấy không có dịch vụ -> Sẽ chuyển đến chọn bác sĩ để khám bệnh luôn

### Services

- Đây là dịch vụ của từng chuyên khoa nếu có

```ts
interface Services {
  _id: ObjectId
  name: string
  description: string
  price_min: number
  price_max: number
  created_at: Date
  updated_at: Date
}
```

### Schedules

```ts
enum TimeType {
  T1 = '8:00 AM - 9:00 AM'
  T2 = '9:00 AM - 10:00 AM'
  T3 = '10:00 AM - 11:00 AM'
  T4 = '1:00 PM - 2:00 PM'
  T5 = '2:00 PM - 3:00 PM'
  T6 = '3:00 PM - 4:00 PM'
  T7 = '4:00 PM - 5:00 PM'
}
```

```ts
interface Schedules {
  _id: ObjectId
  doctor_id: ObjectId
  current_number: number // số bệnh nhân hiện tại
  max_number: number // số bệnh nhân nhận max
  date: Date // ngày khám bệnh
  time_type: TimeType[]
  created_at: Date
  updated_at: Date
}
```

### Doctor_Info

```ts
interface DoctorInfor {
  _id: ObjectId
  doctor_id: ObjectId
  specialty_id: ObjectId
  description_info: string
  therapy: string // Chuyên trị
  price: string
  session: string // Lịch làm việc
}
```

### Booking

```ts
enum StatusType {
  New // Lịch hẹn mới,
  Confirmed // Đã xác nhận
  Done // Đã khám xong
  Cancel // Đã huỷ
}
```

```ts
interface Booking {
  _id: ObjectId
  status: StatusType
  doctor_id: ObjectId
  patient_id: ObjectId
  date: Date
  time_type: TimeType
}
```
