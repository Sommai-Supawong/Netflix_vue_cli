# Netflix Clone

A Netflix-inspired streaming application built with Vue 3, featuring movie browsing, authentication, and a responsive design.

## Features

- **Movie Browsing**: Browse movies by category with responsive grid layout
- **Movie Details**: View detailed information about each movie
- **Authentication**: Login system with token-based authentication
- **My List**: Save favorite movies to a personal watchlist
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Video Player**: HLS streaming support for video playback
- **Modern UI**: Netflix-like interface with dark theme
- **Admin Management**: Add, update, and delete movies in real-time

## Project Setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Environment Configuration

Create a `.env` file in the root directory to configure the API endpoint:

```
VUE_APP_API_URL=http://localhost:3000/api
```

## API Integration

The application is designed to work with an external API for movie data. By default, it falls back to mock data when the API is unavailable.

## Components

- **Navbar**: Navigation bar with login/logout functionality
- **MovieCard**: Display component for individual movies
- **Player**: Video player component with HLS support
- **Views**:
  - Home: Main landing page with featured and trending movies
  - Browse: Categorized movie browsing
  - MovieDetail: Detailed view of a selected movie
  - Login: Authentication page
  - MyList: Personal movie watchlist
- **AdminMovieEditor**: Component for adding, updating, and deleting movies

## Stores

- **Movies Store**: Manages movie data with fallback to mock data when API is unavailable

## วิธีการจัดการข้อมูลหนัง (เพิ่ม, ลบ, อัปเดต)

### ระบบผู้ดูแลระบบ (Admin System)
แอปพลิเคชันนี้มีระบบผู้ดูแลระบบที่สามารถจัดการเนื้อหาทั้งหมดได้อย่างเต็มรูปแบบ

### การเข้าสู่ระบบผู้ดูแลระบบ
1. เข้าไปที่ `/admin/login` หรือคลิก "Admin Login" ในเมนูนำทาง
2. ใช้ชื่อผู้ใช้: `admin`
3. ใช้รหัสผ่าน: `admin123`
4. หลังจากเข้าสู่ระบบ คุณจะสามารถเข้าถึงหน้าควบคุมและหน้าจัดการเนื้อหาได้

### หน้าควบคุมผู้ดูแลระบบ (Admin Dashboard)
- แสดงสถิติพื้นฐานเกี่ยวกับเนื้อหาและผู้ใช้งาน
- ลิงก์ไปยังหน้าจัดการต่างๆ

### การจัดการข้อมูลหนัง
1. ไปที่ `/admin/movies` หรือคลิก "จัดการหนัง" ในเมนูนำทาง
2. คุณสามารถเพิ่มหนังใหม่โดยกรอกข้อมูลในฟอร์มด้านซ้าย
3. คุณสามารถแก้ไขข้อมูลหนังโดยคลิกปุ่ม "แก้ไข" ที่รายการหนัง
4. คุณสามารถลบหนังโดยคลิกปุ่ม "ลบ" ที่รายการหนัง (มีการยืนยันก่อนการลบ)

### เพิ่มหนังใหม่
1. เข้าสู่ระบบเป็นผู้ดูแลระบบ
2. ไปที่หน้า `/admin/movies`
3. กรอกข้อมูลหนังที่คุณต้องการเพิ่มในฟอร์มด้านซ้าย
4. กดปุ่ม "เพิ่มหนัง"
5. ข้อมูลหนังใหม่จะถูกเพิ่มเข้าไปใน store และแสดงผลทันทีในทุกหน้าของแอปพลิเคชัน

### อัปเดตข้อมูลหนัง
1. เข้าสู่ระบบเป็นผู้ดูแลระบบ
2. ไปที่หน้า `/admin/movies`
3. คลิกปุ่ม "แก้ไข" ที่หนังที่ต้องการอัปเดต
4. ข้อมูลของหนังจะถูกโหลดลงในฟอร์มด้านซ้าย
5. แก้ไขข้อมูลต่าง ๆ ที่คุณต้องการเปลี่ยน
6. กดปุ่ม "อัปเดตหนัง"
7. ข้อมูลหนังจะถูกอัปเดตใน store และแสดงผลใหม่ทันทีในทุกหน้าของแอปพลิเคชัน

### ลบหนัง
1. เข้าสู่ระบบเป็นผู้ดูแลระบบ
2. ไปที่หน้า `/admin/movies`
3. คลิกปุ่ม "ลบ" ที่หนังที่ต้องการลบ
4. ระบบจะมีการยืนยันก่อนการลบ
5. หนังจะถูกลบออกจาก store และจะหายออกจากทุกหน้าของแอปพลิเคชัน

### การเล่นวิดีโอ
1. หนังแต่ละเรื่องสามารถมีลิงค์วิดีโอของตัวเองได้
2. เมื่อคลิกปุ่ม "Play" ที่หน้ารายละเอียดหนัง ระบบจะเปิดลิงค์วิดีโอในหน้าต่างใหม่
3. ถ้าหนังมีลิงค์วิดีโอ คุณสามารถคลิกที่ปุ่ม "Watch Now" ที่การ์ดหนังเพื่อเล่นได้ทันที

### ระบบบทบาทผู้ใช้
1. ระบบแยกการเข้าถึงระหว่างผู้ใช้ทั่วไปกับผู้ดูแลระบบ
2. หน้าจัดการหนังสามารถเข้าถึงได้เฉพาะผู้ดูแลระบบที่เข้าสู่ระบบแล้ว
3. ระบบจะตรวจสอบบทบาททุกครั้งที่พยายามเข้าถึงหน้าที่ต้องการสิทธิ์ admin
4. การเข้าสู่ระบบผู้ดูแลระบบมีการตรวจสอบสิทธิ์และหมดอายุของ session

## Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
