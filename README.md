# মারকাজুল লিসান (Markazul Lisan)

> প্রবাসী বাংলাদেশিদের জন্য একটি অনলাইন ইসলামিক শিক্ষা প্ল্যাটফর্ম

Europe, America, Middle East — যেখানেই থাকুন, ঘরে বসে অভিজ্ঞ শিক্ষকদের সাথে কুরআন, হাদিস ও ইসলামিক মূলনীতি শিখুন।

---

## 🌐 Live Links

| Service | URL |
|---|---|
| Frontend | https://markazul-lisan.vercel.app |
| Backend API | https://markazul-lisan-server.vercel.app |

---

## ✨ Features

### Public Features

- **Course Listing** — সব কোর্সের তালিকা + বিস্তারিত পেজ
- **Teacher Profiles** — অভিজ্ঞ শিক্ষকদের প্রোফাইল
- **Blog** — ইসলামিক শিক্ষামূলক লেখা
- **Books** — বইয়ের তালিকা + PDF ডাউনলোড
- **Students List** — কারা কোন কোর্সে পড়ছে
- **Daily Content** — কুরআন ও হাদিস থেকে প্রতিদিনের শিক্ষা (carousel)
- **Admission Form** — ভর্তির আবেদন (Web3Forms → Email)
- **Free Trial Form** — ফ্রি ট্রায়াল ক্লাসের অনুরোধ
- **Authentication** — Email/Password + Google OAuth (Better Auth)
- **Responsive** — Mobile-first, সব device-এ কাজ করে
- **Dark Mode** — System preference অনুযায়ী automatic
- **SEO Optimized** — Dynamic metadata, server-side rendering

### Admin Features

- **Dashboard** — Stats overview (course, teacher, student counts)
- **Full CRUD** — Courses, Teachers, Blogs, Books, Daily Content, Students, Results
- **Image Upload** — Cloudinary integration with `f_auto,q_auto` optimization
- **PDF Upload** — Books-এর জন্য Cloudinary raw upload
- **Route Protection** — Proxy-level + backend middleware-level security
- **Role-Based Access** — শুধু `admin` role-এর user access পায়

---

## 🛠 Tech Stack

### Frontend

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI Library | React 19 |
| Language | JavaScript (ES2023) |
| Styling | Tailwind CSS 4 |
| Components | HeroUI v3.2.6 |
| Animation | Motion (formerly Framer Motion) |
| Carousel | Embla Carousel |
| State | React hooks |
| Notifications | React Hot Toast |
| Icons | React Icons + Gravity UI Icons |
| Auth | Better Auth (client) |
| Image CDN | Cloudinary |
| Form Backend | Web3Forms |
| Hosting | Vercel |

### Backend

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| Database | MongoDB Atlas (native driver) |
| Module System | CommonJS |
| Auth | Better Auth (server) + JWT plugin |
| JWT Verification | jose-cjs |
| OAuth | Google OAuth 2.0 |
| Image CDN | Cloudinary |
| Hosting | Vercel |

---

## 📁 Project Structure

```
markazul-lisan/
├── frontend/                         # Next.js application
│   ├── src/
│   │   ├── app/                      # App Router pages
│   │   │   ├── (auth)/               # Login, Register
│   │   │   ├── admin/                # Admin panel
│   │   │   ├── api/auth/[...all]/    # Better Auth handler
│   │   │   ├── courses/, teachers/,
│   │   │   ├── blog/, books/, students/,
│   │   │   ├── about/, admission/,
│   │   │   ├── free-trial/, contact/
│   │   │   ├── layout.jsx
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── shared/               # Reusable components
│   │   │   ├── home/                 # Home page sections
│   │   │   ├── admin/                # Admin components
│   │   │   └── ...                   # Page-specific components
│   │   ├── lib/
│   │   │   ├── auth.js               # Better Auth server
│   │   │   ├── auth-client.js        # Better Auth client
│   │   │   ├── adminApi.js           # Admin API helpers
│   │   │   └── api/                  # Public API helpers
│   │   └── proxy.js                  # Route protection
│   └── .env.local
│
└── backend/                          # Express application
    ├── index.js                      # Entry point
    ├── middleware/
    │   └── auth.js                   # verifyToken, requireAdmin
    ├── routes/
    │   ├── courses.js
    │   ├── teachers.js
    │   ├── blogs.js
    │   ├── books.js
    │   ├── dailyContent.js
    │   ├── students.js
    │   └── results.js
    ├── lib/
    │   └── db.js                     # MongoDB connection cache
    ├── scripts/
    │   └── seed.js                   # Dummy data
    ├── .env
    └── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- Cloudinary account
- Google OAuth credentials
- Web3Forms access key

### 1. Clone the Repository

```bash
git clone https://github.com/ShafayatSadid/markazul-lisan.git
git clone https://github.com/ShafayatSadid/markazul-lisan-server.git
```

### 2. Backend Setup

```bash
cd markazul-lisan-server
npm install
```

`.env` file বানান:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
DB_NAME=markazul_lisan
PORT=5000
CLIENT_URL=http://localhost:3000
```

