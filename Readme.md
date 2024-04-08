# Khởi tạo dự án

```bash
npm init -y
```

## Thêm TypeScript như một dev dependency

```bash
npm install typescript --save-dev
```

## Cài đặt kiểu dữ liệu TypeScript cho Node.js

```bash
npm install @types/node --save-dev
```

## Cài đặt các package config cần thiết còn lại

```bash
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev
```

- `eslint:` Linter (bộ kiểm tra lỗi) chính
- `prettier:` Code formatter chính
- `eslint-config-prettier:` Cấu hình ESLint để không bị xung đột với Prettier
- `eslint-plugin-prettier:` Dùng thêm một số rule prettier cho eslint
- `@typescript-eslint/eslint-plugin:` ESLint plugin cung cấp các rule cho Typescript
- `@typescript-eslint/parser:` Parser cho phép ESLint kiểm tra lỗi Typescript
- `ts-node:` Dùng để chạy TypeScript code trực tiếp mà không cần build
- `tsc-alias:` Xử lý alias khi build
- `tsconfig-paths:` Khi setting alias import trong dự án dùng ts-node thì chúng ta cần dùng `tsconfig-paths` để nó hiểu được paths và baseUrl trong file tsconfig.json
- `rimraf:` Dùng để xóa folder dist khi trước khi build
- `nodemon:` Dùng để tự động restart server khi có sự thay đổi trong code

## Cấu hình tsconfig.json

Tạo file `tsconfig.json` tại thư mục root, có thể tạo bằng lệnh `touch tsconfig.json` hoặc cứ tạo bằng tay, quen cái nào thì dùng cái đấy

Tiếp theo copy và paste cấu hình dưới đây vào file `tsconfig.json` của bạn

```json
{
  "compilerOptions": {
    "module": "NodeNext", // Quy định output module được sử dụng
    "moduleResolution": "NodeNext",
    "target": "ES2022", // Target output cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
}
```

## Cấu hình file config cho ESLint

Tạo file `.eslintrc` tại thư mục root, copy và paste config dưới đây vào file `.eslintrc` của bạn

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}
```

Tiếp theo tạo file `.eslintignore` để ignore các file không cần kiểm tra lỗi

```ignore
node_modules/
dist/
```

## Cấu hình file config cho Prettier

Tạo file `.prettierrc` trong thư trong thư mục root với nội dung dưới đây

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true,
  "bracketSpacing": false
}
```

Tiếp theo Tạo file `.prettierignore` ở thư mục root

Mục đích là Prettier bỏ qua các file không cần thiết

```ignore
node_modules/
dist/
```

## Config editor để chuẩn hóa cấu hình editor

Tạo file `.editorconfig` ở thư mục root

Mục đích là cấu hình các config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia.

Để VS Code hiểu được file này thì cài Extension là EditorConfig for VS Code

```json
[*]
indent_size = 2
indent_style = space
```

## Cấu hình file gitignore

```ignore
node_modules/
dist/
```

## Cấu hình file nodemon.json

Tạo file `nodemon.json`ở thư mục root

Mục đích là cấu hình nodemon để tự động restart server khi có sự thay đổi trong code

```json
{
  "watch": ["src", ".env", "openapi"],
  "ext": ".ts,.js,.json,.yaml",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

## Cấu hình file package.json

```json
  "scripts": {
    "dev": "npx nodemon",
    "build": "rimraf ./dist && tsc && tsc-alias",
    "start": "node dist/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
```

# Tạo file type.d.ts

Tạo file `type.d.ts` trong thư mục `src`, tạm thời bây giờ các bạn để trống cũng được. Mục đích là để defined các global type cho dự án.

Các bạn mở file `tsconfig.json` lên sẽ thấy dòng mình add file này vào để cho typescript nó nhận diện

# Một số lưu ý

## Lưu ý cài thêm gói @types/ten-thu-vien nếu cần

Vì đây là dự án chạy với Typescript nên khi cài đặt bất cứ một thư viện này chúng ta nên xem thư viện đó có hỗ trợ TypeScript không nhé. Có một số thư viện ở npm hỗ trợ TypeScript sẵn, có một số thì chúng ta phải cài thêm bộ TypeScript của chúng qua `@types/ten-thu-vien`

Ví dụ như express thì chúng ta cài như sau:

```bash
npm i express
npm i @types/express -D
```

## Chúng ta đang chạy dev server và build ở module CommonJS?

Chính xác là như vậy, vậy nên khi dùng các thư viện ES Module thì thì chúng ta cần phải dùng như kiểu dưới đây.

Thư viện `formidable` là một thư viện ES Module, nên khi dùng nó chúng ta phải dùng như sau

```ts
export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
}
```
