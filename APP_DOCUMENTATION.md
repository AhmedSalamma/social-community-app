# Vail App Documentation

## Project Overview

Vail is a web application built with a Laravel backend and a React frontend. It is designed to support user authentication, profile management, community posts, and user settings.

## Architecture

- **Backend**: Laravel PHP application located in `backend/`
  - API routes in `backend/routes/api.php`
  - Authentication and user profile management via Sanctum
  - User image upload, username, and bio support
  - API resources and form requests for clean validation and serialization

- **Frontend**: React with Vite located in `Vail/`
  - Client-side routing using React Router
  - Axios-based API client for backend requests
  - User profile, settings, login, register, and community pages
  - Tailwind CSS for styling

## Current Features

- User registration with `username`, `email`, and password confirmation
- User login with token handling
- Authenticated profile retrieval
- Settings page for updating user profile, including:
  - name
  - username
  - bio
  - profile image upload
  - password change
- Settings navigation from the profile page
- Backend support for storing profile images and returning public URLs

## ميزات التطبيق (بالعربية)

- تسجيل مستخدم جديد مع اسم مستخدم (`username`)، بريد إلكتروني، وتأكيد كلمة المرور
- تسجيل الدخول مع إدارة التوكن (Tokens)
- جلب بيانات الملف الشخصي للمستخدم المصادق عليه
- صفحة الإعدادات لتحديث بيانات المستخدم، تشمل:
  - الاسم
  - اسم المستخدم
  - السيرة الذاتية
  - رفع صورة الملف الشخصي
  - تغيير كلمة المرور مع تأكيد
- زر تنقّل إلى صفحة الإعدادات من صفحة الملف الشخصي
- دعم في الـ backend لتخزين صور المستخدم وإرجاع رابط عام للصورة


## How to Run

### Backend

1. Open `backend/`
2. Install dependencies: `composer install`
3. Configure `.env`
4. Run migrations: `php artisan migrate`
5. Start backend server: `php artisan serve`

### Frontend

1. Open `Vail/`
2. Install dependencies: `npm install`
3. Start frontend: `npm run dev`

## Notes

- This app is still in development and not finished yet.
- I plan to publish the project on GitHub once the app is more complete.
- Existing functionality may still require polishing, testing, and additional features.

## Future Work

- Complete UI polish and responsive design improvements
- Add full community post creation and commenting support
- Improve authentication flow and error handling
- Add additional user settings and profile customization
- Publish the repository to GitHub with proper documentation and release notes
