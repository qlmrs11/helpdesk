Helpdesk Microservices

<img width="1896" height="909" alt="image" src="https://github.com/user-attachments/assets/6e0073b1-2153-46bb-be60-1629adb3e347" />
<img width="1912" height="907" alt="image" src="https://github.com/user-attachments/assets/88ab56d1-32a5-4cf6-b65d-df7b216c3a82" />
<img width="1898" height="900" alt="image" src="https://github.com/user-attachments/assets/527b6041-8b0a-44ce-a2c6-e6a5f737f4c0" />
<img width="1913" height="904" alt="image" src="https://github.com/user-attachments/assets/dd2cb06d-85c6-4e2e-8309-d10edb573790" />





Sebuah aplikasi helpdesk berbasis microservices web yang dibangun dengan arsitektur modern menggunakan Vue.js untuk frontend dan backend API yang terpisah.

Daftar Isi

- Tentang Project
- Fitur Utama
- Teknologi yang Digunakan
- Prasyarat
- Struktur Project
- Instalasi
- Menjalankan Aplikasi
- Konfigurasi
- API Documentation
- Testing
- Deployment
- Kontribusi
- Lisensi

Tentang Project

Helpdesk Microservices adalah aplikasi manajemen tiket dan layanan pelanggan yang dibangun dengan pendekatan microservices. Aplikasi ini memisahkan frontend dan backend untuk meningkatkan skalabilitas dan maintainability.

Fitur Utama

- Manajemen Tiket: Buat, edit, dan kelola tiket support
- Dashboard: Visualisasi status tiket dan metrics
- User Management: Sistem autentikasi dan otorisasi
- Real-time Updates: Notifikasi real-time untuk update tiket
- Multi-role Support: Role-based access control (Admin, Agent, User)
- Responsive Design: Tampilan optimal di berbagai device
- API Documentation: RESTful API yang terdokumentasi dengan baik

Teknologi yang Digunakan

Frontend
- Vue.js 3 - Progressive JavaScript Framework
- TypeScript - Typed superset of JavaScript
- Vite - Next Generation Frontend Tooling
- Vue Router - Official router for Vue.js
- Pinia - State management library
- Axios - HTTP client
- Tailwind CSS - Utility-first CSS framework

Backend
- Node.js - JavaScript runtime
- Express.js - Web application framework
- TypeScript - Type safety
- MongoDB / PostgreSQL - Database (sesuaikan dengan database yang digunakan)
- JWT - Authentication
- Socket.io - Real-time communication

Tools & DevOps
- ESLint - Linting tool
- Prettier - Code formatter
- Docker - Containerization
- Git - Version control

Prasyarat

Sebelum memulai, pastikan sistem Anda memiliki:

- Node.js >= 16.x
- npm >= 8.x atau yarn >= 1.22.x
- Git
- MongoDB >= 5.x atau PostgreSQL >= 13.x (sesuaikan dengan database yang digunakan)
- Docker (opsional, untuk development dengan container)

Struktur Project

```
helpdesk/
├── backend/                 # Backend API service
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   ├── tests/              # Test files
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── frontend/               # Frontend Vue.js application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── assets/        # Images, fonts, etc
│   │   ├── components/    # Reusable components
│   │   ├── views/         # Page components
│   │   ├── router/        # Route definitions
│   │   ├── store/         # State management (Pinia)
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── tsconfig.json      # TypeScript configuration
│
├── package.json           # Root package.json (workspace)
└── README.md             # Documentation (file ini)
```

Instalasi

Clone Repository

```bash
git clone https://github.com/qlmrs11/helpdesk.git
cd helpdesk
```

Instalasi Dependencies

Menggunakan npm:

```bash
# Install root dependencies (jika ada)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Menggunakan yarn:

```bash
# Install root dependencies
yarn install

# Install backend dependencies
cd backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

Setup Environment Variables

Backend (.env)