Seed data insert:

```bash
npm run seed
```

Dev server:

```bash
npm run dev
```

Backend চালু হবে `http://localhost:5000`-এ।

### 3. Frontend Setup

```bash
cd markazul-lisan
npm install
```

`.env.local` file বানান:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset-name

# Better Auth
BETTER_AUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Dev server:

```bash
npm run dev
```

Frontend চালু হবে `http://localhost:3000`-এ।

### 4. Admin Access Setup

১. `/register` page-এ একটি account বানান
২. MongoDB Atlas → Collections → `user` → আপনার account-এর `role` field manually `"admin"` set করুন
৩. `/login` করে `/admin` access করুন

---

## 🔐 Environment Variables

### Frontend Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Frontend URL (Better Auth base) |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code সহ, `+` ছাড়া) |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned preset name |
| `BETTER_AUTH_SECRET` | Better Auth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### Backend Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DB_NAME` | Database name |
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Frontend URL (for JWKS verification) |

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/courses` | সব কোর্স (optional `?featured=true`) |
| GET | `/courses/:id` | একটি কোর্স |
| GET | `/teachers` | সব শিক্ষক (optional `?featured=true`) |
| GET | `/teachers/:id` | একজন শিক্ষক |
| GET | `/blogs` | সব ব্লগ |
| GET | `/blogs/:id` | একটি ব্লগ |
| GET | `/books` | সব বই |
| GET | `/books/:id` | একটি বই |
| GET | `/daily-content` | সব daily content |
| GET | `/daily-content/:id` | একটি content |
| GET | `/students` | সব শিক্ষার্থী |
| GET | `/students/:id` | একজন শিক্ষার্থী |
| GET | `/results` | সব result |
| GET | `/results/:id` | একটি result |

### Admin Routes (Require JWT + admin role)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/courses` | নতুন কোর্স |
| PATCH | `/courses/:id` | কোর্স আপডেট |
| DELETE | `/courses/:id` | কোর্স মুছুন |
| (same for all resources) | | |

**Authentication:** `Authorization: Bearer <JWT>` header required।

---

## 🎨 Design System

### Color Palette

**Light Mode:**

| Token | Value | Usage |
|---|---|---|
| `background` | `#FAF9F4` | Page background (cream) |
| `surface` | `#FFFFFF` | Cards, alternate sections |
| `primary` | `#0F6B4A` | Brand green (buttons, links) |
| `primary-deep` | `#0A3D2A` | Dark section background |
| `secondary` | `#C8A951` | Gold accent |
| `text-muted` | `#68756E` | Secondary text |

**Dark Mode:** System preference (`prefers-color-scheme`) অনুযায়ী automatic।

### Typography

- **Bangla:** Hind Siliguri
- **Serif Bangla:** Noto Serif Bengali
- **English:** Inter

### Design Principles

- সবুজ = signature (Navbar CTA, Hero, Footer, StatsBar)
- সোনালি = accent (cards, icons)
- Sections alternate: `background` / `surface`
- Dark CTA sections: `primary-deep`

---

## 🚢 Deployment

### Frontend Deploy (Vercel)

1. GitHub-এ push করুন
2. Vercel → New Project → Import Repository
3. Environment variables set করুন (উপরে দেওয়া list)
4. Deploy

### Backend Deploy (Vercel)

1. GitHub-এ push করুন
2. Vercel → New Project → Import Repository
3. **Root Directory**: `markazul-lisan-server`
4. Environment variables set করুন
5. Deploy

### Important

- Backend `.env`-এ `CLIENT_URL` অবশ্যই deployed frontend URL হতে হবে
- MongoDB Atlas → Network Access → `0.0.0.0/0` allow করতে হবে (Vercel-এর জন্য)
- Google OAuth Console → Authorized redirect URIs-এ deployed URL যোগ করুন:
  - `https://your-frontend.vercel.app/api/auth/callback/google`

---

## 📜 Available Scripts

### Frontend

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

### Backend

```bash
npm run dev          # Dev server (nodemon)
npm run start        # Production server
npm run seed         # Seed dummy data
```

---

## 🔒 Security

- Server-side validation সব ক্ষেত্রে
- JWT-based authentication (Better Auth + jose-cjs)
- Route protection দুই স্তরে: Proxy + Backend middleware
- Role-based access control (RBAC)
- CORS configured
- Environment variables for all secrets
- Cloudinary unsigned preset with restrictions

---

## 🤝 Contributing

এই project একটি client project। Contributions স্বাগত জানানো হয় না।

---

## 📄 License

Private project — All rights reserved।

---

## 👨‍💻 Author

**Shafayat Hossain (Shafayat Sadid)**

- GitHub: [@ShafayatSadid](https://github.com/ShafayatSadid)

---

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com) — Authentication
- [HeroUI](https://heroui.com) — Component library
- [Cloudinary](https://cloudinary.com) — Image CDN
- [Web3Forms](https://web3forms.com) — Form backend
- [Motion](https://motion.dev) — Animation library
- [Embla Carousel](https://embla-carousel.com) — Carousel