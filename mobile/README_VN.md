# Ứng dụng Tìm kiếm Công thức Nấu ăn 👋

Chào mừng bạn đến với dự án ứng dụng di động tìm kiếm công thức nấu ăn được xây dựng bằng **Expo** và **Clerk Authentication**.

## 🚀 Tính năng nổi bật

- **Xác thực mạnh mẽ**: Đăng nhập bằng Email/Mật khẩu hoặc qua Google/Apple bằng Clerk.
- **Ghi nhớ tài khoản (Account Switcher)**: Tự động lưu thông tin các tài khoản đã đăng nhập gần đây để chuyển đổi nhanh chóng.
- **Giao diện hiện đại**: Thiết kế cao cấp, tối ưu hóa cho trải nghiệm người dùng với các hiệu ứng chuyển cảnh mượt mà.
- **Dữ liệu phong phú**: Tích hợp MealDB API cung cấp hàng ngàn công thức nấu ăn đa dạng.
- **Quản lý yêu thích**: Lưu lại các món ăn bạn yêu thích để xem lại sau.

---

## 📋 Hướng dẫn Cài đặt

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 18 trở lên.
- **Expo Go**: Đã cài đặt trên điện thoại Android hoặc iOS của bạn để chạy thử.
- **Tài khoản Clerk**: Để lấy Publishable Key quản lý xác thực.

### 2. Các bước cài đặt
1. **Clone dự án**:
   ```bash
   git clone [url_den_repo_cua_ban]
   cd recipeApp/mobile
   ```

2. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**:
   Tạo file `.env` trong thư mục gốc `mobile/` và thêm nội dung sau:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

---

## 🛠️ Cách sử dụng

### 1. Chạy trên môi trường phát triển
Sử dụng lệnh sau để khởi động Metro Bundler:

```bash
npx expo start
```

### 2. Kiểm tra trên thiết bị
- **Android**: Mở ứng dụng **Expo Go** và quét mã QR hiển thị trong terminal.
- **iOS**: Mở ứng dụng Máy ảnh và quét mã QR (hoặc qua ứng dụng Expo Go).
- **Web**: Nhấn phím `w` trong terminal để chạy trên trình duyệt.

### 3. Lưu ý về xác thực
- Đảm bảo bạn đã cấu hình **Allowlist** và **Redirect URLs** trong Dashboard của Clerk (ví dụ: `recipe-app://`) để tính năng đăng nhập Social hoạt động đúng.

---

## 📂 Giao diện & Chức năng

- **Màn hình Đăng nhập**: Tự động hiển thị các tài khoản đã đăng nhập gần đây. Nhấn "Add Account" để nhập tài khoản mới.
- **Màn hình Chính**: Hiển thị món ăn đề cử và phân loại món ăn theo danh mục.
- **Màn hình Cài đặt**: Cho phép kiểm tra thông tin tài khoản hiện tại và Đăng xuất.

---

## 🏗️ Cấu trúc thư mục

- `app/`: Quản lý các route bằng Expo Router.
  - `(auth)/`: Các màn hình Đăng nhập, Đăng ký, Xác thực email.
  - `(tabs)/`: Menu chính (Recipes, Search, Favorites, Settings).
- `assets/`: Chứa hình ảnh và file style (`styles/`).
- `utils/`: Các hàm tiện ích (như xử lý lưu trữ tài khoản).
- `services/`: Kết nối API lấy dữ liệu món ăn.

---

## 🛠️ Công nghệ sử dụng

- **Expo & React Native**: Framework phát triển cross-platform.
- **Clerk**: Quản lý người dùng và bảo mật.
- **Expo Router**: Điều hướng theo cấu trúc file.
- **Ionicons**: Bộ icon hiện đại.

---

*Chúc bạn có những trải nghiệm nấu ăn thú vị với ứng dụng!* 🍳