Buat file .env di folder backend:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=helpdesk_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration (opsional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Frontend (.env)

Buat file .env di folder frontend:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=Helpdesk System
VITE_APP_VERSION=1.0.0
```

Menjalankan Aplikasi

Development Mode

Backend

```bash
cd backend
npm run dev
# atau
yarn dev
```

Backend akan berjalan di http://localhost:3000

Frontend

```bash
cd frontend
npm run dev
# atau
yarn dev
```

Frontend akan berjalan di http://localhost:5173

Production Mode

Build Backend

```bash
cd backend
npm run build
npm start
```

Build Frontend

```bash
cd frontend
npm run build
npm run preview
```

Menggunakan Docker

```bash
# Build dan jalankan semua services
docker-compose up -d

# Stop services
docker-compose down
```

Dependensi Utama

Backend Dependencies

```json
{
  "express": "^4.18.x",
  "typescript": "^5.0.x",
  "mongoose": "^7.0.x", // atau "pg" untuk PostgreSQL
  "jsonwebtoken": "^9.0.x",
  "bcrypt": "^5.1.x",
  "cors": "^2.8.x",
  "dotenv": "^16.0.x",
  "socket.io": "^4.6.x",
  "express-validator": "^7.0.x"
}
```

Frontend Dependencies

```json
{
  "vue": "^3.3.x",
  "vue-router": "^4.2.x",
  "pinia": "^2.1.x",
  "axios": "^1.4.x",
  "typescript": "^5.0.x",
  "vite": "^4.3.x",
  "tailwindcss": "^3.3.x",
  "socket.io-client": "^4.6.x"
}
```

Konfigurasi

Backend Configuration

Edit file backend/src/config/config.ts:

```typescript
export const config = {
  port: process.env.PORT || 3000,
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/helpdesk',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret',
    expiresIn: process.env.JWT_EXPIRE || '7d',
  },
};
```

Frontend Configuration

Edit file frontend/src/config/api.ts:

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
};
```

API Documentation

Authentication Endpoints

```
POST   /api/auth/register    - Register user baru
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
GET    /api/auth/profile     - Get user profile
```

Ticket Endpoints

```
GET    /api/tickets          - Get semua tickets
GET    /api/tickets/:id      - Get ticket by ID
POST   /api/tickets          - Create ticket baru
PUT    /api/tickets/:id      - Update ticket
DELETE /api/tickets/:id      - Delete ticket
```

User Endpoints

```
GET    /api/users            - Get semua users (Admin only)
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user (Admin only)
```

Testing

Backend Testing

```bash
cd backend
npm run test
npm run test:coverage
```

Frontend Testing

```bash
cd frontend
npm run test:unit
npm run test:e2e
```

Deployment

Deploy ke Vercel (Frontend)

```bash
cd frontend
npm run build
vercel --prod
```

Deploy ke Railway/Render (Backend)

```bash
cd backend
npm run build
# Push ke Railway atau Render
```

Deploy dengan Docker

```bash
# Build images
docker-compose build

# Push ke container registry
docker-compose push

# Deploy ke server
docker-compose up -d
```

Kontribusi

Kontribusi selalu diterima dengan senang hati! Berikut cara berkontribusi:

1. Fork repository ini
2. Clone fork Anda
   ```bash
   git clone https://github.com/your-username/helpdesk.git
   ```
3. Buat branch untuk fitur baru
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. Commit perubahan Anda
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. Push ke branch
   ```bash
   git push origin feature/AmazingFeature
   ```
6. Buka Pull Request

Coding Standards

- Gunakan ESLint dan Prettier untuk code formatting
- Tulis test untuk fitur baru
- Update dokumentasi jika diperlukan
- Follow conventional commits untuk commit messages

Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

```
MIT License

Copyright (c) 2024 qlmrs11

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Tim

- Developer - [qlmrs11](https://github.com/qlmrs11)

Kontak & Support

Jika ada pertanyaan atau butuh bantuan:

- GitHub Issues: [Create an issue](https://github.com/qlmrs11/helpdesk/issues)
- Email: your-email@example.com (sesuaikan dengan email Anda)

Acknowledgments

- Vue.js Community
- Express.js Documentation
- Stack Overflow Community
- Semua kontributor yang telah membantu project ini

---

Jika project ini membantu Anda, jangan lupa berikan star di GitHub!

Happy Coding!
