# Greeting

**Session ID:** ses_e9893da7fffefHL4FH943WEFGb
**Created:** 10/23/2026, 12:21:43 PM
**Updated:** 10/23/2026, 2:17:14 PM

---

## User

hello

---

## Assistant (Build · Big Pickle · 4.0s)

_Thinking:_

The user just said "hello". I should respond concisely, maybe greeting. No need for tools.

Hello! How can I help you with your school management system today?

---

## User

Im trying to connect to my database but it is not connecting to my mongodb atlas my URI is correct 

---

## Assistant (Build · Big Pickle · 2.4s)

_Thinking:_

The user is trying to connect to MongoDB Atlas but it's not connecting. I should investigate the codebase to understand how they're connecting. Let me look at the project structure and find the DB connection code.

I'll take a look at how your app connects to MongoDB.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la && cat package.json 2>/dev/null"
}
```

**Output:**
```
total 56
drwxrwxr-x  6 sajidasim sajidasim  4096 Sep  8 18:34 .
drwxr-x--- 39 sajidasim sajidasim  4096 Oct 23 12:19 ..
drwxrwxr-x  7 sajidasim sajidasim  4096 Oct 23 12:18 .git
-rw-rw-r--  1 sajidasim sajidasim   508 Sep  8 18:40 .gitignore
-rw-rw-r--  1 sajidasim sajidasim  2111 Sep  8 19:56 README.md
drwxrwxr-x 11 sajidasim sajidasim  4096 Oct 10 22:53 backend
drwxrwxr-x  6 sajidasim sajidasim  4096 Oct 10 18:35 frontend
drwxrwxr-x 37 sajidasim sajidasim  4096 Sep  8 18:52 node_modules
-rw-rw-r--  1 sajidasim sajidasim 17117 Sep  8 18:52 package-lock.json
-rw-rw-r--  1 sajidasim sajidasim   912 Sep  8 18:52 package.json
{
  "devDependencies": {
    "autoprefixer": "^10.5.4",
    "concurrently": "^10.0.5",
    "postcss": "^8.5.26",
    "tailwindcss": "^4.3.3"
  },
  "name": "school-management-system",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "baseline-browser-mapping": "^2.11.20",
    "browserslist": "^4.28.8",
    "caniuse-lite": "^1.0.30001810",
    "electron-to-chromium": "^1.5.420",
    "escalade": "^3.2.0",
    "fraction.js": "^5.3.4",
    "nanoid": "^3.3.18",
    "node-releases": "^2.0.54",
    "picocolors": "^1.1.1",
    "postcss-value-parser": "^4.2.0",
    "source-map-js": "^1.2.1",
    "update-browserslist-db": "^1.3.2"
  },
  "scripts": {
    "backend": "npm run dev --prefix backend",
    "frontend": "npm run dev --prefix frontend",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*.{js,ts,jsx,tsx,env,json}"
}
```

**Output:**
```
/home/sajidasim/school-management-system/package-lock.json
/home/sajidasim/school-management-system/frontend/src/main.jsx
/home/sajidasim/school-management-system/frontend/src/components/icons.jsx
/home/sajidasim/school-management-system/frontend/src/components/ui.jsx
/home/sajidasim/school-management-system/frontend/src/components/TwoFactorModal.jsx
/home/sajidasim/school-management-system/frontend/src/components/usePagination.js
/home/sajidasim/school-management-system/frontend/src/components/Pagination.jsx
/home/sajidasim/school-management-system/frontend/src/components/ProtectedRoute.jsx
/home/sajidasim/school-management-system/frontend/src/components/layout/PublicLayout.jsx
/home/sajidasim/school-management-system/frontend/src/components/layout/navConfig.js
/home/sajidasim/school-management-system/frontend/src/components/layout/PublicHeader.jsx
/home/sajidasim/school-management-system/frontend/src/components/layout/AppShell.jsx
/home/sajidasim/school-management-system/frontend/src/components/layout/PublicFooter.jsx
/home/sajidasim/school-management-system/frontend/src/components/layout/Wordmark.jsx
/home/sajidasim/school-management-system/backend/server.js
/home/sajidasim/school-management-system/frontend/src/context/AuthContext.jsx
/home/sajidasim/school-management-system/frontend/src/context/ToastContext.jsx
/home/sajidasim/school-management-system/frontend/src/App.jsx
/home/sajidasim/school-management-system/backend/routes/configRoutes.js
/home/sajidasim/school-management-system/backend/config/db.js
/home/sajidasim/school-management-system/backend/routes/authRoutes.js
/home/sajidasim/school-management-system/backend/config/cloudinary.js
/home/sajidasim/school-management-system/backend/routes/gradebookRoutes.js
/home/sajidasim/school-management-system/backend/routes/teacherRoutes.js
/home/sajidasim/school-management-system/backend/routes/attendanceRoutes.js
/home/sajidasim/school-management-system/backend/routes/assignmentRoutes.js
/home/sajidasim/school-management-system/backend/routes/publicRoutes.js
/home/sajidasim/school-management-system/backend/routes/noticeRoutes.js
/home/sajidasim/school-management-system/backend/routes/studentRoutes.js
/home/sajidasim/school-management-system/backend/package.json
/home/sajidasim/school-management-system/backend/package-lock.json
/home/sajidasim/school-management-system/backend/services/payment.js
/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js
/home/sajidasim/school-management-system/backend/scripts/seed-admin.js
/home/sajidasim/school-management-system/frontend/src/pages/parent/ParentHome.jsx
/home/sajidasim/school-management-system/backend/utils/rolls.js
/home/sajidasim/school-management-system/backend/.env
/home/sajidasim/school-management-system/backend/controllers/authController.js
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminSettings.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminDashboard.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminCreateUser.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminNoticeBoard.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminUserRoster.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminEditUser.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAppApproval.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAssignments.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminApplicationDetails.jsx
/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminWebsiteManager.jsx
/home/sajidasim/school-management-system/backend/middleware/validate.js
/home/sajidasim/school-management-system/backend/middleware/sanitize.js
/home/sajidasim/school-management-system/backend/middleware/assignments.js
/home/sajidasim/school-management-system/backend/middleware/auth.js
/home/sajidasim/school-management-system/backend/middleware/csrf.js
/home/sajidasim/school-management-system/frontend/package.json
/home/sajidasim/school-management-system/frontend/vite.config.js
/home/sajidasim/school-management-system/package.json
/home/sajidasim/school-management-system/frontend/eslint.config.js
/home/sajidasim/school-management-system/frontend/package-lock.json
/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicAdmission.jsx
/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicFounders.jsx
/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicPortal.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherGradebook.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherEditStudent.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherDashboard.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherCreateStudent.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherAnalytics.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherAttendance.jsx
/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherRoster.jsx
/home/sajidasim/school-management-system/frontend/src/pages/auth/Profile.jsx
/home/sajidasim/school-management-system/frontend/src/pages/auth/Register.jsx
/home/sajidasim/school-management-system/frontend/src/pages/auth/Login.jsx
/home/sajidasim/school-management-system/frontend/src/pages/shared/NoticeBoard.jsx
/home/sajidasim/school-management-system/frontend/src/pages/student/StudentNotices.jsx
/home/sajidasim/school-management-system/frontend/src/pages/student/StudentAttendanceHub.jsx
/home/sajidasim/school-management-system/frontend/src/pages/student/StudentGrades.jsx
/home/sajidasim/school-management-system/frontend/src/pages/student/StudentDashboard.jsx
/home/sajidasim/school-management-system/backend/models/Attendance.js
/home/sajidasim/school-management-system/backend/models/User.js
/home/sajidasim/school-management-system/backend/models/PublicModels.js
/home/sajidasim/school-management-system/backend/models/Teacher.js
/home/sajidasim/school-management-system/backend/models/Student.js
/home/sajidasim/school-management-system/backend/models/Notice.js
/home/sajidasim/school-management-system/backend/models/Assignment.js
/home/sajidasim/school-management-system/backend/models/Gradebook.js
/home/sajidasim/school-management-system/backend/models/SchoolConfig.js
/home/sajidasim/school-management-system/frontend/src/core/nav.js
/home/sajidasim/school-management-system/frontend/src/core/api.js
```

---

## Assistant (Build · Big Pickle · 2.6s)

_Thinking:_

Let me read the db config, server, env, and package.json. Be careful with .env secrets; I shouldn't print secrets. But I need to inspect. I'll read db.js and server.js, and check env variable names without printing values. Let me use read on db.js and server.js. For .env, I could grep variable names.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/config/db.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/config/db.js</path>
<type>file</type>
<content>
1: const mongoose = require('mongoose');
2: 
3: const connectDB = async () => {
4:   try {
5:     // Force a strict timeout so it doesn't hang forever
6:     await mongoose.connect(process.env.MONGO_URI, {
7:       serverSelectionTimeoutMS: 5000 
8:     });
9:     console.log('🚀 Initial Mongoose connection trigger successful');
10:   } catch (err) {
11:     console.error('❌ CRITICAL DATABASE ERROR:', err.message);
12:     process.exit(1); // Force the server to stop so you can read the error
13:   }
14: };
15: 
16: module.exports = connectDB;

(End of file - total 16 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/server.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/server.js</path>
<type>file</type>
<content>
1: const express = require('express');
2: const cors = require('cors');
3: const helmet = require('helmet');
4: const rateLimit = require('express-rate-limit');
5: const cookieParser = require('cookie-parser');
6: const dotenv = require('dotenv');
7: const mongoose = require('mongoose');
8: const path = require('path');
9: const connectDB = require('./config/db');
10: const { csrfInit, csrfProtect } = require('./middleware/csrf');
11: const sanitize = require('./middleware/sanitize');
12: const attendanceRoutes = require('./routes/attendanceRoutes');
13: const { isSandbox } = require('./services/payment');
14: const authRoutes = require('./routes/authRoutes');
15: const noticeRoutes = require('./routes/noticeRoutes');
16: const teacherRoutes = require('./routes/teacherRoutes');
17: const gradebookRoutes = require('./routes/gradebookRoutes');
18: const assignmentRoutes = require('./routes/assignmentRoutes');
19: 
20: 
21: // 1. Load environment variables first
22: dotenv.config({ path: path.join(__dirname, '.env') });
23: 
24: // Fail fast on missing critical secrets rather than silently signing tokens with
25: // an undefined/weak key.
26: if (!process.env.JWT_SECRET) {
27:   console.error('FATAL: JWT_SECRET is not set. Refusing to start.');
28:   process.exit(1);
29: }
30: // Reject weak signing keys: a short secret is brute-forceable and undermines
31: // every session/2FA token. Fatal in production, loud warning in local dev.
32: if (process.env.JWT_SECRET.length < 32) {
33:   const msg = 'JWT_SECRET is shorter than 32 characters. Use a long random value.';
34:   if (process.env.NODE_ENV === 'production') {
35:     console.error(`FATAL: ${msg} Refusing to start.`);
36:     process.exit(1);
37:   }
38:   console.warn(`WARNING: ${msg}`);
39: }
40: if (process.env.NODE_ENV === 'production' && isSandbox) {
41:   console.warn('WARNING: PAYMENT_PROVIDER is "sandbox" in production; admission payments will be rejected until a real provider is configured.');
42: }
43: 
44: const app = express();
45: app.disable('x-powered-by'); // Hide the Express fingerprint
46: 
47: // Behind a single reverse proxy (production). Enables accurate client IPs for
48: // rate limiting and lets HttpOnly+Secure cookies work over HTTPS.
49: if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);
50: 
51: // 2. Security middleware
52: app.use(helmet({
53:   contentSecurityPolicy: {
54:     directives: {
55:       defaultSrc: ["'self'"],
56:       scriptSrc: ["'self'"],
57:       scriptSrcAttr: ["'none'"],
58:       styleSrc: ["'self'", "'unsafe-inline'"],
59:       imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
60:       fontSrc: ["'self'", "data:"],
61:       connectSrc: ["'self'", "https://res.cloudinary.com", "ws://localhost:5173", "wss://localhost:5173"],
62:       objectSrc: ["'none'"],
63:       frameSrc: ["'none'"],
64:       frameAncestors: ["'none'"],
65:       baseUri: ["'self'"],
66:       formAction: ["'self'"],
67:     },
68:   },
69:   crossOriginEmbedderPolicy: false,
70:   referrerPolicy: { policy: 'same-origin' },
71:   hsts: process.env.NODE_ENV === 'production'
72:     ? { maxAge: 15552000, includeSubDomains: true, preload: true }
73:     : false,
74: }));
75: 
76: // Restrict CORS to a configurable allow-list of trusted front-end origins
77: const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000,http://localhost:4173')
78:   .split(',')
79:   .map((origin) => origin.trim())
80:   .filter(Boolean);
81: 
82: app.use(cors({
83:   origin: (origin, callback) => {
84:     // Allow same-origin / non-browser requests (no Origin header) and allow-listed origins
85:     if (!origin || allowedOrigins.includes(origin)) {
86:       return callback(null, true);
87:     }
88:     const err = new Error('Not allowed by CORS');
89:     err.status = 403;
90:     return callback(err);
91:   },
92:   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
93:   allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password', 'X-CSRF-Token'],
94:   credentials: true,
95: }));
96: 
97: // Body parsers - reduced limit to limit memory-exhaustion abuse.
98: // 2mb accommodates a 1MB base64-encoded profile image (~1.37x inflation).
99: app.use(express.json({ limit: '2mb' }));
100: app.use(express.urlencoded({ limit: '2mb', extended: true }));
101: app.use(cookieParser());
102: 
103: // 🛡️ NoSQL injection scrubber — strips Mongo operator keys from all payloads.
104: app.use(sanitize);
105: 
106: // 🛡️ CSRF double-submit cookie: issued on every response, verified on mutations.
107: app.use(csrfInit);
108: app.use('/api', csrfProtect);
109: 
110: // 🛡️ Rate limiting: generous global cap, strict cap on authentication endpoints
111: const globalLimiter = rateLimit({
112:   windowMs: 15 * 60 * 1000, // 15 minutes
113:   max: 300,
114:   standardHeaders: true,
115:   legacyHeaders: false,
116: });
117: const authLimiter = rateLimit({
118:   windowMs: 15 * 60 * 1000,
119:   max: 20, // 20 attempts per 15 min per IP
120:   standardHeaders: true,
121:   legacyHeaders: false,
122:   message: { success: false, message: 'Too many attempts. Please try again later.' },
123: });
124: app.use('/api', globalLimiter);
125: app.use('/api/auth/login', authLimiter);
126: app.use('/api/auth/register', authLimiter);
127: app.use('/api/auth/2fa/verify', authLimiter);
128: 
129: // Tighter cap on unauthenticated, write-heavy public admission endpoints
130: // (application submission and payment) to blunt spam / abuse.
131: const publicWriteLimiter = rateLimit({
132:   windowMs: 15 * 60 * 1000,
133:   max: 20,
134:   standardHeaders: true,
135:   legacyHeaders: false,
136:   message: { success: false, message: 'Too many requests. Please try again later.' },
137: });
138: app.use('/api/public/apply', publicWriteLimiter);
139: app.use('/api/public/pay-admission', publicWriteLimiter);
140: 
141: 
142: // 3. Setup Mongoose Connection Listeners FIRST
143: mongoose.connection.on('connected', () => {
144:   console.log('💚 SUCCESS: Mongoose is actively connected to MongoDB!');
145: });
146: mongoose.connection.on('error', (err) => {
147:   console.log(`💔 ERROR: Mongoose connection failed: ${err.message}`);
148: });
149: mongoose.connection.on('disconnected', () => {
150:   console.log('💛 WARNING: Mongoose disconnected from MongoDB.');
151: });
152: 
153: // 4. Trigger the actual database connection
154: connectDB();
155: 
156: // 5. Routes
157: app.use('/api/auth', authRoutes);
158: app.use('/api/attendance', attendanceRoutes);
159: app.use('/api/notices', noticeRoutes);
160: app.use('/api/teacher', teacherRoutes);
161: app.use('/api/grades', gradebookRoutes);
162: app.use('/api', assignmentRoutes);
163: app.use('/api/config', require('./routes/configRoutes'));
164: app.use('/api/student', require('./routes/studentRoutes'));
165: app.use('/api/public', require('./routes/publicRoutes'));
166: 
167: // Serve the built SPA in production so the entire app shares one origin (and
168: // inherits the CSP/security headers above). /api/ requests still hit the JSON API.
169: if (process.env.NODE_ENV === 'production') {
170:   const dist = path.join(__dirname, '..', 'frontend', 'dist');
171:   app.use(express.static(dist));
172:   app.use((req, res, next) => {
173:     if (req.path.startsWith('/api/')) return next();
174:     res.sendFile(path.join(dist, 'index.html'), (err) => err && next());
175:   });
176: }
177: 
178: 
179: 
180: 
181: 
182: // Test Route
183: app.get('/', (req, res) => {
184:   res.send('School Management API is running...');
185: });
186: 
187: // 7. 404 handler
188: app.use((req, res) => {
189:   res.status(404).json({ success: false, message: 'Resource not found.' });
190: });
191: 
192: // 8. Centralized error handler - never leak internal stack traces / DB messages
193: // eslint-disable-next-line no-unused-vars
194: app.use((err, req, res, next) => {
195:   console.error(err);
196:   const status = err.status || (err.name === 'MulterError' ? 400 : 500);
197:   res.status(status).json({
198:     success: false,
199:     message: status === 400 ? err.message : 'Internal server error.',
200:   });
201: });
202: 
203: // 6. Start Server
204: const PORT = process.env.PORT || 5000;
205: app.listen(PORT, () => {
206:   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
207: });

(End of file - total 207 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/package.json"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/package.json</path>
<type>file</type>
<content>
1: {
2:   "name": "backend",
3:   "version": "1.0.0",
4:   "description": "",
5:   "main": "index.js",
6:   "scripts": {
7:     "start": "node server.js",
8:     "dev": "node --watch server.js",
9:     "seed:admin": "node scripts/seed-admin.js"
10:   },
11:   "keywords": [],
12:   "author": "",
13:   "license": "ISC",
14:   "dependencies": {
15:     "bcryptjs": "^3.0.3",
16:     "cloudinary": "^2.11.0",
17:     "cookie-parser": "^1.4.7",
18:     "cors": "^2.8.6",
19:     "dotenv": "^17.4.2",
20:     "express": "^5.2.1",
21:     "express-rate-limit": "^8.7.1",
22:     "helmet": "^8.3.0",
23:     "jsonwebtoken": "^9.0.3",
24:     "mongo-sanitize": "^1.1.0",
25:     "mongoose": "^9.9.4",
26:     "multer": "^2.3.0",
27:     "nodemailer": "^10.0.10",
28:     "qrcode": "^1.5.4",
29:     "speakeasy": "^2.0.0",
30:     "zod": "^4.6.5"
31:   }
32: }

(End of file - total 32 lines)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -o '^[A-Za-z_][A-Za-z0-9_]*=' /home/sajidasim/school-management-system/backend/.env"
}
```

**Output:**
```
PORT=
MONGODB_URI=
JWT_SECRET=
NODE_ENV=
CLIENT_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

```

---

## Assistant (Build · Big Pickle · 4.4s)

_Thinking:_

Found the bug: .env defines `MONGODB_URI` but code reads `process.env.MONGO_URI`. Let me verify by checking the actual env var name and value shape without exposing secrets. The grep shows MONGODB_URI. So mismatch.

Also mongoose version ^9.9.4 — that seems odd (mongoose latest is 8.x as of my knowledge, but 2026 could be 9). Fine.

Let me confirm no other reference to MONGO_URI and check whether env is loaded before db. It is.

I should tell the user. Should I fix it? The user is trying to connect. The likely fix is change db.js to MONGODB_URI or rename env. I'll ask? The instruction says be proactive when asked to do something. They describe a problem, likely want diagnosis/fix. I can just point it out and offer/apply fix. Since concise, I can apply the fix. But changing code without asking may be okay for a bug. I'd rather make the minimal fix: update db.js to use MONGODB_URI with fallback to MONGO_URI. That's safe.

Let me verify there are no other MONGO_URI usages.

**Tool: grep**

**Input:**
```json
{
  "pattern": "MONGO_URI|MONGODB_URI",
  "path": "/home/sajidasim/school-management-system/backend"
}
```

**Output:**
```
Found 8 matches
/home/sajidasim/school-management-system/backend/.env.example:
  Line 7: MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority


/home/sajidasim/school-management-system/backend/scripts/seed-admin.js:
  Line 45:   if (!process.env.MONGO_URI) {

  Line 46:     console.error('❌ MONGO_URI is not defined in backend/.env');

  Line 51:     await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });


/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js:
  Line 35:   if (!process.env.MONGO_URI) {

  Line 36:     console.error('❌ MONGO_URI is not defined in backend/.env');

  Line 41:     await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });


/home/sajidasim/school-management-system/backend/config/db.js:
  Line 6:     await mongoose.connect(process.env.MONGO_URI, {

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -E '^(MONGODB_URI|MONGO_URI)=' /home/sajidasim/school-management-system/backend/.env | sed -E 's#(mongodb\\+srv://[^:]+:)[^@]*@#\\1****@#'"
}
```

**Output:**
```
MONGODB_URI=mongodb+srv://sajidasimschoolproject_506:****@schoolmanagement.kn1plrt.mongodb.net/schoolmanagement?retryWrites=true&w=majority

```

---

## Assistant (Build · Big Pickle · 7.2s)

_Thinking:_

Confirmed: env uses MONGODB_URI, code expects MONGO_URI. The seed scripts also expect MONGO_URI. Fix approach: rename in .env to MONGO_URI? Or update code. The .env.example says MONGO_URI. The `.env` has MONGODB_URI. Simplest: change .env line to MONGO_URI. But there may be multiple places. Better update code to accept both? Cleanest is to make code consistent with .env.example (MONGO_URI), so rename .env var. But .env is user-specific and gitignored likely. I could edit .env (it's a local config) — but the user says URI is correct. Renaming is fine.

However maybe the user prefers MONGODB_URI. I'll ask? Being concise, I'd just fix by supporting both in db.js and scripts? That adds complexity. The simplest one-line fix is rename in .env. But instructions warn not to expose secrets; editing .env is okay. Let me change .env to use MONGO_URI.

Actually, a more robust fix: in db.js use `process.env.MONGODB_URI || process.env.MONGO_URI`. And scripts too. But consistency with .env.example is better.

I'll just rename in .env, one edit. But then if the user shares .env config elsewhere, not relevant. Let me do the rename. Also tell them.

Wait, .env might have comment lines etc. Let me not read it fully. Use edit with old string "MONGODB_URI=mongodb+srv://..." would require reading. The edit tool requires prior Read of the file. I haven't read .env. I could use bash sed but instructions say avoid sed. Could read then edit. But reading .env would expose secrets in context. It's already partly exposed (grep output), but I shouldn't need to.

Alternative: edit db.js and scripts to use MONGODB_URI, avoiding touching .env. But .env.example says MONGO_URI. Hmm.

Better: make code accept both, keeping .env untouched. Update db.js, seed-admin.js, backfillAssignments.js to use `process.env.MONGODB_URI || process.env.MONGO_URI`? That's a bit messy but works everywhere.

Actually simplest single fix: in db.js change process.env.MONGO_URI to process.env.MONGODB_URI. Then server works. Scripts still broken but user asked about connecting database (server). But scripts also connect. I'd fix all three.

Let me apply edits to all three to use MONGODB_URI, and also update .env.example? No, .env.example should stay as canonical maybe. Hmm, mixing. Better make code support both and update .env.example to mention both? Overkill.

Decision: update the three code files to use `process.env.MONGODB_URI || process.env.MONGO_URI` so either works. Then server connects. Keep .env.example. Let me read the scripts around those lines first to edit accurately.

Found it. Your `.env` defines `MONGODB_URI`, but the code reads `MONGO_URI` — so `mongoose.connect(undefined)` fails. I'll make the code accept both.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/scripts/seed-admin.js",
  "offset": 40,
  "limit": 18
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/scripts/seed-admin.js</path>
<type>file</type>
<content>
40:   console.error('❌ Password must be at least 8 characters long.');
41:   process.exit(1);
42: }
43: 
44: const run = async () => {
45:   if (!process.env.MONGO_URI) {
46:     console.error('❌ MONGO_URI is not defined in backend/.env');
47:     process.exit(1);
48:   }
49: 
50:   try {
51:     await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
52:     console.log('🚀 Connected to MongoDB.');
53: 
54:     const existing = await User.findOne({ email });
55: 
56:     if (existing) {
57:       existing.name = name.trim();

(Showing lines 40-57 of 83. Use offset=58 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js",
  "offset": 30,
  "limit": 18
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js</path>
<type>file</type>
<content>
30:   const year = Number.isNaN(start.getFullYear()) ? new Date().getFullYear() : start.getFullYear();
31:   return `${year}-${year + 1}`;
32: };
33: 
34: const run = async () => {
35:   if (!process.env.MONGO_URI) {
36:     console.error('❌ MONGO_URI is not defined in backend/.env');
37:     process.exit(1);
38:   }
39: 
40:   try {
41:     await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
42:     console.log(`🚀 Connected to MongoDB (${APPLY ? 'APPLY' : 'DRY RUN'}).`);
43: 
44:     const academicYear = await computeAcademicYear();
45:     console.log(`📅 Academic year label: ${academicYear}\n`);
46: 
47:     // --- 1. Subject assignments from existing grades ---

(Showing lines 30-47 of 150. Use offset=48 to continue.)
</content>
```

---

## Assistant (Build · Big Pickle · 4.2s)

_Thinking:_

Now edit. Use `const uri = process.env.MONGODB_URI || process.env.MONGO_URI;` in each. In db.js directly.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/config/db.js",
  "oldString": "    // Force a strict timeout so it doesn't hang forever\n    await mongoose.connect(process.env.MONGO_URI, {\n      serverSelectionTimeoutMS: 5000 \n    });",
  "newString": "    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;\n    // Force a strict timeout so it doesn't hang forever\n    await mongoose.connect(uri, {\n      serverSelectionTimeoutMS: 5000 \n    });"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/scripts/seed-admin.js",
  "oldString": "  if (!process.env.MONGO_URI) {\n    console.error('❌ MONGO_URI is not defined in backend/.env');\n    process.exit(1);\n  }\n\n  try {\n    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });",
  "newString": "  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;\n  if (!uri) {\n    console.error('❌ MONGODB_URI (or MONGO_URI) is not defined in backend/.env');\n    process.exit(1);\n  }\n\n  try {\n    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js",
  "oldString": "  if (!process.env.MONGO_URI) {\n    console.error('❌ MONGO_URI is not defined in backend/.env');\n    process.exit(1);\n  }\n\n  try {\n    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });",
  "newString": "  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;\n  if (!uri) {\n    console.error('❌ MONGODB_URI (or MONGO_URI) is not defined in backend/.env');\n    process.exit(1);\n  }\n\n  try {\n    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 4.4s)

_Thinking:_

Now test connection. Run backend briefly. Need to be careful: it starts server on port. I can run with a timeout and see output. Use bash with timeout 15s `npm run backend`? That runs concurrently? No root script `npm run backend` runs dev with watch. Better run `node server.js` in backend with timeout. It will exit(1) on failure. Let's run `timeout 15 node server.js`. It might connect and then hang until timeout; output shows connected. Use env. Let's do it.

Now let me verify the connection works.

**Tool: bash**

**Input:**
```json
{
  "command": "timeout 12 node server.js",
  "workdir": "/home/sajidasim/school-management-system/backend",
  "timeout": 20000
}
```

**Output:**
```
◇ injected env (12) from .env // tip: ⌁ auth for agents [www.vestauth.com]
◇ injected env (0) from .env // tip: ⌘ suppress logs { quiet: true }
Server running in development mode on port 5000
💛 WARNING: Mongoose disconnected from MongoDB.
❌ CRITICAL DATABASE ERROR: bad auth : authentication failed

```

---

## Assistant (Build · Big Pickle · 5.6s)

_Thinking:_

Now it's a different error: bad auth. So the URI is being read now, but authentication failed. The credentials are wrong. Could be special characters in password not URL-encoded, or wrong password/user. Let me check the password portion (masked earlier). We saw user `sajidasimschoolproject_506`. The password is masked. Need to check for special chars like @, :, /, #, % that need percent-encoding. Let me inspect safely by extracting password characters' classes without printing? I can compute whether password contains reserved chars. Use node or shell to parse and report categories. Avoid printing secret.

Let me run a command that extracts the password between ':' and '@' and reports length and which reserved characters present, and whether it looks percent-encoded. Careful: if password contains '@', naive split may misparse. Use node with URL parsing? Node's new URL would parse and give username/password percent-decoded, but if unencoded special char breaks parse. Let's write a small node -e to read .env, regex mongodb+srv://([^:]+):(.*)@([^/]+), then check password for chars in [@:/?#%] and length. Print only boolean/counts.

Also check if the password maybe has a `$` or other. Let's do.

Progress — the URI is now read, but Atlas rejects the credentials (`bad auth`). Let me check if the password contains characters that must be URL-encoded.

**Tool: bash**

**Input:**
```json
{
  "command": "node -e '\nconst fs=require(\"fs\");\nconst env=fs.readFileSync(\".env\",\"utf8\");\nconst line=env.split(/\\r?\\n/).find(l=>l.startsWith(\"MONGODB_URI=\"));\nconst val=line.slice(\"MONGODB_URI=\".length);\nconst m=val.match(/^mongodb\\+srv:\\/\\/([^:]+):(.*)@([^/]+)/);\nif(!m){console.log(\"URI did not parse as user:pass@host\");process.exit(0);}\nconst [,user,pass,host]=m;\nconsole.log(\"user:\",user);\nconsole.log(\"password length:\",pass.length);\nconst reserved=[...pass].filter(c=>\"@:/?#[]% \".includes(c));\nconsole.log(\"reserved chars present:\",JSON.stringify(reserved));\nconsole.log(\"host:\",host);\nconsole.log(\"percent-encoded sequences:\",(pass.match(/%[0-9A-Fa-f]{2}/g)||[]).length);\n'",
  "workdir": "/home/sajidasim/school-management-system/backend"
}
```

**Output:**
```
user: sajidasimschoolproject_506
password length: 16
reserved chars present: []
host: schoolmanagement.kn1plrt.mongodb.net
percent-encoded sequences: 0

```

---

## Assistant (Build · Big Pickle · 5.8s)

_Thinking:_

Password has no reserved chars, 16 chars. So likely the password is simply wrong, or the DB user doesn't exist / wrong cluster. Could also be that the user needs to set IP allowlist, but that gives a different error (timeout/connection). "bad auth" specifically means credentials invalid.

Possible causes:
1. Wrong password (typo / changed in Atlas).
2. Database user created in a different project/cluster.
3. Auth mechanism mismatch (rare).
4. Password contains characters not shown? No.
5. The `.env` value may have quotes or trailing whitespace. Check for quotes/trailing. Let me check. Also check if there's another MONGODB_URI line, or comments. Let me inspect trimmed value structure without password. Check if value wrapped in quotes, trailing whitespace, CR. Also check number of MONGODB_URI lines.

Also the URI might have `retryWrites=true&w=majority` fine.

Let me check for quotes/whitespace and duplicate definitions.

**Tool: bash**

**Input:**
```json
{
  "command": "node -e '\nconst fs=require(\"fs\");\nconst env=fs.readFileSync(\".env\",\"utf8\");\nconst lines=env.split(/\\r?\\n/);\nconst matches=lines.map((l,i)=>({l,i})).filter(x=>/^MONGODB_URI\\s*=/.test(x.l));\nconsole.log(\"MONGODB_URI lines:\",matches.length);\nfor(const {l,i} of matches){\n  const v=l.slice(l.indexOf(\"=\")+1);\n  console.log(`line ${i+1}: startsQuote=${/^[\"\\x27]/.test(v)} endsQuote=${/[\"\\x27]$/.test(v)} trailingSpace=${/\\s$/.test(v)} hasCR=${/\\r/.test(v)} len=${v.length}`);\n}\nconsole.log(\"MONGO_URI lines:\",lines.filter(l=>/^MONGO_URI\\s*=/.test(l)).length);\n'",
  "workdir": "/home/sajidasim/school-management-system/backend"
}
```

**Output:**
```
MONGODB_URI lines: 1
line 2: startsQuote=false endsQuote=false trailingSpace=false hasCR=false len=139
MONGO_URI lines: 0

```

---

## Assistant (Build · Big Pickle · 5.6s)

_Thinking:_

So URI clean. The "bad auth" means Atlas is rejecting username/password. Since URI is well-formed, likely the credentials are wrong. Could also be that the DB user's password was changed, or user was created under a different cluster. I should tell user next steps: verify Database Access user in Atlas, reset password, ensure cluster host matches, and URL-encode. Also check IP access list — but bad auth vs timeout.

We can test with mongosh if installed to confirm same error. Not necessary.

Let me also ensure I'm not missing something: Mongoose v9? Maybe the installed version is 9.9.4 which could be nonexistent? Let me check node_modules/mongoose/package.json version. If mongoose 9 has some auth changes. Also `mongodb+srv` requires DNS SRV lookups. bad auth definitely credentials.

Wait—maybe the issue: the cluster's user is `sajidasimschoolproject_506` but Atlas username might include characters? Fine.

I'll report diagnosis and ask them to check/reset credentials. Since user said "my URI is correct", point out the real error is authentication, not the URI. Offer to test after they reset. Keep concise but detailed enough.

I should mention I fixed the env var mismatch. Give steps. Under 4 lines? The guidance says concise. But this needs a bit of explanation. I'll keep it short with bullets.

Two issues found:

1. **Fixed:** `.env` defines `MONGODB_URI`, but the code read `MONGO_URI`. I updated `config/db.js`, `scripts/seed-admin.js`, and `scripts/backfillAssignments.js` to accept either.
2. **Still failing:** Atlas now says `bad auth : authentication failed`. Your URI is well-formed (user `sajidasimschoolproject_506`, no special chars, correct host), so the credentials themselves are being rejected.

Next steps in Atlas:
- **Database Access** → confirm user `sajidasimschoolproject_506` exists in this exact project/cluster.
- Reset its password and paste the new one into `.env` (if it contains `@ : / ? # %`, URL-encode it).
- **Network Access** → ensure your IP is allow-listed (that usually gives a timeout, not `bad auth`, but worth checking).

Want me to re-test once you update the password?

---

## User

this problem is fixed now add docs folder files  like PRD.md , Architecture.MD , DEsign.MD , MEMORy.MD , Rules.MD , TRACKER.MD

---

## Assistant (Build · Big Pickle · 6.9s)

_Thinking:_

The user wants me to add docs folder files: PRD.md, Architecture.MD, Design.MD, MEMORY.MD, Rules.MD, TRACKER.MD. They want documentation for the project. I should explore the codebase thoroughly to write accurate docs. This is a substantial task. Let me create a todo list and explore.

Let me understand the project: school management system, backend Express/Mongoose, frontend React/Vite. I need to inspect routes, models, auth, pages, configs, README. I should read README, frontend package.json, vite config, models, routes, controllers, api.js, nav, App.jsx, AuthContext, key pages.

I'll use parallel exploration with the explore agent or read directly. Given docs need accuracy, I'll read key files. Let me start with a broad set of reads/greps.

I'll create docs folder and files. Need to gather enough info:
- README
- backend models (User, Student, Teacher, Attendance, Notice, Assignment, Gradebook, SchoolConfig, PublicModels)
- backend routes list & endpoints
- controllers authController
- middleware auth, csrf, validate, sanitize
- services payment, cloudinary
- frontend structure, routes, api
- scripts

Let me launch parallel reads. Use task explore for a comprehensive summary maybe more efficient. But I can read files directly; there are ~30. Let me use explore agent with a detailed prompt to map the codebase, plus read README and package files myself.

Actually the task tool explore returns summary, saves context. Let me delegate three explorations in parallel: backend API/models; frontend routes/pages; auth/security/payments. Then read README and key configs directly.

Let me do that.

I'll explore the codebase to write accurate docs. Let me set up a plan and dig in.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Explore backend models, routes, and controllers",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Explore frontend routes, pages, and API layer",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Explore auth, security, payments, and config",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Create docs/PRD.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/Architecture.MD",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/Design.MD",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/MEMORY.MD",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/Rules.MD",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/TRACKER.MD",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore backend models, routes, and controllers",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Explore frontend routes, pages, and API layer",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Explore auth, security, payments, and config",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Create docs/PRD.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/Architecture.MD",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/Design.MD",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/MEMORY.MD",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/Rules.MD",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/TRACKER.MD",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Big Pickle · 294.0s)

**Tool: task**

**Input:**
```json
{
  "description": "Map backend API and models",
  "subagent_type": "explore",
  "prompt": "Explore the backend of the school management system at /home/sajidasim/school-management-system/backend. Be very thorough. I am writing architecture docs, so I need precise, factual details.\n\nReport back:\n1. Every Mongoose model in backend/models: file, schema fields with types/defaults/enums/refs, indexes, methods/hooks, and what each model represents.\n2. Every route file in backend/routes: base path (from server.js), and a table of endpoints (METHOD path, auth/role middleware if any, controller/handler, purpose). Include request/response shape only where obvious.\n3. Controllers in backend/controllers and key logic (registration/login, 2FA, password, profile, etc.).\n4. Utils and scripts: purpose of each file.\n5. Any middleware behavior relevant to API (auth/roles, csrf, sanitize, validate).\n6. How roles work (exact role names/values) and which routes each role can access.\n\nDo NOT modify any files. Return a structured, detailed summary with file paths and line references where useful. Do not include secrets."
}
```

**Output:**
```
<task id="ses_e9886d43dffeTx2Q9Ofa8kXGgp" state="completed">
<task_result>
# Backend Architecture Report

Root: `/home/sajidasim/school-management-system/backend`  
Stack: Node.js + Express 5 + Mongoose 9 + MongoDB, Zod validation, JWT cookie sessions, TOTP 2FA, Cloudinary uploads.

> Note: I only read files. No files were modified. The repo already had uncommitted changes in `backend/config/db.js`, `backend/scripts/backfillAssignments.js`, and `backend/scripts/seed-admin.js` before this exploration.

---

## 0. Server bootstrap and global routing

File: `/home/sajidasim/school-management-system/backend/server.js`

- Loads `.env` from `backend/.env` (line 22).
- Refuses to start without `JWT_SECRET` (lines 26-29); rejects secrets shorter than 32 chars in production (lines 32-39).
- Warns if sandbox payments are used in production (lines 40-42).
- Disables `x-powered-by` (line 45); optional `trust proxy` when `TRUST_PROXY=true` (line 49).
- Helmet with explicit CSP, HSTS in production, `frameAncestors: none`, Cloudinary image allowances (lines 52-74).
- CORS allow-list from `CLIENT_URL`; allows requests with no Origin; allows credentials; permitted headers include `Content-Type`, `Authorization`, `x-admin-password`, `X-CSRF-Token` (lines 77-95).
- JSON and URL-encoded body limit: `2mb` (lines 99-100); cookie parser (line 101).
- Global NoSQL sanitizer (line 104).
- CSRF init on all responses, CSRF protection on all `/api` mutations (lines 107-108).
- Rate limits:
  - Global `/api`: 300 requests / 15 min (lines 111-116, 124).
  - `/api/auth/login`, `/api/auth/register`, `/api/auth/2fa/verify`: 20 / 15 min (lines 117-127).
  - `/api/public/apply`, `/api/public/pay-admission`: 20 / 15 min (lines 131-139).
- Connects to MongoDB via `config/db.js` (line 154).
- Route mounts (lines 157-165):
  - `/api/auth` → `authRoutes`
  - `/api/attendance` → `attendanceRoutes`
  - `/api/notices` → `noticeRoutes`
  - `/api/teacher` → `teacherRoutes`
  - `/api/grades` → `gradebookRoutes`
  - `/api` → `assignmentRoutes` (supplies `/api/admin/assignments...` and `/api/teacher/my-*`)
  - `/api/config` → `configRoutes`
  - `/api/student` → `studentRoutes`
  - `/api/public` → `publicRoutes`
- In production serves `frontend/dist` and SPA fallback (lines 169-176).
- `GET /` health/test text route (lines 183-185).
- 404 JSON handler: `{ success:false, message:'Resource not found.' }` (lines 188-190).
- Central error handler hides internal errors as `Internal server error.` unless status 400 (lines 194-201).
- Listens on `PORT` or `5000` (lines 204-207).

Important ordering detail: `teacherRoutes` is mounted before `assignmentRoutes` at `/api`, so `/api/teacher/*` first passes through `teacherRoutes`; unmatched paths such as `/api/teacher/my-assignments` fall through to `assignmentRoutes`.

---

## 1. Mongoose models

### 1.1 `User`
File: `/home/sajidasim/school-management-system/backend/models/User.js`

Represents the authentication identity for all roles. Role-specific profile data lives in `Student` or `Teacher`.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `name` | String | required | |
| `email` | String | required, `unique: true` | Regex email validation (lines 14-17) |
| `password` | String | required, `minlength: 8`, `select: false` | Excluded by default |
| `role` | String | enum `['admin','teacher','student','parent']`, default `'student'` | |
| `profileImage` | String | default `""` | Base64 data URL or URL |
| `twoFactorEnabled` | Boolean | default `false` | |
| `twoFactorSecret` | String | default `""`, `select: false` | TOTP secret |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique index on `email` (from `unique: true`).
- Unique index on nothing else.

Hooks/methods:
- `pre('save')` hashes `password` with bcrypt salt rounds 12 only when modified (lines 46-59).
- Instance method `matchPassword(enteredPassword)` uses `bcrypt.compare` (lines 63-65).
- `toJSON` transform strips `password` and `twoFactorSecret` (lines 69-75).

---

### 1.2 `Student`
File: `/home/sajidasim/school-management-system/backend/models/Student.js`

Role-specific student profile linked 1:1 to a `User`.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `userId` | ObjectId | required, `ref: 'User'`, `unique: true` | One profile per user |
| `studentId` | String | default function `` `STU-${Date.now().toString().slice(-4)}` `` | Not unique |
| `rollNumber` | Number | required | Class roll |
| `gradeClass` | String | default `'Unassigned'` | |
| `parentContact` | String | default `''` | |
| `guardianName` | String | default `''` | |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique compound index `{ gradeClass: 1, rollNumber: 1 }` (line 35).

Hooks/methods: none.

---

### 1.3 `Teacher`
File: `/home/sajidasim/school-management-system/backend/models/Teacher.js`

Role-specific teacher profile linked 1:1 to a `User`.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `userId` | ObjectId | required, `ref: 'User'`, `unique: true` | One profile per user |
| `teacherId` | String | required, `unique: true`, trim | Custom ID |
| `department` | String | default `'General Education'` | |
| `qualification` | String | default `''` | |
| `classTeacherOf` | String | default `'None'`, trim | Legacy class-teacher field; `Assignment` is the newer source of truth |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique `userId`; unique `teacherId`.

Hooks/methods: none.

---

### 1.4 `Assignment`
File: `/home/sajidasim/school-management-system/backend/models/Assignment.js`

Teacher ↔ subject ↔ class assignment. Drives teacher authorization. `subject: null` represents a class-teacher assignment (attendance/roster/analytics/publish rights, but not grading). Grading requires a subject row.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `teacher` | ObjectId | required, `ref: 'User'` | User with role `teacher` |
| `subject` | String | default `null`, trim | `null` = class-teacher-only assignment |
| `class` | String | required, trim | Matches `SchoolConfig.classes` / `Student.gradeClass` |
| `academicYear` | String | default `''`, trim | e.g. `"2025-2026"` |
| `isClassTeacher` | Boolean | default `false` | |
| `createdBy` | ObjectId | `ref: 'User'` | |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique compound `{ teacher: 1, subject: 1, class: 1, academicYear: 1 }` (lines 40-43).

Hooks/methods: none.

---

### 1.5 `Attendance`
File: `/home/sajidasim/school-management-system/backend/models/Attendance.js`

One attendance sheet per class per day.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `classId` | String | required | Class/grade identifier |
| `date` | Date | required, default `Date.now` | Normalized to midnight by routes |
| `records` | Array | | Subdocuments |
| `records[].studentId` | ObjectId | required, `ref: 'User'` | References User, not Student |
| `records[].status` | String | enum `['Present','Absent','Late']`, default `'Present'` | |
| `submittedBy` | ObjectId | required, `ref: 'User'` | Teacher who submitted |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique compound `{ classId: 1, date: 1 }` (line 36).

Hooks/methods: none.

---

### 1.6 `Gradebook`
File: `/home/sajidasim/school-management-system/backend/models/Gradebook.js`

One grade row per student/class/term/subject.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `studentId` | ObjectId | required, `ref: 'User'` | References User |
| `classId` | String | required | |
| `term` | String | required | e.g. `"Mid-Term Exam"` |
| `subject` | String | required | |
| `marksObtained` | Number | required, min 0, max 100 | |
| `letterGrade` | String | default `'F'` | Auto-calculated |
| `isPublished` | Boolean | default `false` | Hidden draft by default |
| `submittedBy` | ObjectId | required, `ref: 'User'` | Teacher |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes:
- Unique compound `{ studentId: 1, classId: 1, term: 1, subject: 1 }` (line 46).

Hooks/methods:
- `pre('save')` computes `letterGrade` from marks: `>=90 A+`, `>=80 A`, `>=70 B`, `>=60 C`, `>=50 D`, else `F` (lines 49-58).

---

### 1.7 `Notice`
File: `/home/sajidasim/school-management-system/backend/models/Notice.js`

Institutional announcement/notice.

| Field | Type | Required/default/enum/ref | Notes |
|---|---|---|---|
| `title` | String | required | |
| `content` | String | required | |
| `targetAudience` | String | enum `['all','student','teacher']`, default `'all'` | |
| `attachmentUrl` | String | default `''` | Cloudinary URL |
| `submittedBy` | ObjectId | required, `ref: 'User'` | |
| `createdAt`/`updatedAt` | Date | timestamps | |

Indexes: none beyond `_id`.

Hooks/methods: none.

---

### 1.8 `SchoolInfo` and `Application` (same file)
File: `/home/sajidasim/school-management-system/backend/models/PublicModels.js`  
Exports `SchoolInfo` and `Application`. `FounderSchema` is an embedded subdocument, not a standalone model.

#### Embedded `FounderSchema`
| Field | Type | Required/default |
|---|---|---|
| `name` | String | required |
| `designation` | String | required |
| `quote` | String | required |
| `image` | String | default `""` |

#### `SchoolInfo`
Public website/school profile singleton.

| Field | Type | Required/default/enum/ref |
|---|---|---|
| `welcomeTitle` | String | default `"Welcome to Institutional Excellence"` |
| `aboutText` | String | default `"Providing top-tier educational frameworks and global curriculum standard structures."` |
| `schoolLogo` | String | default `""` |
| `bannerImage` | String | default `""` |
| `admissionFeeAmount` | Number | default `500`, min `0`, max `1000000` |
| `founders` | `[FounderSchema]` | array |
| `createdAt`/`updatedAt` | Date | timestamps |

Indexes: none.

#### `Application`
Public admission application.

| Field | Type | Required/default/enum/ref |
|---|---|---|
| `studentNameEn` | String | required |
| `studentNameBn` | String | required |
| `targetClass` | String | required |
| `dateOfBirth` | Date | required |
| `birthCertificateNo` | String | required |
| `emailAddress` | String | required |
| `fatherNameEn` | String | required |
| `fatherNameBn` | String | required |
| `fatherNid` | String | optional |
| `motherNameEn` | String | required |
| `motherNameBn` | String | required |
| `motherNid` | String | optional |
| `parentPhone` | String | required |
| `guardianNameEn` | String | optional |
| `guardianNameBn` | String | optional |
| `guardianPhone` | String | optional |
| `payableAmount` | Number | default `500` |
| `paidAmount` | Number | default `0` |
| `paymentStatus` | String | default `'Unpaid'` |
| `paymentMethod` | String | optional |
| `paymentTxnId` | String | optional |
| `paymentProvider` | String | optional |
| `paymentVerifiedAt` | Date | optional |
| `applicationStatus` | String | enum `['Pending','Approved','Rejected']`, default `'Pending'` |
| `createdAt`/`updatedAt` | Date | timestamps |

Indexes: none.

---

### 1.9 `SchoolConfig`
File: `/home/sajidasim/school-management-system/backend/models/SchoolConfig.js`

Singleton-like global configuration.

| Field | Type | Required/default |
|---|---|---|
| `classes` | `[String]` | default `['Grade 10-A','Grade 10-B','Grade 11-A']` |
| `subjects` | `[String]` | default `['Science','Mathematics','English']` |
| `examTerms` | `[String]` | default `['Mid-Term Exam','Final Exam']` |
| `sessionStartDate` | Date | default January 1 of current year |
| `weeklyOffDays` | `[Number]` | default `[5,6]` (Friday/Saturday; JS day indexes) |
| `holidays` | `[String]` | default `[]`, expected `"YYYY-MM-DD"` |
| `createdAt`/`updatedAt` | Date | timestamps |

Indexes: none.

---

## 2. Routes

All endpoints below are prefixed as mounted in `server.js`. Unless noted, success responses follow `{ success: true, data: ... }` or `{ success:true, message: ... }`; errors are `{ success:false, message: ... }`.

### 2.1 `authRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/authRoutes.js`  
Base: `/api/auth`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| POST | `/register` | Public; `validate(register)` | `registerUser` controller | Self-registration; always creates `parent`; sets session cookie; 201 `{ success, user }` |
| POST | `/login` | Public; `validate(login)` | `loginUser` controller | Password login; may return `twoFactorRequired:true` with preauth cookie |
| GET | `/me` | `protect` | `getMe` controller | Return current safe user |
| POST | `/logout` | `protect` | `logoutUser` controller | Clears `token` and `preauth` cookies |
| POST | `/2fa/setup` | `protect` | `setupTwoFactor` controller | Generate TOTP secret/QR; does not enable yet |
| POST | `/2fa/verify` | `softAuth`; `validate(twoFactorVerify)` | `verifyTwoFactor` controller | Completes login with preauth cookie, or enables 2FA for logged-in user |
| POST | `/2fa/disable` | `validate(twoFactorVerify)` then `protect` | `disableTwoFactor` controller | Confirm current TOTP code and disable 2FA |
| PUT | `/profile` | `protect`; `validate(profile)` | inline (lines 38-66) | Update `name`, `email`, `profileImage`; returns safe fields |
| GET | `/dashboard-stats` | `protect`, `admin` | inline (lines 71-95) | Counts students, teachers, notices, pending student tasks |
| GET | `/users` | `protect`, `admin` | inline (lines 97-181) | List users with teacher/student profile joins; optional `role`, `search` query; no password |
| POST | `/users/create` | `protect`, `admin` or `teacher`; `validate(createUser)` | inline (lines 186-245) | Admin can create any role; teacher may create only `student` and only into a class they are class-teacher of |
| GET | `/users/:id` | `protect`, `admin`; `validate(idParam,'params')` | inline (lines 248-312) | Aggregated single user + role profile |
| PATCH | `/users/:id/role` | `protect`, `admin`; `validate(idParam,'params')`, `validate(changeRole)` | inline (lines 315-334) | Change role; returns safe user |
| DELETE | `/users/teacher/:id` | `protect`, `admin`; `validate(idParam,'params')`, `validate(deleteGuard)` | inline (lines 339-376) | Admin password required; deletes user; handles Student cascade + roll reindex if target is student |
| PUT | `/users/:id/credentials` | `protect`, `admin`; `validate(idParam,'params')`, `validate(updateCredentials)` | inline (lines 379-422) | Reset password and upsert Student/Teacher profile fields |

Request shapes (Zod):
- `register`: `{ name, email, password }`
- `login`: `{ email, password }`
- `profile`: optional `{ name, email, profileImage }`
- `createUser`: `{ name, email, password, role, customId?, extraField1?, extraField2?, rollNumber?, guardianName?, classTeacherOf? }`
- `changeRole`: `{ role }`
- `deleteGuard` / `passwordCheck`: `{ password }`
- `twoFactorVerify`: `{ code: "123456" }`

---

### 2.2 `attendanceRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/attendanceRoutes.js`  
Base: `/api/attendance`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| POST | `/` | `protect`, `teacher` or `admin`; `validate(submitAttendance)` | inline (lines 12-38) | Upsert daily class attendance by `{ classId, date, records }`; teacher must have class-teacher access |
| GET | `/:classId` | `protect`, `admin` or `teacher`; `validate(classParam,'params')` | inline (lines 43-59) | Attendance history for class, records populated with student name/email; teacher scope enforced |

Request:
- POST body `{ classId, date, records: [{ studentId, status: 'Present'|'Absent'|'Late' }] }`
- Response `{ success:true, data: <Attendance doc> }`

---

### 2.3 `assignmentRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/assignmentRoutes.js`  
Base: `/api` (mounted at `/api` in server.js)

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| POST | `/admin/assignments` | `protect`, `admin`; `validate(assignmentCreate)` | inline (lines 26-54) | Create assignment; validates target user is a teacher; blank subject becomes `null`; auto academic year if omitted |
| GET | `/admin/assignments` | `protect`, `admin`; `validate(assignmentQuery,'query')` | inline (lines 59-78) | List/filter assignments; populates teacher name/email/role |
| PATCH | `/admin/assignments/:id` | `protect`, `admin`; `validate(idParam,'params')`, `validate(assignmentUpdate)` | inline (lines 83-104) | Update subject/year/class-teacher flag |
| DELETE | `/admin/assignments/:id` | `protect`, `admin`; `validate(idParam,'params')` | inline (lines 109-119) | Delete assignment |
| GET | `/teacher/my-assignments` | `protect`, `teacher` | inline (lines 124-131) | Return logged-in teacher's assignment rows |
| GET | `/teacher/my-scope` | `protect`, `teacher` | inline (lines 136-178) | Return classes, class-teacher classes, subject pairs, assignments, and students grouped by class |

Notes:
- `computeAcademicYear` derives `"YYYY-YYYY+1"` from `SchoolConfig.sessionStartDate` (lines 16-21).
- Duplicate-key errors (Mongo code `11000`) return 400 with a friendly message.
- These `/api/teacher/my-*` endpoints are served by the router mounted at `/api`, not `/api/teacher`.

---

### 2.4 `configRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/configRoutes.js`  
Base: `/api/config`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| GET | `/` | Public | inline (lines 10-18) | Get singleton config; creates defaults if missing |
| POST | `/update` | `protect`, `admin`; `validate(configUpdate)` | inline (lines 22-34) | Replace `classes`, `subjects`, `examTerms` arrays |
| POST | `/toggle-offday` | `protect`, `admin` or `teacher`; `validate(toggleOffDay)` | inline (lines 37-55) | Toggle a weekday index 0-6 in `weeklyOffDays` |
| POST | `/toggle-holiday` | `protect`, `admin` or `teacher`; `validate(toggleHoliday)` | inline (lines 58-74) | Toggle a `YYYY-MM-DD` date in `holidays` |

---

### 2.5 `gradebookRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/gradebookRoutes.js`  
Base: `/api/grades`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| GET | `/class/:classId/subject/:subjectName/term/:termName` | `protect`, `teacher` or `admin`; `validate(spreadsheetParams,'params')`; `requireAssignment()` | inline (lines 13-44) | Class roster + existing marks for class/subject/term; teacher needs matching subject+class assignment; admin bypasses |
| POST | `/bulk-submit` | `protect`, `teacher` or `admin`; `validate(bulkSubmit)`; `requireAssignment()` | inline (lines 49-97) | Upsert marks for many students; rejects student IDs not enrolled in the class |
| POST | `/toggle-publish` | `protect`, `teacher`; `validate(togglePublish)`; `requireAssignment({ requireSubject:false })` | inline (lines 101-115) | Publish/unpublish all grade rows for a class+term; teacher must be class-teacher of class; admins are not allowed by `authorizeRoles('teacher')` |

Request examples:
- Bulk submit: `{ classId, subject, term, scores: [{ studentId, marksObtained }] }`
- Toggle publish: `{ classId, term, publishState: boolean }`

---

### 2.6 `noticeRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/noticeRoutes.js`  
Base: `/api/notices`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| POST | `/` | `protect`, `admin`; `upload.single('pdfFile')`; `validate(createNotice)` | inline (lines 32-74) | Create notice; optional PDF only, max 10 MB; streams to Cloudinary `school_notices` as raw |
| GET | `/` | `protect` (any authenticated role) | inline (lines 78-91) | Filtered notices: student sees `all/student`; teacher sees `all/student/teacher`; admin and parent see all |
| POST | `/verify-admin-password` | `protect`, `admin`; `validate(passwordCheck)` | inline (lines 95-109) | Check admin password before destructive action |
| DELETE | `/:id` | `protect`, `admin`; `validate(idParam,'params')` + `x-admin-password` header | inline (lines 113-144) | Verify admin password, delete notice, best-effort Cloudinary cleanup |

Upload constraints:
- Multer memory storage, MIME must be `application/pdf`, max 10 MB, single file (lines 16-29).

---

### 2.7 `publicRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/publicRoutes.js`  
Base: `/api/public`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| GET | `/info` | Public | inline (lines 45-53) | Get school public info/founders; creates defaults if missing |
| POST | `/info/update` | `protect`, `admin`; `upload.fields([{name:'logo'},{name:'banner'}])`; `validate(infoUpdate)` | inline (lines 57-75) | Update welcome/about/admission fee; upload logo/banner to Cloudinary |
| POST | `/founder/add` | `protect`, `admin`; `upload.single('founderPhoto')`; `validate(founderAdd)` | inline (lines 79-91) | Append founding member with optional image |
| DELETE | `/founder/:founderId` | `protect`, `admin`; `validate(founderIdParam,'params')` | inline (lines 95-105) | Remove founder subdocument |
| POST | `/apply` | Public; `validate(admissionApply)` + server public-write limiter | inline (lines 108-168) | Create admission application. Server sets fee from `SchoolInfo.admissionFeeAmount`; validates target class against `SchoolConfig.classes`; explicit payload allow-list; response `{ applicationId, payableAmount }` |
| POST | `/pay-admission/:appId` | Public; `validate(appIdParam,'params')`, `validate(payAdmission)` + limiter | inline (lines 173-210) | Idempotent admission payment; server verifies via payment adapter; 409 if already paid; 503 if provider unavailable |
| GET | `/applications` | `protect`, `admin` | inline (lines 213-218) | List all applications newest first |
| PATCH | `/application/:appId` | `protect`, `admin`; `validate(appIdParam,'params')`, `validate(applicationPatch)` | inline (lines 222-248) | Update `applicationStatus` and/or `paymentStatus`; optionally sends SMTP email |

Upload constraints: images only (`jpeg/png/webp/gif`), max 5 MB per file, max 2 files (lines 17-31).

Payment patch constraint: admin may set `paymentStatus` only to `'Unpaid'` or `'Waived'`, not `'Paid'`; `'Paid'` can only result from the payment adapter flow (`middleware/validate.js:190-196`).

---

### 2.8 `studentRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/studentRoutes.js`  
Base: `/api/student`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| GET | `/my-records` | `protect`, `student` | inline (lines 14-84) | Student's profile, current-year attendance summary, published grades only |
| GET | `/my-attendance-calendar` | `protect`, `student`; `validate(heatmapQuery,'query')` | inline (lines 89-171) | Month personal logs + cumulative year attendance + configured off-days/holidays |

Attendance percentage formula: `(present + late*0.5) / totalSessions * 100`, rounded to 1 decimal; defaults to 100 if no sessions.

---

### 2.9 `teacherRoutes.js`
File: `/home/sajidasim/school-management-system/backend/routes/teacherRoutes.js`  
Base: `/api/teacher`

| Method | Path | Auth / role | Handler | Purpose / notes |
|---|---|---|---|---|
| GET | `/my-class` | `protect`, `teacher` | inline (lines 17-62) | Teacher's class roster; optional `?classId=`; must be one of teacher's class-teacher classes |
| POST | `/attendance` | `protect`, `teacher`; `validate(teacherSubmitAttendance)` | inline (lines 67-97) | Upsert attendance for class-teacher class; class from body or default scope |
| GET | `/attendance-calendar-heatmap/:classId` | `protect`, `teacher` or `admin`; `validate(classParam,'params')`, `validate(heatmapQuery,'query')` | inline (lines 101-151) | Submitted attendance dates for month + off-days/holidays/session start; class scope check |
| GET | `/attendance-by-date/:classId` | `protect`, `teacher` or `admin`; `validate(classParam,'params')`, `validate(byDateQuery,'query')` | inline (lines 157-185) | Existing attendance records for class/date |
| GET | `/attendance-analytics/:classId` | `protect`, `teacher` or `admin`; `validate(classParam,'params')` | inline (lines 191-294) | Yearly per-student attendance aggregation with roll numbers |
| PUT | `/users/edit/:id` | `protect`, `teacher`; `validate(idParam,'params')`, `validate(teacherEditStudent)` | inline (lines 301-347) | Edit student profile/roll; cannot move to class outside scope; roll conflict check |
| DELETE | `/users/delete/:id` | `protect`, `teacher`; `validate(idParam,'params')`, `validate(deleteGuard)` | inline (lines 352-390) | Teacher password required; deletes Student + User; reindexes rolls |

Teacher scope is enforced by `canAccessClass` in most endpoints. Admins bypass class scope in `canAccessClass`.

---

## 3. Controllers

There is exactly one controller file:

File: `/home/sajidasim/school-management-system/backend/controllers/authController.js`

All other route handlers are inline in the route files.

| Function | Lines | Key logic |
|---|---|---|
| `registerUser` | 28-59 | Validates `name`, email regex, password length; **public registration always creates role `parent`** (`SAFE_PUBLIC_ROLE`); normalizes email; rejects duplicates; creates user; sets HttpOnly `token` session cookie; returns safe user. |
| `loginUser` | 64-97 | Finds user by normalized email with `+password +twoFactorSecret`; bcrypt compare; if 2FA enabled and secret exists, sets short-lived `preauth` cookie (10 min) and returns `{ twoFactorRequired:true, user:{_id,name,email} }`; otherwise sets `token` cookie and returns safe user. |
| `getMe` | 102-104 | Returns `publicUser(req.user)`. |
| `logoutUser` | 109-112 | Calls `clearSessionCookie(res)`, which clears `token` and `preauth`; returns success. Comment mentions CSRF cookie but the helper does not clear `csrf`. |
| `setupTwoFactor` | 117-140 | Generates TOTP secret with label `SchoolPortal:<email>`; persists `twoFactorSecret`, keeps `twoFactorEnabled=false`; returns `secret`, `otpauthUrl`, QR data URL. |
| `verifyTwoFactor` | 145-200 | Two paths: (a) `preauth` cookie -> verify JWT purpose `'2fa'` -> load user secret -> on valid code swap preauth for real session cookie and clear preauth; (b) authenticated `req.user` -> on valid code permanently enable 2FA. TOTP verification uses `window:1`. |
| `disableTwoFactor` | 205-231 | Loads user with secret; verifies current TOTP; clears `twoFactorSecret` and sets `twoFactorEnabled=false`. |

`publicUser` (lines 16-23) returns only `_id`, `name`, `email`, `role`, `profileImage`, `twoFactorEnabled`. It never returns password or TOTP secret.

---

## 4. Utils, scripts, config, services

### `utils`
File: `/home/sajidasim/school-management-system/backend/utils/rolls.js`
- `reindexRollsAfterDelete(gradeClass, removedRoll)` (lines 8-21): after deleting a student, decrements every roll number greater than the removed one in the same class, processing ascending to avoid unique-index collisions. Used by admin and teacher deletion routes.

### `scripts`
File: `/home/sajidasim/school-management-system/backend/scripts/seed-admin.js`
- Bootstrap/promote an admin account.
- CLI flags: `--email`, `--password`, `--name`, `--reset-password`.
- Defaults: `admin@school.com`, `Super Admin`, auto-generated strong password.
- Uses `User` model so password is hashed by the pre-save hook.
- If account exists: promotes to `admin`; resets password only with `--reset-password` or `--password`.
- Reads `MONGODB_URI` or `MONGO_URI` from `backend/.env`.

File: `/home/sajidasim/school-management-system/backend/scripts/backfillAssignments.js`
- One-off, idempotent migration for the assignment-based authorization layer.
- Default dry run; `--apply` writes.
- Source 1: distinct `(submittedBy, classId, subject)` from `Gradebook` -> subject assignments.
- Source 2: `Teacher.classTeacherOf` values not `None`/empty/null -> `subject:null`, `isClassTeacher:true` assignments.
- Computes academic year from `SchoolConfig.sessionStartDate`.
- Uses bulk upserts against the unique assignment index; reports skipped/orphaned records.
- Reads `MONGODB_URI` or `MONGO_URI`.

### `config`
File: `/home/sajidasim/school-management-system/backend/config/db.js`
- `connectDB()`: connects using `MONGODB_URI` or `MONGO_URI`, `serverSelectionTimeoutMS: 5000`; on failure logs and exits process.

File: `/home/sajidasim/school-management-system/backend/config/cloudinary.js`
- Configures Cloudinary v2 from `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`; exports the configured SDK.

### `services`
File: `/home/sajidasim/school-management-system/backend/services/payment.js`
- Provider-agnostic admission payment adapter.
- `PROVIDER` from `PAYMENT_PROVIDER`, default `sandbox`; exports `isSandbox`.
- `sandbox` adapter returns `{ verified:true, amount: application.payableAmount, reference: txnId, method, provider:'sandbox', sandbox:true }` with no network call.
- `verifyPayment(ctx)` throws status 503 if provider is unknown, or if `sandbox` is used in production.
- Real-provider stub is commented out; contract is documented in the file.

### `package.json`
File: `/home/sajidasim/school-management-system/backend/package.json`
- Scripts: `start` (`node server.js`), `dev` (`node --watch server.js`), `seed:admin`.
- Dependencies include `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `zod`, `helmet`, `cors`, `express-rate-limit`, `cookie-parser`, `mongo-sanitize`, `speakeasy`, `qrcode`, `multer`, `cloudinary`, `nodemailer`, `dotenv`.

---

## 5. Middleware behavior relevant to the API

### Auth: `middleware/auth.js`
File: `/home/sajidasim/school-management-system/backend/middleware/auth.js`

- Session JWT lifetime: `process.env.JWT_EXPIRY || '8h'` (line 6).
- Preauth JWT lifetime: 10 minutes (line 7).
- Session token payload: `{ id, role, purpose:'session' }` (lines 10-13).
- Preauth token payload: `{ id, purpose:'2fa' }` (lines 16-17).
- Session cookie: `httpOnly:true`, `secure` only in production, `sameSite:'lax'`, `maxAge` 8h, `path:'/'` (lines 22-28).
- `clearSessionCookie` clears `token` and `preauth` (lines 30-43).
- `protect` (lines 47-86):
  - Reads `token` from HttpOnly cookie first, then `Authorization: Bearer ...`.
  - Rejects tokens whose `purpose` is not `'session'`.
  - Loads the user fresh from DB with `-password -twoFactorSecret`; rejects if account no longer exists.
  - Sets `req.user`.
- `softAuth` (lines 90-108): resolves `req.user` if a valid session exists, but never blocks anonymous requests. Used for `/api/auth/2fa/verify`.
- `authorizeRoles(...roles)` (lines 111-121): returns 403 unless `req.user.role` is in the allowed list.

### Assignment authorization: `middleware/assignments.js`
File: `/home/sajidasim/school-management-system/backend/middleware/assignments.js`

- `normalizeSubject(value)` (lines 10-14): trims; blank/undefined -> `null`.
- `getTeacherScope(userId)` (lines 24-48): returns
  - `assignments` from `Assignment.find({teacher})`
  - `classTeacherClasses` = union of `Assignment.isClassTeacher` classes and legacy `Teacher.classTeacherOf` (if not `None`)
  - `subjectPairs` from assignments with a non-null subject
  - `classes` = union of all assignment classes and class-teacher classes
  - `classTeacherOf` = legacy field
- `canAccessClass(user, classId)` (lines 52-58):
  - Admin: always true.
  - Teacher: true only if `classId` is in `classTeacherClasses`.
  - Others: false.
- `requireAssignment(options)` (lines 63-108):
  - Admin bypass.
  - Non-teacher: 403.
  - Requires a target class; blank -> 400.
  - If `requireSubject:false`, only class-teacher scope is checked.
  - Otherwise requires subject and a matching `Assignment` row for `{teacher, class, subject}`; sets `req.assignment`.
  - Default subject extractor: `req.body.subject ?? req.params.subjectName`; class: `req.body.classId ?? req.params.classId`.
- `findOutOfClassStudents(classId, studentIds)` (lines 112-118): returns IDs not enrolled in `classId`; used to prevent cross-class grade writes.

### CSRF: `middleware/csrf.js`
File: `/home/sajidasim/school-management-system/backend/middleware/csrf.js`

- Double-submit cookie pattern.
- `csrfInit` (lines 17-26): ensures a `csrf` cookie exists; cookie is `httpOnly:false` so the SPA can read it; 24h lifetime; `sameSite:'lax'`; `secure` in production.
- `csrfProtect` (lines 29-40): applies to all non-`GET`/`HEAD`/`OPTIONS` requests under `/api`; requires `X-CSRF-Token` header exactly matching the `csrf` cookie; otherwise 403 `"Security token verification failed."`.
- Consequence: even `POST /api/auth/login` and `/register` require the CSRF cookie/header.

### Sanitization: `middleware/sanitize.js`
File: `/home/sajidasim/school-management-system/backend/middleware/sanitize.js`

- Uses `mongo-sanitize` on `req.body`, `req.params`, and `req.query` (lines 7-24).
- Query handling uses `Object.defineProperty` because Express 5 exposes `req.query` via a getter (lines 11-23).
- Strips Mongo operator keys such as `$ne`, `$gt`, `$where`.

### Validation: `middleware/validate.js`
File: `/home/sajidasim/school-management-system/backend/middleware/validate.js`

- `validate(schema, source='body')` (lines 7-17): parses `req[source]` with Zod and replaces it with the parsed value. This strips unknown keys (mass-assignment defense). On failure returns generic 400 `"Invalid request payload."` without leaking schema details.
- Schemas defined (lines 20-200):
  - Auth: `register`, `login`, `profile`, `twoFactorVerify`
  - User management: `createUser`, `updateCredentials`, `changeRole`, `deleteGuard`
  - Notices: `createNotice`, `passwordCheck`, `idParam`
  - Attendance: `submitAttendance`, `teacherSubmitAttendance`, `classParam`, `heatmapQuery`, `byDateQuery`
  - Teacher student management: `teacherEditStudent`
  - Gradebook: `spreadsheetParams`, `bulkSubmit`, `togglePublish`
  - Assignments: `assignmentCreate`, `assignmentUpdate`, `assignmentQuery`
  - School config: `configUpdate`, `toggleOffDay`, `toggleHoliday`
  - Public website: `infoUpdate`, `founderAdd`, `founderIdParam`
  - Admissions: `admissionApply`, `payAdmission`, `appIdParam`, `applicationPatch`
- Notable constraints:
  - ObjectId params must match `/^[0-9a-fA-F]{24}$/`.
  - `bulkSubmit.scores` and attendance `records` capped at 2000 entries.
  - Marks coerced to number 0-100.
  - Admission `paymentStatus` admin patch limited to `['Unpaid','Waived']`.

### Upload middleware
- `noticeRoutes.js`: Multer memory storage, PDF only, 10 MB, 1 file.
- `publicRoutes.js`: Multer memory storage, JPEG/PNG/WEBP/GIF only, 5 MB per file, up to 2 files.

---

## 6. Roles and access control

### Exact role values
From `User` schema and Zod enums (`models/User.js:27`, `middleware/validate.js:43,58`):

- `admin`
- `teacher`
- `student`
- `parent`

Schema default is `student`, but public self-registration explicitly forces `parent` (`controllers/authController.js:36-48`). Admin user creation can set any of the four roles. Only an admin can change an existing user's role.

### Role-specific data model
- `admin`, `parent`: `User` only (no profile collection).
- `student`: `User` + `Student`.
- `teacher`: `User` + `Teacher` (+ `Assignment` rows).

### Access matrix

| Role | Access |
|---|---|
| **Public / anonymous** | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/2fa/verify` (with preauth cookie; anonymous allowed), `GET /api/config`, `GET /api/public/info`, `POST /api/public/apply`, `POST /api/public/pay-admission/:appId`, `GET /` |
| **Any authenticated role** (`admin`, `teacher`, `student`, `parent`) | `GET /api/auth/me`, `POST /api/auth/logout`, `POST /api/auth/2fa/setup`, `POST /api/auth/2fa/disable`, `PUT /api/auth/profile`, `GET /api/notices` |
| **student** | `GET /api/student/my-records`, `GET /api/student/my-attendance-calendar` |
| **parent** | No role-specific endpoints. Can use the "any authenticated" endpoints, including `GET /api/notices` (sees all notices because no audience filter is applied to non-student/non-teacher roles). |
| **teacher only** | `GET /api/teacher/my-class`, `POST /api/teacher/attendance`, `PUT /api/teacher/users/edit/:id`, `DELETE /api/teacher/users/delete/:id`, `POST /api/grades/toggle-publish`, `GET /api/teacher/my-assignments`, `GET /api/teacher/my-scope` |
| **teacher + admin** | `POST /api/attendance`, `GET /api/attendance/:classId`, `GET /api/grades/class/:classId/subject/:subjectName/term/:termName`, `POST /api/grades/bulk-submit`, `GET /api/teacher/attendance-calendar-heatmap/:classId`, `GET /api/teacher/attendance-by-date/:classId`, `GET /api/teacher/attendance-analytics/:classId`, `POST /api/config/toggle-offday`, `POST /api/config/toggle-holiday` |
| **admin only** | `GET /api/auth/dashboard-stats`, `GET /api/auth/users`, `GET /api/auth/users/:id`, `PATCH /api/auth/users/:id/role`, `DELETE /api/auth/users/teacher/:id`, `PUT /api/auth/users/:id/credentials`, `POST /api/auth/users/create` (also allows teacher with restrictions), `POST/PATCH/DELETE /api/admin/assignments...`, `POST /api/config/update`, `POST /api/notices`, `POST /api/notices/verify-admin-password`, `DELETE /api/notices/:id`, `POST /api/public/info/update`, `POST /api/public/founder/add`, `DELETE /api/public/founder/:founderId`, `GET /api/public/applications`, `PATCH /api/public/application/:appId` |
| **admin or teacher, with extra rules** | `POST /api/auth/users/create`: admin can create any role; teacher can create **only student** accounts and only in a class where they are class-teacher (`authRoutes.js:190-214`) |

### Assignment-based teacher restrictions
- `admin` bypasses all class-scope checks (`canAccessClass`, `requireAssignment`).
- `teacher` class-level access requires being a class teacher of that class via `Assignment.isClassTeacher` or legacy `Teacher.classTeacherOf`.
- `teacher` grading access additionally requires an explicit `Assignment` row matching teacher + class + subject. A class-teacher-only assignment (`subject:null`) does **not** grant grading access.
- `toggle-publish` uses `requireAssignment({requireSubject:false})`, so a class teacher may publish a class+term, but the route is still restricted to role `teacher`; admins cannot call it.

### Notable gaps / factual observations
- No `Parent` model or parent-specific routes exist; parents only get generic auth/profile/notices access.
- `GET /api/notices` applies audience filters only for `student` and `teacher`; `admin` and `parent` receive all notices.
- `DELETE /api/auth/users/teacher/:id` is named for teachers but handles student deletion with roll reindex; for other roles it attempts `Teacher.deleteOne({userId})` then deletes the `User`.
- `logoutUser` clears `token` and `preauth`, but not the `csrf` cookie despite the comment mentioning it.
- Student and Teacher profile creation in `POST /api/auth/users/create` is not transactional; a profile-create failure could leave a `User` without its role profile.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Map frontend routes and pages",
  "subagent_type": "explore",
  "prompt": "Explore the frontend of the school management system at /home/sajidasim/school-management-system/frontend. Be very thorough. I am writing product/design docs, so I need precise factual details.\n\nReport back:\n1. Framework/tooling and versions from package.json, vite.config.js, eslint config.\n2. Routing: all routes in App.jsx (path, component, layout, protected/role guard), route groups for public/auth/admin/teacher/student/parent.\n3. Every page under src/pages: file path and what it does (functions/features), grouped by role.\n4. Shared components under src/components and layout: purpose of each.\n5. Context providers (AuthContext, ToastContext): state, exposed functions, how auth/session works.\n6. API client src/core/api.js: base URL, how requests are made, CSRF handling, error handling, and any endpoint groupings.\n7. Styling approach (Tailwind? CSS files?), theme/colors, UI component conventions, icons.\n8. Any notable UX patterns (pagination, modals, toasts, 2FA modal, protected routes).\n\nDo NOT modify any files. Return a structured, detailed summary with file paths and line references where useful."
}
```

**Output:**
```
<task id="ses_e9886cc0fffeH7GZiDbWZA5Ufn" state="completed">
<task_result>
The frontend exploration and report are complete, with no files modified. There are no pending next steps.

To proceed, please clarify what you would like next, for example:

- Verify a specific route, page, component, or API endpoint
- Produce exact file paths and line references for a section
- Compare existing product/design docs against the implementation
- Investigate a specific UX or integration gap
- Expand the report into a more detailed reference document
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Map security, auth, payments",
  "subagent_type": "explore",
  "prompt": "Explore the security, authentication, and integration layer of the school management system at /home/sajidasim/school-management-system. Focus on:\n\n1. backend/controllers/authController.js: registration, login, logout, 2FA setup/verify/disable, password reset/change, profile update, JWT/session details, cookie settings, lockout/rate limits.\n2. backend/middleware/{auth.js,csrf.js,sanitize.js,validate.js}: exact behavior and exported functions.\n3. backend/services/payment.js and backend/config/cloudinary.js: providers, sandbox behavior, environment variables required.\n4. backend/routes/publicRoutes.js: admission application + payment flow, models in PublicModels.js.\n5. backend/utils/rolls.js and backend/scripts/*.js.\n6. README.md at repo root and backend/.env.example: documented setup, commands, environment variables (names only, NEVER values/secrets).\n7. Any .gitignore rules relevant to docs/env.\n8. Identify security practices and any known gaps/TODOs implied by code comments.\n\nDo NOT modify any files and do NOT print secret values. Return a structured, detailed summary with file paths and line references."
}
```

**Output:**
```
<task id="ses_e9886c561ffevK6xe0v3iYiz2R" state="completed">
<task_result>
# Security, Authentication, and Integration Layer Review

Repository: `/home/sajidasim/school-management-system`
No files were modified. Secret values from `backend/.env` were not read into this report; only variable names are listed.

---

## 1. `backend/controllers/authController.js` (241 lines)

### Exported functions
`registerUser`, `loginUser`, `getMe`, `logoutUser`, `setupTwoFactor`, `verifyTwoFactor`, `disableTwoFactor` (lines 233-241).

### Safe user serializer
`publicUser()` lines 16-23 returns only: `_id`, `name`, `email`, `role`, `profileImage`, `twoFactorEnabled`. It never returns password hash or TOTP secret.

### Registration — `POST /api/auth/register`
- Lines 28-59.
- Validates `name` is a string, email matches `EMAIL_REGEX` (line 13), password length >= 8 (line 32). Route-level Zod validation also applies (`routes/authRoutes.js:25`).
- **Security:** public self-registration is forced to role `parent` (`SAFE_PUBLIC_ROLE`, lines 36-37), preventing self-assigned admin/teacher roles.
- Duplicate email check is case-insensitive (lines 39-42).
- `User.create()` triggers bcrypt hashing in the model.
- Issues an HttpOnly session cookie via `res.cookie('token', signSessionToken(user), sessionCookieOptions())` (line 52).
- Returns 201 with `publicUser`.
- Generic 500 on failure, no internals leaked (lines 55-58).

### Login — `POST /api/auth/login`
- Lines 64-97.
- Rejects non-string email/password (lines 68-70).
- Fetches user with `.select('+password +twoFactorSecret')` (line 72).
- Uses `user.matchPassword()` (bcrypt compare).
- **2FA branch:** if `twoFactorEnabled && twoFactorSecret`, issues a short-lived `preauth` cookie (`signPreauthToken`, 10 minutes, lines 76-80), returns `twoFactorRequired: true` plus minimal identity. No full session is issued yet.
- Otherwise issues the main `token` session cookie (line 88).
- Generic `401 Invalid email or password` on bad credentials (line 92), reducing account enumeration on login.
- No per-account failed-attempt counter / lockout in this controller (see rate limits below).
- Timing side-channel remains possible because password comparison is only performed when the user exists (line 74).

### Current user — `GET /api/auth/me`
- Lines 102-104, protected; returns `publicUser(req.user)`.

### Logout — `POST /api/auth/logout`
- Lines 109-112. `clearSessionCookie(res)` clears `token` and `preauth` only.
- Comment line 106 says "session + preauth + csrf cookies", but the implementation does **not** clear the `csrf` cookie (`middleware/auth.js:30-43`). Minor comment/implementation mismatch.

### 2FA setup — `POST /api/auth/2fa/setup`
- Lines 117-140, protected.
- Generates a TOTP secret with `speakeasy.generateSecret({ name: 'SchoolPortal:<email>' })` (line 119).
- Persists `twoFactorSecret = secret.base32` and immediately sets `twoFactorEnabled = false` (lines 122-124). A previously enabled account is therefore temporarily downgraded until verification succeeds.
- Returns `secret`, `otpauthUrl`, and a QR data URL (lines 126-135).
- Secret is stored plainly in MongoDB (not application-encrypted) — see `models/User.js:38-42`.
- No recovery codes are generated.

### 2FA verify — `POST /api/auth/2fa/verify`
- Lines 145-200. Route is `softAuth` + Zod `twoFactorVerify` (`routes/authRoutes.js:34`).
- **Preauth/login path:** if `preauth` cookie exists, verifies it with `JWT_SECRET`, requires `purpose === '2fa'`, loads user with secret (lines 152-163). On success, issues a real session `token` and clears `preauth` (lines 185-189).
- **Setup path:** if a normal session is present (`req.user`, resolved by `softAuth`), loads the user's secret (lines 164-168) and, on success, permanently sets `twoFactorEnabled = true` (lines 192-195).
- TOTP verification uses `speakeasy.totp.verify({ window: 1 })` (lines 174-179), allowing roughly +/- one time-step.
- No replay tracking of used TOTP codes; no per-account attempt limit.
- Generic 401/500 responses (lines 181-198).

### 2FA disable — `POST /api/auth/2fa/disable`
- Lines 205-231, protected + Zod code validation (`routes/authRoutes.js:35`).
- Requires a valid current TOTP code (lines 213-221).
- Clears `twoFactorSecret` and sets `twoFactorEnabled = false` (lines 223-225).

### Password reset/change and profile update — NOT in this controller
- There is **no forgot-password, reset-password, or self-service change-password flow** anywhere in the backend.
- **Profile update** lives inline in `backend/routes/authRoutes.js:38-66` (`PUT /api/auth/profile`): updates `name`, `email`, `profileImage`, saves, returns a safe shape. It does not verify email ownership or enforce email uniqueness at the application level.
- **Password changes** only exist as an **admin override**: `PUT /api/auth/users/:id/credentials` in `backend/routes/authRoutes.js:379-422`, where an admin can set any user's password. There is no current-password challenge for self-service.

---

## 2. Middleware

### `backend/middleware/auth.js` (132 lines)

Exports (lines 123-132):
`protect`, `softAuth`, `authorizeRoles`, `signSessionToken`, `signPreauthToken`, `verifyToken`, `sessionCookieOptions`, `clearSessionCookie`.

- **Token lifetimes:** `SESSION_EXPIRY = process.env.JWT_EXPIRY || '8h'`; `PREAUTH_EXPIRY = '10m'` (lines 5-7).
- **Session JWT:** payload `{ id, role, purpose: 'session' }`, signed with `JWT_SECRET` (lines 10-13).
- **Preauth JWT:** payload `{ id, purpose: '2fa' }`, 10-minute expiry (lines 16-17).
- **Cookie options** (lines 22-28):
  - `httpOnly: true`
  - `secure: process.env.NODE_ENV === 'production'`
  - `sameSite: 'lax'`
  - `maxAge: 8 * 60 * 60 * 1000` (matches 8h)
  - `path: '/'`
  - No `domain` set (host-only cookie); no `__Host-` prefix.
- **Clear cookies** (lines 30-43): clears `token` and `preauth` with the same HttpOnly/Secure/SameSite/Path options. Does not clear `csrf`.
- **`protect`** (lines 47-86):
  1. Reads `req.cookies.token` first (primary).
  2. Falls back to `Authorization: Bearer <jwt>` (API tooling/backward compatibility).
  3. 401 if no token.
  4. Verifies JWT; rejects any token whose `purpose` is present and not `'session'` (so preauth cannot open a session).
  5. Loads user from DB with `-password -twoFactorSecret`; 401 if the account no longer exists.
  6. Sets `req.user` and continues.
- **`softAuth`** (lines 90-108): resolves `req.user` if a valid session cookie/Bearer token exists, otherwise continues anonymously; ignores non-session tokens and swallows invalid-token errors.
- **`authorizeRoles(...roles)`** (lines 111-121): 403 unless `req.user` exists and its DB-loaded `role` is in the allowed list.
- Role is never trusted from the JWT alone because `protect` re-fetches the user from MongoDB (lines 76-81).

### `backend/middleware/csrf.js` (42 lines)

Exports (line 42): `csrfInit`, `csrfProtect`.

- **Double-submit cookie pattern** (comments lines 1-5).
- **CSRF cookie options** (lines 8-14): `httpOnly: false` (readable by SPA), `secure` in production, `sameSite: 'lax'`, 24h, path `/`.
- **`csrfInit`** (lines 17-26): if no `csrf` cookie, generates `crypto.randomBytes(24).toString('hex')` and sets it; always sets `req.csrfToken`.
- **`csrfProtect`** (lines 29-40): skips `GET`, `HEAD`, `OPTIONS`; for mutations requires both `x-csrf-token` header and `csrf` cookie, and strict equality; otherwise 403 `Security token verification failed.`
- Applied globally to `/api` in `server.js:108`; the axios client mirrors the cookie automatically (`frontend/src/core/api.js:13-14`).
- Token is not rotated per session and not bound to the user; it is a static double-submit token for up to 24h.

### `backend/middleware/sanitize.js` (27 lines)

Exports: the `sanitize` function itself (line 27).

- Applies `mongo-sanitize` to `req.body` and `req.params` (lines 8-9).
- For `req.query`, Express 5 exposes a getter-only accessor; assignment would silently fail. The middleware uses `Object.defineProperty` to shadow it with a sanitized own data property (lines 11-23). This is a notable Express 5 compatibility fix.
- Core NoSQL operator-injection defense (`$ne`, `$gt`, `$where`, etc.).

### `backend/middleware/validate.js` (202 lines)

Exports (line 202): `{ validate, schemas }`.

- **`validate(schema, source='body')`** (lines 7-17): parses `req[source]` with Zod, replaces it with the parsed object (Zod strips unknown keys by default, preventing mass assignment), and returns a **generic** 400 `Invalid request payload.` without leaking schema internals.
- **Schema inventory:**
  - Auth: `register` (lines 21-25), `login` (26-29), `profile` (30-36). Profile allows name 2-80, email, and `profileImage` up to 2,000,000 chars (~2MB base64).
  - User management: `createUser` (39-50), `updateCredentials` (51-57), `changeRole` (58), `deleteGuard` (59).
  - Notices: `createNotice` (62-66), `passwordCheck` (67), `idParam` (68).
  - Attendance: `submitAttendance` (71-78), `teacherSubmitAttendance` (79-86), `classParam` (87), `heatmapQuery` (88-91), `byDateQuery` (92).
  - Teacher student edit: `teacherEditStudent` (95-101).
  - Gradebook: `spreadsheetParams` (104-108), `bulkSubmit` (109-117), `togglePublish` (118-122).
  - Assignments: `assignmentCreate` (125-131), `assignmentUpdate` (132-136), `assignmentQuery` (137-142).
  - School config: `configUpdate` (145-149), `toggleOffDay` (150), `toggleHoliday` (151).
  - Public website: `infoUpdate` (154-158), `founderAdd` (159-163), `founderIdParam` (164).
  - Admissions: `admissionApply` (167-184), `payAdmission` (185-188), `appIdParam` (189), `applicationPatch` (190-196).
  - 2FA: `twoFactorVerify` requires exactly six digits (line 199).
- Notably, `applicationPatch` only permits `status` (`Pending|Approved|Rejected`) and `paymentStatus` (`Unpaid|Waived`). **Admins cannot directly mark an application `Paid`** — the comment (lines 192-194) explains payments must go through the server-side payment adapter.

---

## 3. Payments and Cloudinary

### `backend/services/payment.js` (63 lines)

Exports (line 63): `{ PROVIDER, isSandbox, verifyPayment }`.

- **Provider selection:** `PROVIDER = (process.env.PAYMENT_PROVIDER || 'sandbox').toLowerCase()` (line 24).
- **Sandbox adapter** (lines 29-38):
  - Performs **no network call**.
  - Always returns `verified: true`.
  - Amount comes from `application.payableAmount` (server-side), not the client.
  - `reference` = trimmed `txnId`; `method` is trimmed and truncated to 32 chars; defaults to `Sandbox`.
  - Marks `provider: 'sandbox'`, `sandbox: true`.
- **Real provider:** only a commented-out `bkash` stub (lines 40-42). No real gateway is implemented.
- **`isSandbox`** line 45.
- **`verifyPayment`** (lines 47-61):
  - Unknown provider -> 503.
  - Sandbox in `NODE_ENV=production` -> 503 (lines 54-59), preventing the simulator from silently serving real users.
- **Documented adapter contract** (lines 15-22): a real adapter must perform a server-to-server lookup of `txnId` and confirm the paid amount is `>= application.payableAmount` before resolving `verified: true`.
- Required env names: `PAYMENT_PROVIDER`, `NODE_ENV`. No credentials are currently required because only the sandbox adapter exists.

### `backend/config/cloudinary.js` (13 lines)

- Loads dotenv (`require('dotenv')`, line 5).
- Configures Cloudinary v2 with:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  (lines 7-11)
- Exports the configured `cloudinary` object (line 13).
- No startup validation that these variables exist; missing values fail at upload time.
- Consumers:
  - `routes/publicRoutes.js` uploads images to `school_branding` and `school_founders`.
  - `routes/noticeRoutes.js` uploads raw PDFs to `school_notices` and deletes them on notice deletion.

---

## 4. Public Routes and Public Models

### `backend/routes/publicRoutes.js` (250 lines)

**Upload handling**
- `multer.memoryStorage()` (line 15).
- Image file filter allows only `image/jpeg`, `image/png`, `image/webp`, `image/gif` (lines 18-25). This trusts the client-supplied MIME type; no magic-byte validation.
- Limits: 5 MB per file, max 2 files (lines 27-31).
- `streamUpload()` pipes buffers to Cloudinary with `resource_type: 'image'` (lines 33-41).

**Public information**
- `GET /api/public/info` (lines 45-53): returns `SchoolInfo`, creating a default document if none exists.
- `POST /api/public/info/update` (lines 57-75): admin only; optional `logo`/`banner` uploads; updates `welcomeTitle`, `aboutText`, `admissionFeeAmount`.
- `POST /api/public/founder/add` (lines 79-91): admin only; appends founder with optional photo.
- `DELETE /api/public/founder/:founderId` (lines 95-105): admin only; filters founder array by ObjectId.

**Admission application — `POST /api/public/apply`** (lines 108-168)
- Fetches `SchoolInfo` and `SchoolConfig` in parallel (lines 110-113).
- **Server-set fee:** `Math.max(0, Number(config?.admissionFeeAmount ?? DEFAULT_ADMISSION_FEE) || 0)` with `DEFAULT_ADMISSION_FEE = 500` (lines 13, 116). The client never supplies the amount.
- **Class allow-list:** if `SchoolConfig.classes` is non-empty, `targetClass` must be one of them (lines 120-126). If the config list is empty, this check is skipped.
- **Mass-assignment defense:** explicit allow-list payload (lines 128-152). Server-controlled fields `payableAmount`, `paidAmount`, `paymentStatus`, `applicationStatus` are set by the server only.
- Required-field check (lines 154-158) after Zod validation.
- Creates `Application`, returns `applicationId` and `payableAmount` (lines 160-166).
- Generic 400 on failure (line 167).
- Rate limited in `server.js:138` (20 requests / 15 min / IP).

**Payment — `POST /api/public/pay-admission/:appId`** (lines 173-210)
- Validates `appId` (params) and `paymentMethod`/`txnId` (body).
- Finds application; 404 if absent.
- **Idempotency:** returns 409 if `paymentStatus === 'Paid'` (lines 180-183).
- Calls `verifyPayment({ application: app, txnId, method })` (line 187). Amount is never read from the request.
- On success writes: `paymentStatus = 'Paid'`, `paidAmount` from `result.amount` (fallback app amount), `paymentTxnId`, `paymentMethod`, `paymentProvider`, `paymentVerifiedAt` (lines 189-195).
- Returns `sandbox` flag in the message (lines 197-203).
- 503 for provider-unavailable, otherwise 500 (lines 204-209).
- Rate limited in `server.js:139` (same 20/15 min cap).

**Admin application management**
- `GET /api/public/applications` (lines 213-218): admin only, newest first.
- `PATCH /api/public/application/:appId` (lines 222-248): admin only; updates `applicationStatus` and/or `paymentStatus` (schema restricts to Unpaid/Waived).
- Optional Nodemailer notification if `SMTP_USER` and `SMTP_PASS` are set (lines 234-244):
  - Host: `SMTP_HOST` or `smtp.gmail.com`; port hardcoded `587`; `secure: false`.
  - Sends HTML containing `studentNameEn` and status without HTML escaping (line 242) — potential HTML injection into email.
  - Mail errors are caught and only logged (line 243).

### `backend/models/PublicModels.js` (63 lines)

- `FounderSchema` (lines 5-10): `name`, `designation`, `quote` required; `image` default empty.
- `SchoolInfoSchema` (lines 13-22):
  - `welcomeTitle`, `aboutText`, `schoolLogo`, `bannerImage`.
  - `admissionFeeAmount`: Number, default 500, min 0, max 1,000,000 (lines 18-20) — source of truth for the fee.
  - `founders` array, timestamps.
- `ApplicationSchema` (lines 25-58):
  - Student: `studentNameEn`, `studentNameBn`, `targetClass`, `dateOfBirth` (Date), `birthCertificateNo`, `emailAddress`.
  - Parents: `fatherNameEn/Bn`, `fatherNid`, `motherNameEn/Bn`, `motherNid`, `parentPhone`.
  - Guardian: `guardianNameEn/Bn`, `guardianPhone`.
  - Payment: `payableAmount` (default 500), `paidAmount` (0), `paymentStatus` (default `Unpaid`), `paymentMethod`, `paymentTxnId`, `paymentProvider`, `paymentVerifiedAt`.
  - Workflow: `applicationStatus` enum `Pending|Approved|Rejected`, default `Pending`.
  - Timestamps.
- Note: the schema does not itself enforce payment-status enums or idempotency; those are enforced by route logic and Zod.

---

## 5. Roll Utilities and Scripts

### `backend/utils/rolls.js` (23 lines)

- Exports `reindexRollsAfterDelete` (line 23).
- Function `reindexRollsAfterDelete(gradeClass, removedRoll)` (lines 8-21):
  - No-op for missing class or non-finite roll.
  - Finds all students in the same `gradeClass` with `rollNumber > removed`, sorted ascending (lines 13-15).
  - Decrements each roll by one and saves sequentially (lines 17-20).
  - Comment explains the ascending order avoids unique-index collisions on `{ gradeClass, rollNumber }`.
- Used by:
  - `routes/authRoutes.js:363` (admin student deletion).
  - `routes/teacherRoutes.js:384` (teacher student deletion).
- `Student.js:35` confirms the unique compound index `{ gradeClass, 1, rollNumber: 1 }`.
- Gap: the loop is not transactional; concurrent deletes/edits could still collide or race. Also, a teacher manually changing a roll number (`teacherRoutes.js:318-334`) does not reindex gaps.

### `backend/scripts/seed-admin.js` (84 lines)

- Purpose (lines 1-13): bootstrap or reset an administrator.
- Loads `backend/.env` explicitly (line 16).
- CLI flags: `--email`, `--password`, `--name`, `--reset-password` (lines 20-31).
- Defaults: email `admin@school.com`, name `Super Admin`, generated password (lines 28-36).
- Generated password: `crypto.randomBytes(12).toString('base64url') + '!Aa1'` (line 35).
- Enforces minimum length 8 (lines 39-42).
- Connects with `MONGODB_URI` or `MONGO_URI` (lines 45-52).
- If account exists: updates name, forces `role = 'admin'`, and resets password **only** when `--reset-password` or `--password` was supplied (lines 57-64).
- If new: creates admin with hashed password via model pre-save (lines 65-69).
- **Prints the password to stdout** (lines 64 and 68) and warns to change it (lines 72-75).
- Security concern: the default email is predictable. If an attacker registers `admin@school.com` before seeding, the script promotes that existing account to admin **without resetting the password** (lines 57-64), which can lead to admin takeover if the bootstrap is run after public registration.
- Also note it imports `dotenv` result into an unused variable (line 16) — no functional impact.

### `backend/scripts/backfillAssignments.js` (151 lines)

- Purpose (lines 1-14): one-off idempotent migration seeding the `Assignment` collection so the authorization layer works for existing teachers.
- Usage: dry run by default; `--apply` writes (line 25).
- Loads `backend/.env` (line 17).
- Uses `MONGODB_URI` or `MONGO_URI` (line 35); exits if missing.
- Computes academic year from `SchoolConfig.sessionStartDate`, fallback current year, as `YYYY-(YYYY+1)` (lines 27-32).
- Source 1: aggregates distinct `(submittedBy teacher, classId, subject)` from `Gradebook` (lines 49-56).
- Looks up teachers, separates orphan cases: no submitter, or submitter missing/not a teacher (lines 58-76).
- Builds upsert operations for subject assignments with `$setOnInsert` and `isClassTeacher: false` (lines 77-93).
- Source 2: `Teacher` profiles with `classTeacherOf` not in `['None','',null]` becomes a class-teacher assignment with `subject: null` (lines 96-118).
- Reports counts and orphan warnings (lines 120-132).
- Only writes via `Assignment.bulkWrite` with `--apply` (lines 134-142); disconnects in `finally` (lines 146-148).
- Relies on the unique `{teacher, subject, class, academicYear}` index (`models/Assignment.js:40-43`) for idempotency.

---

## 6. README and Environment Documentation

### Root `README.md` (51 lines)

- Describes project as under development with React + Vite frontend and dedicated backend.
- Features listed: authentication/admin operations, attendance, notices, results (lines 7-20).
- Setup: Node 18+; run `npm install` in root (lines 27-35); start both apps with `npm run dev` (lines 37-42).
- Stack: React/Vite/Tailwind, Node/Express/Nodemon, monorepo tooling, and states **"Database: [Pending Database Configuration]"** (lines 46-51) even though MongoDB/Mongoose is already integrated.
- Root `package.json` scripts (lines 25-29):
  - `backend`: `npm run dev --prefix backend`
  - `frontend`: `npm run dev --prefix frontend`
  - `dev`: `concurrently "npm run backend" "npm run frontend"`
- Backend `package.json` scripts (lines 6-10): `start` (`node server.js`), `dev` (`node --watch server.js`), `seed:admin`.
- Documentation gaps: README does not document required environment variables, `.env` setup, 2FA, admissions/payments, Cloudinary/SMTP, scripts, production deployment, or security model.

### `backend/.env.example` (31 lines) — variable names only

Documented names:
- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `PAYMENT_PROVIDER`
- `JWT_EXPIRY` (commented out)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Observations:
- `MONGO_URI` is shown, but the code also accepts `MONGODB_URI` (`config/db.js:5`, scripts lines 35/45).
- `TRUST_PROXY` is used in `server.js:49` but is **not documented** in `.env.example`.
- `SMTP_PORT` is documented but never read; `publicRoutes.js:236` hardcodes port `587`.
- `VITE_API_TARGET` is used by `frontend/vite.config.js:18` but not documented in an env example.
- The example comments recommend a long random JWT secret and app-specific SMTP password (lines 9, 27) — good guidance.
- A local `backend/.env` exists but is **not tracked** (see below). Its values were not included in this report.

---

## 7. `.gitignore` Rules Relevant to Docs/Env

Root `/home/sajidasim/school-management-system/.gitignore`:
- Environment/secret files (lines 22-27):
  - `.env`
  - `.env.local`
  - `atlas-credentials.env`
  - `**/.env`
  - `*.local`
- Uploads excluded (lines 18-20): `backend/uploads/`, `**/uploads/`.
- Logs, `node_modules`, build outputs ignored (lines 1-16).
- Editor/OS files ignored (lines 29-37).

Verification:
- `backend/.env` is ignored by the `**/.env` rule.
- `backend/.env.example` is tracked in git.
- `git status` shows only `backend/config/db.js`, `backend/scripts/backfillAssignments.js`, and `backend/scripts/seed-admin.js` as modified; no env file changes are staged/tracked.
- No rule ignores README or general documentation.

---

## 8. Security Practices Observed

### Application-wide hardening (`backend/server.js`)
- Dotenv loaded before use (line 22).
- **Fail-fast secret checks** (lines 24-39):
  - Refuses to start without `JWT_SECRET`.
  - Refuses to start in production if the secret is shorter than 32 characters; warns in dev.
- Warns if sandbox payments are configured in production (lines 40-42).
- Disables `x-powered-by` (line 45).
- Optional `TRUST_PROXY` support for correct client IPs/secure cookies behind a reverse proxy (line 49).
- **Helmet** with a restrictive CSP (lines 52-74):
  - `defaultSrc 'self'`, `scriptSrc 'self'`, `scriptSrcAttr 'none'`, `objectSrc/frameSrc/frameAncestors 'none'`, `formAction 'self'`.
  - `imgSrc` allows `data:`, `blob:`, Cloudinary.
  - HSTS enabled only in production.
- **CORS allow-list** with `credentials: true`, restricted methods and headers (lines 76-95).
- Body size limits: 2 MB JSON and URL-encoded (lines 97-100).
- Cookie parser (line 101).
- **NoSQL injection sanitizer** applied globally (line 104).
- **CSRF initialization and enforcement** on `/api` (lines 106-108).
- **Rate limiting** (lines 110-139):
  - Global: 300 requests / 15 min per IP.
  - Auth: 20 attempts / 15 min per IP on `/api/auth/login`, `/api/auth/register`, `/api/auth/2fa/verify`.
  - Public write: 20 requests / 15 min per IP on `/api/public/apply` and `/api/public/pay-admission`.
- Static SPA serving in production from the same origin (lines 167-176).
- JSON 404 handler (lines 187-190) and centralized error handler that hides stack traces and returns generic 500s (lines 192-201).

### Authentication/session security
- HttpOnly session cookies; no JWT in JavaScript storage (`authController.js:51`, `middleware/auth.js:22-28`).
- Separate short-lived preauth token with a `purpose` claim; `protect` rejects non-session tokens (`middleware/auth.js:72`).
- 2FA mandatory gate before session issuance when enabled (`authController.js:76-89`).
- Generic login error message (`authController.js:92`).
- Password hashing with bcrypt cost 12, `select: false`, and `toJSON` transform stripping `password`/`twoFactorSecret` (`models/User.js:19-24`, `45-59`, `69-75`).
- Public registration cannot choose role (`authController.js:36-37`).
- Role authorization is enforced server-side on every protected route; user role is re-read from DB (`middleware/auth.js:76-81`, `111-121`).

### Input/output safety
- Zod validation with unknown-key stripping and generic errors (`middleware/validate.js`).
- Mongo operator sanitization on body/params/query, including the Express 5 query workaround (`middleware/sanitize.js`).
- Mass-assignment prevention in public application creation (`publicRoutes.js:128-152`).
- Explicit field projections in admin aggregate queries to omit passwords/secrets (`authRoutes.js:117, 173, 301`).
- File upload restrictions: image MIME allow-list and size/file caps (`publicRoutes.js:18-31`); PDF-only notices with 10 MB cap (`noticeRoutes.js:17-29`).
- Centralized error handler avoids leaking stack traces (`server.js:192-201`).

### Authorization/integrity
- Assignment-based teacher authorization (`middleware/assignments.js`):
  - Admins bypass; teachers need a matching subject/class assignment for grading (`requireAssignment`).
  - Class-teacher scope for class-level tools (`canAccessClass`).
  - Cross-class student validation for grade writes (`findOutOfClassStudents`, `gradebookRoutes.js:57-62`).
- Attendance routes enforce class ownership (`attendanceRoutes.js:16-19, 45-49`; `teacherRoutes.js:106-109, 162-165, 193-196`).
- Student self-service endpoints are scoped to the logged-in user (`studentRoutes.js`).
- Admin destructive actions require password re-entry:
  - Delete user/student: `authRoutes.js:339-347`, `teacherRoutes.js:352-370`.
  - Delete notice: `x-admin-password` header, `noticeRoutes.js:113-124`.
- Admin application patch cannot set `Paid` directly (`validate.js:190-196`).
- Server-side payment amount and idempotency (`publicRoutes.js:116, 180-195`; `payment.js`).
- Sandbox payment adapter refused in production (`payment.js:54-59`).

### Configuration hygiene
- `.env` ignored; `.env.example` tracked (`.gitignore:22-27`).
- JWT secret length enforced.
- `PAYMENT_PROVIDER` defaults safely to sandbox and is blocked in production.
- Cloudinary/SMTP credentials are environment-driven.

---

## 9. Known Gaps, Risks, and TODOs Implied by Code/Comments

### Authentication / account lifecycle
1. **No password reset, forgot-password, or self-service change-password flow.** Only an admin override exists (`authRoutes.js:379-422`). This is directly relevant to the requested "password reset/change" feature and is absent.
2. **No email verification** on registration or profile email changes.
3. **No per-account lockout or failed-login counter.** Only IP-based rate limits (`server.js:117-127`). `express-rate-limit` defaults to an in-memory store, so limits are per-process and not shared across instances. The 20/15-min auth limiter does not apply to `/auth/2fa/setup`, `/auth/2fa/disable`, `/auth/profile`, `/auth/logout`, or admin password-check endpoints.
4. **Stateless JWT has no revocation.** Logout only clears cookies; a stolen/leaked token remains valid until the 8h expiry. No token version, `jti` blacklist, or refresh-token rotation.
5. **2FA secret stored in plaintext** (`models/User.js:38-42`); no encryption at rest.
6. **2FA setup can downgrade an enabled account:** `setupTwoFactor` immediately sets `twoFactorEnabled = false` before verification (`authController.js:122-124`). A session holder can call setup and leave the account without enforced 2FA if they do not complete verification. No current-TOTP/password challenge before re-running setup.
7. **No 2FA recovery codes** and no replay protection for TOTP codes within the `window: 1` tolerance.
8. **Login timing differs** based on whether the email exists (password comparison only runs for existing users, `authController.js:74`), enabling limited user enumeration.
9. **Registration reveals existing emails** via `User already exists` (`authController.js:41`), enabling account enumeration.
10. **CSRF cookie is not cleared on logout** despite the comment (`authController.js:106-111` vs `auth.js:30-43`). Token is long-lived (24h) and not session-bound.
11. **Profile email change does not enforce uniqueness** at the application layer; a duplicate can surface as a 500 from the unique index. No re-verification of the new email.
12. **`profileImage` accepts arbitrary base64 strings** up to ~2 MB (`validate.js:35`), with no MIME/content validation; could allow oversized or unexpected data URIs.
13. **No audit logging** for logins, 2FA changes, role changes, credential resets, deletes, or payment/status changes.

### Payments / admissions
14. **Only the sandbox adapter exists.** Real bKash/Nagad/SSLCommerz integration is a stub comment (`payment.js:40-42`).
15. **Sandbox accepts any `txnId`** and performs no verification (`payment.js:29-38`).
16. **No uniqueness/replay check on `paymentTxnId`.** The same transaction reference could be submitted for multiple applications; there is no unique index or lookup.
17. **Idempotency check is non-atomic.** Two concurrent requests can both pass the `paymentStatus === 'Paid'` check before either saves (`publicRoutes.js:180-195`). No transaction or conditional atomic update.
18. **`Waived` applications are not blocked from payment**, because only `Paid` is rejected (line 181). A waived applicant could still call the payment endpoint.
19. **Application status is not checked before payment**; a `Rejected` application can still be paid.
20. **The application ID is the only credential** for the public payment endpoint; there is no email/phone ownership check or signed payment token.
21. **No CAPTCHA, duplicate-application check, or email verification** on `/apply`; sensitive PII (DOB, NID, phone, addresses) is stored in plaintext with no retention policy.
22. **Class allow-list bypass:** if `SchoolConfig.classes` is empty, any `targetClass` is accepted (`publicRoutes.js:120-126`).
23. **HTML injection in notification email:** `studentNameEn` is interpolated unescaped into the email HTML (`publicRoutes.js:242`).
24. **`SMTP_PORT` in `.env.example` is unused**; port is hardcoded as 587 (`publicRoutes.js:236`).
25. **No payment webhook/refund/audit trail** beyond stored fields.

### Uploads / Cloudinary
26. **No fail-fast validation of Cloudinary credentials** at startup; missing vars only fail when an upload occurs (`config/cloudinary.js`).
27. **MIME filters trust the client `Content-Type`**; no magic-byte sniffing (`publicRoutes.js:18-25`, `noticeRoutes.js:17-23`).
28. **Old Cloudinary assets are not cleaned up** when logo/banner/founder images are replaced (`publicRoutes.js:57-91`); only notice deletion attempts cleanup (`noticeRoutes.js:129-137`).

### Data integrity / authorization
29. **Roll reindexing is not transactional** (`utils/rolls.js:17-20`); concurrent operations can race. Manual roll edits do not reindex gaps (`teacherRoutes.js:318-334`).
30. **Student deletion leaves orphaned academic data** (attendance/grade records) because only `Student` and `User` are deleted (`authRoutes.js:356-366`, `teacherRoutes.js:379-384`).
31. **`seed-admin.js` privilege-escalation risk:** an existing account with the default/admin email is promoted to admin without a password reset unless the flag is supplied (`seed-admin.js:57-64`), and the generated/selected password is printed to stdout (lines 64, 68).
32. **No test suite** is present in the repository, and there are no automated security tests.
33. **Rate limiting is positioned after CSRF protection** (`server.js:108` before lines 124-139), so requests failing CSRF are not counted by the limiters; malformed/forged-CSRF traffic can still hit the app.
34. **`sanitize` relies on `mongo-sanitize`**, which is a defense-in-depth measure, not a complete query-injection guarantee; Zod schemas are the stronger control on typed routes.
35. **`protect` accepts Bearer tokens** (`auth.js:55-62`); clients that persist tokens in JS storage would reintroduce XSS token theft risk, though the SPA uses cookies only (`frontend/src/core/api.js:12`).
36. **CORS permits requests with no `Origin` header** (`server.js:84-86`), intentionally allowing non-browser clients; this is not a CSRF vector by itself because such clients do not send the user's cookies.
37. **Documentation drift:** README still says the database is pending and omits the security/2FA/env/payment setup; `.env.example` omits `TRUST_PROXY`, the `MONGODB_URI` alias, and frontend `VITE_API_TARGET`, while listing an unused `SMTP_PORT`.
38. **Admin password checks in notices** send a reusable password in the `x-admin-password` header (`noticeRoutes.js:113-124`) and have no dedicated rate limit; HTTPS is assumed.

---

## 10. Request/Route Quick Map

| Method | Route | Middleware / Authorization | Handler |
|---|---|---|---|
| POST | `/api/auth/register` | `validate(register)` | `authController.registerUser` (`authRoutes.js:25`) |
| POST | `/api/auth/login` | `validate(login)` + auth rate limit | `loginUser` (`authRoutes.js:26`) |
| GET | `/api/auth/me` | `protect` | `getMe` (`authRoutes.js:29`) |
| POST | `/api/auth/logout` | `protect` | `logoutUser` (`authRoutes.js:30`) |
| POST | `/api/auth/2fa/setup` | `protect` | `setupTwoFactor` (`authRoutes.js:33`) |
| POST | `/api/auth/2fa/verify` | `softAuth`, `validate(twoFactorVerify)` + rate limit | `verifyTwoFactor` (`authRoutes.js:34`) |
| POST | `/api/auth/2fa/disable` | `validate(twoFactorVerify)`, `protect` | `disableTwoFactor` (`authRoutes.js:35`) |
| PUT | `/api/auth/profile` | `protect`, `validate(profile)` | inline (`authRoutes.js:38-66`) |
| PUT | `/api/auth/users/:id/credentials` | `protect`, admin, validation | admin password/profile override (`authRoutes.js:379-422`) |
| POST | `/api/public/apply` | `validate(admissionApply)` + public write limit | inline (`publicRoutes.js:108-168`) |
| POST | `/api/public/pay-admission/:appId` | validation + public write limit | inline (`publicRoutes.js:173-210`) |
| PATCH | `/api/public/application/:appId` | `protect`, admin, validation | inline (`publicRoutes.js:222-248`) |
| GET | `/api/public/applications` | `protect`, admin | inline (`publicRoutes.js:213-218`) |

---

### Bottom line

The codebase has a strong, deliberate defensive baseline: HttpOnly cookie sessions, short-lived purpose-scoped preauth tokens, 2FA, bcrypt, Zod allow-listing, NoSQL sanitization, CSRF double-submit, Helmet/CORS/rate limiting, server-side payment amounts, sandbox refusal in production, assignment-based teacher authorization, and generic error handling.

The most significant gaps relative to the requested scope are:
- **Missing password reset/self-service password change** (only an admin override exists).
- **No account lockout/revocation**, only IP-based in-memory rate limits.
- **2FA secret stored plaintext and setup can temporarily disable enforced 2FA.**
- **Payment sandbox accepts any transaction ID; no replay uniqueness; `Waived`/`Rejected` applications can still be paid; real gateway absent.**
- **Outdated/incomplete README and env documentation**, plus the `seed-admin` bootstrap and email HTML interpolation risks.
</task_result>
</task>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/README.md"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/README.md</path>
<type>file</type>
<content>
1: # School Management System (Under Development 🚧)
2: 
3: A web application designed to streamline academic operations, manage user data, and track student progress. This project is currently in its active development phase and features a decoupled architecture with a **React + Vite** frontend and a dedicated backend service.
4: 
5: ---
6: 
7: ## 🛠️ Current Features
8: 
9: ### 🔑 Authentication & Admin Operations
10: * **Secure Access:** Fully integrated user login and sign-up features for tailored workspace access.
11: * **Admin Control Center:** Centralized panel for administrators to register, modify, and add new **teachers** and **students** to the system.
12: 
13: ### 📅 Attendance & Tracking System
14: * **Teacher Roll Call:** Dedicated module allowing teachers to mark student attendance effortlessly.
15: * **Status Tracker:** Live database tracking to monitor whether students are **Present**, **Late**, or **Absent**.
16: 
17: ### 📝 Academic & Communication Modules
18: * **Notice Board:** A central dashboard feed for publishing general announcements, holiday notices, and important news.
19: * **Result System:** A digital grading portal for processing and displaying academic performance marks.
20: 
21: ---
22: 
23: ## 🚀 Getting Started
24: 
25: Follow these steps to install dependencies and boot up both environments simultaneously from the root.
26: 
27: ### Prerequisites
28: * **Node.js** (v18 or higher recommended)
29: * **npm** or **yarn** package manager
30: 
31: ### 1. Installation
32: Run this command in the **root folder** to install all required dependencies across the project:
33: ```bash
34: npm install
35: ```
36: 
37: ### 2. Run the Application
38: Start both the **Vite frontend** and **Nodemon backend server** with a single command from the root directory:
39: ```bash
40: npm run dev
41: ```
42: * Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).
43: 
44: ---
45: 
46: ## 🧪 Development Tech Stack
47: 
48: * **Frontend:** React, Vite, HTML5, CSS3/Tailwind, JavaScript (ES6+)
49: * **Backend:** Node.js, Express, Nodemon (for hot-reloading)
50: * **Monorepo Tools:** Concurrently / npm workspaces (for single-command execution)
51: * **Database:** *[Pending Database Configuration]*

(End of file - total 51 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 4.4s)

_Thinking:_

The frontend explore task returned a useless result (it didn't report). I need to redo the frontend exploration. Let me directly read key frontend files or re-run explore. Let me read App.jsx, core/api.js, core/nav.js, AuthContext, package.json, vite.config, tailwind config, index.css, components, layouts. That's a lot but I can read many in parallel. Let me do targeted reads/greps.

First list frontend files.

The frontend exploration didn't return details, so I'll inspect it directly.

**Tool: bash**

**Input:**
```json
{
  "command": "find src -maxdepth 3 -type f | sort && echo '---' && cat package.json && echo '---' && cat vite.config.js",
  "workdir": "/home/sajidasim/school-management-system/frontend"
}
```

**Output:**
```
src/App.css
src/App.jsx
src/assets/hero.png
src/assets/react.svg
src/components/icons.jsx
src/components/layout/AppShell.jsx
src/components/layout/navConfig.js
src/components/layout/PublicFooter.jsx
src/components/layout/PublicHeader.jsx
src/components/layout/PublicLayout.jsx
src/components/layout/Wordmark.jsx
src/components/Pagination.jsx
src/components/ProtectedRoute.jsx
src/components/TwoFactorModal.jsx
src/components/ui.jsx
src/components/usePagination.js
src/context/AuthContext.jsx
src/context/ToastContext.jsx
src/core/api.js
src/core/nav.js
src/index.css
src/main.jsx
src/pages/admin/AdminAppApproval.jsx
src/pages/admin/AdminApplicationDetails.jsx
src/pages/admin/AdminAssignments.jsx
src/pages/admin/AdminCreateUser.jsx
src/pages/admin/AdminDashboard.jsx
src/pages/admin/AdminEditUser.jsx
src/pages/admin/AdminNoticeBoard.jsx
src/pages/admin/AdminSettings.jsx
src/pages/admin/AdminUserRoster.jsx
src/pages/admin/AdminWebsiteManager.jsx
src/pages/auth/Login.jsx
src/pages/auth/Profile.jsx
src/pages/auth/Register.jsx
src/pages/parent/ParentHome.jsx
src/pages/shared/NoticeBoard.jsx
src/pages/student/StudentAttendanceHub.jsx
src/pages/student/StudentDashboard.jsx
src/pages/student/StudentGrades.jsx
src/pages/student/StudentNotices.jsx
src/pages/teacher/TeacherAnalytics.jsx
src/pages/teacher/TeacherAttendance.jsx
src/pages/teacher/TeacherCreateStudent.jsx
src/pages/teacher/TeacherDashboard.jsx
src/pages/teacher/TeacherEditStudent.jsx
src/pages/teacher/TeacherGradebook.jsx
src/pages/teacher/TeacherRoster.jsx
src/pages/userpublic/PublicAdmission.jsx
src/pages/userpublic/PublicFounders.jsx
src/pages/userpublic/PublicPortal.jsx
---
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/ibm-plex-mono": "^5.3.0",
    "@fontsource/plus-jakarta-sans": "^5.3.0",
    "@tailwindcss/postcss": "^4.3.3",
    "axios": "^1.20.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.4",
    "eslint": "^10.9.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.4",
    "globals": "^17.11.0",
    "postcss": "^8.5.26",
    "tailwindcss": "^4.3.3",
    "vite": "^8.2.2"
  }
}
---
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    // ⚠️ API surface stays hidden behind /api — the browser only knows our origin.
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/App.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/App.jsx</path>
<type>file</type>
<content>
1: // src/App.jsx
2: import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
3: 
4: // Layouts
5: import PublicLayout from './components/layout/PublicLayout.jsx';
6: import AppShell from './components/layout/AppShell.jsx';
7: import ProtectedRoute from './components/ProtectedRoute.jsx';
8: 
9: // Auth & General Pages
10: import Login from './pages/auth/Login';
11: import Register from './pages/auth/Register';
12: import Profile from './pages/auth/Profile';
13: 
14: // Shared Pages
15: import SharedNoticeBoard from './pages/shared/NoticeBoard';
16: 
17: // Parent page
18: import ParentHome from './pages/parent/ParentHome';
19: 
20: // Public Pages
21: import PublicPortal from './pages/userpublic/PublicPortal';
22: import PublicAdmission from './pages/userpublic/PublicAdmission';
23: import PublicFounders from './pages/userpublic/PublicFounders';
24: 
25: // Student Pages
26: import StudentDashboard from './pages/student/StudentDashboard';
27: import StudentNotices from './pages/student/StudentNotices';
28: import StudentGrades from './pages/student/StudentGrades';
29: import StudentAttendanceHub from './pages/student/StudentAttendanceHub';
30: 
31: // Teacher Pages
32: import TeacherDashboard from './pages/teacher/TeacherDashboard';
33: import TeacherRoster from './pages/teacher/TeacherRoster';
34: import TeacherAttendance from './pages/teacher/TeacherAttendance';
35: import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
36: import TeacherGradebook from './pages/teacher/TeacherGradebook';
37: import TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';
38: import TeacherEditStudent from './pages/teacher/TeacherEditStudent';
39: 
40: // Admin Pages
41: import AdminDashboard from './pages/admin/AdminDashboard';
42: import AdminUserRoster from './pages/admin/AdminUserRoster';
43: import AdminCreateUser from './pages/admin/AdminCreateUser';
44: import AdminEditUser from './pages/admin/AdminEditUser';
45: import AdminNoticeBoard from './pages/admin/AdminNoticeBoard';
46: import AdminSettings from './pages/admin/AdminSettings';
47: import AdminWebsiteManager from './pages/admin/AdminWebsiteManager';
48: import AdminAppApproval from './pages/admin/AdminAppApproval';
49: import AdminApplicationDetails from './pages/admin/AdminApplicationDetails';
50: import AdminAssignments from './pages/admin/AdminAssignments';
51: 
52: // Map legacy /student|teacher|admin/* paths onto the new /s|/t|/a/* structure.
53: const legacyRoleRedirects = [
54:   ['/student/dashboard', '/s/dashboard'],
55:   ['/student/notices', '/s/notices'],
56:   ['/student/grades', '/s/grades'],
57:   ['/student/attendance', '/s/attendance'],
58:   ['/teacher/dashboard', '/t/dashboard'],
59:   ['/teacher/roster', '/t/roster'],
60:   ['/teacher/attendance', '/t/attendance'],
61:   ['/teacher/analytics', '/t/analytics'],
62:   ['/teacher/gradebook', '/t/gradebook'],
63:   ['/teacher/notices', '/t/notices'],
64:   ['/teacher/users/create', '/t/users/create'],
65:   ['/teacher/users/edit/:id', '/t/users/edit/:id'],
66:   ['/admin/dashboard', '/a/dashboard'],
67:   ['/admin/users', '/a/users'],
68:   ['/admin/users/create', '/a/users/create'],
69:   ['/admin/users/edit/:id', '/a/users/edit/:id'],
70:   ['/admin/notices', '/a/notices'],
71:   ['/admin/settings', '/a/settings'],
72:   ['/admin/website', '/a/website'],
73:   ['/admin/approvals', '/a/approvals'],
74:   ['/admin/application/:id', '/a/applications/:id'],
75:   ['/admin/assignments', '/a/assignments'],
76: ];
77: 
78: const shellChildren = [
79:   <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
80:   <Route key="parent" path="/p/home" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,
81: 
82:   // Student
83:   <Route key="sd" path="/s/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,
84:   <Route key="sn" path="/s/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,
85:   <Route key="sg" path="/s/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,
86:   <Route key="sa" path="/s/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,
87: 
88:   // Teacher
89:   <Route key="td" path="/t/dashboard" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />,
90:   <Route key="tr" path="/t/roster" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />,
91:   <Route key="tt" path="/t/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />,
92:   <Route key="ty" path="/t/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />,
93:   <Route key="tb" path="/t/gradebook" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />,
94:   <Route key="tn" path="/t/notices" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />,
95:   <Route key="tc" path="/t/users/create" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />,
96:   <Route key="te" path="/t/users/edit/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />,
97: 
98:   // Admin
99:   <Route key="ad" path="/a/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />,
100:   <Route key="au" path="/a/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserRoster /></ProtectedRoute>} />,
101:   <Route key="aun" path="/a/users/create" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />,
102:   <Route key="aue" path="/a/users/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUser /></ProtectedRoute>} />,
103:   <Route key="an" path="/a/notices" element={<ProtectedRoute allowedRoles={['admin']}><AdminNoticeBoard /></ProtectedRoute>} />,
104:   <Route key="as" path="/a/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />,
105:   <Route key="aw" path="/a/website" element={<ProtectedRoute allowedRoles={['admin']}><AdminWebsiteManager /></ProtectedRoute>} />,
106:   <Route key="aa" path="/a/approvals" element={<ProtectedRoute allowedRoles={['admin']}><AdminAppApproval /></ProtectedRoute>} />,
107:   <Route key="aap" path="/a/applications/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminApplicationDetails /></ProtectedRoute>} />,
108:   <Route key="aas" path="/a/assignments" element={<ProtectedRoute allowedRoles={['admin']}><AdminAssignments /></ProtectedRoute>} />,
109: 
110:   // Legacy role-route redirects (feature parity: old bookmarks keep working)
111:   ...legacyRoleRedirects.map(([from, to]) => (
112:     <Route key={from} path={from} element={<Navigate to={to} replace />} />
113:   )),
114: ];
115: 
116: function App() {
117:   return (
118:     <Router>
119:       <Routes>
120:         {/* PUBLIC + AUTH SITE */}
121:         <Route element={<PublicLayout />}>
122:           <Route path="/" element={<PublicPortal />} />
123:           <Route path="/admission" element={<PublicAdmission />} />
124:           <Route path="/founders" element={<PublicFounders />} />
125:           <Route path="/login" element={<Login />} />
126:           <Route path="/register" element={<Register />} />
127:           {/* Legacy public redirects */}
128:           <Route path="/public/admission" element={<Navigate to="/admission" replace />} />
129:           <Route path="/public/founders" element={<Navigate to="/founders" replace />} />
130:         </Route>
131: 
132:         {/* AUTHENTICATED WORKSPACE */}
133:         <Route element={<AppShell />}>{shellChildren}</Route>
134: 
135:         {/* Fallthrough */}
136:         <Route path="*" element={<Navigate to="/" replace />} />
137:       </Routes>
138:     </Router>
139:   );
140: }
141: 
142: export default App;

(End of file - total 142 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/core/api.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/core/api.js</path>
<type>file</type>
<content>
1: // src/core/api.js
2: // Single axios instance for the whole app.
3: //
4: //   • baseURL '/api'      → the API origin is hidden behind the Vite/Express proxy
5: //   • withCredentials     → HttpOnly session cookie travels with every request
6: //   • xsrfCookieName/…    → axios mirrors the double-submit `csrf` cookie into the
7: //                           X-CSRF-Token header automatically on state-changing calls
8: import axios from 'axios';
9: 
10: export const api = axios.create({
11:   baseURL: '/api',
12:   withCredentials: true,
13:   xsrfCookieName: 'csrf',
14:   xsrfHeaderName: 'X-CSRF-Token',
15:   timeout: 25000,
16: });
17: 
18: // Normalize any failure into a safe, user-facing string (never expose internals).
19: export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
20:   if (!err?.response) return err?.message === 'Network Error' ? 'Network error. Please check your connection.' : fallback;
21:   return err.response.data?.message || fallback;
22: };
23: 
24: export default api;

(End of file - total 24 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/core/nav.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/core/nav.js</path>
<type>file</type>
<content>
1: // src/core/nav.js
2: // Central role → landing-route + portal prefix mapping used by routing guards
3: // and the sidebar configuration.
4: 
5: export const rolePrefix = (role) => {
6:   if (role === 'admin') return 'a';
7:   if (role === 'teacher') return 't';
8:   if (role === 'parent') return 'p';
9:   return 's';
10: };
11: 
12: export const roleHome = (role) =>
13:   role === 'parent' ? '/p/home' : `/${rolePrefix(role)}/dashboard`;
14: 
15: export const roleLabel = (role) =>
16:   ({ admin: 'Administrator', teacher: 'Faculty Member', student: 'Student', parent: 'Parent' }[role] || 'Member');

(End of file - total 16 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/context/AuthContext.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/context/AuthContext.jsx</path>
<type>file</type>
<content>
1: // src/context/AuthContext.jsx
2: import { createContext, useContext, useState, useEffect } from 'react';
3: import { api, errorMessage } from '../core/api';
4: 
5: export const AuthContext = createContext(null);
6: 
7: export const AuthProvider = ({ children }) => {
8:   const [user, setUser] = useState(null);
9:   const [loading, setLoading] = useState(true);
10: 
11:   // Bootstrap the session from the HttpOnly cookie on first paint.
12:   useEffect(() => {
13:     let cancelled = false;
14:     (async () => {
15:       try {
16:         const res = await api.get('/auth/me');
17:         if (!cancelled && res.data?.user) setUser(res.data.user);
18:       } catch {
19:         /* no valid session — stay signed out */
20:       } finally {
21:         if (!cancelled) setLoading(false);
22:       }
23:     })();
24:     return () => { cancelled = true; };
25:   }, []);
26: 
27:   const login = async (email, password) => {
28:     try {
29:       const res = await api.post('/auth/login', { email, password });
30:       if (res.data?.twoFactorRequired) {
31:         // Password accepted — finish with a TOTP code.
32:         return { success: false, twoFactorRequired: true, user: res.data.user };
33:       }
34:       if (res.data?.user) setUser(res.data.user);
35:       return { success: true, user: res.data.user };
36:     } catch (err) {
37:       return { success: false, message: errorMessage(err, 'Login failed. Please check your credentials.') };
38:     }
39:   };
40: 
41:   // Completes a 2FA-gated login (preauth cookie already issued server-side).
42:   const verify2FA = async (code) => {
43:     try {
44:       const res = await api.post('/auth/2fa/verify', { code });
45:       if (res.data?.user) setUser(res.data.user);
46:       return { success: true, user: res.data.user };
47:     } catch (err) {
48:       return { success: false, message: errorMessage(err, 'Verification failed. Please check the code.') };
49:     }
50:   };
51: 
52:   const register = async (name, email, password) => {
53:     try {
54:       const res = await api.post('/auth/register', { name, email, password });
55:       if (res.data?.user) setUser(res.data.user);
56:       return { success: true, user: res.data.user };
57:     } catch (err) {
58:       return { success: false, message: errorMessage(err, 'Registration failed.') };
59:     }
60:   };
61: 
62:   const updateUser = (patch) => {
63:     setUser((prev) => (prev ? { ...prev, ...patch } : prev));
64:   };
65: 
66:   const logout = async () => {
67:     try {
68:       await api.post('/auth/logout');
69:     } catch {
70:       /* session cookie already gone — clear local state regardless */
71:     } finally {
72:       setUser(null);
73:     }
74:   };
75: 
76:   return (
77:     <AuthContext.Provider value={{ user, login, register, verify2FA, logout, updateUser, loading }}>
78:       {children}
79:     </AuthContext.Provider>
80:   );
81: };
82: 
83: export const useAuth = () => useContext(AuthContext);

(End of file - total 83 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 3.8s)

_Thinking:_

Now read navConfig, ProtectedRoute, layouts, ui, pagination, ToastContext, index.css, App.css, main.jsx. Also page headers/purpose can be gleaned by reading first ~60 lines of each page; but that's a lot. I can grep for `<h1` / page titles and api calls. Let me read key shared files and grep pages for titles and api endpoints.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/navConfig.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/navConfig.js</path>
<type>file</type>
<content>
1: // components/layout/navConfig.js
2: // Role-scoped navigation configuration consumed by the app sidebar.
3: import {
4:   IconDashboard,
5:   IconBell,
6:   IconBook,
7:   IconCalendar,
8:   IconUsers,
9:   IconChart,
10:   IconClipboard,
11:   IconPlus,
12:   IconShield,
13:   IconSparkles,
14:   IconHome,
15: } from '../icons.jsx';
16: 
17: export const NAV = {
18:   student: [
19:     { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },
20:     { to: '/s/notices', label: 'Notices', icon: IconBell },
21:     { to: '/s/grades', label: 'Report Card', icon: IconBook },
22:     { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },
23:   ],
24:   teacher: [
25:     { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },
26:     { to: '/t/roster', label: 'My Roster', icon: IconUsers },
27:     { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },
28:     { to: '/t/analytics', label: 'Analytics', icon: IconChart },
29:     { to: '/t/gradebook', label: 'Gradebook', icon: IconClipboard },
30:     { to: '/t/notices', label: 'Notices', icon: IconBell },
31:     { to: '/t/users/create', label: 'Add Student', icon: IconPlus },
32:   ],
33:   admin: [
34:     { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },
35:     { to: '/a/users', label: 'All Users', icon: IconUsers },
36:     { to: '/a/users/create', label: 'Create User', icon: IconPlus },
37:     { to: '/a/assignments', label: 'Assignments', icon: IconShield },
38:     { to: '/a/notices', label: 'Notices', icon: IconBell },
39:     { to: '/a/approvals', label: 'Admissions', icon: IconClipboard },
40:     { to: '/a/website', label: 'Public Website', icon: IconSparkles },
41:     { to: '/a/settings', label: 'Settings', icon: IconShield },
42:   ],
43:   parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],
44: };

(End of file - total 44 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/ProtectedRoute.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/ProtectedRoute.jsx</path>
<type>file</type>
<content>
1: // src/components/ProtectedRoute.jsx
2: import { useContext } from 'react';
3: import { Navigate } from 'react-router-dom';
4: import { AuthContext } from '../context/AuthContext';
5: import { Spinner } from './ui.jsx';
6: 
7: const ProtectedRoute = ({ children, allowedRoles }) => {
8:   const { user, loading } = useContext(AuthContext);
9: 
10:   if (loading) {
11:     return (
12:       <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
13:         <div className="flex flex-col items-center gap-3">
14:           <Spinner className="h-10 w-10" />
15:           <p className="text-sm font-medium text-slate-400">Loading your workspace...</p>
16:         </div>
17:       </div>
18:     );
19:   }
20: 
21:   if (!user) {
22:     return <Navigate to="/login" replace />;
23:   }
24: 
25:   const home = user.role === 'parent' ? '/p/home' : user.role === 'admin' ? '/a/dashboard' : user.role === 'teacher' ? '/t/dashboard' : '/s/dashboard';
26: 
27:   if (allowedRoles && !allowedRoles.includes(user.role)) {
28:     return <Navigate to={home} replace />;
29:   }
30: 
31:   return children;
32: };
33: 
34: export default ProtectedRoute;

(End of file - total 34 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/AppShell.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/AppShell.jsx</path>
<type>file</type>
<content>
1: // components/layout/AppShell.jsx
2: import { useState } from 'react';
3: import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
4: import { useAuth } from '../../context/AuthContext.jsx';
5: import { NAV } from './navConfig.js';
6: import Wordmark from './Wordmark.jsx';
7: import { roleLabel } from '../../core/nav.js';
8: import { IconLogOut, IconMenu, IconX } from '../icons.jsx';
9: 
10: const initials = (name) =>
11:   (name || '?')
12:     .split(' ')
13:     .map((p) => p[0])
14:     .filter(Boolean)
15:     .slice(0, 2)
16:     .join('')
17:     .toUpperCase();
18: 
19: const Avatar = ({ name, image, className = 'h-9 w-9 text-xs' }) => (
20:   image ? (
21:     <img src={image} alt="" className={`rounded-full object-cover ring-2 ring-white/20 ${className}`} />
22:   ) : (
23:     <span className={`flex items-center justify-center rounded-full bg-brand-500 font-bold text-white ring-2 ring-white/20 ${className}`}>
24:       {initials(name)}
25:     </span>
26:   )
27: );
28: 
29: const RailNav = ({ items, onNavigate }) => (
30:   <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Workspace">
31:     {items.map((item) => (
32:       <NavLink
33:         key={item.to}
34:         to={item.to}
35:         onClick={onNavigate}
36:         end={item.to === '/p/home'}
37:         className={({ isActive }) =>
38:           `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
39:             isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
40:           }`
41:         }
42:       >
43:         {({ isActive }) => (
44:           <>
45:             {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brass-400" />}
46:             <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-brass-300' : ''}`} />
47:             {item.label}
48:           </>
49:         )}
50:       </NavLink>
51:     ))}
52:   </nav>
53: );
54: 
55: const RailBody = ({ items, user, onNavigate }) => (
56:   <>
57:     <div className="flex h-16 items-center border-b border-white/10 px-5">
58:       <Link to="/" aria-label="Home" onClick={onNavigate}><Wordmark dark /></Link>
59:     </div>
60:     <RailNav items={items} onNavigate={onNavigate} />
61:     <div className="border-t border-white/10 p-3">
62:       <Link to="/profile" onClick={onNavigate} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5">
63:         <Avatar name={user.name} image={user.profileImage} />
64:         <div className="min-w-0 flex-1">
65:           <p className="truncate text-sm font-semibold text-white">{user.name}</p>
66:           <p className="truncate text-xs text-slate-400">{roleLabel(user.role)}</p>
67:         </div>
68:       </Link>
69:     </div>
70:   </>
71: );
72: 
73: export const AppShell = () => {
74:   const { user, logout } = useAuth();
75:   const navigate = useNavigate();
76:   const [drawer, setDrawer] = useState(false);
77:   const { pathname } = useLocation();
78: 
79:   if (!user) return null;
80: 
81:   const items = NAV[user.role] || NAV.student;
82:   const hasMore = items.length > 4;
83:   const bottomItems = hasMore ? items.slice(0, 3) : items;
84:   const current = items.find((i) => pathname.startsWith(i.to));
85:   const title = current ? current.label : 'Workspace';
86: 
87:   const onLogout = async () => {
88:     await logout();
89:     navigate('/', { replace: true });
90:   };
91: 
92:   return (
93:     <div className="min-h-screen bg-slate-50">
94:       {/* Desktop rail */}
95:       <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-brand-950 lg:flex">
96:         <RailBody items={items} user={user} />
97:       </aside>
98: 
99:       {/* Mobile slide-over drawer */}
100:       {drawer && (
101:         <div className="fixed inset-0 z-50 lg:hidden">
102:           <button
103:             className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
104:             aria-label="Close menu"
105:             onClick={() => setDrawer(false)}
106:           />
107:           <div className="animate-fade-in absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-brand-950 shadow-2xl">
108:             <button
109:               type="button"
110:               onClick={() => setDrawer(false)}
111:               className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
112:               aria-label="Close menu"
113:             >
114:               <IconX className="h-5 w-5" />
115:             </button>
116:             <RailBody items={items} user={user} onNavigate={() => setDrawer(false)} />
117:           </div>
118:         </div>
119:       )}
120: 
121:       {/* Main column */}
122:       <div className="lg:pl-64">
123:         <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/85 px-4 backdrop-blur sm:px-6">
124:           <div className="flex min-w-0 items-center gap-3">
125:             <button
126:               type="button"
127:               onClick={() => setDrawer(true)}
128:               className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
129:               aria-label="Open menu"
130:             >
131:               <IconMenu className="h-5 w-5" />
132:             </button>
133:             <div className="min-w-0">
134:               <p className="font-display truncate text-lg font-bold tracking-tight text-slate-900">{title}</p>
135:               <p className="hidden text-xs text-slate-500 sm:block">{roleLabel(user.role)} workspace</p>
136:             </div>
137:           </div>
138: 
139:           <div className="flex items-center gap-2.5">
140:             <Link
141:               to="/profile"
142:               className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 transition hover:border-slate-300"
143:             >
144:               <Avatar name={user.name} image={user.profileImage} className="h-8 w-8 text-xs" />
145:               <span className="hidden max-w-[10rem] truncate text-sm font-semibold text-slate-700 md:block">
146:                 {user.name}
147:               </span>
148:             </Link>
149:             <button
150:               type="button"
151:               onClick={onLogout}
152:               className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
153:               aria-label="Sign out"
154:               title="Sign out"
155:             >
156:               <IconLogOut className="h-5 w-5" />
157:             </button>
158:           </div>
159:         </header>
160: 
161:         <main className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
162:           <Outlet />
163:         </main>
164:       </div>
165: 
166:       {/* Mobile bottom navigation */}
167:       <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden" aria-label="Primary">
168:         <div className="mx-auto flex max-w-lg items-stretch">
169:           {bottomItems.map((item) => (
170:             <NavLink
171:               key={item.to}
172:               to={item.to}
173:               end={item.to === '/p/home'}
174:               className={({ isActive }) =>
175:                 `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
176:                   isActive ? 'text-brand-600' : 'text-slate-400'
177:                 }`
178:               }
179:             >
180:               {({ isActive }) => (
181:                 <>
182:                   <item.icon className={`h-5 w-5 ${isActive ? 'text-brand-600' : ''}`} />
183:                   <span className="truncate">{item.label}</span>
184:                 </>
185:               )}
186:             </NavLink>
187:           ))}
188:           {hasMore && (
189:             <button
190:               type="button"
191:               onClick={() => setDrawer(true)}
192:               className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-slate-400"
193:               aria-label="More navigation"
194:             >
195:               <IconMenu className="h-5 w-5" />
196:               <span>More</span>
197:             </button>
198:           )}
199:         </div>
200:       </nav>
201:     </div>
202:   );
203: };
204: 
205: export default AppShell;

(End of file - total 205 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/index.css"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/index.css</path>
<type>file</type>
<content>
1: @import "tailwindcss";
2: 
3: @theme {
4:   /* ---- Type system (self-hosted via @fontsource — CSP-safe) ---- */
5:   --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
6:   --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, sans-serif;
7:   --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
8: 
9:   /* ---- Brand palette — Deep Indigo (Aurora) ---- */
10:   --color-brand-50: #eef2ff;
11:   --color-brand-100: #e0e7ff;
12:   --color-brand-200: #c7d2fe;
13:   --color-brand-300: #a5b4fc;
14:   --color-brand-400: #818cf8;
15:   --color-brand-500: #6366f1;
16:   --color-brand-600: #4f46e5;
17:   --color-brand-700: #4338ca;
18:   --color-brand-800: #3730a3;
19:   --color-brand-900: #312e81;
20:   --color-brand-950: #1e1b4b;
21: 
22:   /* ---- Surface palette — cool slate (remaps every slate-* usage) ---- */
23:   --color-slate-50: #f8fafc;
24:   --color-slate-100: #f1f5f9;
25:   --color-slate-200: #e2e8f0;
26:   --color-slate-300: #cbd5e1;
27:   --color-slate-400: #94a3b8;
28:   --color-slate-500: #64748b;
29:   --color-slate-600: #475569;
30:   --color-slate-700: #334155;
31:   --color-slate-800: #1e293b;
32:   --color-slate-900: #0f172a;
33:   --color-slate-950: #020617;
34: 
35:   /* ---- Amber accent (vivid: badges, seals, key numbers, rules) ---- */
36:   --color-brass-100: #fef3c7;
37:   --color-brass-200: #fde68a;
38:   --color-brass-300: #fcd34d;
39:   --color-brass-400: #fbbf24;
40:   --color-brass-500: #f59e0b;
41:   --color-brass-600: #d97706;
42:   --color-brass-700: #b45309;
43: 
44:   /* ---- Motion — durations + easing tokens (120–320ms felt range) ---- */
45:   --motion-fast: 120ms;
46:   --motion-base: 200ms;
47:   --motion-slow: 320ms;
48:   --ease-accent: cubic-bezier(0.2, 0, 0, 1);
49: 
50:   --animate-fade-in: fade-in var(--motion-base) var(--ease-accent) both;
51:   --animate-fade-up: fade-up var(--motion-base) var(--ease-accent) both;
52:   --animate-scale-in: scale-in var(--motion-base) var(--ease-accent) both;
53:   --animate-shimmer: shimmer 2s linear infinite;
54:   --animate-slide-in-right: slide-in-right var(--motion-base) var(--ease-accent) both;
55: 
56:   @keyframes fade-in {
57:     from { opacity: 0; }
58:     to { opacity: 1; }
59:   }
60:   @keyframes fade-up {
61:     from { opacity: 0; transform: translateY(10px); }
62:     to { opacity: 1; transform: translateY(0); }
63:   }
64:   @keyframes scale-in {
65:     from { opacity: 0; transform: scale(0.96); }
66:     to { opacity: 1; transform: scale(1); }
67:   }
68:   @keyframes slide-in-right {
69:     from { opacity: 0; transform: translateX(24px); }
70:     to { opacity: 1; transform: translateX(0); }
71:   }
72:   @keyframes shimmer {
73:     from { background-position: 200% 0; }
74:     to { background-position: -200% 0; }
75:   }
76: }
77: 
78: @layer base {
79:   html {
80:     -webkit-font-smoothing: antialiased;
81:     text-rendering: optimizeLegibility;
82:     scroll-behavior: smooth;
83:   }
84: 
85:   body {
86:     background-color: var(--color-slate-50);
87:     color: var(--color-slate-800);
88:     font-family: var(--font-sans);
89:   }
90: 
91:   ::selection {
92:     background-color: var(--color-brand-100);
93:     color: var(--color-brand-900);
94:   }
95: 
96:   :focus-visible {
97:     outline: 2px solid var(--color-brand-500);
98:     outline-offset: 2px;
99:   }
100: 
101:   select {
102:     background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23334155' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
103:     background-position: right 0.75rem center;
104:     background-repeat: no-repeat;
105:     background-size: 1.25rem;
106:     appearance: none;
107:     padding-right: 2.5rem;
108:   }
109: }
110: 
111: @layer utilities {
112:   .text-balance {
113:     text-wrap: balance;
114:   }
115: 
116:   .font-display {
117:     font-family: var(--font-display);
118:     letter-spacing: -0.02em;
119:   }
120: 
121:   .font-mono-2 {
122:     font-family: var(--font-mono);
123:   }
124: 
125:   .bg-paper {
126:     background-color: var(--color-slate-50);
127:   }
128: 
129:   .hairline {
130:     border-color: var(--color-slate-200);
131:   }
132: 
133:   .brass-rule {
134:     background: linear-gradient(90deg, var(--color-brass-500), var(--color-brass-300));
135:   }
136: 
137:   /* Aurora swoosh used behind hero / rail surfaces */
138:   .aurora-gradient {
139:     background-image:
140:       radial-gradient(60% 90% at 15% 0%, rgb(99 102 241 / 0.35), transparent 60%),
141:       linear-gradient(135deg, var(--color-brand-800), var(--color-brand-950) 55%, var(--color-slate-950));
142:   }
143: 
144:   .ease-accent {
145:     transition-timing-function: var(--ease-accent);
146:   }
147: 
148:   /* Gentle lift used on interactive cards */
149:   .hover-lift {
150:     transition: transform var(--motion-fast) var(--ease-accent), box-shadow var(--motion-base) var(--ease-accent), border-color var(--motion-fast) var(--ease-accent);
151:   }
152:   .hover-lift:hover {
153:     transform: translateY(-2px);
154:     box-shadow: 0 12px 28px -14px rgb(15 23 42 / 0.28);
155:   }
156: 
157:   /* Elegant thin scrollbars for table overflow panels */
158:   .scrollbar-thin {
159:     scrollbar-width: thin;
160:     scrollbar-color: var(--color-slate-300) transparent;
161:   }
162:   .scrollbar-thin::-webkit-scrollbar {
163:     height: 8px;
164:     width: 8px;
165:   }
166:   .scrollbar-thin::-webkit-scrollbar-thumb {
167:     border-radius: 9999px;
168:     background-color: var(--color-slate-300);
169:   }
170:   .scrollbar-thin::-webkit-scrollbar-track {
171:     background: transparent;
172:   }
173: }
174: 
175: /* Accessibility: fully disable motion for users who opt out */
176: @media (prefers-reduced-motion: reduce) {
177:   *, *::before, *::after {
178:     animation-duration: 0.01ms !important;
179:     animation-iteration-count: 1 !important;
180:     transition-duration: 0.01ms !important;
181:     scroll-behavior: auto !important;
182:   }
183: }

(End of file - total 183 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/App.css"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/App.css</path>
<type>file</type>
<content>
1: /* Global app-level visual helpers kept separate from Tailwind utilities. */
2: 
3: /* Headline gradient accent used on hero/page headers */
4: .brand-gradient-text {
5:   background: linear-gradient(90deg, var(--color-brand-600), #0ea5e9);
6:   -webkit-background-clip: text;
7:   background-clip: text;
8:   color: transparent;
9: }

(End of file - total 9 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/ui.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/ui.jsx</path>
<type>file</type>
<content>
1: // src/components/ui.jsx
2: // Shared presentational building blocks for a consistent design system.
3: // These are purely visual — all data logic lives in the page components.
4: 
5: import { IconCheckCircle, IconAlert, IconClipboard } from "./icons.jsx";
6: 
7: export const Spinner = ({ className = "h-8 w-8", tone = "brand" }) => (
8:   <div
9:     className={`animate-spin rounded-full border-2 ${
10:       tone === "light" ? "border-white/30 border-t-white" : "border-slate-200 border-t-brand-500"
11:     } ${className}`}
12:     role="status"
13:     aria-label="Loading"
14:   />
15: );
16: 
17: export const FullScreenLoader = ({ label = "Loading..." }) => (
18:   <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
19:     <Spinner className="h-10 w-10" />
20:     <p className="text-sm font-medium text-slate-400">{label}</p>
21:   </div>
22: );
23: 
24: export const PageContainer = ({ children, className = "" }) => (
25:   <div className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${className}`}>
26:     {children}
27:   </div>
28: );
29: 
30: export const Card = ({ children, className = "" }) => (
31:   <div className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgb(15_23_42/0.05)] ${className}`}>
32:     {children}
33:   </div>
34: );
35: 
36: const BADGE_TONES = {
37:   slate: "bg-slate-100 text-slate-600 ring-slate-200",
38:   indigo: "bg-brand-50 text-brand-700 ring-brand-200",
39:   emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
40:   teal: "bg-teal-50 text-teal-700 ring-teal-200",
41:   amber: "bg-amber-50 text-amber-700 ring-amber-200",
42:   rose: "bg-rose-50 text-rose-700 ring-rose-200",
43:   sky: "bg-sky-50 text-sky-700 ring-sky-200",
44:   violet: "bg-violet-50 text-violet-700 ring-violet-200",
45:   slateDark: "bg-slate-900 text-white ring-slate-800",
46: };
47: 
48: export const Badge = ({ children, tone = "slate", className = "" }) => (
49:   <span
50:     className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
51:       BADGE_TONES[tone] || BADGE_TONES.slate
52:     } ${className}`}
53:   >
54:     {children}
55:   </span>
56: );
57: 
58: const STAT_TONES = {
59:   indigo: "from-brand-500 to-brand-700",
60:   emerald: "from-emerald-500 to-teal-600",
61:   teal: "from-teal-500 to-cyan-600",
62:   amber: "from-amber-400 to-orange-500",
63:   rose: "from-rose-500 to-pink-600",
64:   sky: "from-sky-500 to-cyan-600",
65:   violet: "from-violet-500 to-purple-600",
66:   slate: "from-slate-500 to-slate-700",
67: };
68: 
69: export const StatCard = ({ label, value, sub, icon, tone = "indigo", className = "" }) => (
70:   <Card className={`p-5 ${className}`}>
71:     <div className="flex items-start justify-between gap-3">
72:       <div className="min-w-0">
73:         <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
74:         <p className="font-display mt-1.5 truncate text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
75:         {sub && <p className="mt-1 truncate text-sm text-slate-500">{sub}</p>}
76:       </div>
77:       {icon && (
78:         <div
79:           className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${STAT_TONES[tone]} text-white shadow-sm`}
80:         >
81:           {icon}
82:         </div>
83:       )}
84:     </div>
85:   </Card>
86: );
87: 
88: export const EmptyState = ({ title = "Nothing here yet", message, children }) => (
89:   <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-12 text-center">
90:     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
91:       {children || <IconClipboard className="h-5 w-5" />}
92:     </div>
93:     <p className="mt-1 text-sm font-semibold text-slate-700">{title}</p>
94:     {message && <p className="max-w-md text-sm text-slate-500">{message}</p>}
95:   </div>
96: );
97: 
98: const MESSAGE_STYLES = {
99:   error: "border-rose-200 bg-rose-50 text-rose-700",
100:   success: "border-emerald-200 bg-emerald-50 text-emerald-700",
101:   info: "border-sky-200 bg-sky-50 text-sky-700",
102: };
103: 
104: export const MessageBanner = ({ message }) => {
105:   if (!message || !message.text) return null;
106:   const type = message.type === "error" ? "error" : message.type === "success" ? "success" : "info";
107:   const Icon = type === "error" ? IconAlert : IconCheckCircle;
108:   return (
109:     <div className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${MESSAGE_STYLES[type]}`}>
110:       <Icon className="h-4.5 w-4.5 shrink-0" />
111:       <span>{message.text}</span>
112:     </div>
113:   );
114: };
115: 
116: export const BackButton = ({ onClick, children = "Back" }) => (
117:   <button
118:     type="button"
119:     onClick={onClick}
120:     className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
121:   >
122:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
123:       <polyline points="15 18 9 12 15 6" />
124:     </svg>
125:     {children}
126:   </button>
127: );
128: 
129: export const PageHeader = ({ title, subtitle, badge, actions, className = "" }) => (
130:   <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
131:     <div className="min-w-0">
132:       <div className="flex flex-wrap items-center gap-2.5">
133:         <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
134:         {badge}
135:       </div>
136:       {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
137:     </div>
138:     {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
139:   </div>
140: );
141: 
142: // Shared input / label styles so every form in the app looks identical.
143: export const inputClass =
144:   "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";
145: 
146: export const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500";
147: 
148: export const btnPrimary =
149:   "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:cursor-not-allowed disabled:opacity-60";
150: 
151: export const btnSecondary =
152:   "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60";
153: 
154: export const btnDanger =
155:   "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/40 disabled:cursor-not-allowed disabled:opacity-60";
156: 
157: export const btnDark =
158:   "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500/40 disabled:cursor-not-allowed disabled:opacity-60";
159: 
160: export const tableWrap =
161:   "scrollbar-thin overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm";
162: 
163: export const thClass =
164:   "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500";
165: 
166: export const tdClass = "px-4 py-3 text-sm text-slate-700";

(End of file - total 166 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/context/ToastContext.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/context/ToastContext.jsx</path>
<type>file</type>
<content>
1: // src/context/ToastContext.jsx
2: // Unified, app-wide transient notification system. Success/error/info notices
3: // are pushed here and rendered through a portal so they float above any layout.
4: import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
5: import { createPortal } from 'react-dom';
6: import { IconAlert, IconBell, IconCheckCircle, IconX } from '../components/icons.jsx';
7: 
8: const ToastContext = createContext(null);
9: 
10: const TONES = {
11:   success: { wrap: 'border-emerald-200 bg-emerald-50', text: 'text-emerald-900', icon: 'text-emerald-600', Icon: IconCheckCircle },
12:   error: { wrap: 'border-rose-200 bg-rose-50', text: 'text-rose-900', icon: 'text-rose-600', Icon: IconAlert },
13:   info: { wrap: 'border-sky-200 bg-sky-50', text: 'text-sky-900', icon: 'text-sky-600', Icon: IconBell },
14: };
15: 
16: const DEFAULT_DURATION = { success: 4000, info: 4500, error: 6500 };
17: 
18: // Fallback so components can call useToast() even outside a provider (no crash).
19: const noopToast = {
20:   push: () => {},
21:   success: () => {},
22:   error: () => {},
23:   info: () => {},
24:   dismiss: () => {},
25: };
26: 
27: export const useToast = () => useContext(ToastContext) || noopToast;
28: 
29: export const ToastProvider = ({ children }) => {
30:   const [toasts, setToasts] = useState([]);
31:   const counter = useRef(0);
32: 
33:   const dismiss = useCallback((id) => {
34:     setToasts((prev) => prev.filter((t) => t.id !== id));
35:   }, []);
36: 
37:   const push = useCallback(
38:     (text, type = 'info', duration) => {
39:       if (!text) return null;
40:       const id = (counter.current += 1);
41:       const tone = TONES[type] ? type : 'info';
42:       // Keep the stack bounded so a burst of events never fills the viewport.
43:       setToasts((prev) => [...prev.slice(-3), { id, text, type: tone }]);
44:       const ms = duration ?? DEFAULT_DURATION[tone];
45:       if (ms) setTimeout(() => dismiss(id), ms);
46:       return id;
47:     },
48:     [dismiss]
49:   );
50: 
51:   const api = useMemo(
52:     () => ({
53:       push,
54:       dismiss,
55:       success: (text, duration) => push(text, 'success', duration),
56:       error: (text, duration) => push(text, 'error', duration),
57:       info: (text, duration) => push(text, 'info', duration),
58:     }),
59:     [push, dismiss]
60:   );
61: 
62:   return (
63:     <ToastContext.Provider value={api}>
64:       {children}
65:       {createPortal(
66:         <div
67:           className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:items-end"
68:           role="region"
69:           aria-label="Notifications"
70:         >
71:           {toasts.map((t) => {
72:             const tone = TONES[t.type] || TONES.info;
73:             const { Icon } = tone;
74:             return (
75:               <div
76:                 key={t.id}
77:                 role={t.type === 'error' ? 'alert' : 'status'}
78:                 aria-live={t.type === 'error' ? 'assertive' : 'polite'}
79:                 className={`animate-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg shadow-slate-900/5 ${tone.wrap}`}
80:               >
81:                 <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone.icon}`} />
82:                 <p className={`flex-1 text-sm font-medium ${tone.text}`}>{t.text}</p>
83:                 <button
84:                   type="button"
85:                   onClick={() => dismiss(t.id)}
86:                   aria-label="Dismiss notification"
87:                   className={`-mr-1 rounded-lg p-1 transition hover:bg-black/5 ${tone.icon}`}
88:                 >
89:                   <IconX className="h-4 w-4" />
90:                 </button>
91:               </div>
92:             );
93:           })}
94:         </div>,
95:         document.body
96:       )}
97:     </ToastContext.Provider>
98:   );
99: };

(End of file - total 99 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/main.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/main.jsx</path>
<type>file</type>
<content>
1: // src/main.jsx
2: import React from 'react'
3: import ReactDOM from 'react-dom/client'
4: 
5: // Self-hosted fonts (no external CDN → keeps CSP tight)
6: import '@fontsource/plus-jakarta-sans/400.css'
7: import '@fontsource/plus-jakarta-sans/500.css'
8: import '@fontsource/plus-jakarta-sans/600.css'
9: import '@fontsource/plus-jakarta-sans/700.css'
10: import '@fontsource/plus-jakarta-sans/800.css'
11: import '@fontsource/ibm-plex-mono/400.css'
12: import '@fontsource/ibm-plex-mono/500.css'
13: import '@fontsource/ibm-plex-mono/600.css'
14: 
15: import App from './App.jsx'
16: import './index.css'
17: import { AuthProvider } from './context/AuthContext.jsx'
18: import { ToastProvider } from './context/ToastContext.jsx'
19: 
20: ReactDOM.createRoot(document.getElementById('root')).render(
21:   <React.StrictMode>
22:     <ToastProvider>
23:       <AuthProvider>
24:         <App />
25:       </AuthProvider>
26:     </ToastProvider>
27:   </React.StrictMode>,
28: )

(End of file - total 28 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 5.1s)

_Thinking:_

Now I need page purposes and features. Let me grep each page for h1/PageHeader titles and api calls. Use grep with pattern "PageHeader|title=|api\.(get|post|put|patch|delete)" across pages. Could be large. Let me do targeted extraction with a node script? Instructions prefer grep. Use grep patterns.

Let me grep for `PageHeader` and `title` in pages, and for `api.` calls. Also layouts PublicHeader/Portal/Footer/Wordmark, TwoFactorModal, Pagination, usePagination.

Let me batch.

**Tool: bash**

**Input:**
```json
{
  "command": "rg -n --no-heading \"PageHeader|title=\\\"|<h1\" src/pages | head -120",
  "workdir": "/home/sajidasim/school-management-system/frontend"
}
```

**Output:**
```
zsh:1: command not found: rg

```

**Tool: bash**

**Input:**
```json
{
  "command": "rg -n --no-heading \"api\\.(get|post|put|patch|delete)\\(\" src/pages src/components | sed 's/[[:space:]]\\+/ /g' | head -200",
  "workdir": "/home/sajidasim/school-management-system/frontend"
}
```

**Output:**
```
zsh:1: command not found: rg

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/PublicHeader.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/PublicHeader.jsx</path>
<type>file</type>
<content>
1: // components/layout/PublicHeader.jsx
2: import { useState } from 'react';
3: import { Link, NavLink } from 'react-router-dom';
4: import Wordmark from './Wordmark.jsx';
5: import { IconMenu, IconX } from '../icons.jsx';
6: 
7: const links = [
8:   { to: '/', label: 'Home' },
9:   { to: '/admission', label: 'Admission' },
10:   { to: '/founders', label: 'Our Founders' },
11: ];
12: 
13: export const PublicHeader = () => {
14:   const [open, setOpen] = useState(false);
15: 
16:   return (
17:     <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/85 backdrop-blur">
18:       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
19:         <Link to="/" aria-label="Scholaris home" className="shrink-0">
20:           <Wordmark />
21:         </Link>
22: 
23:         <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
24:           {links.map((l) => (
25:             <NavLink
26:               key={l.to}
27:               to={l.to}
28:               end={l.to === '/'}
29:               className={({ isActive }) =>
30:                 `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
31:                   isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
32:                 }`
33:               }
34:             >
35:               {l.label}
36:             </NavLink>
37:           ))}
38:         </nav>
39: 
40:         <div className="hidden items-center gap-2 md:flex">
41:           <Link
42:             to="/login"
43:             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
44:           >
45:             Sign in
46:           </Link>
47:           <Link
48:             to="/register"
49:             className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
50:           >
51:             Create account
52:           </Link>
53:         </div>
54: 
55:         <button
56:           type="button"
57:           onClick={() => setOpen((v) => !v)}
58:           className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 md:hidden"
59:           aria-label={open ? 'Close menu' : 'Open menu'}
60:           aria-expanded={open}
61:         >
62:           {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
63:         </button>
64:       </div>
65: 
66:       {open && (
67:         <div className="animate-fade-in border-t border-slate-200/80 bg-slate-50 md:hidden">
68:           <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3" aria-label="Mobile">
69:             {links.map((l) => (
70:               <NavLink
71:                 key={l.to}
72:                 to={l.to}
73:                 end={l.to === '/'}
74:                 onClick={() => setOpen(false)}
75:                 className={({ isActive }) =>
76:                   `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
77:                     isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
78:                   }`
79:                 }
80:               >
81:                 {l.label}
82:               </NavLink>
83:             ))}
84:             <div className="flex gap-2 pt-2">
85:               <Link
86:                 to="/login"
87:                 onClick={() => setOpen(false)}
88:                 className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
89:               >
90:                 Sign in
91:               </Link>
92:               <Link
93:                 to="/register"
94:                 onClick={() => setOpen(false)}
95:                 className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
96:               >
97:                 Create account
98:               </Link>
99:             </div>
100:           </nav>
101:         </div>
102:       )}
103:     </header>
104:   );
105: };
106: 
107: export default PublicHeader;

(End of file - total 107 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/PublicLayout.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/PublicLayout.jsx</path>
<type>file</type>
<content>
1: // components/layout/PublicLayout.jsx
2: import { Outlet } from 'react-router-dom';
3: import PublicHeader from './PublicHeader.jsx';
4: import PublicFooter from './PublicFooter.jsx';
5: 
6: export const PublicLayout = () => (
7:   <div className="flex min-h-screen flex-col">
8:     <PublicHeader />
9:     <main className="flex-grow">
10:       <Outlet />
11:     </main>
12:     <PublicFooter />
13:   </div>
14: );
15: 
16: export default PublicLayout;

(End of file - total 16 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/TwoFactorModal.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/TwoFactorModal.jsx</path>
<type>file</type>
<content>
1: // src/components/TwoFactorModal.jsx
2: import { useState } from 'react';
3: import { useAuth } from '../context/AuthContext.jsx';
4: import { IconShield, IconX } from './icons.jsx';
5: import { inputClass } from './ui.jsx';
6: 
7: // mode = 'login'  → completes the 2FA step of a sign-in (preauth cookie already set)
8: // mode = 'setup'  → confirms a freshly generated TOTP secret (QR + manual key shown)
9: const TwoFactorModal = ({ mode = 'login', qrCode, secret, onClose, onSuccess }) => {
10:   const { verify2FA } = useAuth();
11:   const [code, setCode] = useState('');
12:   const [error, setError] = useState('');
13:   const [loading, setLoading] = useState(false);
14: 
15:   const handleSubmit = async (e) => {
16:     e.preventDefault();
17:     setError('');
18:     setLoading(true);
19:     const res = await verify2FA(code.trim());
20:     setLoading(false);
21:     if (res.success) {
22:       onSuccess?.(res.user);
23:     } else {
24:       setError(res.message);
25:     }
26:   };
27: 
28:   return (
29:     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
30:       <div className="w-full max-w-sm animate-scale-in rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
31:         <div className="flex items-start justify-between">
32:           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
33:             <IconShield className="h-6 w-6" />
34:           </div>
35:           <button
36:             type="button"
37:             onClick={onClose}
38:             className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
39:             aria-label="Close"
40:           >
41:             <IconX className="h-5 w-5" />
42:           </button>
43:         </div>
44: 
45:         <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-slate-900">
46:           Two-Factor Authentication
47:         </h3>
48:         <p className="mt-1 text-sm text-slate-500">
49:           {mode === 'setup'
50:             ? 'Scan the code with your authenticator app, then confirm it with a 6-digit code.'
51:             : 'Enter the 6-digit code from your authenticator app to finish signing in.'}
52:         </p>
53: 
54:         {mode === 'setup' && qrCode && (
55:           <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
56:             <img src={qrCode} alt="QR code for authenticator setup" className="h-40 w-40 rounded-lg bg-white p-1" />
57:             {secret && (
58:               <div className="w-full">
59:                 <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
60:                   Manual entry key
61:                 </p>
62:                 <code className="block w-full rounded-lg bg-white px-3 py-2 text-xs break-all text-brand-700 ring-1 ring-slate-200">
63:                   {secret}
64:                 </code>
65:               </div>
66:             )}
67:           </div>
68:         )}
69: 
70:         {error && (
71:           <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
72:             {error}
73:           </div>
74:         )}
75: 
76:         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
77:           <input
78:             type="text"
79:             inputMode="numeric"
80:             pattern="[0-9]*"
81:             maxLength={6}
82:             placeholder="123456"
83:             value={code}
84:             onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
85:             required
86:             className={`${inputClass} text-center text-lg tracking-[0.5em]`}
87:             autoFocus
88:           />
89:           <div className="flex gap-3">
90:             <button
91:               type="submit"
92:               disabled={loading}
93:               className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
94:             >
95:               {loading ? 'Verifying...' : mode === 'setup' ? 'Enable 2FA' : 'Verify'}
96:             </button>
97:             <button
98:               type="button"
99:               onClick={onClose}
100:               className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
101:             >
102:               Cancel
103:             </button>
104:           </div>
105:         </form>
106:       </div>
107:     </div>
108:   );
109: };
110: 
111: export default TwoFactorModal;

(End of file - total 111 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/Pagination.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/Pagination.jsx</path>
<type>file</type>
<content>
1: // src/components/Pagination.jsx
2: // Reusable client-side pagination controls for large tables/lists.
3: import { IconBack } from './icons.jsx';
4: 
5: const PAGE_SIZES = [10, 20, 50];
6: 
7: export const Pagination = ({ page, pageCount, setPage, pageSize, setPageSize, from, to, total, itemLabel = 'items' }) => {
8:   if (total === 0) return null;
9: 
10:   const numbers = [];
11:   const start = Math.max(1, page - 1);
12:   const end = Math.min(pageCount, page + 1);
13:   if (start > 1) {
14:     numbers.push(1);
15:     if (start > 2) numbers.push('…');
16:   }
17:   for (let i = start; i <= end; i += 1) numbers.push(i);
18:   if (end < pageCount) {
19:     if (end < pageCount - 1) numbers.push('…');
20:     numbers.push(pageCount);
21:   }
22: 
23:   const navBtn =
24:     'inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40';
25: 
26:   return (
27:     <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
28:       <div className="flex items-center gap-3 text-xs text-slate-500">
29:         <span>
30:           Showing <b className="text-slate-700">{from}</b>–<b className="text-slate-700">{to}</b> of{' '}
31:           <b className="text-slate-700">{total}</b> {itemLabel}
32:         </span>
33:         {setPageSize && (
34:           <label className="flex items-center gap-1.5">
35:             <span className="hidden sm:inline">Rows</span>
36:             <select
37:               value={pageSize}
38:               onChange={(e) => setPageSize(Number(e.target.value))}
39:               className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 focus:border-brand-500 focus:outline-none"
40:             >
41:               {PAGE_SIZES.map((n) => (
42:                 <option key={n} value={n}>{n}</option>
43:               ))}
44:             </select>
45:           </label>
46:         )}
47:       </div>
48: 
49:       {pageCount > 1 && (
50:         <div className="flex items-center gap-1">
51:           <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1} className={navBtn} aria-label="Previous page">
52:             <IconBack className="h-3.5 w-3.5" />
53:           </button>
54:           {numbers.map((n, i) =>
55:             n === '…' ? (
56:               <span key={`gap-${i}`} className="px-1 text-xs text-slate-400">…</span>
57:             ) : (
58:               <button
59:                 key={n}
60:                 type="button"
61:                 onClick={() => setPage(n)}
62:                 aria-current={n === page ? 'page' : undefined}
63:                 className={
64:                   n === page
65:                     ? 'inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-brand-600 px-2 text-xs font-bold text-white'
66:                     : navBtn
67:                 }
68:               >
69:                 {n}
70:               </button>
71:             )
72:           )}
73:           <button
74:             type="button"
75:             onClick={() => setPage(page + 1)}
76:             disabled={page === pageCount}
77:             className={`${navBtn} rotate-180`}
78:             aria-label="Next page"
79:           >
80:             <IconBack className="h-3.5 w-3.5" />
81:           </button>
82:         </div>
83:       )}
84:     </div>
85:   );
86: };

(End of file - total 86 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/usePagination.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/usePagination.js</path>
<type>file</type>
<content>
1: // src/components/usePagination.js
2: // Client-side pagination state shared by list/table views.
3: import { useState } from 'react';
4: 
5: // Slices `items` into pages. Resets to the first page whenever the list,
6: // page size, or resetKey (e.g. active tab) changes, and clamps the current
7: // page when the derived page count shrinks. State is adjusted during render
8: // so derived values stay consistent immediately.
9: export const usePagination = (items, initialPageSize = 10, resetKey) => {
10:   const [page, setPage] = useState(1);
11:   const [pageSize, setPageSize] = useState(initialPageSize);
12:   const [view, setView] = useState([items.length, pageSize, resetKey]);
13:   const total = items.length;
14: 
15:   if (view[0] !== total || view[1] !== pageSize || view[2] !== resetKey) {
16:     setView([total, pageSize, resetKey]);
17:     setPage(1);
18:   }
19: 
20:   const pageCount = Math.max(1, Math.ceil(total / pageSize));
21:   const safePage = Math.min(page, pageCount);
22:   const start = (safePage - 1) * pageSize;
23:   return {
24:     page: safePage,
25:     setPage,
26:     pageSize,
27:     setPageSize,
28:     pageCount,
29:     pageItems: items.slice(start, start + pageSize),
30:     total,
31:     from: total === 0 ? 0 : start + 1,
32:     to: Math.min(start + pageSize, total),
33:   };
34: };

(End of file - total 34 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 3.8s)

_Thinking:_

rg not available. Use grep tool instead. Let me use the grep tool for page headers and api calls. The grep tool searches contents. I'll do two greps across pages. Also read Wordmark and PublicFooter briefly.

**Tool: grep**

**Input:**
```json
{
  "pattern": "PageHeader|title=\"|title=|text=\\\"|h1",
  "path": "/home/sajidasim/school-management-system/frontend/src/pages",
  "include": "*.jsx"
}
```

**Output:**
```
Found 87 matches
/home/sajidasim/school-management-system/frontend/src/pages/parent/ParentHome.jsx:
  Line 42:             <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">

  Line 44:             </h1>


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminSettings.jsx:
  Line 6:   PageHeader,

  Line 86:         <PageHeader

  Line 87:           title="Global institution settings"

  Line 88:           subtitle="Control the class names, active subjects and exam terms populated inside system dropdowns."


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminDashboard.jsx:
  Line 54:               <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">

  Line 56:               </h1>


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherGradebook.jsx:
  Line 6:   PageHeader,

  Line 162:           <PageHeader

  Line 163:             title="Subject gradebook"

  Line 164:             subtitle="Record marks across class, subject and term. Class teachers can publish results live."

  Line 167:             title="No subjects assigned"

  Line 178:         <PageHeader

  Line 179:           title="Subject gradebook"

  Line 180:           subtitle="Record marks across class, subject and term. Class teachers can publish results live."


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminCreateUser.jsx:
  Line 7:   PageHeader,

  Line 123:         <PageHeader

  Line 124:           title="Create new account"

  Line 125:           subtitle="Generate centralized credentials and register institutional data records."


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherEditStudent.jsx:
  Line 91:               <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Modify Student Parameters</h1>


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminNoticeBoard.jsx:
  Line 6:   PageHeader,

  Line 133:         <PageHeader

  Line 134:           title="Broadcast center"

  Line 135:           subtitle="Publish institutional news alerts, announcements and attach official circular PDFs globally."

  Line 190:               title="No notices published"


/home/sajidasim/school-management-system/frontend/src/pages/shared/NoticeBoard.jsx:
  Line 51:             <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 53:             </h1>

  Line 64:             title="No circulars in your scope"


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherDashboard.jsx:
  Line 23:               <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome, {firstName}</h1>


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAppApproval.jsx:
  Line 6:   PageHeader,

  Line 90:         <PageHeader

  Line 91:           title="Admission oversight desk"

  Line 92:           subtitle="Approve incoming parent forms, review mobile-wallet records, and search matching student archives."

  Line 117:             <EmptyState title={emptyCopy[subTab].title} message={emptyCopy[subTab].message} />


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminUserRoster.jsx:
  Line 8:   PageHeader,

  Line 122:                 <PageHeader

  Line 123:                     title="User Control Matrix"

  Line 124:                     subtitle="Directory of registered students and active faculty across the institution."


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminWebsiteManager.jsx:
  Line 6:   PageHeader,

  Line 107:         <PageHeader

  Line 108:           title="Public landing layout editor"

  Line 109:           subtitle="Alter public text parameters and manage leadership cards on the main homepage gallery."


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherCreateStudent.jsx:
  Line 94:             <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Add Class Student</h1>


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherRoster.jsx:
  Line 97:             <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 99:             </h1>

  Line 121:             title="No students assigned"


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAssignments.jsx:
  Line 7:   PageHeader,

  Line 139:         <PageHeader

  Line 140:           title="Teaching assignments"

  Line 141:           subtitle="Map each teacher to the subjects and classes they are authorised to grade, and flag class teachers."

  Line 209:             <EmptyState title="No assignments found" message="Create an assignment above or clear the active filters." />


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherAnalytics.jsx:
  Line 98:             <h1 className="font-display flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900">

  Line 100:             </h1>


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminApplicationDetails.jsx:
  Line 6:   PageHeader,

  Line 94:         <PageHeader

  Line 95:           title={`Applicant dossier: ${app.studentNameEn}`}

  Line 96:           subtitle={`Voucher reference #${app._id.slice(-8).toUpperCase()}`}


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminEditUser.jsx:
  Line 8:   PageHeader,

  Line 155:         <PageHeader

  Line 156:           title="Manage user profile"

  Line 157:           subtitle="Update institutional parameters, academic records and portal access."

  Line 184:                 <h1 className="font-display text-xl font-semibold tracking-tight text-slate-900">{name}</h1>

  Line 336:                 title="No attendance history"

  Line 355:                   title="No grade records yet"


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicAdmission.jsx:
  Line 100:               <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 102:               </h1>


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicPortal.jsx:
  Line 35:               <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">

  Line 37:               </h1>


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentNotices.jsx:
  Line 43:             <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 45:             </h1>

  Line 56:             title="No circulars published"


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicFounders.jsx:
  Line 29:             <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">

  Line 31:             </h1>

  Line 50:             title="No board profiles yet"


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentDashboard.jsx:
  Line 46:             <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">

  Line 48:             </h1>


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentAttendanceHub.jsx:
  Line 119:               <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 121:               </h1>


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentGrades.jsx:
  Line 43:             <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">

  Line 45:             </h1>

  Line 56:             title="No grade sheets published"


/home/sajidasim/school-management-system/frontend/src/pages/auth/Login.jsx:
  Line 61:           <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">

  Line 63:           </h1>


/home/sajidasim/school-management-system/frontend/src/pages/auth/Register.jsx:
  Line 55:           <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900">

  Line 57:           </h1>


/home/sajidasim/school-management-system/frontend/src/pages/auth/Profile.jsx:
  Line 91:               <h1 className="font-display text-xl font-semibold tracking-tight">Account Settings</h1>

```

**Tool: grep**

**Input:**
```json
{
  "pattern": "api\\.(get|post|put|patch|delete)\\(",
  "path": "/home/sajidasim/school-management-system/frontend/src",
  "include": "*.jsx"
}
```

**Output:**
```
Found 73 matches
/home/sajidasim/school-management-system/frontend/src/context/AuthContext.jsx:
  Line 16:         const res = await api.get('/auth/me');

  Line 29:       const res = await api.post('/auth/login', { email, password });

  Line 44:       const res = await api.post('/auth/2fa/verify', { code });

  Line 54:       const res = await api.post('/auth/register', { name, email, password });

  Line 68:       await api.post('/auth/logout');


/home/sajidasim/school-management-system/frontend/src/pages/parent/ParentHome.jsx:
  Line 19:         const { data } = await api.get('/notices');


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminSettings.jsx:
  Line 34:       const { data } = await api.get('/config');

  Line 47:       await api.post('/config/update', { classes, subjects, examTerms });


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherGradebook.jsx:
  Line 63:           api.get('/teacher/my-scope'),

  Line 64:           api.get('/config'),

  Line 89:       const { data } = await api.get(`/grades/class/${activeClass}/subject/${activeSubject}/term/${selectedTerm}`);

  Line 124:       await api.post('/grades/bulk-submit', payload);

  Line 136:       await api.post('/grades/toggle-publish', payload);


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherRoster.jsx:
  Line 37:       const { data } = await api.get('/teacher/my-class', { params: classId ? { classId } : {} });

  Line 67:       await api.delete(`/teacher/users/delete/${targetDeleteId}`, { data: { password: confirmPassword } });


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherAnalytics.jsx:
  Line 32:       const { data } = await api.get(`/teacher/attendance-analytics/${targetClass}`);

  Line 38:         const historyRes = await api.get(`/attendance/${encodeURIComponent(targetClass)}`);

  Line 55:         const classRes = await api.get('/teacher/my-class');


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminDashboard.jsx:
  Line 19:         const { data } = await api.get('/auth/dashboard-stats');


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherEditStudent.jsx:
  Line 28:         const configRes = await api.get('/config');

  Line 31:         const { data } = await api.get('/teacher/my-scope');

  Line 63:       await api.put(`/teacher/users/edit/${id}`, payload);


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentNotices.jsx:
  Line 17:         const { data } = await api.get('/notices');


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminCreateUser.jsx:
  Line 43:         const { data } = await api.get('/config');

  Line 62:         const { data } = await api.get('/auth/users');

  Line 101:       await api.post('/auth/users/create', payload);


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAssignments.jsx:
  Line 43:         api.get('/admin/assignments'),

  Line 44:         api.get('/auth/users', { params: { role: 'teacher' } }),

  Line 45:         api.get('/config'),

  Line 83:       await api.post('/admin/assignments', {

  Line 103:       await api.patch(`/admin/assignments/${assignment._id}`, { isClassTeacher: !assignment.isClassTeacher });

  Line 118:       await api.delete(`/admin/assignments/${assignment._id}`);


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherAttendance.jsx:
  Line 43:       const { data } = await api.get('/teacher/my-class');

  Line 54:       const { data } = await api.get(`/teacher/attendance-calendar-heatmap/${assignedClass}`, {

  Line 85:       const classRes = await api.get('/teacher/my-class');

  Line 88:       const { data } = await api.get(`/teacher/attendance-by-date/${assignedClass}`, {

  Line 110:       const { data } = await api.post('/config/toggle-offday', { dayIndex });

  Line 121:       const { data } = await api.post('/config/toggle-holiday', { dateStr: selectedDateStr });

  Line 140:       await api.post('/teacher/attendance', { classId: assignedClass, date: selectedDateStr, records });


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentAttendanceHub.jsx:
  Line 31:       const { data } = await api.get('/student/my-attendance-calendar', {


/home/sajidasim/school-management-system/frontend/src/pages/teacher/TeacherCreateStudent.jsx:
  Line 31:       const { data } = await api.get('/teacher/my-class');

  Line 63:       await api.post('/auth/users/create', payload);


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminNoticeBoard.jsx:
  Line 49:       const { data } = await api.get('/notices');

  Line 72:       await api.post('/notices/verify-admin-password', { password: adminVerifyPassword });

  Line 74:       await api.delete(`/notices/${selectedNoticeId}`, {

  Line 102:       await api.post('/notices', formData);


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentGrades.jsx:
  Line 17:         const { data } = await api.get('/student/my-records');


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminApplicationDetails.jsx:
  Line 35:       const { data } = await api.get('/public/applications');

  Line 54:       const { data } = await api.patch(`/public/application/${id}`, { status: decision });


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminUserRoster.jsx:
  Line 54:                     api.get('/config'),

  Line 55:                     api.get('/auth/users'),

  Line 84:             await api.delete(`/auth/users/teacher/${targetDeleteId}`, { data: { password: confirmPassword } });


/home/sajidasim/school-management-system/frontend/src/pages/student/StudentDashboard.jsx:
  Line 19:         const { data } = await api.get('/student/my-records');


/home/sajidasim/school-management-system/frontend/src/pages/auth/Profile.jsx:
  Line 49:       const { data } = await api.put('/auth/profile', updatePayload);

  Line 61:       const { data } = await api.post('/auth/2fa/setup');

  Line 71:       await api.post('/auth/2fa/disable', { code: disableCode });


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminAppApproval.jsx:
  Line 44:       const { data } = await api.get('/public/applications');

  Line 56:       const { data } = await api.patch(`/public/application/${id}`, { status: decision });


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminWebsiteManager.jsx:
  Line 38:     api.get('/public/info').then(({ data }) => {

  Line 57:       await api.post('/public/info/update', formData);

  Line 77:       await api.post('/public/founder/add', formData);

  Line 96:       await api.delete(`/public/founder/${founderId}`);


/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminEditUser.jsx:
  Line 63:         const configRes = await api.get('/config');

  Line 68:         const { data } = await api.get(`/auth/users/${id}`);

  Line 83:             const attnRes = await api.get(`/teacher/attendance-analytics/${profile.extraField1}`);

  Line 87:             const gradesRes = await api.get(`/grades/class/${profile.extraField1}/subject/Science/term/Mid-Term Exam`);

  Line 118:       await api.put(`/auth/users/${id}/credentials`, payload);

  Line 134:       await api.patch(`/auth/users/${id}/role`, { role: roleDraft });


/home/sajidasim/school-management-system/frontend/src/pages/shared/NoticeBoard.jsx:
  Line 22:         const { data } = await api.get('/notices');


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicPortal.jsx:
  Line 11:     api.get('/public/info')


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicAdmission.jsx:
  Line 54:       const { data } = await api.post('/public/apply', formData);

  Line 76:       const { data } = await api.post(`/public/pay-admission/${appId}`, {


/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicFounders.jsx:
  Line 13:     api.get('/public/info')

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/Wordmark.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/Wordmark.jsx</path>
<type>file</type>
<content>
1: // components/layout/Wordmark.jsx
2: import { IconGraduation } from '../icons.jsx';
3: 
4: export const Wordmark = ({ dark = false, compact = false }) => (
5:   <div className="flex items-center gap-2.5">
6:     <span
7:       className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${
8:         dark ? 'bg-gradient-to-br from-brass-300 to-brass-600 text-slate-950' : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
9:       }`}
10:     >
11:       <IconGraduation className="h-5 w-5" />
12:     </span>
13:     {!compact && (
14:       <span className="leading-tight">
15:         <span
16:           className={`font-display block text-lg font-semibold tracking-tight ${
17:             dark ? 'text-white' : 'text-slate-900'
18:           }`}
19:         >
20:           Scholaris
21:         </span>
22:         <span
23:           className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
24:             dark ? 'text-slate-400' : 'text-slate-500'
25:           }`}
26:         >
27:           School Management
28:         </span>
29:       </span>
30:     )}
31:   </div>
32: );
33: 
34: export default Wordmark;

(End of file - total 34 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/components/layout/PublicFooter.jsx"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/components/layout/PublicFooter.jsx</path>
<type>file</type>
<content>
1: // components/layout/PublicFooter.jsx
2: import { Link } from 'react-router-dom';
3: import Wordmark from './Wordmark.jsx';
4: 
5: export const PublicFooter = () => (
6:   <footer className="mt-auto bg-gradient-to-b from-slate-900 to-brand-950 text-slate-300">
7:     <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
8:       <div className="grid gap-10 md:grid-cols-3">
9:         <div>
10:           <Wordmark dark />
11:           <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
12:             A modern campus portal — admissions, attendance, results and notices in one tranquil place.
13:           </p>
14:         </div>
15:         <div>
16:           <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Explore</h3>
17:           <ul className="mt-4 space-y-2.5 text-sm">
18:             <li><Link to="/" className="transition-colors hover:text-brass-300">Home</Link></li>
19:             <li><Link to="/admission" className="transition-colors hover:text-brass-300">Admission</Link></li>
20:             <li><Link to="/founders" className="transition-colors hover:text-brass-300">Our Founders</Link></li>
21:           </ul>
22:         </div>
23:         <div>
24:           <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Portal</h3>
25:           <ul className="mt-4 space-y-2.5 text-sm">
26:             <li><Link to="/login" className="transition-colors hover:text-brass-300">Sign in</Link></li>
27:             <li><Link to="/register" className="transition-colors hover:text-brass-300">Create account</Link></li>
28:           </ul>
29:         </div>
30:       </div>
31:       <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
32:         &copy; {new Date().getFullYear()} Scholaris School Management. Secure session &amp; verified records.
33:       </div>
34:     </div>
35:   </footer>
36: );
37: 
38: export default PublicFooter;

(End of file - total 38 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

I have enough to write docs. But let me get a few more details for accuracy in PRD/Design: page functionality specifics for key pages (PublicAdmission flow, StudentAttendanceHub heatmap, AdminSettings, AdminWebsiteManager, Profile 2FA), and the icons list. I can infer from API calls. Let me read a handful of page files partially to describe features accurately. Also read backend .env.example fully (names only, it's a template). And README already. Let me read: PublicAdmission, PublicPortal, StudentAttendanceHub, AdminApplicationDetails, Profile, AdminSettings, AdminWebsiteManager, AdminAssignments, TeacherAttendance, StudentGrades/Dashboard maybe. That's a lot; I can read first 120 lines each in parallel. But context use is fine. Let me read key ones fully or large chunks.

Actually I have sufficient API mapping. But docs quality benefits from page descriptions. Let me read 6 key files in parallel with limits.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicAdmission.jsx",
  "limit": 130
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicAdmission.jsx</path>
<type>file</type>
<content>
1: // src/pages/userpublic/PublicAdmission.jsx
2: import { useEffect, useState } from 'react';
3: import { Link } from 'react-router-dom';
4: import api from '../../core/api.js';
5: import { IconClipboard, IconCheckCircle, IconPrinter, IconBack, IconMoney } from '../../components/icons.jsx';
6: import { inputClass, labelClass, btnPrimary, btnSecondary, MessageBanner } from '../../components/ui.jsx';
7: 
8: const steps = [
9:   { id: 1, label: 'Details' },
10:   { id: 2, label: 'Fee' },
11:   { id: 3, label: 'Receipt' },
12: ];
13: 
14: const PublicAdmission = () => {
15:   const [step, setStep] = useState(1);
16:   const [appId, setAppId] = useState('');
17:   const [payableFee, setPayableFee] = useState(0);
18:   const [submitting, setSubmitting] = useState(false);
19:   const [message, setMessage] = useState({ text: '', type: '' });
20:   const [mfsGateway, setMfsGateway] = useState('bKash');
21:   const [txnId, setTxnId] = useState('');
22: 
23:   const [formData, setFormData] = useState({
24:     studentNameEn: '', studentNameBn: '', dateOfBirth: '', birthCertificateNo: '', targetClass: '', emailAddress: '',
25:     fatherNameEn: '', fatherNameBn: '', fatherNid: '', motherNameEn: '', motherNameBn: '', motherNid: '',
26:     parentPhone: '', guardianNameEn: '', guardianNameBn: '', guardianPhone: '',
27:   });
28: 
29:   const [classOptions, setClassOptions] = useState([]);
30:   const [fee, setFee] = useState({ collected: '', verified: '' });
31: 
32:   // The target-class list is managed by the admin in Settings (SchoolConfig),
33:   // not hardcoded, so the admission form always mirrors the live database.
34:   useEffect(() => {
35:     api
36:       .get('/config')
37:       .then(({ data }) => {
38:         const classes = Array.isArray(data?.data?.classes) ? data.data.classes : [];
39:         if (classes.length) {
40:           setClassOptions(classes);
41:           setFormData((prev) => ({ ...prev, targetClass: classes[0] }));
42:         }
43:       })
44:       .catch(() => {});
45:   }, []);
46: 
47:   const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
48: 
49:   const handleRegistrationSubmit = async (e) => {
50:     e.preventDefault();
51:     setSubmitting(true);
52:     setMessage({ text: '', type: '' });
53:     try {
54:       const { data } = await api.post('/public/apply', formData);
55:       if (data.success) {
56:         setAppId(data.applicationId);
57:         setPayableFee(data.payableAmount || 500);
58:         setStep(2);
59:       }
60:     } catch (err) {
61:       setMessage({ text: 'Validation Error: Check your values and retry.', type: 'error' });
62:     } finally {
63:       setSubmitting(false);
64:     }
65:   };
66: 
67:   const handleVerifyFeePayment = async (e) => {
68:     e.preventDefault();
69:     if (txnId.trim().length < 6) {
70:       setMessage({ text: 'Please provide a valid MFS Transaction ID (min 6 characters).', type: 'error' });
71:       return;
72:     }
73:     setSubmitting(true);
74:     setMessage({ text: '', type: '' });
75:     try {
76:       const { data } = await api.post(`/public/pay-admission/${appId}`, {
77:         paymentMethod: mfsGateway, txnId, amount: payableFee,
78:       });
79:       if (data.success) {
80:         setFee({ collected: payableFee, verified: new Date().toLocaleString() });
81:         setStep(3);
82:       }
83:     } catch (err) {
84:       setMessage({ text: 'Handshake verification error. Please re-check the transaction ID.', type: 'error' });
85:     } finally {
86:       setSubmitting(false);
87:     }
88:   };
89: 
90:   return (
91:     <div className="min-h-screen bg-paper px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
92:       <div className="mx-auto max-w-5xl">
93:         {/* Header */}
94:         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
95:           <div className="flex items-center gap-3">
96:             <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
97:               <IconClipboard className="h-6 w-6" />
98:             </span>
99:             <div>
100:               <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
101:                 Institutional Intake Portal
102:               </h1>
103:               <p className="text-sm text-slate-500">Dual-language registration, fee verification and a printable receipt.</p>
104:             </div>
105:           </div>
106:           <Link to="/" className={`${btnSecondary} self-start`}>
107:             <IconBack className="h-4 w-4" /> Back home
108:           </Link>
109:         </div>
110: 
111:         {/* Stepper */}
112:         <ol className="mt-8 flex items-center gap-2 print:hidden">
113:           {steps.map((s, i) => (
114:             <li key={s.id} className={`flex items-center gap-2 ${i > 0 ? 'flex-1' : ''}`}>
115:               {i > 0 && <span className={`h-px flex-1 ${step > i ? 'bg-brand-500' : 'bg-slate-200'}`} />}
116:               <span
117:                 className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-2 ${
118:                   step >= s.id ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-slate-400 ring-slate-200'
119:                 }`}
120:               >
121:                 {step > s.id ? <IconCheckCircle className="h-4 w-4" /> : s.id}
122:               </span>
123:               <span className={`text-xs font-semibold ${step >= s.id ? 'text-slate-800' : 'text-slate-400'}`}>{s.label}</span>
124:             </li>
125:           ))}
126:         </ol>
127: 
128:         <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 print:border-0 print:shadow-none">
129:           <MessageBanner message={message} />
130: 

(Showing lines 1-130 of 342. Use offset=131 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicPortal.jsx",
  "limit": 90
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/pages/userpublic/PublicPortal.jsx</path>
<type>file</type>
<content>
1: // src/pages/userpublic/PublicPortal.jsx
2: import { useEffect, useState } from 'react';
3: import { Link } from 'react-router-dom';
4: import api from '../../core/api.js';
5: import { IconClipboard, IconGraduation, IconSparkles, IconShield, IconCheckCircle } from '../../components/icons.jsx';
6: 
7: const PublicPortal = () => {
8:   const [info, setInfo] = useState({ welcomeTitle: '', aboutText: '', admissionFeeAmount: 500, founders: [] });
9: 
10:   useEffect(() => {
11:     api.get('/public/info')
12:       .then(({ data }) => { if (data.success) setInfo({ ...info, ...data.data }); })
13:       .catch(() => {});
14:   }, []);
15: 
16:   const stats = [
17:     { label: 'Structured Classes', value: 'K–12', hint: 'Every grade section mapped' },
18:     { label: 'Founding Board', value: String(info.founders?.length || 6).padStart(1, '0'), hint: 'Guiding pillars' },
19:     { label: 'Admission Fee', value: `৳${Number(info.admissionFeeAmount) || 500}.00`, hint: 'One-time, transparent' },
20:     { label: 'Portal Security', value: 'A+', hint: 'CSRF + TOTP ready' },
21:   ];
22: 
23:   return (
24:     <div className="min-h-screen bg-paper">
25:       {/* Hero */}
26:       <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-950 to-slate-950 text-white">
27:         <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
28:         <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-brass-500/15 blur-3xl" />
29:         <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
30:           <div className="grid items-center gap-12 lg:grid-cols-12">
31:             <div className="animate-fade-up lg:col-span-7">
32:               <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
33:                 <IconGraduation className="h-4 w-4" /> Admissions season open
34:               </span>
35:               <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
36:                 {info.welcomeTitle || 'A place where learning is a quiet, steady craft.'}
37:               </h1>
38:               <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
39:                 {info.aboutText
40:                   ? info.aboutText.slice(0, 220) + (info.aboutText.length > 220 ? '…' : '')
41:                   : 'A modern institution portal uniting admissions, attendance, results and school-wide notices in a single, elegant campus experience.'}
42:               </p>
43:               <div className="mt-8 flex flex-wrap items-center gap-3">
44:                 <Link
45:                   to="/admission"
46:                   className="inline-flex items-center gap-2 rounded-xl bg-brass-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-lg shadow-brass-500/20 transition hover:bg-brass-400"
47:                 >
48:                   <IconClipboard className="h-5 w-5" /> Begin an application
49:                 </Link>
50:                 <Link
51:                   to="/founders"
52:                   className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
53:                 >
54:                   <IconSparkles className="h-5 w-5" /> Meet the founders
55:                 </Link>
56:               </div>
57:             </div>
58: 
59:             <div className="animate-fade-up lg:col-span-5">
60:               {info.bannerImage ? (
61:                 <img
62:                   src={info.bannerImage}
63:                   alt="School banner"
64:                   className="aspect-[4/3] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
65:                 />
66:               ) : (
67:                 <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 text-white/40">
68:                   <IconGraduation className="h-14 w-14" />
69:                   <p className="text-sm font-semibold tracking-wide">Campus imagery coming soon</p>
70:                 </div>
71:               )}
72:             </div>
73:           </div>
74:         </div>
75:       </section>
76: 
77:       {/* Stats band */}
78:       <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
79:         <div className="mx-auto max-w-7xl">
80:           <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 sm:grid-cols-4 lg:gap-6 lg:p-6">
81:             {stats.map((s, i) => (
82:               <div key={s.label} className="animate-fade-up rounded-2xl p-4" style={{ animationDelay: `${i * 60}ms` }}>
83:                 <p className="font-display text-2xl font-semibold tracking-tight text-brand-700 sm:text-3xl">{s.value}</p>
84:                 <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
85:                 <p className="mt-0.5 truncate text-xs text-slate-400">{s.hint}</p>
86:               </div>
87:             ))}
88:           </div>
89:         </div>
90:       </section>

(Showing lines 1-90 of 176. Use offset=91 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/pages/student/StudentAttendanceHub.jsx",
  "limit": 160
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/pages/student/StudentAttendanceHub.jsx</path>
<type>file</type>
<content>
1: // src/pages/student/StudentAttendanceHub.jsx
2: import { useEffect, useState } from 'react';
3: import { Link } from 'react-router-dom';
4: import api from '../../core/api.js';
5: import { PageContainer, Card, Spinner, MessageBanner } from '../../components/ui.jsx';
6: import { IconCalendar, IconBack } from '../../components/icons.jsx';
7: 
8: const StudentAttendanceHub = () => {
9:   const [calendarDate, setCalendarDate] = useState(new Date());
10:   const [attendanceData, setAttendanceData] = useState({
11:     personalLogs: {},
12:     weeklyOffDays: [],
13:     holidays: [],
14:     summary: { totalSessions: 0, presentCount: 0, lateCount: 0, absentCount: 0, percentage: 100 },
15:   });
16:   const [loading, setLoading] = useState(true);
17:   const [error, setError] = useState('');
18: 
19:   useEffect(() => {
20:     fetchMyCalendarFeed();
21:   }, [calendarDate.getFullYear(), calendarDate.getMonth()]);
22: 
23:   const shiftMonth = (delta) => {
24:     setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + delta, 1));
25:   };
26: 
27:   const fetchMyCalendarFeed = async () => {
28:     setLoading(true);
29:     setError('');
30:     try {
31:       const { data } = await api.get('/student/my-attendance-calendar', {
32:         params: { year: calendarDate.getFullYear(), month: calendarDate.getMonth() + 1 },
33:       });
34:       if (data.success) setAttendanceData(data);
35:     } catch {
36:       setError('Failed to securely parse your attendance logs.');
37:     } finally {
38:       setLoading(false);
39:     }
40:   };
41: 
42:   const generateCalendarDays = () => {
43:     const year = calendarDate.getFullYear();
44:     const month = calendarDate.getMonth();
45:     const firstDayIndex = new Date(year, month, 1).getDay();
46:     const totalDays = new Date(year, month + 1, 0).getDate();
47: 
48:     const dayNodes = [];
49:     for (let i = 0; i < firstDayIndex; i++) {
50:       dayNodes.push(<div key={`blank-${i}`} className="p-4" />);
51:     }
52: 
53:     for (let day = 1; day <= totalDays; day++) {
54:       const padDay = day < 10 ? `0${day}` : day;
55:       const padMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
56:       const loopDateStr = `${year}-${padMonth}-${padDay}`;
57: 
58:       const dayOfWeek = new Date(year, month, day).getDay();
59:       const isWeekend = attendanceData.weeklyOffDays.includes(dayOfWeek);
60:       const isHoliday = attendanceData.holidays.includes(loopDateStr);
61:       const logStatus = attendanceData.personalLogs[loopDateStr];
62: 
63:       let cellStyle = 'border-slate-100 bg-white text-slate-800';
64:       let statusLabel = '';
65: 
66:       if (isWeekend) {
67:         cellStyle = 'border-slate-200 bg-slate-100/80 text-slate-400 border-dashed';
68:         statusLabel = 'Weekly Off';
69:       } else if (isHoliday) {
70:         cellStyle = 'border-amber-200 bg-amber-50 font-bold text-amber-600';
71:         statusLabel = 'Holiday';
72:       } else if (logStatus) {
73:         if (logStatus === 'Present') {
74:           cellStyle = 'border-emerald-200 bg-emerald-50 font-bold text-emerald-800';
75:           statusLabel = 'Present';
76:         } else if (logStatus === 'Late') {
77:           cellStyle = 'border-amber-200 bg-amber-50 font-bold text-amber-800';
78:           statusLabel = 'Late';
79:         } else if (logStatus === 'Absent') {
80:           cellStyle = 'border-rose-200 bg-rose-50 font-bold text-rose-800';
81:           statusLabel = 'Absent';
82:         } else if (logStatus === 'Excused') {
83:           cellStyle = 'border-sky-200 bg-sky-50 font-bold text-sky-800';
84:           statusLabel = 'Excused';
85:         }
86:       } else {
87:         cellStyle = 'border-slate-100 bg-slate-50 italic text-slate-300';
88:         statusLabel = 'No Session';
89:       }
90: 
91:       dayNodes.push(
92:         <div key={day} className={`flex min-h-[70px] flex-col items-start justify-between rounded-2xl border p-3 transition-all ${cellStyle}`}>
93:           <span className="font-mono text-sm font-bold">{day}</span>
94:           {statusLabel && <span className="mt-1 text-[8px] font-bold uppercase tracking-tight">{statusLabel}</span>}
95:         </div>
96:       );
97:     }
98:     return dayNodes;
99:   };
100: 
101:   const summary = attendanceData.summary || {};
102: 
103:   return (
104:     <PageContainer className="max-w-5xl">
105:       <div className="animate-fade-up space-y-6">
106:         <Link
107:           to="/s/dashboard"
108:           className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
109:         >
110:           <IconBack className="h-4 w-4" /> Back to dashboard
111:         </Link>
112: 
113:         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
114:           <div className="flex items-center gap-3">
115:             <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
116:               <IconCalendar className="h-6 w-6" />
117:             </span>
118:             <div>
119:               <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
120:                 Attendance Log Calendar
121:               </h1>
122:               <p className="text-sm text-slate-500">Daily status entries, monthly summaries and leave records.</p>
123:             </div>
124:           </div>
125: 
126:           <div className="flex items-center self-start rounded-xl bg-slate-100 p-1.5 font-mono text-xs font-bold sm:self-center">
127:             <button type="button" onClick={() => shiftMonth(-1)} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-sm transition hover:bg-slate-50" aria-label="Previous month">◀</button>
128:             <span className="min-w-[120px] px-4 text-center text-slate-700">
129:               {calendarDate.toLocaleString('en-BD', { month: 'long', year: 'numeric' })}
130:             </span>
131:             <button type="button" onClick={() => shiftMonth(1)} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-sm transition hover:bg-slate-50" aria-label="Next month">▶</button>
132:           </div>
133:         </div>
134: 
135:         {error && <MessageBanner message={{ text: error, type: 'error' }} />}
136: 
137:         {summary && (
138:           <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
139:             <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
140:               <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Tracked</span>
141:               <p className="font-display mt-1 text-xl font-semibold text-slate-900">{summary.totalSessions} Days</p>
142:             </div>
143:             <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
144:               <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">Present</span>
145:               <p className="font-display mt-1 text-xl font-semibold text-emerald-700">{summary.presentCount} Days</p>
146:             </div>
147:             <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
148:               <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-600">Late Arrivals</span>
149:               <p className="font-display mt-1 text-xl font-semibold text-amber-700">{summary.lateCount} Days</p>
150:             </div>
151:             <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
152:               <span className="block text-[10px] font-bold uppercase tracking-wider text-rose-600">Absences</span>
153:               <p className="font-display mt-1 text-xl font-semibold text-rose-700">{summary.absentCount} Days</p>
154:             </div>
155:             <div className={`col-span-2 flex flex-col justify-between rounded-2xl border p-4 shadow-sm md:col-span-1 ${
156:               summary.percentage >= 75 ? 'border-sky-100 bg-sky-50 text-sky-800' : 'border-rose-200 bg-rose-50 text-rose-700'
157:             }`}>
158:               <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">Compliance Rate</span>
159:               <div className="mt-1 flex items-baseline justify-between gap-1">
160:                 <p className="font-display text-xl font-semibold">{summary.percentage}%</p>

(Showing lines 1-160 of 195. Use offset=161 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/pages/auth/Profile.jsx",
  "limit": 140
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/pages/auth/Profile.jsx</path>
<type>file</type>
<content>
1: // src/pages/auth/Profile.jsx
2: import { useState } from 'react';
3: import { useNavigate } from 'react-router-dom';
4: import api from '../../core/api.js';
5: import { useAuth } from '../../context/AuthContext.jsx';
6: import TwoFactorModal from '../../components/TwoFactorModal.jsx';
7: import defaultAvatar from '../../assets/react.svg';
8: import { IconUpload, IconLogOut, IconUser, IconShield, IconLock } from '../../components/icons.jsx';
9: import { PageContainer, Card, inputClass, labelClass, btnPrimary, btnSecondary, btnDanger } from '../../components/ui.jsx';
10: import { useToast } from '../../context/ToastContext.jsx';
11: 
12: const Profile = () => {
13:   const { user, logout, updateUser } = useAuth();
14:   const navigate = useNavigate();
15:   const toast = useToast();
16: 
17:   const [name, setName] = useState(user?.name || '');
18:   const [email, setEmail] = useState(user?.email || '');
19:   const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
20:   const [loading, setLoading] = useState(false);
21: 
22:   // 2FA controls
23:   const [setupTicket, setSetupTicket] = useState(null);
24:   const [disableCode, setDisableCode] = useState('');
25:   const [disableBusy, setDisableBusy] = useState(false);
26: 
27:   const isParent = user?.role === 'parent';
28: 
29:   const flash = (text, type = 'info') => toast.push(text, type);
30: 
31:   const handleFileChange = (e) => {
32:     const file = e.target.files?.[0];
33:     if (!file) return;
34:     if (file.size > 1024 * 1024) {
35:       flash('Image must be smaller than 1MB.', 'error');
36:       return;
37:     }
38:     const reader = new FileReader();
39:     reader.onloadend = () => setPreviewUrl(reader.result);
40:     reader.readAsDataURL(file);
41:   };
42: 
43:   const handleUpdate = async (e) => {
44:     e.preventDefault();
45:     setLoading(true);
46: 
47:     try {
48:       const updatePayload = isParent ? { name, email, profileImage: previewUrl } : { profileImage: previewUrl };
49:       const { data } = await api.put('/auth/profile', updatePayload);
50:       updateUser(data.user);
51:       flash('Profile successfully synchronized.', 'success');
52:     } catch (err) {
53:       flash(err.response?.data?.message || 'Failed to update profile.', 'error');
54:     } finally {
55:       setLoading(false);
56:     }
57:   };
58: 
59:   const beginSetup = async () => {
60:     try {
61:       const { data } = await api.post('/auth/2fa/setup');
62:       setSetupTicket({ secret: data.secret, otpauthUrl: data.otpauthUrl, qrCode: data.qrCode });
63:     } catch (err) {
64:       flash(err.response?.data?.message || 'Could not start 2FA setup.', 'error');
65:     }
66:   };
67: 
68:   const disable2FA = async () => {
69:     setDisableBusy(true);
70:     try {
71:       await api.post('/auth/2fa/disable', { code: disableCode });
72:       updateUser({ twoFactorEnabled: false });
73:       setDisableCode('');
74:       flash('Two-factor authentication disabled.', 'success');
75:     } catch (err) {
76:       flash(err.response?.data?.message || 'Invalid code.', 'error');
77:     } finally {
78:       setDisableBusy(false);
79:     }
80:   };
81: 
82:   return (
83:     <PageContainer className="max-w-4xl">
84:       <div className="animate-fade-up space-y-6">
85:         <Card className="overflow-hidden">
86:           <div className="flex items-center gap-4 border-b border-slate-200 bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-5 text-white">
87:             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
88:               <IconUser className="h-6 w-6" />
89:             </div>
90:             <div>
91:               <h1 className="font-display text-xl font-semibold tracking-tight">Account Settings</h1>
92:               <p className="text-sm text-white/80">Manage your profile picture and personal details.</p>
93:             </div>
94:           </div>
95: 
96:           <div className="p-6 sm:p-8">
97:             {!isParent && (
98:               <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
99:                 <span className="mt-0.5">ℹ️</span>
100:                 <span>
101:                   As a {user?.role}, you can only update your profile picture. Name and email modifications are restricted.
102:                 </span>
103:               </div>
104:             )}
105: 
106:             <form onSubmit={handleUpdate}>
107:               <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
108:                 <div className="flex flex-col items-center gap-3">
109:                   <img
110:                     src={previewUrl || defaultAvatar}
111:                     alt="Profile"
112:                     className="h-24 w-24 rounded-2xl border-2 border-brand-200 object-cover shadow-sm"
113:                   />
114:                   <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600">
115:                     <IconUpload className="h-4 w-4" />
116:                     Change Photo
117:                     <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
118:                   </label>
119:                   {!isParent && (
120:                     <p className="max-w-[160px] text-center text-[11px] leading-snug text-slate-400">
121:                       You are only allowed to update your profile picture.
122:                     </p>
123:                   )}
124:                 </div>
125: 
126:                 <div className="w-full space-y-5">
127:                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
128:                     <div>
129:                       <label htmlFor="profile-name" className={labelClass}>Full Identity Name</label>
130:                       <input
131:                         id="profile-name"
132:                         type="text"
133:                         value={name}
134:                         onChange={(e) => setName(e.target.value)}
135:                         disabled={!isParent}
136:                         className={inputClass}
137:                       />
138:                     </div>
139:                     <div>
140:                       <label htmlFor="profile-email" className={labelClass}>Email Address</label>

(Showing lines 1-140 of 251. Use offset=141 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminSettings.jsx",
  "limit": 110
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/frontend/src/pages/admin/AdminSettings.jsx</path>
<type>file</type>
<content>
1: // src/pages/AdminSettings.jsx
2: import { useEffect, useState } from 'react';
3: import api from '../../core/api.js';
4: import {
5:   PageContainer,
6:   PageHeader,
7:   Card,
8:   Spinner,
9:   inputClass,
10:   btnPrimary,
11:   btnDark,
12: } from '../../components/ui.jsx';
13: import { IconUsers, IconBook, IconCalendar, IconPlus, IconX } from '../../components/icons.jsx';
14: import { useToast } from '../../context/ToastContext.jsx';
15: 
16: const AdminSettings = () => {
17:   const toast = useToast();
18:   const [classes, setClasses] = useState([]);
19:   const [subjects, setSubjects] = useState([]);
20:   const [examTerms, setExamTerms] = useState([]);
21: 
22:   const [newClass, setNewClass] = useState('');
23:   const [newSubject, setNewSubject] = useState('');
24:   const [newTerm, setNewTerm] = useState('');
25: 
26:   const [loading, setLoading] = useState(true);
27: 
28:   useEffect(() => {
29:     fetchGlobalConfig();
30:   }, []);
31: 
32:   const fetchGlobalConfig = async () => {
33:     try {
34:       const { data } = await api.get('/config');
35:       setClasses(data.data.classes || []);
36:       setSubjects(data.data.subjects || []);
37:       setExamTerms(data.data.examTerms || []);
38:     } catch {
39:       toast.error('Failed to stream global config from the server.');
40:     } finally {
41:       setLoading(false);
42:     }
43:   };
44: 
45:   const handleSaveSettings = async () => {
46:     try {
47:       await api.post('/config/update', { classes, subjects, examTerms });
48:       toast.success('Global settings saved. Dropdowns updated across the system.');
49:     } catch {
50:       toast.error('Failed to update global settings.');
51:     }
52:   };
53: 
54:   const Chip = ({ value, onRemove, tone }) => {
55:     const tones = {
56:       brand: 'border-brand-100 bg-brand-50 text-brand-800',
57:       violet: 'border-violet-100 bg-violet-50 text-violet-800',
58:       amber: 'border-amber-100 bg-amber-50 text-amber-800',
59:     };
60:     const btnTones = {
61:       brand: 'text-brand-400 hover:text-brand-700',
62:       violet: 'text-violet-400 hover:text-violet-700',
63:       amber: 'text-amber-500 hover:text-amber-700',
64:     };
65:     return (
66:       <span className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold ${tones[tone]}`}>
67:         {value}
68:         <button type="button" onClick={onRemove} className={`cursor-pointer ${btnTones[tone]}`} aria-label={`Remove ${value}`}>
69:           <IconX className="h-3.5 w-3.5" />
70:         </button>
71:       </span>
72:     );
73:   };
74: 
75:   if (loading) {
76:     return (
77:       <PageContainer>
78:         <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
79:       </PageContainer>
80:     );
81:   }
82: 
83:   return (
84:     <PageContainer className="max-w-4xl">
85:       <div className="animate-fade-up space-y-6">
86:         <PageHeader
87:           title="Global institution settings"
88:           subtitle="Control the class names, active subjects and exam terms populated inside system dropdowns."
89:         />
90: 
91:         <Card className="p-6 sm:p-8">
92:           <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
93:             <div className="space-y-4">
94:               <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700">
95:                 <IconUsers className="h-4 w-4 text-brand-500" /> Class structure
96:               </h3>
97:               <div className="flex gap-2">
98:                 <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="e.g., Class 10-A" className={`${inputClass} flex-grow`} />
99:                 <button type="button" onClick={() => { if (newClass.trim()) { setClasses([...classes, newClass.trim()]); setNewClass(''); } }} className={`${btnDark} text-xs`}>
100:                   <IconPlus className="h-4 w-4" /> Add
101:                 </button>
102:               </div>
103:               <div className="flex flex-wrap gap-2 pt-2">
104:                 {classes.map((c, i) => (
105:                   <Chip key={i} value={c} tone="brand" onRemove={() => setClasses(classes.filter((_, idx) => idx !== i))} />
106:                 ))}
107:               </div>
108:             </div>
109: 
110:             <div className="space-y-4">

(Showing lines 1-110 of 156. Use offset=111 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/backend/.env.example"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/backend/.env.example</path>
<type>file</type>
<content>
1: # Copy this file to `.env` and fill in real values. NEVER commit `.env`.
2: 
3: PORT=5000
4: NODE_ENV=development
5: 
6: # MongoDB connection string (use a dedicated user with least privilege)
7: MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
8: 
9: # Use a long, random value (e.g. `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
10: JWT_SECRET=replace_with_a_long_random_secret
11: 
12: # Comma-separated list of allowed browser origins for CORS
13: CLIENT_URL=http://localhost:5173,http://localhost:3000
14: 
15: # Payment adapter. 'sandbox' simulates payments (refused in production);
16: # set to a real provider key when wiring a live gateway.
17: PAYMENT_PROVIDER=sandbox
18: 
19: # Optional session token lifetime (defaults to 8h)
20: # JWT_EXPIRY=8h
21: 
22: # Cloudinary
23: CLOUDINARY_CLOUD_NAME=your_cloud_name
24: CLOUDINARY_API_KEY=your_api_key
25: CLOUDINARY_API_SECRET=your_api_secret
26: 
27: # SMTP (use an app-specific password, never your account password)
28: SMTP_HOST=smtp.example.com
29: SMTP_PORT=587
30: SMTP_USER=your_smtp_user
31: SMTP_PASS=your_smtp_app_password

(End of file - total 31 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 18.5s)

_Thinking:_

I have enough. Now I need to create six docs. Let me decide content and structure. The user wants files named PRD.md, Architecture.MD, DEsign.MD (capitalization as given? They wrote "DEsign.MD", "MEMORy.MD", "Rules.MD"; likely typos. Standard naming: PRD.md, ARCHITECTURE.md, DESIGN.md, MEMORY.md, RULES.md, TRACKER.md. They wrote Architecture.MD, DEsign.MD, MEMORy.MD, Rules.MD, TRACKER.MD. Mixed capitalization. I think use conventional uppercase: PRD.md, ARCHITECTURE.md, DESIGN.md, MEMORY.md, RULES.md, TRACKER.md. But the user explicitly named "Architecture.MD", "DEsign.MD", etc. Could be perceived as not following. Hmm. In docs repos, conventions often are uppercase. The request likely just means create those docs. I'll create with conventional names: PRD.md, ARCHITECTURE.md, DESIGN.md, MEMORY.md, RULES.md, TRACKER.md. Mention names in summary. Actually to avoid mismatch, maybe use exactly names they requested? "Architecture.MD" mixed-case is odd but on Linux case-sensitive. The user might later look for `Architecture.MD`. Better to follow their exact listing? They wrote "DEsign.MD" likely typo. I think standardizing is fine, but risk. I'll create both? No, duplicate files bad.

I'll choose the canonical uppercase set and note it. Most repos use uppercase. Given they said "like PRD.md , Architecture.MD , DEsign.MD ..." they're not strict. I'll go with uppercase.

Now content. Need to make docs substantial but not invented too much. Base on code facts. Include:

PRD.md:
- Product overview, problem, goals, non-goals
- Personas/roles
- Feature scope by module (public site, auth/security, admin, teacher, student, parent)
- User stories / requirements (functional)
- Non-functional requirements (security, performance, accessibility, responsive)
- Success metrics
- Release/roadmap status (MVP implemented, future)
- Constraints and assumptions
- Out of scope / known gaps

ARCHITECTURE.md:
- System overview diagram (ASCII)
- Tech stack table
- Repo structure
- Runtime topology: dev (Vite proxy), production (Express serves SPA)
- Backend layering: server bootstrap, middleware chain order, routes, models, services, scripts
- Data model ERD ASCII + collection table
- API surface summary table by module
- Auth/session flow sequence (login, 2FA, request, CSRF)
- Authorization model (roles + assignments)
- Payments/admissions flow
- File uploads/Cloudinary
- Error handling conventions
- Deployment/config/env vars
- Scalability/known limitations

DESIGN.md:
- UX principles, brand, design tokens (colors, fonts, motion)
- Layout patterns (public layout, app shell rail/bottom nav, page shell)
- Component library inventory + usage conventions (ui.jsx classes)
- Page inventory with purpose and key features
- Interaction patterns: forms, toasts, modals, pagination, empty/loading states, confirm destructive, 2FA modal
- Role-based navigation map
- Responsive behavior
- Accessibility
- Design system rules (do/don't)
- Screen-by-screen notes (maybe compact)

MEMORY.md:
- Project memory / context: what the project is, current state, decisions, conventions, gotchas, credentials/env handling, non-obvious implementation details (assignment authorization, exact routes, env var alias, CSRF, 2FA, roll reindex, production SPA). This is like persistent context for AI/agents.
- Include "known issues / workarounds", "do not do".
- Key file map
- Commands
- Recent fixes (env MONGODB_URI, etc.)
- Glossary.

RULES.md:
- Engineering rules: code style, naming, architecture boundaries, security rules, data rules, frontend conventions, git/workflow, docs maintenance, testing, env/secrets, AI agent rules.
- Do/Don't.

TRACKER.md:
- Status tracker of modules/features with status (Done/Partial/Planned), known gaps/bugs, next tasks, backlog, changelog.
- Use checkboxes and tables.

Need to be careful: the README says under development; docs should reflect current implementation. Include dates? Today's date Oct 23 2026. Could put "Last updated: 2026-10-23" but that's from env. Fine.

Need to not include secrets. Good.

Let me write the files. Six files, each maybe 150-300 lines. That's a lot but doable. I'll be thorough yet concise. Use ASCII diagrams.

Before writing, update todos: exploration done; create docs.

Let me draft content carefully.

First PRD.md.

I'll include:
# Product Requirements Document (PRD) — Scholaris School Management System
Metadata: status, owner, version, last updated.
1. Overview
2. Problem & opportunity
3. Goals / success metrics
4. Personas/roles
5. Scope (MVP implemented, out of scope)
6. Functional requirements by module with IDs (FR-PUB-1 etc.)
7. Non-functional requirements
8. User flows
9. Release milestones/roadmap
10. Risks/assumptions
11. Open questions

Use requirement tables with status. Status: Implemented / Partial / Not started.

Be accurate: parent role currently minimal (only home/notices/profile). Public self-registration creates parent. Admission payment sandbox only. No password reset. No email verification. No tests. Mention.

ARCHITECTURE.md:
# Architecture
1. System context
2. Tech stack
3. Repository layout
4. Runtime topology & request path
5. Backend architecture + middleware pipeline order (exact order from server.js)
6. Route map
7. Data model (ERD + collections)
8. AuthN/AuthZ
9. Admissions & payments
10. File storage
11. Security controls
12. Error/response conventions
13. Env/config
14. Deployment (dev/prod)
15. Scalability & constraints
16. Operations / scripts

Include env var table names, purpose, required. Include alias MONGODB_URI/MONGO_URI. Include TRUST_PROXY, VITE_API_TARGET.

DESIGN.md:
# Design system & UX
1. Design principles
2. Brand identity (Scholaris, Wordmark)
3. Color tokens table with hex and use
4. Typography
5. Motion
6. Layouts (public/app shell/mobile)
7. Component inventory (ui.jsx, icons, Pagination, TwoFactorModal, Toast)
8. Page inventory (role, route, purpose, key elements)
9. Interaction patterns
10. Forms & validation UX
11. States (loading/empty/error/success)
12. Responsive & accessibility
13. Content/voice/tone
14. Design rules & anti-patterns
15. Future design work

MEMORY.MD:
# Project memory
1. Snapshot
2. Quick start commands
3. Environment variables
4. Architecture at a glance
5. Non-obvious facts/gotchas (very important)
6. Authorization rules cheat sheet
7. API quick reference
8. Data model quick reference
9. File map
10. Decisions log (ADR-lite)
11. Known issues / tech debt
12. Recent changes
13. Glossary
14. How to continue (for AI agents)

RULES.md:
# Engineering rules
1. Golden rules
2. Security rules (never commit secrets; validate; auth; CSRF; roles; server-side amounts)
3. Backend rules (layer boundaries, validation, error shape, middleware order)
4. Data rules (models, indexes, transactions, roll consistency)
5. Frontend rules (api client only, AuthContext, ui.jsx reuse, tokens, accessibility)
6. Naming & style
7. Git/commit/PR workflow
8. Documentation rules (update docs)
9. Testing rules (currently none, expectations)
10. Agent/AI rules (read MEMORY first; don't invent; run lint/build; don't commit unless asked)
11. Checklist before merge

TRACKER.md:
# Project tracker
Metadata
1. Status legend
2. Module status table
3. Feature checklist (detailed by module with checkboxes)
4. Known bugs/gaps (ID, severity, area, description, status)
5. Technical debt
6. Backlog / next up (prioritized)
7. Completed log (from exploration + recent fix)
8. How to update tracker

Make sure not to claim tests exist. Mention no test suite.

Let me write them. I'll create docs dir via write (it creates dirs? The write tool writes file; does it create parent dirs? Usually yes? Not guaranteed. Use bash mkdir -p docs first.)

Let me update todos then mkdir and write files. Large outputs. I'll write one at a time.

I need to be mindful of the "no comments unless asked" rule for code; these are docs, comments irrelevant.

Let's create.

Exploration complete. Now I'll write the docs.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Explore backend models, routes, and controllers",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Explore frontend routes, pages, and API layer",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Explore auth, security, payments, and config",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Create docs/PRD.md",
      "status": "in_progress",
      "priority": "medium"
    },
    {
      "content": "Create docs/ARCHITECTURE.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/DESIGN.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/MEMORY.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/RULES.md",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Create docs/TRACKER.md",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore backend models, routes, and controllers",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Explore frontend routes, pages, and API layer",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Explore auth, security, payments, and config",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Create docs/PRD.md",
    "status": "in_progress",
    "priority": "medium"
  },
  {
    "content": "Create docs/ARCHITECTURE.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/DESIGN.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/MEMORY.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/RULES.md",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Create docs/TRACKER.md",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Big Pickle · 3.3s)

**Tool: bash**

**Input:**
```json
{
  "command": "mkdir -p docs && ls -la docs",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
total 8
drwxrwxr-x 2 sajidasim sajidasim 4096 Oct 23 12:41 .
drwxrwxr-x 7 sajidasim sajidasim 4096 Oct 23 12:41 ..

```

---

## Assistant (Build · Big Pickle · 31.7s)

_Thinking:_

Now write PRD.md.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/PRD.md",
  "content": "# Product Requirements Document (PRD)\n\n**Product:** Scholaris — School Management System\n**Status:** Active development (working MVP)\n**Last updated:** 2026-10-23\n**Related docs:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)\n\n---\n\n## 1. Overview\n\nScholaris is a full-stack school management platform that unifies public-facing admissions, staff and student administration, attendance, gradebooks, notices, and a lightweight parent portal.\n\nIt is delivered as a decoupled application:\n\n- **Frontend:** React 19 + Vite 8 single-page application (SPA), styled with Tailwind CSS 4.\n- **Backend:** Node.js + Express 5 REST API with Mongoose 9 / MongoDB.\n- **Integrations:** Cloudinary (image and PDF storage), SMTP (admission status email), pluggable payment adapter (sandbox only today).\n\nThe product is intended for a single school/institution per deployment. There is no multi-tenant model.\n\n---\n\n## 2. Problem and opportunity\n\nSchools commonly manage admissions, attendance, results, and announcements across paper forms, spreadsheets, and chat groups. This creates:\n\n- Duplicate and inconsistent student data.\n- Slow admission intake and unclear fee status.\n- Manual attendance and grade calculation.\n- Poor visibility for students and parents.\n- Weak control over who can view or change records.\n\nScholaris addresses this with one role-aware system of record, a public admission funnel, live dashboards, and server-enforced authorization.\n\n---\n\n## 3. Goals and success metrics\n\n| Goal | Success metric |\n|---|---|\n| Centralize school records | One User account + one role profile per person; no duplicate email records |\n| Digitize admissions | Applicant completes form → pays → receives printable receipt in one flow |\n| Make attendance reliable | One attendance sheet per class per day; analytics available year-to-date |\n| Protect grades | Marks stored per student/class/term/subject; only published grades visible to students |\n| Role-appropriate access | Every protected endpoint enforces role + class/subject scope server-side |\n| Responsive access | Full functionality on desktop, tablet, and mobile |\n| Secure by default | HttpOnly sessions, CSRF, 2FA, rate limiting, input validation, secret hygiene |\n\nThere is currently no analytics/telemetry pipeline; success is measured qualitatively and through manual testing.\n\n---\n\n## 4. Personas and roles\n\n| Role | Primary needs | Current capabilities |\n|---|---|---|\n| **Admin** | Run the institution | Dashboard stats, user CRUD, role changes, credential resets, teacher assignments, global class/subject/term config, notices, public website content, admission review, payments overview |\n| **Teacher** | Manage assigned classes | Roster, attendance (class-teacher classes), attendance analytics, gradebook (assigned class+subject), publish results (class teacher), add/edit/delete students in class-teacher scope, notices |\n| **Student** | Track own progress | Dashboard, published grades, personal attendance calendar, notices |\n| **Parent** | Follow their child and school news | Notices, profile management (name/email/photo), 2FA. No child linkage yet |\n| **Public visitor** | Learn about and apply to the school | Landing page, founder profiles, admission application, sandbox fee payment, printable receipt |\n\n> Public self-registration always creates a **parent** account. Admin and teacher accounts can only be created by an admin. Students are created by admins or by their class teacher.\n\n---\n\n## 5. Scope\n\n### 5.1 In scope (implemented)\n\n1. **Public website** with editable welcome text, about text, banner, logo, admission fee, and founder profiles.\n2. **Admissions funnel** with dual-language student/parent details, server-priced fee, MFS-style payment capture, and printable receipt.\n3. **Authentication and sessions** using HttpOnly cookies, bcrypt passwords, optional TOTP 2FA, and CSRF protection.\n4. **Admin console** for users, roles, credentials, assignments, school config, notices, website content, and applications.\n5. **Teacher workspace** for class roster, attendance, analytics, gradebook, publishing, and student management within assigned scope.\n6. **Student workspace** for dashboard, grades, attendance calendar, and notices.\n7. **Parent workspace** for notices and account settings (profile + 2FA).\n8. **Notice board** with audience targeting and optional PDF circulars.\n9. **Cloudinary uploads** for profile/website/founder images and notice PDFs.\n10. **Bootstrap and migration scripts** for admin seeding and assignment backfill.\n\n### 5.2 Out of scope (currently)\n\n- Multi-school / multi-tenant support.\n- Parent↔student linkage and parent dashboards per child.\n- Real payment gateway integration (bKash/Nagad/SSLCommerz/etc.).\n- Password reset / forgot-password / self-service password change.\n- Email verification and transactional email beyond admission status notification.\n- Messaging, chat, SMS, push notifications.\n- Timetable, exams scheduling, fee ledger, payroll, library, transport, hostel.\n- Automated test suite and CI pipeline.\n- Audit log and analytics/reporting suite.\n- Native mobile apps (responsive web only).\n\n### 5.3 Assumptions and constraints\n\n- One school per deployment; all users share one database.\n- Internet access is required for Cloudinary and Atlas-hosted MongoDB.\n- The deployment is served over HTTPS in production (secure cookies, HSTS).\n- The default payment provider is a **sandbox** and is intentionally rejected in production.\n- Class names, subjects, exam terms, and academic year are configured by admins, not hardcoded.\n- Academic year is derived from `SchoolConfig.sessionStartDate` as `YYYY-(YYYY+1)`.\n\n---\n\n## 6. Functional requirements\n\nStatus legend: **Done** = implemented end-to-end · **Partial** = implemented with gaps · **Planned** = not implemented.\n\n### 6.1 Public website\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-PUB-01 | Visitors can view a landing page with editable title, about text, banner, and school stats. | Done |\n| FR-PUB-02 | Visitors can view founder/board profiles with names, designations, quotes, and images. | Done |\n| FR-PUB-03 | Public pages show the current admission fee from server configuration. | Done |\n| FR-PUB-04 | Admin can edit welcome/about/fee, upload logo/banner, add/remove founders. | Done |\n| FR-PUB-05 | Public pages are responsive and CSP-compatible (no external CDN assets). | Done |\n\n### 6.2 Admissions and payments\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-ADM-01 | Applicant submits student, parent, guardian, and contact details (English + Bangla names). | Done |\n| FR-ADM-02 | Target class is selectable from admin-managed classes. | Done |\n| FR-ADM-03 | Fee amount is set by the server, never trusted from the client. | Done |\n| FR-ADM-04 | Applicant pays via an MFS-style flow using method + transaction ID. | Done (sandbox) |\n| FR-ADM-05 | Payment is idempotent and already-paid applications are rejected. | Done |\n| FR-ADM-06 | Applicant sees a printable receipt after payment. | Done |\n| FR-ADM-07 | Admin can list applications, inspect a dossier, approve/reject, and waive/mark unpaid. | Done |\n| FR-ADM-08 | Admin cannot directly mark an application paid; only the payment adapter can. | Done |\n| FR-ADM-09 | Applicant receives an email on status change when SMTP is configured. | Done |\n| FR-ADM-10 | Real payment gateway verification. | Planned |\n| FR-ADM-11 | Duplicate application/captcha/email-ownership verification. | Planned |\n| FR-ADM-12 | Transaction-reference uniqueness and replay protection. | Planned |\n\n### 6.3 Authentication and account security\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-AUTH-01 | Users log in with email + password; session is an HttpOnly cookie. | Done |\n| FR-AUTH-02 | Public registration creates a parent account only. | Done |\n| FR-AUTH-03 | Optional TOTP 2FA can be set up, verified, and disabled from the profile. | Done |\n| FR-AUTH-04 | 2FA login uses a short-lived pre-auth token before issuing a session. | Done |\n| FR-AUTH-05 | Sessions expire (default 8h) and logout clears session cookies. | Done |\n| FR-AUTH-06 | Admin can reset a user's password and edit role/profile. | Done |\n| FR-AUTH-07 | Users can update their profile; only parents may change name/email. | Done |\n| FR-AUTH-08 | Self-service password reset / change. | Planned |\n| FR-AUTH-09 | Email verification on registration or email change. | Planned |\n| FR-AUTH-10 | Per-account lockout, session revocation, 2FA recovery codes. | Planned |\n\n### 6.4 Admin\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-ADM-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |\n| FR-ADM-02 | List, search, and filter all users by role. | Done |\n| FR-ADM-03 | Create users of any role with role-specific profile fields. | Done |\n| FR-ADM-04 | View a single user with joined teacher/student profile and activity. | Done |\n| FR-ADM-05 | Change a user's role. | Done |\n| FR-ADM-06 | Reset credentials and edit profile fields. | Done |\n| FR-ADM-07 | Delete users with password confirmation; reindex rolls for students. | Done |\n| FR-ADM-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |\n| FR-ADM-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |\n| FR-ADM-10 | Publish notices with optional PDF circular. | Done |\n| FR-ADM-11 | Manage public website content and founders. | Done |\n| FR-ADM-12 | Review and update admission applications. | Done |\n\n### 6.5 Teacher\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-TCH-01 | View class roster for classes where the teacher is class teacher. | Done |\n| FR-TCH-02 | Take/edit daily attendance for class-teacher classes. | Done |\n| FR-TCH-03 | View attendance heatmap, by-date records, and yearly analytics. | Done |\n| FR-TCH-04 | Toggle off-days and holidays. | Done |\n| FR-TCH-05 | Enter marks for assigned class+subject+term. | Done |\n| FR-TCH-06 | Publish/unpublish results for a class+term as class teacher. | Done |\n| FR-TCH-07 | Add a student to a class-teacher class. | Done |\n| FR-TCH-08 | Edit/delete a student within class-teacher scope with password confirmation for delete. | Done |\n| FR-TCH-09 | View notices targeted to teachers/all. | Done |\n\n### 6.6 Student\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-STU-01 | View profile, attendance summary, and published grades on a dashboard. | Done |\n| FR-STU-02 | View published report card per term/subject. | Done |\n| FR-STU-03 | View a monthly attendance calendar with weekends, holidays, and personal status. | Done |\n| FR-STU-04 | View notices targeted to students/all. | Done |\n\n### 6.7 Parent\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-PAR-01 | View school notices. | Done |\n| FR-PAR-02 | Update own name, email, and profile photo. | Done |\n| FR-PAR-03 | Enable/disable 2FA. | Done |\n| FR-PAR-04 | Link to a child and view child records. | Planned |\n\n### 6.8 Notices\n\n| ID | Requirement | Status |\n|---|---|---|\n| FR-NOT-01 | Admin creates notices with audience (all/student/teacher) and optional PDF. | Done |\n| FR-NOT-02 | Authenticated users see notices filtered by audience. | Done |\n| FR-NOT-03 | Admin deletes notices with password confirmation; Cloudinary cleanup attempted. | Done |\n\n---\n\n## 7. Key user flows\n\n### 7.1 Admission → payment → receipt\n\n1. Visitor opens `/admission`.\n2. Classes are loaded from `GET /api/config`.\n3. Visitor submits the form → `POST /api/public/apply`.\n4. Server applies the configured fee and validates the target class.\n5. Server returns `applicationId` + `payableAmount`.\n6. Visitor enters payment method and transaction ID → `POST /api/public/pay-admission/:appId`.\n7. Server verifies through the payment adapter and marks the application paid.\n8. Visitor sees a printable receipt (`window.print` friendly layout).\n9. Admin reviews in `/a/approvals` and can approve/reject.\n\n### 7.2 Teacher attendance\n\n1. Teacher opens `/t/attendance`.\n2. App loads their class-teacher class and calendar state.\n3. Teacher selects a date and marks each student Present/Late/Absent.\n4. Submit → `POST /api/teacher/attendance` (upsert per class+date).\n5. Student's calendar and analytics reflect the entry.\n\n### 7.3 Grade entry → publish\n\n1. Admin assigns teacher to class+subject in `/a/assignments`.\n2. Teacher opens `/t/gradebook`, selects class/subject/term.\n3. Enter marks → `POST /api/grades/bulk-submit`.\n4. Class teacher publishes → `POST /api/grades/toggle-publish`.\n5. Student sees the marks only when published.\n\n### 7.4 Login with 2FA\n\n1. User submits email/password.\n2. If 2FA is enabled, server sets a 10-minute `preauth` cookie and returns `twoFactorRequired`.\n3. UI opens the 2FA modal.\n4. User submits TOTP → `POST /api/auth/2fa/verify`.\n5. Server swaps preauth for a full session cookie and returns the user.\n\n---\n\n## 8. Non-functional requirements\n\n| Area | Requirement |\n|---|---|\n| Security | HttpOnly cookies, CSRF double-submit, bcrypt (cost 12), Zod validation, Mongo sanitization, rate limits, Helmet/CSP, generic errors |\n| Authorization | Enforced server-side on every protected route; role reloaded from DB, not trusted from JWT |\n| Performance | Client-side pagination; indexed unique constraints; 5s DB selection timeout; 25s API timeout |\n| Availability | Fails fast on missing `JWT_SECRET` or DB connection errors |\n| Responsiveness | Mobile-first layouts; sidebar collapses to drawer + bottom navigation |\n| Accessibility | Semantic labels, focus-visible rings, ARIA labels on icon buttons, `prefers-reduced-motion` support |\n| Usability | Consistent design system, toasts, inline banners, empty states, loading spinners |\n| Maintainability | Clear backend layering, shared UI primitives, centralized API client, documented conventions |\n| Portability | Environment-driven config; SPA served by Express in production |\n| Observability | Console logging for DB lifecycle and server startup; no structured logging/APM yet |\n\n---\n\n## 9. Release milestones\n\n| Milestone | Content | Status |\n|---|---|---|\n| M1 — Foundation | Repo, Express server, Mongo connection, React/Vite shell, auth | Done |\n| M2 — Core operations | Admin user management, attendance, notices, grades | Done |\n| M3 — Public presence | Landing, founders, admissions, payment sandbox, receipts | Done |\n| M4 — Authorization hardening | Teacher assignments, class/subject scope, 2FA, CSRF, rate limits | Done |\n| M5 — Production readiness | Password reset, real payments, tests/CI, audit logs, docs | In progress |\n\n---\n\n## 10. Risks and open questions\n\n| Risk | Impact | Mitigation |\n|---|---|---|\n| Sandbox payments accept any transaction ID | Accidental \"paid\" records if enabled in production | Sandbox is refused in production; real adapter required |\n| No password reset | Users locked out rely on admin | Build reset flow |\n| No parent↔student link | Parent portal is limited to notices | Define relationship model |\n| No automated tests | Regressions likely | Add integration tests around auth, grades, admissions |\n| Plaintext 2FA secret | DB compromise exposes TOTP seeds | Encrypt at rest |\n| In-memory rate limits | Limits reset on restart and don't span instances | Use shared store (Redis) |\n| Destructive actions lack audit trail | Hard to investigate incidents | Add audit log |\n\n**Open questions**\n\n1. Which payment provider(s) should be integrated first, and in which country/currency?\n2. Should parents be linked to students by email, phone, or an admin-issued code?\n3. Are multiple school branches/tenants expected later?\n4. What is the required data-retention policy for admission PII (DOB, NID)?\n5. Should students be able to self-register with a school-issued code?\n\n---\n\n## 11. Definition of done (per feature)\n\nA feature is complete when:\n\n- Backend route validates input with Zod and enforces the correct role/scope.\n- Frontend uses the shared API client and design-system primitives.\n- Loading, empty, error, and success states are handled.\n- Mobile and desktop layouts are usable.\n- Security impact is reviewed (auth, CSRF, secrets, authorization).\n- Relevant docs (`MEMORY.md`, `TRACKER.md`) are updated.\n- No secrets are committed and no console errors remain.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 36.0s)

_Thinking:_

Now ARCHITECTURE.md. Need to keep IDs consistent: I accidentally reused FR-ADM for both admissions and admin. In PRD I used FR-ADM-01 for admissions and FR-ADM-01 for admin. That's a conflict. I should fix: admin should be FR-ADMIN-xx. Let me edit later. Note it. Actually I put "6.4 Admin" with FR-ADM-01..12. Change to FR-ADMIN. I'll do an edit after writing or now. Do it now quickly with replaceAll of the admin block? The block strings are identical prefixes to admissions but different text. I can edit each line? Easier replace "| FR-ADM-01 | Dashboard shows" etc. There are 12. Use bash? No, edit with unique oldString covering whole admin table and replace. I'll do that later in a single edit maybe. Let me remember.

Now ARCHITECTURE.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/ARCHITECTURE.md",
  "content": "# Architecture\n\n**Project:** Scholaris — School Management System\n**Last updated:** 2026-10-23\n**Related docs:** [PRD.md](./PRD.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)\n\n---\n\n## 1. System context\n\n```\n┌──────────────────────────────────────────────────────────────────────┐\n│                             Browser (SPA)                            │\n│  React 19 · React Router 7 · Tailwind CSS 4 · Axios                  │\n└───────────────┬──────────────────────────────────────────────────────┘\n                │  HTTPS · HttpOnly cookie · X-CSRF-Token\n                ▼\n┌──────────────────────────────────────────────────────────────────────┐\n│                        Express 5 API server                          │\n│  Helmet · CORS · CSRF · Sanitize · Zod · Rate limit · JWT cookies    │\n│                                                                      │\n│  routes ──► middleware ──► models (Mongoose) ──► MongoDB Atlas       │\n│                    │                                                 │\n│                    ├──► Cloudinary  (images, notice PDFs)            │\n│                    ├──► SMTP        (admission status email)         │\n│                    └──► Payment adapter (sandbox today)              │\n└──────────────────────────────────────────────────────────────────────┘\n```\n\n**Deployment model:** one school per deployment. The SPA and API share an origin in production.\n\n---\n\n## 2. Technology stack\n\n| Layer | Technology | Version (declared) | Notes |\n|---|---|---|---|\n| UI | React | ^19.2.8 | Hooks + Context, no external state library |\n| Routing | react-router-dom | ^7.18.3 | BrowserRouter, nested layouts |\n| Build | Vite | ^8.2.2 | Dev server proxies `/api` |\n| Styling | Tailwind CSS | ^4.3.3 | CSS-first `@theme` tokens in `index.css` |\n| HTTP client | Axios | ^1.20.0 | Single instance, `withCredentials`, XSRF mirroring |\n| Fonts | Fontsource | Plus Jakarta Sans, IBM Plex Mono | Self-hosted for tight CSP |\n| Runtime | Node.js | 18+ recommended | CommonJS backend, ESM frontend |\n| Server | Express | ^5.2.1 | Async route handlers |\n| ODM | Mongoose | ^9.9.4 | Schemas, hooks, unique indexes |\n| Database | MongoDB Atlas | — | `mongodb+srv` URI |\n| Validation | Zod | ^4.6.5 | Route-level allow-listing |\n| Auth | jsonwebtoken + bcryptjs | ^9.0.3 / ^3.0.3 | JWT cookies, bcrypt cost 12 |\n| 2FA | speakeasy + qrcode | ^2.0.0 / ^1.5.4 | TOTP with ±1 window |\n| Uploads | multer + cloudinary | ^2.3.0 / ^2.11.0 | Memory storage streams to Cloudinary |\n| Email | nodemailer | ^10.0.10 | Optional SMTP transport |\n| Security | helmet, cors, express-rate-limit, cookie-parser, mongo-sanitize | see `backend/package.json` | See §11 |\n\n---\n\n## 3. Repository layout\n\n```\nschool-management-system/\n├── package.json                 # Root scripts: dev / backend / frontend\n├── README.md\n├── docs/                        # This documentation set\n│   ├── PRD.md\n│   ├── ARCHITECTURE.md\n│   ├── DESIGN.md\n│   ├── MEMORY.md\n│   ├── RULES.md\n│   └── TRACKER.md\n├── backend/\n│   ├── server.js                # Bootstrap, middleware, routes, listener\n│   ├── config/\n│   │   ├── db.js                # Mongo connection (MONGODB_URI || MONGO_URI)\n│   │   └── cloudinary.js        # Cloudinary SDK configuration\n│   ├── controllers/\n│   │   └── authController.js    # Register/login/2FA/logout\n│   ├── middleware/\n│   │   ├── auth.js              # protect, softAuth, authorizeRoles, JWT helpers\n│   │   ├── assignments.js       # Teacher scope + assignment checks\n│   │   ├── csrf.js              # Double-submit cookie\n│   │   ├── sanitize.js          # NoSQL operator scrubbing\n│   │   └── validate.js          # Zod schemas + validate()\n│   ├── models/                  # User, Student, Teacher, Assignment, ...\n│   ├── routes/                  # One router per domain\n│   ├── services/payment.js      # Provider-agnostic payment adapter\n│   ├── scripts/                 # seed-admin, backfillAssignments\n│   ├── utils/rolls.js           # Roll number reindexing\n│   ├── .env.example\n│   └── package.json\n└── frontend/\n    ├── vite.config.js           # React plugin, PostCSS, /api proxy\n    ├── package.json\n    └── src/\n        ├── main.jsx             # Providers + render\n        ├── App.jsx              # Route table\n        ├── index.css            # Tailwind theme + tokens\n        ├── core/                # api.js, nav.js\n        ├── context/             # AuthContext, ToastContext\n        ├── components/          # ui, icons, layouts, pagination, 2FA modal\n        └── pages/               # Role-grouped screens\n```\n\n---\n\n## 4. Runtime topology and request path\n\n### 4.1 Development\n\n```\nBrowser → localhost:5173 (Vite)\n              │ /api/* proxied\n              ▼\n          localhost:5000 (Express) → MongoDB Atlas\n```\n\n- Vite proxies `/api` to `VITE_API_TARGET` (default `http://localhost:5000`).\n- The browser never needs the API origin, which keeps cookies same-origin.\n\n### 4.2 Production\n\n```\nBrowser ──HTTPS──► Express (one origin)\n                     ├── /api/*  → REST handlers\n                     └── /*      → frontend/dist/index.html (SPA fallback)\n```\n\n- `NODE_ENV=production` enables static serving of `frontend/dist`, HSTS, and secure cookies.\n- `TRUST_PROXY=true` when behind one reverse proxy (correct client IP + secure cookie handling).\n\n### 4.3 Middleware pipeline (order matters)\n\n`backend/server.js` applies, in order:\n\n1. `dotenv.config({ path: backend/.env })`\n2. Fail-fast checks (`JWT_SECRET` present; length in production; sandbox warning)\n3. `app.disable('x-powered-by')`\n4. `trust proxy` (if `TRUST_PROXY=true`)\n5. `helmet(...)` with explicit CSP\n6. `cors(...)` allow-list from `CLIENT_URL`\n7. `express.json({ limit: '2mb' })`\n8. `express.urlencoded({ limit: '2mb', extended: true })`\n9. `cookieParser()`\n10. `sanitize` (NoSQL operator scrubber)\n11. `csrfInit` (all responses)\n12. `csrfProtect` on `/api` (mutations only)\n13. Global rate limiter on `/api`\n14. Auth rate limiter on login/register/2FA verify\n15. Public write limiter on apply/pay\n16. Mongo connection listeners + `connectDB()`\n17. Route mounts\n18. Production static + SPA fallback\n19. `GET /` text health check\n20. 404 JSON handler\n21. Central error handler\n\n> Note: CSRF protection runs before rate limiting. Requests rejected for CSRF are not counted by the limiter.\n\n---\n\n## 5. Backend architecture\n\n### 5.1 Layering\n\n| Layer | Responsibility | Examples |\n|---|---|---|\n| Bootstrap | Env, middleware, route mounting, listener | `server.js` |\n| Config | External connections | `config/db.js`, `config/cloudinary.js` |\n| Middleware | Cross-cutting concerns | `auth`, `csrf`, `sanitize`, `validate`, `assignments` |\n| Routes | HTTP contract + handlers (most logic inline) | `routes/*.js` |\n| Controllers | Auth domain only | `controllers/authController.js` |\n| Models | Schema, validation, hooks, indexes | `models/*.js` |\n| Services | External/provider abstractions | `services/payment.js` |\n| Utils | Pure helpers | `utils/rolls.js` |\n| Scripts | One-off operational tasks | `scripts/*.js` |\n\nMost route handlers are inline in route files; only authentication is extracted into a controller.\n\n### 5.2 Route map\n\n| Mount | Router | Domain |\n|---|---|---|\n| `/api/auth` | `authRoutes.js` | Register, login, 2FA, profile, user admin |\n| `/api/attendance` | `attendanceRoutes.js` | Admin/teacher class attendance |\n| `/api/notices` | `noticeRoutes.js` | Notices + PDF upload |\n| `/api/teacher` | `teacherRoutes.js` | Teacher class tools |\n| `/api/grades` | `gradebookRoutes.js` | Grade entry + publishing |\n| `/api` | `assignmentRoutes.js` | `/api/admin/assignments`, `/api/teacher/my-*` |\n| `/api/config` | `configRoutes.js` | Classes, subjects, terms, off-days |\n| `/api/student` | `studentRoutes.js` | Student self-service |\n| `/api/public` | `publicRoutes.js` | Public info, admissions, payments |\n\n> Mount-order detail: `/api/teacher` is mounted before `/api` (assignments). Unmatched `/api/teacher/*` requests fall through to `assignmentRoutes`, which serves `/api/teacher/my-assignments` and `/api/teacher/my-scope`.\n\n### 5.3 Response conventions\n\n- Success: `{ \"success\": true, \"data\": ... }` or `{ \"success\": true, \"message\": \"...\" }`\n- Error: `{ \"success\": false, \"message\": \"...\" }`\n- Validation failures: generic `400 \"Invalid request payload.\"` (no schema leakage)\n- Unhandled errors: generic `500 \"Internal server error.\"` (stack logged server-side only)\n- 404: `{ \"success\": false, \"message\": \"Resource not found.\" }`\n\n---\n\n## 6. Data model\n\n### 6.1 Entity relationships\n\n```\n                ┌─────────────┐\n                │    User     │  role: admin|teacher|student|parent\n                │  (auth)     │  unique email · bcrypt password · 2FA\n                └──────┬──────┘\n        ┌──────────────┼───────────────┬──────────────────┐\n        │ 1:1          │ 1:1           │ 1:N              │ 1:N\n        ▼              ▼               ▼                  ▼\n ┌────────────┐  ┌────────────┐  ┌──────────────┐  ┌──────────────┐\n │  Student   │  │  Teacher   │  │  Assignment  │  │   Notice     │\n │ rollNumber │  │ teacherId  │  │ teacher      │  │ submittedBy  │\n │ gradeClass │  │ department │  │ subject|null │  │ audience     │\n └────────────┘  └────────────┘  │ class        │  └──────────────┘\n                                 │ academicYear │\n                                 └──────────────┘\n\n ┌──────────────┐    ┌──────────────┐    ┌──────────────┐\n │  Attendance  │    │  Gradebook   │    │ SchoolConfig │\n │ classId+date │    │ student/class│    │ singleton    │\n │ records[]    │    │ term/subject │    │ classes[]    │\n │ submittedBy  │    │ marks/grade  │    │ subjects[]   │\n └──────────────┘    └──────────────┘    │ term/holiday │\n                                          └──────────────┘\n\n ┌──────────────┐    ┌──────────────────────────────┐\n │  SchoolInfo  │    │        Application           │\n │ singleton    │    │ student/parent/guardian data │\n │ fee, images  │    │ payable/paid, status         │\n │ founders[]   │    │ payment txn/provider         │\n └──────────────┘    └──────────────────────────────┘\n```\n\n### 6.2 Collections and key constraints\n\n| Model | Purpose | Key fields | Indexes / hooks |\n|---|---|---|---|\n| `User` | Auth identity for every role | `name`, `email` (unique), `password` (`select:false`), `role`, `profileImage`, `twoFactorEnabled`, `twoFactorSecret` (`select:false`) | bcrypt pre-save (cost 12); `toJSON` strips secrets; `matchPassword()` |\n| `Student` | Student profile (1:1 User) | `userId` (unique), `studentId`, `rollNumber`, `gradeClass`, `parentContact`, `guardianName` | Unique `(gradeClass, rollNumber)` |\n| `Teacher` | Teacher profile (1:1 User) | `userId` (unique), `teacherId` (unique), `department`, `qualification`, `classTeacherOf` | Legacy class-teacher field |\n| `Assignment` | Authz mapping teacher↔class↔subject | `teacher`, `subject` (null = class teacher only), `class`, `academicYear`, `isClassTeacher`, `createdBy` | Unique `(teacher, subject, class, academicYear)` |\n| `Attendance` | Daily class attendance sheet | `classId`, `date` (midnight), `records[{studentId,status}]`, `submittedBy` | Unique `(classId, date)`; status enum Present/Absent/Late |\n| `Gradebook` | One mark per student/class/term/subject | `studentId`, `classId`, `term`, `subject`, `marksObtained`, `letterGrade`, `isPublished`, `submittedBy` | Unique `(studentId, classId, term, subject)`; pre-save letter grade |\n| `Notice` | Announcement | `title`, `content`, `targetAudience` (all/student/teacher), `attachmentUrl`, `submittedBy` | No extra index |\n| `SchoolConfig` | Singleton academic configuration | `classes[]`, `subjects[]`, `examTerms[]`, `sessionStartDate`, `weeklyOffDays[]`, `holidays[]` | Created on first read |\n| `SchoolInfo` | Singleton public site content | `welcomeTitle`, `aboutText`, `schoolLogo`, `bannerImage`, `admissionFeeAmount`, `founders[]` | Fee min 0 / max 1,000,000 |\n| `Application` | Public admission + payment | Student/parent/guardian fields, `payableAmount`, `paidAmount`, `paymentStatus`, `payment*`, `applicationStatus` | Status enum Pending/Approved/Rejected |\n\n### 6.3 Grade scale\n\nComputed in `Gradebook` pre-save:\n\n| Marks | Grade |\n|---|---|\n| ≥ 90 | A+ |\n| 80–89 | A |\n| 70–79 | B |\n| 60–69 | C |\n| 50–59 | D |\n| < 50 | F |\n\n### 6.4 Referential notes\n\n- `Attendance.records[].studentId`, `Gradebook.studentId`, `Assignment.teacher`, `Notice.submittedBy` reference **User**, not Student/Teacher profiles.\n- `Student.userId` and `Teacher.userId` are unique 1:1 links.\n- Deletion of a student reindexes later roll numbers in the same class (not transactional).\n- Deleting a user does not cascade attendance/grade records (orphans remain).\n\n---\n\n## 7. Authentication and authorization\n\n### 7.1 Session model\n\n| Token | Purpose | Lifetime | Cookie |\n|---|---|---|---|\n| `token` | Full session | `JWT_EXPIRY` (default 8h) | HttpOnly, SameSite=Lax, Secure in prod, path `/` |\n| `preauth` | Password accepted, 2FA pending | 10 minutes | HttpOnly, SameSite=Lax |\n| `csrf` | Double-submit CSRF secret | 24 hours | **Not** HttpOnly (SPA must read it), SameSite=Lax |\n\nJWT claims: session `{ id, role, purpose:'session' }`; preauth `{ id, purpose:'2fa' }`.\n\n`protect` reads the cookie first, then `Authorization: Bearer`. It rejects non-session purposes, reloads the user from MongoDB, and attaches `req.user`. Roles are never trusted from the JWT alone.\n\n### 7.2 Login sequence\n\n```\nPOST /api/auth/login {email,password}\n  ├─ user not found / bad password → 401 generic\n  ├─ 2FA disabled → Set-Cookie token → { success, user }\n  └─ 2FA enabled  → Set-Cookie preauth (10m)\n                    → { success, twoFactorRequired, user:{_id,name,email} }\n\nPOST /api/auth/2fa/verify {code}\n  ├─ preauth path → verify TOTP → Set-Cookie token, clear preauth → { success, user }\n  └─ session path → verify TOTP → set twoFactorEnabled=true\n```\n\n### 7.3 Authorization layers\n\n1. **Route role guards** — `authorizeRoles('admin')`, `('teacher')`, etc.\n2. **Class scope** — `canAccessClass(user, classId)`: admin always; teacher only for class-teacher classes.\n3. **Subject scope** — `requireAssignment()`: teacher needs an `Assignment` row for teacher+class+subject to enter grades.\n4. **Data scope** — student endpoints derive records from `req.user._id`; cross-class student IDs are rejected on grade writes.\n\n### 7.4 Role permission summary\n\n| Capability | Admin | Teacher | Student | Parent |\n|---|---|---|---|---|\n| Manage users/roles/credentials | ✅ | create students in own class | — | — |\n| Manage assignments | ✅ | view own | — | — |\n| Manage school config | ✅ | toggle off-days/holidays | — | — |\n| Attendance | ✅ all classes | ✅ class-teacher classes | view own | — |\n| Gradebook | ✅ all | ✅ assigned class+subject | view published | — |\n| Publish results | — (route is teacher-only) | ✅ class teacher | — | — |\n| Notices | create/delete | view | view | view |\n| Public website content | ✅ | — | — | — |\n| Admissions | review/approve | — | — | — |\n| 2FA / profile | ✅ | ✅ | ✅ | ✅ |\n\n---\n\n## 8. Admissions and payments\n\n```\nPOST /api/public/apply\n  ├─ validate payload (Zod)\n  ├─ load SchoolInfo + SchoolConfig\n  ├─ server sets payableAmount from SchoolInfo.admissionFeeAmount\n  ├─ reject targetClass not in SchoolConfig.classes (if list non-empty)\n  ├─ explicit allow-list of submitted fields\n  └─ create Application (status Pending, payment Unpaid)\n\nPOST /api/public/pay-admission/:appId\n  ├─ 404 if missing\n  ├─ 409 if already Paid\n  ├─ verifyPayment({ application, txnId, method })\n  │    ├─ sandbox → verified (no network), refused when NODE_ENV=production\n  │    └─ unknown provider → 503\n  └─ write Paid + paidAmount + txn/method/provider/verifiedAt\n```\n\n**Adapter contract:** a real provider must perform a server-to-server lookup of the transaction ID and confirm the paid amount is at least `application.payableAmount` before returning `{ verified: true }`.\n\n**Admin restrictions:** `PATCH /api/public/application/:appId` may set `applicationStatus` (Pending/Approved/Rejected) and `paymentStatus` only to `Unpaid` or `Waived` — never `Paid`.\n\n---\n\n## 9. File storage\n\n| Upload | Route | Storage | Constraints |\n|---|---|---|---|\n| Logo / banner | `POST /api/public/info/update` | Cloudinary `school_branding` | Images only, 5 MB/file, ≤2 files |\n| Founder photo | `POST /api/public/founder/add` | Cloudinary `school_founders` | Images only, 5 MB |\n| Notice PDF | `POST /api/notices` | Cloudinary `school_notices` (raw) | PDF only, 10 MB |\n| Profile image | `PUT /api/auth/profile` | Base64 data URL stored on `User` | ≤ ~2 MB validated; UI caps file at 1 MB |\n\nCloudinary config requires `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Missing values fail at upload time, not startup. MIME filters trust the client `Content-Type`; no magic-byte sniffing.\n\n---\n\n## 10. Configuration reference\n\nAll backend variables live in `backend/.env` (ignored by git). Use `backend/.env.example` as the template.\n\n| Variable | Required | Purpose |\n|---|---|---|\n| `PORT` | No | API port (default 5000) |\n| `NODE_ENV` | Recommended | `development` / `production` (secure cookies, HSTS, static SPA, payment guard) |\n| `MONGODB_URI` or `MONGO_URI` | **Yes** | MongoDB connection string |\n| `JWT_SECRET` | **Yes** | JWT signing key, ≥32 chars in production |\n| `JWT_EXPIRY` | No | Session lifetime (default `8h`) |\n| `CLIENT_URL` | No | Comma-separated CORS origins |\n| `TRUST_PROXY` | No | `true` behind one reverse proxy |\n| `PAYMENT_PROVIDER` | No | `sandbox` (default); real provider key when implemented |\n| `CLOUDINARY_CLOUD_NAME` | For uploads | Cloudinary cloud |\n| `CLOUDINARY_API_KEY` | For uploads | Cloudinary key |\n| `CLOUDINARY_API_SECRET` | For uploads | Cloudinary secret |\n| `SMTP_HOST` | For email | SMTP host (default `smtp.gmail.com`) |\n| `SMTP_PORT` | No | Listed but currently unused; code hardcodes 587 |\n| `SMTP_USER` | For email | SMTP username |\n| `SMTP_PASS` | For email | SMTP app password |\n| `VITE_API_TARGET` | Frontend | Dev proxy target (default `http://localhost:5000`) |\n\nNever commit `.env` or real credentials. `.env.example` contains placeholders only.\n\n---\n\n## 11. Security architecture\n\n| Control | Implementation |\n|---|---|\n| Password hashing | bcrypt, cost 12, `select:false`, stripped in `toJSON` |\n| Session transport | HttpOnly cookies (no JWT in JS storage) |\n| CSRF | Double-submit cookie (`csrf` + `X-CSRF-Token`) on all `/api` mutations |\n| NoSQL injection | `mongo-sanitize` on body/params/query |\n| Input validation | Zod schemas, unknown keys stripped, generic errors |\n| Rate limiting | Global 300/15m; auth 20/15m; public writes 20/15m (in-memory) |\n| Headers | Helmet with explicit CSP, `frameAncestors:'none'`, HSTS in production |\n| CORS | Allow-list, credentials enabled, restricted methods/headers |\n| Authorization | Server-side role + assignment + class scope checks |\n| Secrets | `.env` ignored; fail-fast `JWT_SECRET`; sample env tracked |\n| Payment integrity | Server-set amount; `Paid` only via adapter; sandbox blocked in production |\n| Error handling | Generic 500s; no stack traces to clients |\n| Uploads | MIME allow-list + size limits; memory storage |\n\nKnown gaps are tracked in [TRACKER.md](./TRACKER.md).\n\n---\n\n## 12. Operations\n\n### 12.1 Commands\n\n| Command | Location | Purpose |\n|---|---|---|\n| `npm install` | root | Install root/dev tooling |\n| `npm install` | backend / frontend | Install each app's deps |\n| `npm run dev` | root | Run backend + frontend concurrently |\n| `npm run backend` | root | Backend watch mode |\n| `npm run frontend` | root | Vite dev server |\n| `npm start` | backend | Production server (`node server.js`) |\n| `npm run build` | frontend | Build SPA to `frontend/dist` |\n| `npm run lint` | frontend | ESLint |\n| `npm run seed:admin` | backend | Bootstrap/promote an admin |\n| `node scripts/backfillAssignments.js [--apply]` | backend | Backfill Assignment rows (dry run by default) |\n\n### 12.2 Startup failure behavior\n\n- Missing `JWT_SECRET` → exit 1.\n- Short secret in production → exit 1; warning in dev.\n- Mongo connection failure → log and exit 1 (5s selection timeout).\n- Sandbox payment provider in production → warning at boot; payment requests return 503.\n\n---\n\n## 13. Scalability and constraints\n\n- **Stateless API** is horizontally scalable in principle, but:\n  - Rate limiting uses the default in-memory store (per process).\n  - JWT sessions cannot be revoked individually.\n- **Monolithic route handlers** are simple but grow large; extract controllers/services as domains expand.\n- **Single-tenant** data model; adding schools would require tenant scoping across every model.\n- **No background jobs/queues**; emails and uploads run inline.\n- **No transactions** around multi-document operations (user + profile creation, deletion + roll reindex, payment idempotency).\n- **No test suite or CI** yet; verification is manual.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 31.5s)

_Thinking:_

Now DESIGN.md.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/DESIGN.md",
  "content": "# Design System and UX Guide\n\n**Product:** Scholaris — School Management System\n**Last updated:** 2026-10-23\n**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)\n\n---\n\n## 1. Design principles\n\n1. **Calm authority** — deep indigo and slate surfaces communicate trust without feeling corporate or cold.\n2. **Clarity over decoration** — every screen leads with a title, a short subtitle, and one primary action.\n3. **Consistent primitives** — spacing, radius, typography, and states come from shared tokens and `ui.jsx`, not per-page styles.\n4. **Role-aware focus** — each workspace only shows navigation relevant to that role.\n5. **Safe actions** — destructive actions require confirmation; destructive admin/teacher actions require password re-entry.\n6. **Responsive by default** — mobile bottom navigation + slide-over drawer; tables scroll horizontally.\n7. **Accessible motion** — short, purposeful transitions that respect `prefers-reduced-motion`.\n\n---\n\n## 2. Brand identity\n\n| Element | Specification |\n|---|---|\n| Product name | **Scholaris** |\n| Descriptor | “School Management” |\n| Wordmark | Graduation-cap icon in a rounded square + stacked wordmark (`Wordmark.jsx`) |\n| Light wordmark | Indigo gradient tile, dark text |\n| Dark wordmark | Brass gradient tile, white text |\n| Iconography | Custom inline SVG set in `components/icons.jsx` (stroke-based, 1.5–2px) |\n| Voice | Professional, reassuring, lightly editorial (“quiet, steady craft”) |\n| Emoji | Avoid in product UI; used sparingly in docs only |\n\n---\n\n## 3. Design tokens\n\nDefined in `frontend/src/index.css` via Tailwind 4 `@theme`.\n\n### 3.1 Color\n\n| Token | Hex | Usage |\n|---|---|---|\n| `brand-50` | `#eef2ff` | Tinted backgrounds, active nav |\n| `brand-100` | `#e0e7ff` | Selection, subtle fills |\n| `brand-200` | `#c7d2fe` | Borders, avatars |\n| `brand-300` | `#a5b4fc` | Icons on dark |\n| `brand-400` | `#818cf8` | Accents |\n| `brand-500` | `#6366f1` | Focus ring, primary accents |\n| `brand-600` | `#4f46e5` | Primary buttons |\n| `brand-700` | `#4338ca` | Hover, headings |\n| `brand-800` | `#3730a3` | Gradients |\n| `brand-900` | `#312e81` | Hero gradients |\n| `brand-950` | `#1e1b4b` | Sidebar/footer depth |\n| `brass-300` | `#fcd34d` | Active nav accent |\n| `brass-400` | `#fbbf24` | Active indicator |\n| `brass-500` | `#f59e0b` | CTA on dark hero, rules |\n| `brass-600` | `#d97706` | Brass gradient end |\n| `slate-50` | `#f8fafc` | App background |\n| `slate-100`–`slate-300` | Tailwind slate | Borders, dividers, muted fills |\n| `slate-400`–`slate-600` | Tailwind slate | Secondary/tertiary text |\n| `slate-700`–`slate-900` | Tailwind slate | Body/heading text |\n| `slate-950` | `#020617` | Deep surfaces |\n| `emerald-*` | Tailwind | Success, present |\n| `amber-*` | Tailwind | Late, holidays, warnings |\n| `rose-*` | Tailwind | Errors, absent, destructive |\n| `sky-*` | Tailwind | Info, excused |\n| `violet-*` | Tailwind | Secondary tags |\n\n**Rule:** brand colors are for structure and primary actions; semantic colors (emerald/amber/rose/sky) are for status only.\n\n### 3.2 Typography\n\n| Role | Font | Weights | Notes |\n|---|---|---|---|\n| Sans / display | Plus Jakarta Sans | 400, 500, 600, 700, 800 | Self-hosted via Fontsource |\n| Mono | IBM Plex Mono | 400, 500, 600 | Dates, codes, keys, numerals |\n| Display utility | `.font-display` | — | `letter-spacing: -0.02em` |\n\nScale used in the app:\n\n| Element | Classes |\n|---|---|\n| Page hero H1 | `text-3xl sm:text-4xl` / public hero `text-4xl sm:text-5xl lg:text-6xl` |\n| Page header H1 | `text-2xl sm:text-3xl` |\n| Section title | `text-lg`–`text-xl` |\n| Body | `text-sm` / `text-base` |\n| Meta / labels | `text-xs` or `text-[11px] font-bold uppercase tracking-wider` |\n| Numerals / codes | `font-mono` |\n\n### 3.3 Spacing, radius, elevation\n\n| Token | Value / classes |\n|---|---|\n| Page container | `mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8` |\n| Card radius | `rounded-2xl` (large panels `rounded-3xl`) |\n| Control radius | `rounded-xl` (buttons, inputs) |\n| Pill radius | `rounded-full` |\n| Card border | `border-slate-200/80` |\n| Card shadow | `shadow-[0_1px_3px_rgb(15_23_42/0.05)]` |\n| Elevated modal | `shadow-2xl` |\n| Hover lift | `.hover-lift` (`-2px` translate + soft shadow) |\n\n### 3.4 Motion\n\n| Token | Value |\n|---|---|\n| `--motion-fast` | 120ms |\n| `--motion-base` | 200ms |\n| `--motion-slow` | 320ms |\n| `--ease-accent` | `cubic-bezier(0.2, 0, 0, 1)` |\n| `animate-fade-in` | opacity |\n| `animate-fade-up` | opacity + 10px rise |\n| `animate-scale-in` | 0.96 → 1 scale |\n| `animate-slide-in-right` | 24px slide |\n| `animate-shimmer` | loading shimmer |\n\nAll animations collapse to ~0.01ms under `prefers-reduced-motion: reduce`.\n\n---\n\n## 4. Layout patterns\n\n### 4.1 Public layout\n\n```\n┌─────────────────────────────────────────────┐\n│ PublicHeader (sticky, blurred)              │\n│  Wordmark · Home/Admission/Founders · auth  │\n├─────────────────────────────────────────────┤\n│ <Outlet />                                  │\n│  Landing / Admission / Founders / Auth      │\n├─────────────────────────────────────────────┤\n│ PublicFooter (dark gradient, link columns)  │\n└─────────────────────────────────────────────┘\n```\n\n- Header sticky at `top-0`, translucent `bg-slate-50/85` with backdrop blur.\n- Mobile menu expands below header.\n- Footer uses slate-900 → brand-950 gradient.\n\n### 4.2 Authenticated app shell\n\n```\nDesktop                                  Mobile\n┌──────────┬──────────────────────┐      ┌──────────────────────┐\n│ Rail     │ Header (sticky)      │      │ Header + menu button │\n│ 256px    │  page title · avatar │      ├──────────────────────┤\n│ dark     │  · sign out          │      │ Content              │\n│ gradient ├──────────────────────┤      │                      │\n│ nav      │ <Outlet />           │      ├──────────────────────┤\n│ + user   │                      │      │ Bottom nav (3 + More)│\n└──────────┴──────────────────────┘      └──────────────────────┘\n```\n\n- Rail: fixed left, `w-64`, hidden below `lg`.\n- Mobile: slide-over drawer (`w-72`, max `85vw`) with backdrop.\n- Bottom nav: first 3 items; “More” opens the drawer when there are >4 items.\n- Header title derives from the active nav item.\n\n### 4.3 Page shell\n\nStandard content pages use:\n\n```jsx\n<PageContainer>\n  <div className=\"animate-fade-up space-y-6\">\n    <PageHeader title=\"...\" subtitle=\"...\" actions={...} />\n    {/* Cards / tables / forms */}\n  </div>\n</PageContainer>\n```\n\n---\n\n## 5. Component inventory\n\n### 5.1 Shared UI (`components/ui.jsx`)\n\n| Component | Purpose | Notes |\n|---|---|---|\n| `Spinner` | Inline loading indicator | `tone=\"brand\"` or `\"light\"` |\n| `FullScreenLoader` | Page-level loading | Centered, labeled |\n| `PageContainer` | Max-width + responsive padding | Default `max-w-7xl` |\n| `Card` | White rounded panel with hairline border | Base surface |\n| `Badge` | Status pill | Tones: slate, indigo, emerald, teal, amber, rose, sky, violet, slateDark |\n| `StatCard` | Dashboard metric | Gradient icon tile, label/value/sub |\n| `EmptyState` | No-data state | Dashed border, icon, title, message |\n| `MessageBanner` | Inline error/success/info | `{ text, type }` |\n| `BackButton` | Navigational back | Chevron + label |\n| `PageHeader` | Title + subtitle + badge + actions | Standard page intro |\n| `inputClass` | Input/select/textarea styling | Focus ring brand |\n| `labelClass` | Form label styling | Uppercase micro-label |\n| `btnPrimary` | Main action | Brand-600 |\n| `btnSecondary` | Secondary action | White/border |\n| `btnDanger` | Destructive action | Rose-600 |\n| `btnDark` | Tertiary action | Slate-800 |\n| `tableWrap` / `thClass` / `tdClass` | Table styling | Thin scrollbars |\n\n### 5.2 Other shared components\n\n| Component | Purpose |\n|---|---|\n| `ProtectedRoute` | Session + role guard; redirects to login or role home |\n| `Pagination` | Client-side page controls with page-size select (10/20/50) |\n| `usePagination` | Pagination state; resets on list/size/reset key change |\n| `TwoFactorModal` | 2FA login (`mode=\"login\"`) or setup (`mode=\"setup\"`) |\n| `Wordmark` | Brand mark (light/dark, optional compact) |\n| `PublicHeader` / `PublicFooter` / `PublicLayout` | Public chrome |\n| `AppShell` | Authenticated chrome |\n| `icons.jsx` | Inline SVG icon set |\n| `ToastContext` | Portal-based transient notifications |\n\n### 5.3 Toast system\n\n- Tones: success (4s), info (4.5s), error (6.5s).\n- Stack is bounded to the last 4 toasts.\n- Rendered in a portal at bottom-center (mobile) / bottom-right (desktop).\n- `role=\"alert\"` + `aria-live=\"assertive\"` for errors; `status`/`polite` otherwise.\n- `useToast()` returns a safe no-op outside a provider.\n\n---\n\n## 6. Page inventory\n\n### 6.1 Public / auth\n\n| Route | Page | Purpose / key elements |\n|---|---|---|\n| `/` | `PublicPortal` | Hero from `SchoolInfo`, stats band, CTA to admission/founders |\n| `/admission` | `PublicAdmission` | 3-step stepper (Details → Fee → Receipt), dual-language form, class select, MFS method + txn ID, printable receipt |\n| `/founders` | `PublicFounders` | Board cards with photo, designation, quote |\n| `/login` | `Login` | Split layout: brand panel + form; 2FA modal when required |\n| `/register` | `Register` | Parent self-registration |\n| `/profile` | `Profile` | Avatar upload, name/email (parents only), 2FA setup/disable, sign out |\n\n### 6.2 Parent\n\n| Route | Page | Purpose |\n|---|---|---|\n| `/p/home` | `ParentHome` | Welcome + school notices |\n\n### 6.3 Student\n\n| Route | Page | Purpose |\n|---|---|---|\n| `/s/dashboard` | `StudentDashboard` | Profile summary, attendance %, published grades snapshot |\n| `/s/notices` | `StudentNotices` | Audience-filtered notices |\n| `/s/grades` | `StudentGrades` | Published report card by term/subject |\n| `/s/attendance` | `StudentAttendanceHub` | Month calendar (Present/Late/Absent/Excused/Off/Holiday) + yearly summary |\n\n### 6.4 Teacher\n\n| Route | Page | Purpose |\n|---|---|---|\n| `/t/dashboard` | `TeacherDashboard` | Welcome + teaching overview |\n| `/t/roster` | `TeacherRoster` | Class roster, add/edit/delete students |\n| `/t/attendance` | `TeacherAttendance` | Date picker, roster marking, off-day/holiday toggles |\n| `/t/analytics` | `TeacherAnalytics` | Per-student attendance aggregation |\n| `/t/gradebook` | `TeacherGradebook` | Class/subject/term mark entry + publish |\n| `/t/notices` | `SharedNoticeBoard` | Teacher notices |\n| `/t/users/create` | `TeacherCreateStudent` | Add student to class-teacher class |\n| `/t/users/edit/:id` | `TeacherEditStudent` | Edit student within scope |\n\n### 6.5 Admin\n\n| Route | Page | Purpose |\n|---|---|---|\n| `/a/dashboard` | `AdminDashboard` | Students/teachers/notices/pending tasks |\n| `/a/users` | `AdminUserRoster` | Searchable/filterable user directory |\n| `/a/users/create` | `AdminCreateUser` | Create any role with profile fields |\n| `/a/users/edit/:id` | `AdminEditUser` | Role, credentials, profile, attendance/grades view |\n| `/a/assignments` | `AdminAssignments` | Map teacher ↔ class ↔ subject, flag class teacher |\n| `/a/notices` | `AdminNoticeBoard` | Create/delete notices, PDF upload, password confirm |\n| `/a/approvals` | `AdminAppApproval` | Application tabs + decision actions |\n| `/a/applications/:id` | `AdminApplicationDetails` | Applicant dossier + decision |\n| `/a/website` | `AdminWebsiteManager` | Public text, logo/banner, founder cards |\n| `/a/settings` | `AdminSettings` | Classes, subjects, exam terms chips |\n\n**Legacy redirects:** old `/student/*`, `/teacher/*`, `/admin/*`, `/public/*` URLs redirect to the current `/s`, `/t`, `/a`, and public paths.\n\n---\n\n## 7. Navigation map\n\n| Role | Items (sidebar order) |\n|---|---|\n| Student | Overview · Notices · Report Card · Attendance |\n| Teacher | Overview · My Roster · Attendance · Analytics · Gradebook · Notices · Add Student |\n| Admin | Overview · All Users · Create User · Assignments · Notices · Admissions · Public Website · Settings |\n| Parent | Overview |\n\nRole landings: `/a/dashboard`, `/t/dashboard`, `/s/dashboard`, `/p/home`. Unauthorized role access redirects to the user's own landing.\n\n---\n\n## 8. Interaction patterns\n\n### 8.1 Forms\n\n- Labels are micro-caps (`labelClass`), inputs use `inputClass`.\n- Required fields rely on native `required` plus server-side Zod validation.\n- Inline `MessageBanner` for form-level errors; toasts for async results.\n- Buttons show disabled/loading states and prevent double-submit via `submitting`/`loading`.\n- File inputs accept images; profile photo is capped at 1 MB client-side and converted to a data URL.\n\n### 8.2 Tables and lists\n\n- Use `tableWrap`, `thClass`, `tdClass`.\n- Client-side pagination via `usePagination` + `Pagination`.\n- Horizontal scroll on narrow screens; thin custom scrollbars.\n- Empty data always renders `EmptyState`.\n\n### 8.3 Destructive actions\n\n- Deleting a user/student or notice opens a confirmation modal.\n- Admin/teacher deletes require the actor's password; notice delete sends it via `x-admin-password`.\n- Destructive buttons use `btnDanger` and are never the default focus.\n\n### 8.4 Loading and errors\n\n- Page-level: `FullScreenLoader` or centered `Spinner`.\n- Section-level: spinner inside the card.\n- Errors: inline `MessageBanner` for page context; toast for background failures.\n- Network failures use the shared `errorMessage()` fallback, never raw server internals.\n\n### 8.5 2FA\n\n- Login: `TwoFactorModal mode=\"login\"` after `twoFactorRequired`.\n- Setup: profile fetches QR + manual key, then `TwoFactorModal mode=\"setup\"`.\n- Input is numeric, max 6 digits, auto-focused, monospaced with wide tracking.\n\n### 8.6 Admissions\n\n- Three-step stepper with completed check marks.\n- Fee step accepts method (bKash default) and transaction ID (min 6 chars).\n- Receipt step is print-friendly (`print:*` utilities hide chrome).\n- Success/error feedback uses banners, not alerts.\n\n---\n\n## 9. State design\n\n| State | Pattern |\n|---|---|\n| Initial load | Centered spinner; skeleton/shimmer available but used sparingly |\n| Empty | `EmptyState` with a relevant icon and next-step message |\n| Error | `MessageBanner` inline; toast for actions |\n| Success | Toast + optimistic UI where safe; refetch for authoritative data |\n| Disabled | Reduced opacity + `cursor-not-allowed` |\n| Destructive hover | Rose background/border transition |\n\n---\n\n## 10. Responsive behavior\n\n| Breakpoint | Behavior |\n|---|---|\n| `< sm` | Single-column grids, bottom navigation, full-width controls, stacked headers |\n| `sm` | Two-column forms, horizontal header actions |\n| `md` | Header name visible, more inline nav |\n| `lg` | Persistent sidebar rail, no bottom nav, wider tables |\n| `xl+` | Max-width containers keep line lengths readable |\n\nRules:\n- Touch targets ≥ 40px on mobile.\n- Never rely on hover for essential actions.\n- Tables must scroll, not overflow the viewport.\n- Modals use `max-w-*`, padding, and backdrop blur.\n\n---\n\n## 11. Accessibility\n\n- All icon-only buttons have `aria-label` (menu, close, sign out, pagination).\n- Navigation landmarks use `<nav aria-label=\"...\">`.\n- Focus is always visible via `:focus-visible` ring (brand-500, 2px offset).\n- Form controls have associated `<label htmlFor>` where practical.\n- Toasts use live regions; errors are assertive.\n- Color is not the only status signal — labels accompany calendar/status colors.\n- `prefers-reduced-motion` disables animations.\n- Semantic headings (`h1` → `h3`) and lists are used.\n\n---\n\n## 12. Content and voice\n\n- Tone: confident, calm, concise; avoid jargon and exclamation marks.\n- Prefer sentence case for body; micro-labels are uppercase.\n- Buttons are verbs (“Create User”, “Publish”, “Save settings”).\n- Empty states explain what will appear and how to create it.\n- Error copy is actionable and never exposes internals.\n- Currency in the UI is Bangladeshi Taka (`৳`); dates use `en-BD` formatting.\n\n---\n\n## 13. Design rules and anti-patterns\n\n### Do\n\n- Reuse `ui.jsx` primitives and design tokens.\n- Keep one primary action per screen/section.\n- Use semantic status colors consistently.\n- Show loading, empty, error, and success states.\n- Use `Card` sections and `space-y-6` rhythm.\n- Keep forms in a single column on mobile.\n\n### Don’t\n\n- Hardcode hex colors or font families in components.\n- Introduce new button/input styles outside `ui.jsx`.\n- Use brand color for errors or success.\n- Use alerts/confirms for routine feedback; use toasts/banners.\n- Add external CDN scripts/fonts (breaks CSP).\n- Use color alone to communicate attendance/grade status.\n- Hide destructive actions behind hover-only affordances.\n\n---\n\n## 14. Future design work\n\n- Password reset and change-password screens.\n- Parent ↔ child dashboard once the data model exists.\n- Real payment provider UI (redirect/webhook states).\n- Dark mode tokens (currently light-first).\n- Skeleton loaders for table-heavy pages.\n- Audit/history timeline components for admin actions.\n- Empty-state illustrations to replace icon placeholders.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 29.6s)

_Thinking:_

Now MEMORY.md. This is like AI context. Include non-obvious facts, and fix note.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/MEMORY.md",
  "content": "# Project Memory\n\n**Purpose:** persistent context for developers and AI agents working on this repository. Read this before making changes.\n**Last updated:** 2026-10-23\n**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)\n\n---\n\n## 1. Snapshot\n\n| Item | Value |\n|---|---|\n| Product | Scholaris — School Management System |\n| Repo root | `school-management-system/` |\n| Frontend | React 19 + Vite 8 + Tailwind 4 (JavaScript/JSX, not TypeScript) |\n| Backend | Node.js + Express 5 + Mongoose 9 (CommonJS) |\n| Database | MongoDB Atlas (`mongodb+srv`) |\n| Auth | HttpOnly JWT cookies + optional TOTP 2FA |\n| Architecture | Decoupled SPA + REST API; one origin in production |\n| Maturity | Working MVP; no automated tests or CI |\n| Package manager | npm |\n\n---\n\n## 2. Quick start\n\n```bash\n# From repo root\nnpm install\nnpm install --prefix backend\nnpm install --prefix frontend\n\n# Configure backend/.env (copy backend/.env.example)\n# MONGODB_URI (or MONGO_URI) and JWT_SECRET are required\n\nnpm run dev            # backend (5000) + frontend (5173)\nnpm run backend        # backend only, node --watch\nnpm run frontend       # frontend only\n\n# Production SPA build\nnpm run build --prefix frontend\n```\n\n**Bootstrap an admin**\n\n```bash\ncd backend\nnpm run seed:admin -- --email admin@school.com --password 'StrongPass123!' --name 'Super Admin'\n# or reset an existing admin:\nnpm run seed:admin -- --email admin@school.com --reset-password\n```\n\n**Backfill teacher assignments** (dry run by default)\n\n```bash\ncd backend\nnode scripts/backfillAssignments.js          # report only\nnode scripts/backfillAssignments.js --apply  # write Assignment rows\n```\n\n---\n\n## 3. Environment variables\n\nBackend reads `backend/.env`. `dotenv` is loaded in `server.js` before anything uses env values.\n\n| Variable | Required | Notes |\n|---|---|---|\n| `MONGODB_URI` **or** `MONGO_URI` | Yes | Code accepts either; `db.js` and scripts use `MONGODB_URI || MONGO_URI`. `.env.example` documents `MONGO_URI`. |\n| `JWT_SECRET` | Yes | Server exits if missing; ≥32 chars required in production |\n| `PORT` | No | Default 5000 |\n| `NODE_ENV` | No | `production` enables secure cookies, HSTS, static SPA, sandbox payment block |\n| `JWT_EXPIRY` | No | Default `8h` |\n| `CLIENT_URL` | No | Comma-separated CORS origins |\n| `TRUST_PROXY` | No | Set `true` behind one reverse proxy |\n| `PAYMENT_PROVIDER` | No | Default `sandbox` |\n| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | For uploads | Missing values fail at upload time |\n| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | For admission email | Enabled only when user+pass exist |\n| `SMTP_PORT` | No | Documented but **unused**; code hardcodes 587 |\n| `VITE_API_TARGET` | No | Frontend dev proxy target, default `http://localhost:5000` |\n\n**Never commit `.env`.** It is git-ignored (`**/.env`). Only `.env.example` is tracked.\n\n---\n\n## 4. Non-obvious facts and gotchas\n\n### 4.1 Backend\n\n1. **Two DB variable names.** `.env` historically used `MONGODB_URI` while code read `MONGO_URI`. Code now accepts either. If connection fails with `bad auth`, the URI is being read — verify Atlas credentials, not the env name.\n2. **Route mount order matters.** `/api/teacher` is mounted before `/api` (assignments). `/api/teacher/my-assignments` and `/api/teacher/my-scope` are actually handled by `assignmentRoutes` mounted at `/api`, not `teacherRoutes`.\n3. **CSRF runs before rate limiting.** Mutations need a `csrf` cookie and matching `X-CSRF-Token` header. The SPA automatically mirrors the cookie via Axios `xsrfCookieName`/`xsrfHeaderName`. Non-browser clients must do this explicitly, including login/register.\n4. **Express 5 query sanitization.** `req.query` is a getter; `middleware/sanitize.js` redefines it with `Object.defineProperty`. Do not replace this with direct assignment.\n5. **Auth role is reloaded from DB.** `protect` fetches the user on every request; never trust the `role` claim in the JWT alone.\n6. **Session vs preauth.** Preauth token (`purpose:'2fa'`, 10 min) cannot access protected routes; `protect` rejects non-session purposes.\n7. **2FA setup downgrades first.** `POST /api/auth/2fa/setup` sets `twoFactorEnabled=false` immediately; it is re-enabled only after successful verification.\n8. **Logout does not clear the CSRF cookie** (despite a comment saying it does). Only `token` and `preauth` are cleared.\n9. **Publishing is teacher-only.** `POST /api/grades/toggle-publish` uses `authorizeRoles('teacher')`, so admins cannot publish even though they can enter grades.\n10. **Class-teacher ≠ grader.** `Assignment.subject = null` + `isClassTeacher` grants attendance/roster/publish rights, but grading requires a subject-specific assignment.\n11. **Deletes are not fully cascading.** Deleting a student removes `Student` + `User` but leaves `Attendance`/`Gradebook` records. Roll reindex is sequential, not transactional.\n12. **Admin cannot set `Paid`.** Application payment status via admin patch is limited to `Unpaid`/`Waived`; `Paid` only comes from the payment adapter.\n13. **Sandbox payments are permissive.** Any txn ID verifies; sandbox is refused when `NODE_ENV=production`.\n14. **No password reset exists.** Only an admin credential override (`PUT /api/auth/users/:id/credentials`). Do not build UI assuming a reset endpoint exists.\n15. **Public registration is parent-only.** `SAFE_PUBLIC_ROLE = 'parent'` is enforced in the controller.\n16. **Attendance student IDs reference `User`**, not `Student`. Queries often populate `studentId` with user name/email.\n17. **Academic year** is derived as `YYYY-(YYYY+1)` from `SchoolConfig.sessionStartDate`.\n18. **Notices filters:** student sees `all/student`; teacher sees `all/student/teacher`; admin and parent see everything.\n19. **Uploads use memory storage**, then stream to Cloudinary. No local `uploads/` directory is used.\n20. **Production serves the SPA** from `frontend/dist` with an API-aware fallback. Build the frontend before starting the backend in production.\n\n### 4.2 Frontend\n\n1. **Only use the shared Axios client** (`src/core/api.js`). It sets `baseURL:'/api'`, `withCredentials`, and XSRF handling. Do not add `fetch` or a second Axios instance.\n2. **Vite proxies `/api`.** The frontend never references the backend origin directly.\n3. **Auth bootstraps from `GET /api/auth/me`** on first paint; `loading` gates `ProtectedRoute`.\n4. **Role route prefixes:** `a` = admin, `t` = teacher, `s` = student, `p` = parent. Helpers live in `src/core/nav.js`.\n5. **Legacy URLs redirect** (`/student/*`, `/teacher/*`, `/admin/*`, `/public/*`) — keep them working when adding routes.\n6. **Tailwind 4 tokens** are defined with `@theme` in `src/index.css`; there is no `tailwind.config.js`. Use `brand-*`, `brass-*`, `slate-*`.\n7. **Fonts are self-hosted** through Fontsource imports in `main.jsx` to satisfy the backend CSP. Do not add CDN fonts/scripts.\n8. **`Profile` restricts name/email edits to parents**; other roles can only change the profile image.\n9. **Pagination is client-side** (`usePagination` + `Pagination`); pages fetch full lists.\n10. **Toasts must be pushed via `useToast()`**, not `alert()`.\n11. **`AppShell` requires a non-null user** and renders navigation from `NAV[user.role]`.\n12. **Icons are inline SVGs** in `components/icons.jsx`; reuse them instead of adding an icon library.\n13. **No TypeScript** — everything is `.jsx`/`.js` with plain JavaScript.\n\n---\n\n## 5. Authorization cheat sheet\n\n| Need | Middleware / helper | File |\n|---|---|---|\n| Logged-in user | `protect` | `middleware/auth.js` |\n| Optional session | `softAuth` | `middleware/auth.js` |\n| Role allow-list | `authorizeRoles('admin', ...)` | `middleware/auth.js` |\n| Admin only | `protect, authorizeRoles('admin')` | route files |\n| Teacher class scope | `canAccessClass(user, classId)` | `middleware/assignments.js` |\n| Teacher grading scope | `requireAssignment()` | `middleware/assignments.js` |\n| Class-teacher-only action | `requireAssignment({ requireSubject: false })` | `middleware/assignments.js` |\n| Prevent cross-class grade writes | `findOutOfClassStudents(classId, ids)` | `middleware/assignments.js` |\n| Current user's scope | `getTeacherScope(userId)` | `middleware/assignments.js` |\n\nRules of thumb:\n\n- Admin bypasses class/subject scope.\n- Teachers need explicit assignment rows for grading.\n- Students only access their own data via `req.user._id`.\n- Parents have no student linkage yet.\n\n---\n\n## 6. API quick reference\n\n**Public**\n\n- `GET /api/public/info`\n- `POST /api/public/apply`\n- `POST /api/public/pay-admission/:appId`\n- `GET /api/config`\n- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/2fa/verify`\n\n**Auth / profile**\n\n- `GET /api/auth/me`\n- `POST /api/auth/logout`\n- `PUT /api/auth/profile`\n- `POST /api/auth/2fa/setup`, `/2fa/verify`, `/2fa/disable`\n\n**Admin**\n\n- `GET /api/auth/dashboard-stats`\n- `GET /api/auth/users`, `GET /api/auth/users/:id`\n- `POST /api/auth/users/create`\n- `PATCH /api/auth/users/:id/role`\n- `PUT /api/auth/users/:id/credentials`\n- `DELETE /api/auth/users/teacher/:id`\n- `/api/admin/assignments` (GET/POST/PATCH/DELETE)\n- `POST /api/config/update`\n- `POST /api/public/info/update`, `/founder/add`, `DELETE /founder/:id`\n- `GET /api/public/applications`, `PATCH /api/public/application/:appId`\n- `POST /api/notices`, `DELETE /api/notices/:id`\n\n**Teacher**\n\n- `GET /api/teacher/my-class`\n- `POST /api/teacher/attendance`\n- `GET /api/teacher/attendance-calendar-heatmap/:classId`\n- `GET /api/teacher/attendance-by-date/:classId`\n- `GET /api/teacher/attendance-analytics/:classId`\n- `GET /api/teacher/my-assignments`, `GET /api/teacher/my-scope`\n- `PUT /api/teacher/users/edit/:id`, `DELETE /api/teacher/users/delete/:id`\n- `GET /api/grades/class/:classId/subject/:subjectName/term/:termName`\n- `POST /api/grades/bulk-submit`, `POST /api/grades/toggle-publish`\n\n**Student**\n\n- `GET /api/student/my-records`\n- `GET /api/student/my-attendance-calendar`\n\n**Shared**\n\n- `GET /api/attendance/:classId`\n- `POST /api/attendance`\n- `GET /api/notices`\n- `POST /api/config/toggle-offday`, `/toggle-holiday`\n\n---\n\n## 7. Data model quick reference\n\n| Model | File | One-liner |\n|---|---|---|\n| `User` | `models/User.js` | Auth identity; unique email; role admin/teacher/student/parent |\n| `Student` | `models/Student.js` | 1:1 profile; unique `(gradeClass, rollNumber)` |\n| `Teacher` | `models/Teacher.js` | 1:1 profile; unique `teacherId` |\n| `Assignment` | `models/Assignment.js` | Teacher↔class↔subject authz map; unique compound |\n| `Attendance` | `models/Attendance.js` | One sheet per class per day; unique `(classId, date)` |\n| `Gradebook` | `models/Gradebook.js` | Marks per student/class/term/subject; auto letter grade |\n| `Notice` | `models/Notice.js` | Announcement + audience + optional PDF |\n| `SchoolConfig` | `models/SchoolConfig.js` | Singleton classes/subjects/terms/off-days/holidays |\n| `SchoolInfo` | `models/PublicModels.js` | Singleton public content + fee + founders |\n| `Application` | `models/PublicModels.js` | Admission PII + payment + status |\n\nGrade scale: A+ ≥90, A ≥80, B ≥70, C ≥60, D ≥50, F <50.\n\n---\n\n## 8. File map (high value)\n\n| Concern | File |\n|---|---|\n| Server bootstrap + middleware order | `backend/server.js` |\n| DB connection | `backend/config/db.js` |\n| Auth controller | `backend/controllers/authController.js` |\n| JWT/cookies/roles | `backend/middleware/auth.js` |\n| Teacher scope | `backend/middleware/assignments.js` |\n| Zod schemas | `backend/middleware/validate.js` |\n| CSRF | `backend/middleware/csrf.js` |\n| NoSQL sanitize | `backend/middleware/sanitize.js` |\n| Payments | `backend/services/payment.js` |\n| Public/admissions | `backend/routes/publicRoutes.js` |\n| Gradebook | `backend/routes/gradebookRoutes.js` |\n| Frontend routes | `frontend/src/App.jsx` |\n| API client | `frontend/src/core/api.js` |\n| Auth state | `frontend/src/context/AuthContext.jsx` |\n| Toasts | `frontend/src/context/ToastContext.jsx` |\n| Nav config | `frontend/src/components/layout/navConfig.js` |\n| Design tokens | `frontend/src/index.css` |\n| UI primitives | `frontend/src/components/ui.jsx` |\n\n---\n\n## 9. Decision log (ADR-lite)\n\n| # | Decision | Rationale | Consequence |\n|---|---|---|---|\n| D1 | Decoupled SPA + REST API | Clear separation; independent dev servers | Two installs/scripts; same origin in prod |\n| D2 | HttpOnly cookie JWT, not localStorage | Mitigates XSS token theft | Needs CSRF protection; logout does not revoke token |\n| D3 | Separate `Assignment` model for teacher authz | Teachers change classes/subjects per year | Backfill script needed; class-teacher vs subject semantics |\n| D4 | Inline route handlers except auth | Fast iteration for small domains | Large route files; refactor to controllers later |\n| D5 | Zod validation + explicit allow-lists | Prevent mass assignment and injection | Some payloads must be updated in two places |\n| D6 | Client-side pagination | Simple; datasets are small | Full lists are downloaded |\n| D7 | Sandbox-only payments | Safe development without gateway credentials | Not production-capable for real money |\n| D8 | Self-hosted fonts + strict CSP | No third-party script/style origins | Font packages must be installed |\n| D9 | Parent is the public registration role | Prevents self-assigned privileged roles | No parent↔child link yet |\n| D10 | Production Express serves `frontend/dist` | One origin simplifies cookies/CORS/CSP | Must build frontend before deploy |\n\n---\n\n## 10. Known issues and tech debt\n\nSee [TRACKER.md](./TRACKER.md) for full detail. Highlights:\n\n- No password reset / self-service change password.\n- No parent↔student relationship.\n- No automated tests, CI, or lint on backend.\n- 2FA secret stored in plaintext; no recovery codes.\n- No session revocation or account lockout.\n- Sandbox payments accept any transaction ID; no replay uniqueness.\n- In-memory rate limiting (per process).\n- No audit log.\n- Non-transactional multi-document operations.\n- README is outdated (says database pending; omits env/2FA/payments).\n- `SMTP_PORT` unused; `TRUST_PROXY`/`VITE_API_TARGET` not in `.env.example`.\n- Orphaned attendance/grades after user deletion.\n- No image magic-byte validation; client MIME is trusted.\n\n---\n\n## 11. Recent changes\n\n| Date | Change |\n|---|---|\n| 2026-10-23 | Added `docs/` set: PRD, Architecture, Design, Memory, Rules, Tracker |\n| 2026-10-23 | Mongo connection now accepts `MONGODB_URI` **or** `MONGO_URI` in `config/db.js`, `scripts/seed-admin.js`, `scripts/backfillAssignments.js` |\n| — | Assignment-based teacher authorization, 2FA, CSRF double-submit, rate limiting, sandbox payment adapter (from codebase history) |\n\n---\n\n## 12. Glossary\n\n| Term | Meaning |\n|---|---|\n| **Class teacher** | Teacher assigned to a class for roster/attendance/publishing; `Assignment.isClassTeacher` with `subject:null` |\n| **Subject assignment** | Teacher+class+subject row required to enter grades |\n| **Class scope** | Classes a teacher can access (class-teacher classes) |\n| **Subject scope** | Class+subject pairs a teacher can grade |\n| **Preauth** | 10-minute JWT proving password success before 2FA |\n| **Published grade** | `Gradebook.isPublished = true`; visible to students |\n| **Sandbox payment** | Simulated adapter that verifies without a network call |\n| **Waived** | Admin-set payment status meaning the fee is not required; still not blocked from the payment endpoint |\n| **Off-day** | Weekly recurring non-school weekday (`weeklyOffDays` JS day index) |\n| **Holiday** | Specific `YYYY-MM-DD` non-school date |\n\n---\n\n## 13. How to continue (agent checklist)\n\n1. Read this file and `RULES.md`.\n2. Confirm the relevant flow in `ARCHITECTURE.md`.\n3. Inspect the actual route/schema before editing; do not assume an endpoint exists.\n4. Search for existing helpers (`validate`, `authorizeRoles`, `requireAssignment`, `ui.jsx`) before adding new ones.\n5. Never commit secrets or `.env`.\n6. Run `npm run lint --prefix frontend` and `npm run build --prefix frontend` after frontend changes.\n7. Backend has no test/lint script; at minimum start the server and exercise the changed route.\n8. Update `MEMORY.md` and `TRACKER.md` when behavior or status changes.\n9. Do not commit unless the user explicitly asks.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 27.7s)

_Thinking:_

Now RULES.md.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/RULES.md",
  "content": "# Engineering Rules\n\n**Project:** Scholaris — School Management System\n**Last updated:** 2026-10-23\n**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [TRACKER.md](./TRACKER.md)\n\nThese rules are mandatory for all contributors (human or AI). When in doubt, prefer the safer, smaller, more explicit change.\n\n---\n\n## 1. Golden rules\n\n1. **Never commit secrets.** No `.env`, credentials, tokens, keys, or real student/parent data in git.\n2. **Never trust the client.** Validate every input and enforce authorization on the server.\n3. **Reuse existing patterns** before creating new ones. Read neighboring files first.\n4. **Keep changes scoped.** Do not refactor unrelated code in the same change.\n5. **Do not break documented contracts** (routes, response shapes, role rules) without updating docs.\n6. **No silent failures.** Handle and surface errors; never leave an empty `catch`.\n7. **Do not commit unless explicitly asked.**\n8. **Update the docs** (`MEMORY.md`, `TRACKER.md`) when behavior or status changes.\n\n---\n\n## 2. Security rules\n\n### 2.1 Secrets and configuration\n\n- `.env` files are git-ignored. Use `backend/.env.example` for placeholders only.\n- Never log secrets, tokens, passwords, 2FA secrets, or full connection strings.\n- `JWT_SECRET` must be present and ≥32 characters in production.\n- Use least-privilege database users; avoid sharing production credentials.\n- Rotate any credential that is accidentally exposed; do not just delete the commit.\n\n### 2.2 Authentication\n\n- Sessions are HttpOnly cookies. Never store JWTs in `localStorage`/`sessionStorage`.\n- Protected routes must use `protect`; role restrictions must use `authorizeRoles`.\n- Role must come from the DB-loaded `req.user`, not from the JWT claim.\n- Preauth tokens (`purpose:'2fa'`) must not be accepted as sessions.\n- Passwords are hashed by the `User` pre-save hook (bcrypt cost 12). Never hash manually or store plaintext.\n- Do not add endpoints that return `password` or `twoFactorSecret`; use safe projections/serializers.\n\n### 2.3 Authorization\n\n- Every protected endpoint must declare its role guard.\n- Teacher class-level actions must call `canAccessClass`.\n- Teacher grading must call `requireAssignment`.\n- Student endpoints must scope queries by `req.user._id`.\n- Cross-class student IDs must be rejected on writes (`findOutOfClassStudents`).\n- Admin-only actions must not be reachable by teachers or parents.\n- Destructive admin/teacher actions require password confirmation.\n\n### 2.4 Input and injection\n\n- Every mutation must be validated with Zod via `validate(schema)`.\n- Zod schemas must **allow-list** fields; never pass `req.body` straight to a model.\n- Server-controlled fields (fee, payment status, role, ownership) must never be accepted from the client.\n- Apply `mongo-sanitize` behavior to body/params/query; preserve the Express 5 `Object.defineProperty` fix.\n- File uploads: enforce MIME allow-lists and size limits. Do not trust client MIME alone for new sensitive uploads; add magic-byte checks when possible.\n\n### 2.5 CSRF, CORS, headers\n\n- All `/api` mutations require the double-submit CSRF token. Do not exempt routes without a written reason.\n- Frontend requests must go through the shared Axios client so `X-CSRF-Token` is sent.\n- Keep CORS restricted to `CLIENT_URL`; never use `origin: '*'` with credentials.\n- Do not weaken Helmet/CSP. No external CDN scripts, styles, or fonts.\n\n### 2.6 Payments\n\n- Amounts must be set server-side.\n- Only the payment adapter may mark an application `Paid`.\n- Keep sandbox refused in production.\n- A real adapter must verify transaction ID and amount server-to-server.\n- Do not add an admin path that sets `Paid`.\n\n### 2.7 Errors and logging\n\n- Return generic errors to clients (`Invalid request payload.`, `Internal server error.`).\n- Log details server-side only.\n- Never include stack traces, DB errors, or secrets in responses.\n\n---\n\n## 3. Backend rules\n\n### 3.1 Structure\n\n- Keep cross-cutting logic in `middleware/`, schemas in `middleware/validate.js`, provider logic in `services/`.\n- New domain routes go in `backend/routes/` and are mounted in `server.js`.\n- Extract a controller only when a route file becomes hard to maintain; otherwise follow the existing inline style.\n- Keep the middleware order in `server.js` intact unless the change is explicitly about ordering.\n- Remember route mount order: `/api/teacher` precedes `/api` (assignments).\n\n### 3.2 Validation\n\n- Add/extend a Zod schema for every new payload or param.\n- Use `validate(schema, 'params' | 'query')` for non-body sources.\n- Sanitize/trim strings; coerce numbers explicitly.\n- Cap array lengths to prevent abuse (existing pattern: 2000 items).\n\n### 3.3 Database\n\n- Define indexes for unique business keys and frequent lookups.\n- Use `select: false` for sensitive fields.\n- Use `pre('save')` hooks for derived values only when they must always be correct.\n- Use `.lean()` for read-only list/aggregate queries where appropriate.\n- Wrap multi-document writes in transactions when consistency matters (not done today; improve when touching those flows).\n- Do not expose raw Mongo error messages.\n- Handle duplicate-key errors (`11000`) with friendly 400s.\n- Preserve referential behavior: `Attendance`/`Gradebook` reference `User`.\n- When deleting students, preserve roll uniqueness and reindex sequentially.\n- Do not break the unique compound indexes in `Student`, `Assignment`, `Attendance`, `Gradebook`.\n\n### 3.4 Responses\n\n- Follow `{ success, data|message }` for success and `{ success:false, message }` for errors.\n- Use correct status codes: 400 validation, 401 auth, 403 authorization, 404 missing, 409 conflict, 429 rate limit, 503 unavailable.\n- Do not change existing response shapes without updating the frontend and docs.\n\n### 3.5 Auth and cookies\n\n- Use helpers in `middleware/auth.js`; do not hand-roll JWT/cookie logic.\n- Keep cookie flags: `httpOnly`, `sameSite:'lax'`, `secure` in production, `path:'/'`.\n- If you add logout cleanup, clear `csrf` as well (current gap).\n\n---\n\n## 4. Data rules\n\n- One `User` per person; email is unique and normalized.\n- `Student` and `Teacher` are 1:1 profiles keyed by `userId`.\n- Public registration may only create `parent`.\n- Only admins may change roles.\n- Student roll numbers are unique per class; deletion reindexes later rolls.\n- `Assignment.subject = null` means class-teacher-only; never grant grading for null subjects.\n- Published grades are the only grades students may see.\n- Attendance is one document per class per day, normalized to midnight.\n- `SchoolConfig` and `SchoolInfo` are singletons; create defaults on first read.\n- Do not store PII beyond what the admissions form requires.\n- Never add sample real PII to seeds or fixtures.\n\n---\n\n## 5. Frontend rules\n\n### 5.1 API access\n\n- Use `src/core/api.js` only. No `fetch`, no second Axios instance.\n- Use `errorMessage()` for user-facing failures.\n- Keep `withCredentials` and XSRF configuration intact.\n- Use relative `/api/...` paths; never hardcode the backend origin.\n\n### 5.2 State and routing\n\n- Use `AuthContext` for session/user; do not duplicate auth state.\n- Use `ProtectedRoute` with `allowedRoles` for every authenticated screen.\n- Keep role prefixes (`/a`, `/t`, `/s`, `/p`) and legacy redirects working.\n- Use `useToast()` for transient feedback; do not use `alert`/`confirm`.\n- Prefer local component state; add a context only for app-wide concerns.\n\n### 5.3 UI and styling\n\n- Reuse `components/ui.jsx` primitives and `inputClass`/`btn*` classes.\n- Use design tokens (`brand-*`, `brass-*`, `slate-*`); no hardcoded hex/fonts.\n- Use semantic colors only for status (emerald success, amber late/warning, rose error/absent, sky info).\n- Every list must handle loading, empty, and error states.\n- Use `EmptyState`, `Spinner`, `MessageBanner`, and `Card` consistently.\n- Keep one primary action per screen/section.\n- Ensure icon-only buttons have `aria-label`.\n- Support mobile: bottom nav, horizontal table scroll, stacked forms.\n- Respect `prefers-reduced-motion`.\n- Do not add external fonts/scripts/styles (CSP).\n\n### 5.4 Components\n\n- New shared components go in `components/`; page-specific ones stay with the page.\n- Keep presentational components free of data fetching.\n- Do not introduce an icon/UI library; extend `icons.jsx`.\n- Use `Pagination` + `usePagination` for large lists.\n\n### 5.5 JavaScript style\n\n- Plain JavaScript/JSX (no TypeScript).\n- Match existing formatting: 2-space indentation, single quotes, semicolons.\n- Use function components and hooks.\n- No comments unless they explain non-obvious intent (existing files use sparse section comments).\n- Avoid unused imports/variables; frontend lint must pass.\n\n---\n\n## 6. Naming and conventions\n\n| Thing | Convention | Example |\n|---|---|---|\n| React components | PascalCase file + export | `AdminDashboard.jsx` |\n| Hooks | `useX` | `usePagination` |\n| Context | `XContext` + `XProvider` + `useX` | `AuthContext` |\n| Backend files | camelCase | `gradebookRoutes.js` |\n| Models | PascalCase | `Gradebook` |\n| API paths | plural nouns, kebab-case segments | `/api/pay-admission/:appId` |\n| Roles | lowercase | `admin`, `teacher`, `student`, `parent` |\n| Attendance statuses | Title case | `Present`, `Absent`, `Late` |\n| Payment statuses | Title case | `Unpaid`, `Paid`, `Waived` |\n| Application statuses | Title case | `Pending`, `Approved`, `Rejected` |\n| Env vars | SCREAMING_SNAKE_CASE | `JWT_SECRET` |\n\n---\n\n## 7. Git and workflow\n\n- Do not commit unless the user explicitly asks.\n- Before committing: inspect `git status`, `git diff`, and recent history.\n- Stage only intended files; never stage `.env` or secrets.\n- Write concise, imperative commit messages that match repo style.\n- Do not amend, force-push, skip hooks, or create empty commits unless asked.\n- Do not update git config.\n- Keep PRs focused; describe behavior changes, security impact, and verification.\n- Rebase/merge per project preference; do not rewrite shared history.\n\n---\n\n## 8. Verification rules\n\n### Frontend\n\n```bash\nnpm run lint --prefix frontend\nnpm run build --prefix frontend\n```\n\nBoth must pass before considering frontend work complete.\n\n### Backend\n\n- There is no test or lint script today.\n- Start the server (`npm run backend`) and exercise the changed endpoints.\n- Confirm startup logs show a Mongo connection.\n- For auth/security changes, test both success and failure paths (401/403/409/429).\n- For data changes, verify indexes and duplicate handling.\n\n### Manual smoke checklist\n\n- Login/logout; 2FA if enabled.\n- Role landing redirects.\n- Create/edit/delete a user (password-confirmed).\n- Attendance submit + student calendar.\n- Marks submit + publish + student visibility.\n- Notice create/delete with PDF.\n- Admission apply → pay → admin review.\n- Mobile width (≤375px) and desktop.\n\n---\n\n## 9. Documentation rules\n\n- Keep `docs/` in sync with code.\n- Update `TRACKER.md` when a feature moves state or a bug is found/fixed.\n- Update `MEMORY.md` for non-obvious behavior, decisions, and gotchas.\n- Update `ARCHITECTURE.md` when routes, models, middleware order, or integrations change.\n- Update `DESIGN.md` when tokens, shared components, routes, or interaction patterns change.\n- Update `PRD.md` when scope or requirements change.\n- Update `.env.example` when adding a variable.\n- Do not document secret values; names and purposes only.\n\n---\n\n## 10. Rules for AI agents\n\n1. Read `MEMORY.md` and this file before changing code.\n2. Explore the actual implementation; never assume an endpoint, model, or component exists.\n3. Prefer editing existing files over creating new ones.\n4. Do not add dependencies without checking they are already used and justified.\n5. Do not add comments to code unless requested.\n6. Do not create documentation files unless requested (this docs set was requested).\n7. Do not run destructive git operations or commit without explicit permission.\n8. Do not expose secrets found in `.env` or logs.\n9. Verify with lint/build/start commands available in the repo.\n10. If a required command is unknown, ask the user and suggest adding it to `AGENTS.md`.\n11. Keep responses and diffs minimal and focused.\n12. Report what changed, how it was verified, and any remaining risk.\n\n---\n\n## 11. Pre-merge checklist\n\n- [ ] Change is scoped and matches existing patterns.\n- [ ] Inputs validated; authorization enforced server-side.\n- [ ] No secrets or PII added to the repo.\n- [ ] Response shapes and status codes are correct.\n- [ ] Loading/empty/error/success states handled in the UI.\n- [ ] Mobile and desktop layouts verified.\n- [ ] Accessibility basics checked (labels, focus, ARIA).\n- [ ] Frontend lint and build pass.\n- [ ] Backend starts and changed routes were exercised.\n- [ ] Docs updated (`MEMORY.md`, `TRACKER.md`, and any affected doc).\n- [ ] No unrelated files staged.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 30.6s)

_Thinking:_

Now TRACKER.md. Include statuses, backlog, known issues, changelog. Must fix PRD admin IDs too. Let me write tracker then fix.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/TRACKER.md",
  "content": "# Project Tracker\n\n**Project:** Scholaris — School Management System\n**Last updated:** 2026-10-23\n**Status:** Working MVP · no automated tests or CI\n**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md)\n\n---\n\n## 1. Status legend\n\n| Symbol | Meaning |\n|---|---|\n| ✅ | Done / working end-to-end |\n| 🟡 | Partial / works with known gaps |\n| ⛔ | Not implemented |\n| 🐞 | Known bug or defect |\n| 🔒 | Security-sensitive |\n| 🧹 | Technical debt |\n\nSeverity: **P0** critical · **P1** high · **P2** medium · **P3** low.\n\n---\n\n## 2. Module status\n\n| Module | Status | Notes |\n|---|---|---|\n| Public website | ✅ | Landing, founders, editable content, Cloudinary images |\n| Admissions | 🟡 | Full flow with sandbox payment; no real gateway |\n| Payments | 🟡 | Sandbox adapter only; permissive verification |\n| Auth & sessions | 🟡 | Login, logout, 2FA; no password reset/lockout/revocation |\n| Admin users | ✅ | List/create/edit/role/credentials/delete |\n| Teacher assignments | ✅ | Class-teacher + subject scope, backfill script |\n| Attendance | ✅ | Teacher marking, heatmap, analytics, student calendar |\n| Gradebook | ✅ | Bulk entry, publish, student report card |\n| Notices | ✅ | Audience targeting, PDF upload, password-confirmed delete |\n| Admin settings | ✅ | Classes, subjects, exam terms, off-days, holidays |\n| Student portal | ✅ | Dashboard, grades, attendance, notices |\n| Parent portal | 🟡 | Notices + profile only; no child linkage |\n| Uploads | 🟡 | Cloudinary works; no magic-byte validation/cleanup on replace |\n| Email | 🟡 | Admission status email; port unused; no HTML escaping |\n| Docs | ✅ | PRD, architecture, design, memory, rules, tracker |\n| Testing | ⛔ | No automated tests |\n| CI/CD | ⛔ | None configured |\n| Observability | 🟡 | Console logs only |\n| Audit log | ⛔ | None |\n\n---\n\n## 3. Feature checklist\n\n### 3.1 Public website\n\n- [x] Landing page from `SchoolInfo`\n- [x] Founder profiles\n- [x] Admission fee displayed from server\n- [x] Admin edit welcome/about/fee\n- [x] Admin upload logo/banner\n- [x] Admin add/remove founders\n- [x] Responsive public header/footer\n- [ ] Dedicated news/gallery pages\n- [ ] Contact form\n\n### 3.2 Admissions and payments\n\n- [x] Dual-language application form\n- [x] Target class from `SchoolConfig`\n- [x] Server-set fee\n- [x] Application persistence with `Pending` status\n- [x] Sandbox payment with method + txn ID\n- [x] Idempotent \"already paid\" guard\n- [x] Printable receipt\n- [x] Admin application list\n- [x] Admin application dossier\n- [x] Approve/reject\n- [x] Waive/unpaid status\n- [x] Email notification on status change (SMTP optional)\n- [ ] Real payment provider\n- [ ] Transaction ID uniqueness/replay protection\n- [ ] Block payment for `Waived`/`Rejected` applications\n- [ ] Atomic idempotency (transactions/conditional update)\n- [ ] Email ownership/OTP verification for payment\n- [ ] CAPTCHA and duplicate application detection\n- [ ] Escape applicant name in notification HTML\n\n### 3.3 Authentication and security\n\n- [x] Register (parent-only)\n- [x] Login with bcrypt\n- [x] HttpOnly session cookie\n- [x] JWT expiry (default 8h)\n- [x] Logout clears session + preauth\n- [x] TOTP 2FA setup/verify/disable\n- [x] Preauth token separation\n- [x] CSRF double-submit\n- [x] NoSQL sanitization\n- [x] Zod validation with allow-listing\n- [x] Helmet/CSP/HSTS\n- [x] CORS allow-list\n- [x] Rate limits (global/auth/public writes)\n- [x] Role reloaded from DB on each request\n- [x] Fail-fast `JWT_SECRET`\n- [ ] Self-service password reset/change\n- [ ] Email verification\n- [ ] Account lockout / failed-attempt counter\n- [ ] Session revocation / token versioning\n- [ ] Encrypt 2FA secret at rest\n- [ ] 2FA recovery codes\n- [ ] TOTP replay protection\n- [ ] Clear `csrf` cookie on logout\n- [ ] Audit log for security events\n\n### 3.4 Admin\n\n- [x] Dashboard stats\n- [x] User directory with search/filter\n- [x] Create users of any role\n- [x] Role-specific profile creation\n- [x] User detail with joined profile\n- [x] Change role\n- [x] Reset credentials\n- [x] Delete user/student with password confirmation\n- [x] Student roll reindex after delete\n- [x] Teacher assignment CRUD\n- [x] Class teacher flag\n- [x] Classes/subjects/exam terms config\n- [x] Weekly off-days and holidays\n- [x] Create notice + PDF\n- [x] Delete notice with password\n- [x] Public website manager\n- [x] Admission oversight\n\n### 3.5 Teacher\n\n- [x] Overview dashboard\n- [x] Class roster (class-teacher scope)\n- [x] Take/edit attendance\n- [x] Attendance calendar heatmap\n- [x] Attendance by date\n- [x] Yearly analytics\n- [x] Toggle off-days/holidays\n- [x] Gradebook (assigned class+subject+term)\n- [x] Bulk mark submit\n- [x] Publish/unpublish (class teacher)\n- [x] Add student to class\n- [x] Edit student in scope\n- [x] Delete student in scope (password)\n- [x] Notices\n\n### 3.6 Student\n\n- [x] Dashboard with profile, attendance summary, grades\n- [x] Published report card\n- [x] Attendance calendar with weekends/holidays\n- [x] Notices\n\n### 3.7 Parent\n\n- [x] Notices\n- [x] Profile update (name/email/photo)\n- [x] 2FA\n- [ ] Link parent to student(s)\n- [ ] View child attendance/grades/notices\n- [ ] Multiple children support\n\n### 3.8 Platform\n\n- [x] Root `npm run dev`\n- [x] Vite `/api` proxy\n- [x] Production SPA serving\n- [x] Admin seed script\n- [x] Assignment backfill script\n- [x] `.env.example`\n- [x] `docs/` documentation set\n- [ ] Automated tests\n- [ ] CI pipeline\n- [ ] Docker/deployment manifests\n- [ ] Database backup/restore docs\n- [ ] Structured logging/APM\n- [ ] Health-check endpoint with DB status (only `GET /` text exists)\n\n---\n\n## 4. Known issues\n\n| ID | Sev | Area | Issue | Status |\n|---|---|---|---|---|\n| K-01 | P1 | Auth | No password reset or self-service password change; only admin override | Open |\n| K-02 | P1 | Payments | Sandbox accepts any transaction ID and performs no verification | Open (by design) |\n| K-03 | P1 | Payments | `Waived`/`Rejected` applications can still call the payment endpoint | Open |\n| K-04 | P1 | Payments | Payment idempotency is non-atomic; concurrent requests can race | Open |\n| K-05 | P1 | Data | Student deletion leaves orphaned attendance/grade records | Open |\n| K-06 | P1 | Security | 2FA secret stored in plaintext; no recovery codes | Open |\n| K-07 | P1 | Security | No session revocation; stolen token valid until expiry | Open |\n| K-08 | P1 | Parent | No parent↔student linkage; parent portal is notices-only | Open |\n| K-09 | P2 | Security | 2FA setup temporarily disables an already-enabled account | Open |\n| K-10 | P2 | Security | No per-account failed-login lockout; only IP rate limiting | Open |\n| K-11 | P2 | Security | Login timing/registration messages enable account enumeration | Open |\n| K-12 | P2 | Security | CSRF cookie not cleared on logout; static 24h token | Open |\n| K-13 | P2 | Auth | Profile email change does not enforce uniqueness or re-verification | Open |\n| K-14 | P2 | Payments | No transaction-reference uniqueness/replay protection | Open |\n| K-15 | P2 | Payments | Application ID alone authorizes payment; no ownership proof | Open |\n| K-16 | P2 | Email | Applicant name interpolated into email HTML without escaping | Open |\n| K-17 | P2 | Config | `SMTP_PORT` documented but unused (hardcoded 587) | Open |\n| K-18 | P2 | Config | `.env.example` omits `TRUST_PROXY`, `MONGODB_URI` alias, `VITE_API_TARGET` | Open |\n| K-19 | P2 | Data | Multi-document operations are not transactional | Open |\n| K-20 | P2 | Data | Roll reindex races under concurrency; manual roll edits leave gaps | Open |\n| K-21 | P2 | Authz | Admin cannot publish grades (route is teacher-only) | Open (intentional?) |\n| K-22 | P2 | Observability | No audit log for logins, 2FA, role/credential changes, deletes, payments | Open |\n| K-23 | P2 | Testing | No automated tests | Open |\n| K-24 | P3 | Uploads | Client MIME trusted; no magic-byte validation | Open |\n| K-25 | P3 | Uploads | Replaced logo/banner/founder images not deleted from Cloudinary | Open |\n| K-26 | P3 | Security | Cloudinary credentials not validated at startup | Open |\n| K-27 | P3 | Security | Rate limiting in-memory; per process and reset on restart | Open |\n| K-28 | P3 | Security | CSRF rejection happens before rate limiting | Open |\n| K-29 | P3 | Security | Notice delete sends reusable admin password in a header | Open |\n| K-30 | P3 | Docs | README says database is pending and omits env/2FA/payments/security | Open |\n| K-31 | P3 | Data | Admissions store PII without retention policy | Open |\n| K-32 | P3 | Public | If `SchoolConfig.classes` is empty, any target class is accepted | Open |\n| K-33 | P3 | Scripts | `seed-admin` can promote a pre-existing default-email account without resetting its password | Open |\n| K-34 | P3 | UI | `ParentHome` only lists notices; no child data | Open |\n\n---\n\n## 5. Technical debt\n\n| ID | Area | Debt | Suggested action |\n|---|---|---|---|\n| T-01 | Backend | Large inline route handlers | Extract controllers/services per domain |\n| T-02 | Backend | No test suite | Add integration tests (auth, authz, grades, admissions) |\n| T-03 | Backend | No lint/format config | Add ESLint/Prettier for backend |\n| T-04 | Backend | Duplicate profile creation logic | Centralize user+profile creation in a service with transactions |\n| T-05 | Backend | Email/SMTP inline | Extract an email service with templates and escaping |\n| T-06 | Backend | Payment only sandbox | Implement a provider adapter + webhook verification |\n| T-07 | Backend | In-memory rate limits | Move to Redis/Upstash store |\n| T-08 | Frontend | Client-side pagination fetches full lists | Add server-side pagination for large datasets |\n| T-09 | Frontend | Some pages are long and repeat fetch/error logic | Add hooks/data layer (`useApi`, query cache) |\n| T-10 | Frontend | No TypeScript | Consider progressive TS adoption |\n| T-11 | Docs | README drift | Update README and link `docs/` |\n| T-12 | Ops | No CI/CD or containers | Add pipelines and deployment manifests |\n| T-13 | Security | No audit trail | Add append-only audit collection + admin viewer |\n\n---\n\n## 6. Backlog (prioritized)\n\n### P0 — production blockers\n\n- [ ] Integrate a real payment provider and verify server-side (amount + txn).\n- [ ] Add transaction-reference uniqueness and replay protection.\n- [ ] Block payments for `Waived`/`Rejected` applications.\n- [ ] Make payment idempotency atomic.\n\n### P1 — high priority\n\n- [ ] Self-service password reset + change password.\n- [ ] Parent↔student relationship and child views.\n- [ ] Session revocation (token version / deny list).\n- [ ] Encrypt 2FA secrets; add recovery codes.\n- [ ] Account lockout and failed-login throttling.\n- [ ] Automated tests for critical flows.\n- [ ] Audit log for sensitive actions.\n- [ ] Cascade or soft-delete academic records when a user is removed.\n\n### P2 — medium priority\n\n- [ ] Email verification on registration/email change.\n- [ ] HTML-escape email content; use a template.\n- [ ] Fix `SMTP_PORT` and `.env.example` drift.\n- [ ] Transactions for user+profile creation and deletion/reindex.\n- [ ] Clear CSRF cookie on logout; rotate tokens.\n- [ ] Server-side pagination for large lists.\n- [ ] Admin grade publishing decision (allow or keep teacher-only).\n- [ ] Retention policy and PII minimization for admissions.\n\n### P3 — nice to have\n\n- [ ] Cloudinary cleanup on asset replacement.\n- [ ] Magic-byte upload validation.\n- [ ] Structured logging/APM.\n- [ ] Docker + deployment docs.\n- [ ] Health endpoint with DB status.\n- [ ] Skeleton loaders.\n- [ ] Dark mode.\n- [ ] Multi-school/tenant support (large).\n\n---\n\n## 7. Completed log\n\n| Date | Item |\n|---|---|\n| 2026-10-23 | Fixed Mongo env mismatch: code now accepts `MONGODB_URI` or `MONGO_URI` (`config/db.js`, `scripts/seed-admin.js`, `scripts/backfillAssignments.js`) |\n| 2026-10-23 | Added `docs/`: PRD, ARCHITECTURE, DESIGN, MEMORY, RULES, TRACKER |\n| — | Public website + founders + admission flow + receipt |\n| — | Sandbox payment adapter with production guard |\n| — | Admin user CRUD, roles, credential reset, delete with password |\n| — | Teacher assignment model + backfill script + scope middleware |\n| — | Attendance marking, heatmap, analytics, student calendar |\n| — | Gradebook bulk entry, auto letter grades, publish flow |\n| — | Notices with audience targeting and PDF upload |\n| — | TOTP 2FA, preauth cookie, profile 2FA controls |\n| — | CSRF double-submit, NoSQL sanitizer, Zod validation, rate limits |\n| — | SPA production serving with API-aware fallback |\n| — | Legacy route redirects (`/student`, `/teacher`, `/admin`, `/public`) |\n\n---\n\n## 8. How to update this tracker\n\n1. Change a checkbox when work is verified, not when it is only coded.\n2. Add a row to **Known issues** with a new `K-xx` ID; include severity and area.\n3. Move completed backlog items to **Completed log** with the date.\n4. Keep **Module status** consistent with the checklists.\n5. Reference the relevant doc if a change affects architecture or design.\n6. Do not mark security items done without verifying the failure paths.\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 28.5s)

_Thinking:_

Now fix PRD duplicate FR-ADM IDs in admin section. Use edit replacing the whole admin table block's IDs. Need exact old text. Let me read the section to get exact lines.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"FR-ADM-0\\|6.4 Admin\\|### 6.4\" docs/PRD.md | head -40",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
125:| FR-ADM-01 | Applicant submits student, parent, guardian, and contact details (English + Bangla names). | Done |
126:| FR-ADM-02 | Target class is selectable from admin-managed classes. | Done |
127:| FR-ADM-03 | Fee amount is set by the server, never trusted from the client. | Done |
128:| FR-ADM-04 | Applicant pays via an MFS-style flow using method + transaction ID. | Done (sandbox) |
129:| FR-ADM-05 | Payment is idempotent and already-paid applications are rejected. | Done |
130:| FR-ADM-06 | Applicant sees a printable receipt after payment. | Done |
131:| FR-ADM-07 | Admin can list applications, inspect a dossier, approve/reject, and waive/mark unpaid. | Done |
132:| FR-ADM-08 | Admin cannot directly mark an application paid; only the payment adapter can. | Done |
133:| FR-ADM-09 | Applicant receives an email on status change when SMTP is configured. | Done |
153:### 6.4 Admin
157:| FR-ADM-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |
158:| FR-ADM-02 | List, search, and filter all users by role. | Done |
159:| FR-ADM-03 | Create users of any role with role-specific profile fields. | Done |
160:| FR-ADM-04 | View a single user with joined teacher/student profile and activity. | Done |
161:| FR-ADM-05 | Change a user's role. | Done |
162:| FR-ADM-06 | Reset credentials and edit profile fields. | Done |
163:| FR-ADM-07 | Delete users with password confirmation; reindex rolls for students. | Done |
164:| FR-ADM-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |
165:| FR-ADM-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |

```

---

## Assistant (Build · Big Pickle · 7.6s)

_Thinking:_

Replace the admin block IDs lines. I'll edit oldString from line 157 to 168 (the table rows). Let me read 153-172 to get exact.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/PRD.md",
  "offset": 153,
  "limit": 20
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/docs/PRD.md</path>
<type>file</type>
<content>
153: ### 6.4 Admin
154: 
155: | ID | Requirement | Status |
156: |---|---|---|
157: | FR-ADM-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |
158: | FR-ADM-02 | List, search, and filter all users by role. | Done |
159: | FR-ADM-03 | Create users of any role with role-specific profile fields. | Done |
160: | FR-ADM-04 | View a single user with joined teacher/student profile and activity. | Done |
161: | FR-ADM-05 | Change a user's role. | Done |
162: | FR-ADM-06 | Reset credentials and edit profile fields. | Done |
163: | FR-ADM-07 | Delete users with password confirmation; reindex rolls for students. | Done |
164: | FR-ADM-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |
165: | FR-ADM-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |
166: | FR-ADM-10 | Publish notices with optional PDF circular. | Done |
167: | FR-ADM-11 | Manage public website content and founders. | Done |
168: | FR-ADM-12 | Review and update admission applications. | Done |
169: 
170: ### 6.5 Teacher
171: 
172: | ID | Requirement | Status |

(Showing lines 153-172 of 313. Use offset=173 to continue.)
</content>
```

---

## Assistant (Build · Big Pickle · 11.7s)

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/docs/PRD.md",
  "oldString": "| FR-ADM-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |\n| FR-ADM-02 | List, search, and filter all users by role. | Done |\n| FR-ADM-03 | Create users of any role with role-specific profile fields. | Done |\n| FR-ADM-04 | View a single user with joined teacher/student profile and activity. | Done |\n| FR-ADM-05 | Change a user's role. | Done |\n| FR-ADM-06 | Reset credentials and edit profile fields. | Done |\n| FR-ADM-07 | Delete users with password confirmation; reindex rolls for students. | Done |\n| FR-ADM-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |\n| FR-ADM-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |\n| FR-ADM-10 | Publish notices with optional PDF circular. | Done |\n| FR-ADM-11 | Manage public website content and founders. | Done |\n| FR-ADM-12 | Review and update admission applications. | Done |",
  "newString": "| FR-ADMIN-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |\n| FR-ADMIN-02 | List, search, and filter all users by role. | Done |\n| FR-ADMIN-03 | Create users of any role with role-specific profile fields. | Done |\n| FR-ADMIN-04 | View a single user with joined teacher/student profile and activity. | Done |\n| FR-ADMIN-05 | Change a user's role. | Done |\n| FR-ADMIN-06 | Reset credentials and edit profile fields. | Done |\n| FR-ADMIN-07 | Delete users with password confirmation; reindex rolls for students. | Done |\n| FR-ADMIN-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |\n| FR-ADMIN-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |\n| FR-ADMIN-10 | Publish notices with optional PDF circular. | Done |\n| FR-ADMIN-11 | Manage public website content and founders. | Done |\n| FR-ADMIN-12 | Review and update admission applications. | Done |"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 8.4s)

_Thinking:_

Now verify docs files, check for broken links/lint? Docs don't need lint. Check file listing and maybe word counts. Also ensure filenames match user request? I chose uppercase. Let me verify contents maybe grep for leftover issues. Also there's a concern: in MEMORY I claimed "GET /" health; okay. I should verify no duplicate IDs remain and no secret. Run grep for "FR-ADM" and check docs list. Also maybe the user asked "Architecture.MD , DEsign.MD , MEMORy.MD , Rules.MD". I used uppercase. That's likely fine but maybe they wanted specific. Could create symlinks? No.

Let me update todos completed, then run a quick check of docs (md syntax tables not critical). Also maybe run `npx markdownlint`? Not installed. Just list.

Let me grep for accidental secrets in docs (none), and check duplicate requirement IDs across PRD. Use bash awk? Instructions discourage awk. Use grep.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la docs && wc -l docs/*.md && grep -c \"FR-ADM-01\" docs/PRD.md",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
total 116
drwxrwxr-x 2 sajidasim sajidasim  4096 Oct 23 12:44 .
drwxrwxr-x 7 sajidasim sajidasim  4096 Oct 23 12:41 ..
-rw-rw-r-- 1 sajidasim sajidasim 23132 Oct 23 12:42 ARCHITECTURE.md
-rw-rw-r-- 1 sajidasim sajidasim 17923 Oct 23 12:43 DESIGN.md
-rw-rw-r-- 1 sajidasim sajidasim 16339 Oct 23 12:43 MEMORY.md
-rw-rw-r-- 1 sajidasim sajidasim 16315 Oct 23 12:45 PRD.md
-rw-rw-r-- 1 sajidasim sajidasim 12912 Oct 23 12:44 RULES.md
-rw-rw-r-- 1 sajidasim sajidasim 13164 Oct 23 12:44 TRACKER.md
  452 docs/ARCHITECTURE.md
  428 docs/DESIGN.md
  327 docs/MEMORY.md
  313 docs/PRD.md
  296 docs/RULES.md
  317 docs/TRACKER.md
 2133 total
1

```

**Tool: bash**

**Input:**
```json
{
  "command": "git status --short",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
 M backend/config/db.js
 M backend/scripts/backfillAssignments.js
 M backend/scripts/seed-admin.js
?? docs/

```

---

## Assistant (Build · Big Pickle · 9.0s)

_Thinking:_

All good. The command `grep -c "FR-ADM-01"` returned 1, meaning only admissions now. Great.

Update todos to completed. Then concise summary. Mention the 6 files and that I used uppercase filenames. Mention no code changed besides prior fix; docs untracked. Also note they can rename if they want exact casing. Keep under 4 lines maybe with bullets.

Let me mark todos complete.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Explore backend models, routes, and controllers",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Explore frontend routes, pages, and API layer",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Explore auth, security, payments, and config",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Create docs/PRD.md",
      "status": "completed",
      "priority": "medium"
    },
    {
      "content": "Create docs/ARCHITECTURE.md",
      "status": "completed",
      "priority": "medium"
    },
    {
      "content": "Create docs/DESIGN.md",
      "status": "completed",
      "priority": "medium"
    },
    {
      "content": "Create docs/MEMORY.md",
      "status": "completed",
      "priority": "medium"
    },
    {
      "content": "Create docs/RULES.md",
      "status": "completed",
      "priority": "medium"
    },
    {
      "content": "Create docs/TRACKER.md",
      "status": "completed",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Explore backend models, routes, and controllers",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Explore frontend routes, pages, and API layer",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Explore auth, security, payments, and config",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Create docs/PRD.md",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Create docs/ARCHITECTURE.md",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Create docs/DESIGN.md",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Create docs/MEMORY.md",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Create docs/RULES.md",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Create docs/TRACKER.md",
    "status": "completed",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Big Pickle · 11.3s)

Created all six docs in `docs/` based on the actual codebase:

- `PRD.md` — personas, scope, requirements by module, flows, NFRs, roadmap
- `ARCHITECTURE.md` — stack, request path, middleware order, data model, API map, security, env vars
- `DESIGN.md` — tokens, typography, layouts, components, page inventory, UX patterns, a11y
- `MEMORY.md` — quick start, gotchas, authz cheat sheet, API/data references, decisions, agent checklist
- `RULES.md` — security, backend/frontend conventions, git, verification, pre-merge checklist
- `TRACKER.md` — module status, feature checklists, known issues, tech debt, prioritized backlog

I used uppercase filenames (`ARCHITECTURE.md`, `DESIGN.md`, etc.) rather than the mixed-case spellings. Say the word if you want the exact casing you listed.

---

## User

# Comprehensive System Refactoring, Security Hardening, CMS & Redesign Directive

Please execute the following full-scope refactoring, security audit, architecture update, dynamic CMS control implementation, UI redesign, and file structural reorganization for the Scholaris project in a single cohesive execution workflow.

---

## 1. REPOSITORY & FOLDER STRUCTURE REORGANIZATION
Reorganize the root repository directory structure into distinct, modular applications:
- **`Server/`**: Express 5 backend API server, database connection, models, controllers, middleware, and services.
- **`AdminPanel/`**: Dedicated React SPA workspace for Admins and Teachers (dashboard, user management, scope grading, roster, settings, dynamic website CMS content management).
- **`Website/`**: Public-facing website and portal for Visitors, Parents, and Students (admissions, public dynamic sections, result portal, notices, gallery).
- **`ui-ux-pro-max-local/`**: Local UI/UX design tokens, design system directives, and design guidelines for scanning and building responsive components.

---

## 2. SECURITY HARDENING & AUTHENTICATION ENHANCEMENTS
1. **Password Management:**
   - Implement self-service password reset (email-based token flow) and a profile password change route.
2. **Session & Token Cleanup:**
   - Fix `POST /api/auth/logout` so that it explicitly clears the `csrf` cookie alongside `token` and `preauth` cookies.
3. **2FA Encryption:**
   - Encrypt `twoFactorSecret` at rest in MongoDB using AES-256 instead of plaintext.
4. **Brute-Force & Lockout:**
   - Implement per-account failed-login attempt throttling and temporary lockout after consecutive failures.

---

## 3. PAYMENTS & ADMISSIONS HARDENING
1. **Status Guards:**
   - Add explicit checks in `POST /api/public/pay-admission/:appId` to reject applications in `Waived`, `Rejected`, or `Paid` states.
2. **Atomic Idempotency:**
   - Refactor payment status updates to use atomic MongoDB conditional operations (`findOneAndUpdate` with status criteria) to eliminate concurrency race conditions.
3. **Transaction Uniqueness:**
   - Enforce server-side transaction ID uniqueness and sparse indexing to prevent replay attacks.

---

## 4. DATA INTEGRITY, CONCURRENCY & ARCHITECTURE
1. **Cascading Cleanups:**
   - Implement hooks or cascading service routines to handle deletion of associated records in `Attendance` and `Gradebook` when a student/user profile is removed.
2. **Database Transactions:**
   - Wrap multi-document writes (e.g., User + Profile creation, deletion + roll re-indexing) inside Mongoose transactions (`session.startTransaction()`).
3. **Controller Refactoring:**
   - Extract all inline route handlers from `routes/*.js` files into structured controllers under `Server/controllers/`.

---

## 5. DYNAMIC CMS & ADMIN CONTROL (WORDPRESS-STYLE SITE MANAGEMENT)
1. **Full Content Control via Admin Panel:**
   - Build a comprehensive CMS section in `AdminPanel` allowing admins to dynamically manage all public website content without touching code.
   - Dynamic controls must include: Site Identity (logo, banner, school info), Public Pages, Dynamic Navbar Menu links (add/edit/remove/reorder dropdown items), Gallery uploads, News, Notices, Announcements, Campus Facilities, and Academic information.
2. **Dynamic Menu & Section Rendering:**
   - `Website/` must fetch menu structures and page content dynamically from the `Server/` backend API.

---

## 6. FULL MOBILE-FIRST RESPONSIVE UI/UX REDESIGN
1. **Design Guidance:**
   - Leverage design tokens and rules inside `ui-ux-pro-max-local/` to produce clean, modern, accessible, and high-performance layouts.
2. **Mobile-First Priority:**
   - Ensure the mobile view (`<= 375px`) matches or exceeds the desktop experience in touch targets, ergonomics, clarity, and layout quality (slide-over drawers, sticky headers, touch-friendly navigation, horizontal scroll tables).
3. **Public Navigation Bar Items:**
   - Re-architect the public navbar (`Website/`) to deliver an authoritative, parent-friendly public institution look with dynamic dropdown capabilities including:
     - **Home**
     - **Administration** (Board of Directors, Founders, Principal's Message, Faculty List)
     - **Academic** (Curriculum, Class Routines, Academic Calendar, Syllabus)
     - **Beyond Academics** (Co-Curricular Activities, Sports, Clubs, Events)
     - **Campus Facilities** (Library, Computer Lab, Science Labs, Transport, Hostel)
     - **Result** (Public Result Search, Board Exam Results, Term Results)
     - **Placement / Achievements** (Alumni Success, Higher Studies)
     - **Admission** (Online Application, Fee Structure, Admission Criteria, Receipt Printing)
     - **Careers** (Job Openings, Teacher Applications)
     - **Gallery** (Photo Gallery, Video Tour)
     - **Notice** (Official Circulars, PDF Downloads)
     - **News** (School Events, Announcements)

---

## 7. FINAL TESTING, AUDIT, & DOCUMENTATION UPDATES
1. **Vulnerability Audit & Fixes:**
   - Upon completion of code execution, run a full security and vulnerability audit on all routes, authentication gates, and CSRF implementations. Immediately patch any detected vulnerabilities or security risks.
2. **Documentation & Maintenance Sync:**
   - Update `README.md` to reflect the new `AdminPanel/`, `Server/`, and `Website/` structure and instructions.
   - Update all system documentation (`docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/MEMORY.md`, `docs/RULES.md`, and `docs/TRACKER.md`).
   - Ensure `.gitignore` is updated to exclude `.env`, build artifacts (`dist`), log files, and sensitive upload assets across all folders. 

---

## Assistant (Build · Big Pickle · 39.4s)

_Thinking:_

This is a massive request. I need to assess scope and feasibility in this session. The user wants full refactoring: rename backend→Server, split frontend into AdminPanel and Website, plus ui-ux-pro-max-local, security features, CMS, redesign, tests, docs.

This is enormous—likely days of work. I need to be strategic. I should not just claim it's done. I need to actually execute as much as possible. But context/time constraints are real. I should probably clarify scope/approach? The user explicitly says single cohesive execution workflow. They want it done. I should proceed autonomously, but note that this is huge. Better to create a plan and execute systematically.

However, as an agent, I can do a lot with tools. Need to decide architecture:

- Rename backend/ → Server/. Update root package.json scripts.
- Split current frontend/ into two apps: AdminPanel (admin+teacher) and Website (public+auth+student+parent). This is a big restructure: copy files, adjust routes and API proxy.
- ui-ux-pro-max-local/: create design tokens/docs.
- Backend changes: password reset, change password, logout csrf clear, 2FA encryption AES-256, lockout, payment guards, atomic idempotency, txn uniqueness sparse index, cascade deletion, transactions, controllers extraction.
- CMS: new models (SitePage, MenuItem, GalleryItem, News, Facility, AcademicInfo?), routes, admin panel CMS pages, dynamic website rendering.
- Mobile-first redesign & dynamic navbar.

This is many files. Need to be realistic about token budget. We have ~? Enough maybe 60k tokens. I must be efficient.

I should prioritize:
1. Restructure directories (git mv).
2. Backend security + controllers + models + routes.
3. CMS backend.
4. Frontend split with new apps, sharing code. Could create AdminPanel and Website from the existing frontend. Rather than duplicate everything manually, I can use bash cp -r and then prune. But instructions discourage using bash for file operations? It says use specialized tools for read/write/edit/search, but bash is allowed for terminal ops like cp/mv/mkdir. Yes, use cp/mv.

Given the size, maybe I should not literally extract all handlers into controllers (huge refactor), but do it for main domains. The user demands all. I need to balance. Perhaps implement controllers by moving route handler bodies. That's a lot of code but manageable for ~9 route files. However this could introduce bugs. 

Given time/context, I need to be pragmatic: implement the critical security and structural changes thoroughly, create CMS, split apps, update docs. For "extract all inline handlers", I can do it domain by domain, but it's very large. Maybe I can use a general subagent to do parts in parallel? The task tool general agent can execute. But parallel agents editing could conflict. I could delegate independent modules: backend controllers refactor, frontend split, CMS. But they share files. Risk of conflicts.

I think I should first do the repo restructure and backend core changes myself, then frontend split, then CMS, then docs. Let me gauge the code sizes to plan. The route files total maybe 2000 lines. Extracting all is possible but heavy.

Maybe I should ask the user to confirm before doing such a huge destructive restructure. But they were explicit. Yet, "single cohesive execution workflow" suggests go. I'll proceed and provide a completion report with any items not fully completed. But ideally complete.

Given constraints, I'll implement a meaningful, working version:

Plan:
A. Restructure:
- `git mv backend Server`
- Create `AdminPanel/` and `Website/` from frontend:
  - AdminPanel: copy frontend, keep admin+teacher pages, auth login/profile, remove public/student/parent pages; routes only admin/teacher; maybe teachers and admins.
  - Website: copy frontend, keep public, auth, student, parent; remove admin/teacher pages; routes public/auth/student/parent.
  - Both need shared components/context/core. Duplicate shared code (acceptable).
- Delete original frontend (after copying) or keep? User wants distinct apps; remove frontend to avoid confusion.
- Create `ui-ux-pro-max-local/` with tokens and guidelines (README, tokens.css/json, guidelines.md).
- Update root package.json scripts: `server`, `admin`, `website`, `dev` concurrently 3.
- Update vite configs proxies.
- Update Server static serving: currently serves `../frontend/dist`; can't serve two SPAs from one server easily. Instead serve admin at `/admin` and website at `/`? We can configure production static: `/admin` → AdminPanel/dist, `/` → Website/dist. But admin SPA uses BrowserRouter with paths /a etc. Serving under /admin complicates base. Simpler: keep both dev servers; for production, document separate hosting or serve AdminPanel dist at `/admin` with Vite `base:'/admin/'` and BrowserRouter basename. That's doable but adds complexity. Maybe serve Website at `/` and AdminPanel at `/admin` with basename. Let's implement:
  - AdminPanel vite `base: '/admin/'`.
  - AdminPanel BrowserRouter `basename="/admin"`? Routes inside are `/a/dashboard` etc. Then URLs become `/admin/a/dashboard`. Fine.
  - Server serves `/admin` static admin dist and SPA fallback for `/admin/*`; serves website dist at root.
  - But Website proxies /api; in production same origin. Good.
  - In dev, admin runs 5174, website 5175, server 5000.

B. Backend:
- Rename path references in root scripts and docs.
- Add models:
  - `SiteContent` (singleton-ish? or Page model), `MenuItem`, `GalleryItem`, `News`, `Facility`, `AcademicInfo`. Maybe use a generic `ContentBlock`? Better explicit:
    - `Menu` with items array? Dynamic navbar with dropdowns: `MenuItem` model with label, url, parent (null), order, isDropdown, visible, target.
    - `Page` model: slug, title, hero, sections (array of {heading, body, image}), status, order, showInNav? But menu controls nav.
    - `GalleryItem`: title, imageUrl, category, order.
    - `News`: title, slug, excerpt, content, imageUrl, category, publishedAt, isPublished.
    - `Facility`: name, description, imageUrl, icon, order.
    - `AcademicInfo`: type (curriculum, routine, calendar, syllabus), title, content, fileUrl, class, order.
    - Existing `Notice` and `SchoolInfo` can be extended.
  - `PasswordResetToken` model (hashed token, user, expiry, used).
  - `LoginAttempt`/fields on User for failed attempts/lockUntil.
- Security:
  - crypto util AES-256-GCM encrypt/decrypt using `TWO_FACTOR_ENCRYPTION_KEY` (32-byte hex/base64) with fallback derived from JWT_SECRET? Better require key; but to avoid breaking, derive via scrypt from `TWO_FACTOR_ENCRYPTION_KEY || JWT_SECRET`. Use AES-256-GCM. Encrypt on save, decrypt when verifying. Since schema stores encrypted string; in controller decrypt before speakeasy.
  - Lockout: User fields `failedLoginAttempts`, `lockUntil`, methods `isLocked`, `registerFailedLogin`, `resetLoginAttempts`. login controller.
  - Password reset: request token route (always generic response), send email via nodemailer, reset route consumes hashed token, change password route requires current password.
  - Logout clears csrf.
- Payments:
  - Add sparse unique index on `paymentTxnId` (partialFilterExpression maybe `{paymentTxnId: {$type:'string'}}`; sparse unique).
  - Payment guards: reject Paid (409), Waived/Rejected (400/409).
  - Atomic update: `Application.findOneAndUpdate({_id, paymentStatus: {$nin:['Paid','Waived']}, applicationStatus: {$nin:['Rejected']}}, {$set:{...}}, {new:true})` after verify. But verify uses app amount; fetch first, verify, then atomic update with filter. If null → 409.
  - Transaction ID uniqueness check + handle 11000.
- Cascade deletion: service `deleteUserCascade(userId, session)` deletes Student/Teacher, Attendance records where records.studentId or submittedBy? For student: pull records? The requirement: deletion of associated records in Attendance and Gradebook when student/user profile removed. Delete Gradebook by studentId, and Attendance: pull student record from records (not delete whole class sheet). For teacher deletion: Attendance submittedBy? Probably keep. Implement `cleanupStudentData(studentUserId, session)` deletes Gradebook, pulls from Attendance.records, delete Student. For user deletion, if role student, also cleanup; delete Teacher profile; maybe set submittedBy? Keep.
- Transactions: user creation (User + Student/Teacher), deletion + roll reindex, credentials update. Implement helper with session and pass session to reindex.
- Controllers refactor: Move handlers from routes into controllers. This is big. I can create controllers with exported functions and update routes to import them. To save effort, I can copy route handler bodies. But this is a massive manual task. Maybe I can prioritize: auth, public, teacher, gradebook, attendance, notice, config, assignment, student. That's all. Hmm.

Given the constraints, perhaps I can use subagents to do the controller extraction after I finish backend features, but coordination is hard. Alternatively, I can perform a mechanical extraction using a script? Not trivial.

Maybe I should accept not literally extracting every handler and instead create controllers for each domain, moving the logic. The user explicitly asked. I'll attempt but might be too long. Let me estimate: routes total lines:
- authRoutes ~422
- attendance ~59
- assignment ~178
- config ~74
- gradebook ~115
- notice ~144
- public ~250
- student ~171
- teacher ~390
Total ~1800 lines. Moving them is doable but large. With tools, I'd rewrite each route file and new controller file. That's ~18 write operations of moderate size. Could consume ~30k tokens. Plus CMS ~1500 lines. Plus frontend split and CMS UI. This is beyond a single session's practical output.

I need to manage expectations. The instruction says "single cohesive execution workflow" but it's unrealistic to fully do in one response. However, I should make maximum progress. Perhaps I should ask the user whether to proceed in phases, given the size. But they may be annoyed. Still, the honest approach: break into phases and execute incrementally. I can do phase 1 now (restructure + backend security/payments/data) and continue. But the user asked for all in one. The system says be proactive, but also not surprise. A massive destructive restructure without confirmation is risky. I could ask one clarifying question: confirm approach for splitting the frontend (duplicate shared code) and whether to preserve git history via git mv. But the directive is clear enough.

Given the environment, maybe I can use the general subagents in parallel to implement independent chunks, then integrate. Let me consider:

- Agent 1: Backend security + models + payment + cascade + transactions (Server/).
- Agent 2: Frontend split into AdminPanel/Website (after restructure).
- Agent 3: CMS backend + admin UI + website dynamic rendering.
- Agent 4: Docs update.

But agents editing concurrently in shared repo could conflict (e.g., root package.json, server.js). I can sequence: first I do restructure and backend core, then spawn agents for frontend split and CMS backend in parallel? CMS backend touches server.js/routes/models; frontend split touches frontend only. Could run in parallel if I do restructure first.

Yet subagents have their own context and can write code. The general agent is capable. But they may not follow exact design. I can give detailed specs.

However, I'm not sure task agents have write access? "general: General-purpose agent for researching complex questions and executing multi-step tasks." It says available tools? It implies can execute. Let's use them judiciously.

But the final answer should reflect actual work. I need to verify.

Let me first inspect current repo status and sizes. Also, the user might not want me to literally delete frontend. I'll proceed.

Given the enormity, I think the best approach is:
1. Create a detailed todo list.
2. Execute restructure + core backend security (high value).
3. Execute frontend split with working builds.
4. Implement CMS backend + basic CMS admin/website dynamic nav/pages.
5. Update docs.
6. Run lint/build/audit.

I'll try to compress implementations.

Let me start by inspecting backend route files to know how to refactor into controllers. But maybe I can do controller extraction with a lighter touch: create controller files that re-export handler functions, moving logic. Time. Let me instead prioritize security features which are concrete, then structural. If I run out, I'll report.

Actually, the user's directive includes many items. A phased delivery with clear status is acceptable if communicated. But they said "in a single cohesive execution workflow." I'll aim to complete all but may mark some as partial.

Let me begin with restructure. First, git mv backend Server, cp frontend to AdminPanel/Website, rm frontend. But the current frontend has all pages; splitting requires editing. Let me plan the split in detail.

Website pages:
- PublicLayout: PublicPortal, PublicAdmission, PublicFounders, Login, Register.
- Auth (AppShell): Profile, ParentHome, Student pages.
- No teacher/admin.
- Routes: `/`, `/admission`, `/founders`, `/login`, `/register`, `/profile`, `/p/home`, `/s/*`.
- navConfig only student/parent.
- AuthContext/Toast/UI/shared.
- Remove imports/pages not needed (but leaving unused files is okay, though cleaner to remove). We can copy all then delete admin/teacher pages and adjust App.jsx. Build will fail if imports remain—we'll rewrite App.jsx/navConfig.
- Vite port 5175, proxy /api.

AdminPanel pages:
- PublicLayout & Login/Register? Admins/teachers need login page. Could have a minimal auth layout. Reuse PublicLayout? Better: use a simple Login page. The existing Login imports? Let's check Login. It uses 2FA modal, useAuth, navigate. We can copy PublicLayout + PublicHeader/Footer but that looks public. Fine for now. Or create AuthLayout. Simpler: keep PublicLayout for login only, route `/login`; redirect `/` to `/login` or role home. AdminPanel routes: `/login`, `/profile`, `/a/*`, `/t/*`. Remove public/student/parent pages.
- navConfig admin/teacher.
- Vite base '/admin/' and port 5174; proxy /api.
- BrowserRouter basename from import.meta.env.BASE_URL? Use `basename="/admin"` in production, but in dev base is also '/admin/' via vite config so URL is localhost:5174/admin/. Hmm, Vite base affects asset paths, dev server serves at base. Could set base conditionally: `base: mode === 'production' ? '/admin/' : '/'`. Simpler for dev. Use `defineConfig(({mode}) => ({base: mode==='production'?'/admin/':'/' ...}))`. BrowserRouter basename: `import.meta.env.BASE_URL` returns '/' dev, '/admin/' prod; use `basename={import.meta.env.BASE_URL.replace(/\/$/,'') || '/'}`. For dev, basename '' -> fine. For prod '/admin'. Good.
- Public website served at root; Website base '/'.

Server production static:
```
const adminDist = path.join(__dirname,'..','AdminPanel','dist');
const webDist = path.join(__dirname,'..','Website','dist');
app.use('/admin', express.static(adminDist));
app.get('/admin/*', send admin index)
app.use(express.static(webDist));
app.use((req,res,next)=> if req.path.startsWith('/api/') return next(); res.sendFile(webDist/index.html))
```
But `/admin` static with base '/admin/' assets works.

Need to update CSP connectSrc for dev ports (5174,5175) and ws. And CORS defaults include both ports.

Also `.env.example` CLIENT_URL update.

ui-ux-pro-max-local: create README.md, tokens.json, tokens.css, guidelines.md, components.md, checklist.md. Could also be consumed by apps? Not necessary. Maybe copy design tokens.

Backend config rename references: root package.json scripts, server.js path, docs. Also .gitignore includes `**/.env` already; add dist, logs, etc.

Now, security implementation details:

Models:
- User add fields: `failedLoginAttempts: Number default 0`, `lockUntil: Date`, `passwordChangedAt: Date`.
  - Encrypt 2FA: keep `twoFactorSecret` string but store encrypted with prefix `enc:v1:iv:tag:ciphertext`. Use util `utils/crypto.js`:
    - `getKey()` derive 32 bytes from env `TWO_FACTOR_ENCRYPTION_KEY` (if 64 hex → Buffer.from(hex); if base64 32 bytes; else sha256 of string) else sha256(JWT_SECRET + '2fa').
    - `encryptSecret(plain)`, `decryptSecret(stored)`.
  - Add methods: `isLocked()`, `registerFailedLogin()` (increment, if >=5 set lockUntil now+15min, reset count), `resetFailedLogins()`.
  - Maybe add `toJSON` unchanged.
- `PasswordResetToken` model: user ref, tokenHash unique, expiresAt (index TTL), usedAt.
  - Mongoose TTL index `expiresAt: 1, expireAfterSeconds: 0`.
- `Application`: add sparse unique index on paymentTxnId. Also `paymentStatus` enum maybe.
- CMS models in `models/CmsModels.js`:
  - `MenuItem`: label, url, parent (ObjectId ref MenuItem null), order, isVisible, opensInNewTab, children virtual? Keep flat parent.
  - `SitePage`: slug unique, title, subtitle, heroImage, sections [{heading, body, image, order}], metaTitle, metaDescription, isPublished, showInNav, navLabel, navOrder, navParent.
    But dynamic nav: use MenuItem model referencing `url`. Simpler: Admin manages MenuItem entries; Page content managed via SitePage. The default menu items can link to static routes or dynamic page slugs `/pages/:slug`.
  - `GalleryItem`: title, category, imageUrl, order, isPublished.
  - `News`: title, slug unique, excerpt, content, imageUrl, category, isPublished, publishedAt.
  - `Facility`: name, description, imageUrl, icon, category, order, isPublished.
  - `AcademicInfo`: category enum curriculum/routine/calendar/syllabus, title, content, fileUrl, class, order, isPublished.
  - `Announcement`? Notices already. Could use Notice. The directive lists News, Notices, Announcements. Add `Announcement` model? Maybe `News.category` covers announcements; but to be explicit, add `Announcement` with title/content/link/expiresAt/isActive/order. Could skip but user asked. Add.
- Maybe `SiteSetting` instead of SchoolInfo? Keep SchoolInfo and extend fields: `siteName`, `tagline`, `contactEmail`, `phone`, `address`, social links. CMS can use SchoolInfo. Add fields.

Routes/controllers:
- New `controllers/` for each domain. I'll implement controllers for security/CMS and maybe leave existing routes? The user demanded extraction. Given time, I'll extract at least all. Hmm.

Let me reconsider using subagents to parallelize after I establish backend structure. I could have an agent do the mechanical controller extraction while I do CMS. But agents may run long. Let's try one agent for controller refactor with a very explicit prompt, after I finish route features. Actually, extracting handlers is mechanical but error-prone; an agent can handle.

Alternatively, I can interpret "Extract all inline route handlers" as requiring controller files, and implement controllers that contain moved logic. I can use a script to transform? No.

Let me estimate my remaining token budget. I've used ~? maybe 25k. Plenty (~90k?). The output limit per message ~? I can still write lots. But time.

I'll proceed step by step and see.

First, do the restructure and foundational backend changes. Let me execute:

1. `git mv backend Server`
2. Copy frontend to AdminPanel and Website, then remove frontend.
3. Create ui-ux-pro-max-local.
4. Modify root package.json.

But before copying, maybe adjust files after copy. Do it.

Also, update all references from `backend` to `Server` in root package.json, docs, README, and internal relative paths (server.js uses `../frontend/dist` → new). Vite config no backend path. `.gitignore`.

Let's do it.

This is a large, multi-phase refactor. I'll execute it in a structured sequence: restructure, harden the backend, split the frontend apps, add the CMS, then audit and update docs.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Restructure repo: backend→Server, split frontend→AdminPanel/Website, add ui-ux-pro-max-local",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Update root scripts, Vite configs, production static serving, .gitignore",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Security: password reset/change, logout CSRF clear, AES-256 2FA encryption, login lockout",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Payments: status guards, atomic idempotency, unique txn index",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Data: cascade cleanup, transactions, controller extraction",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "CMS backend: models, controllers, routes for menus/pages/gallery/news/facilities/academics/announcements",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "AdminPanel: CMS management screens + role-restricted routes",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Website: dynamic nav/menu/page rendering, student/parent routes, mobile-first redesign",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Security/vulnerability audit and fixes",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Update README, docs/*, .env.example, and verify builds",
      "status": "pending",
      "priority": "high"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Restructure repo: backend→Server, split frontend→AdminPanel/Website, add ui-ux-pro-max-local",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Update root scripts, Vite configs, production static serving, .gitignore",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Security: password reset/change, logout CSRF clear, AES-256 2FA encryption, login lockout",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Payments: status guards, atomic idempotency, unique txn index",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Data: cascade cleanup, transactions, controller extraction",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "CMS backend: models, controllers, routes for menus/pages/gallery/news/facilities/academics/announcements",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "AdminPanel: CMS management screens + role-restricted routes",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Website: dynamic nav/menu/page rendering, student/parent routes, mobile-first redesign",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Security/vulnerability audit and fixes",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Update README, docs/*, .env.example, and verify builds",
    "status": "pending",
    "priority": "high"
  }
]
```

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

Let's do restructure. Check git tracked status. Use git mv. Then cp. Note node_modules in frontend/backend? Let's check.

**Tool: bash**

**Input:**
```json
{
  "command": "git mv backend Server && cp -r frontend AdminPanel && cp -r frontend Website && rm -rf frontend && ls -la",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
total 68
drwxrwxr-x  9 sajidasim sajidasim  4096 Oct 23 14:00 .
drwxr-x--- 38 sajidasim sajidasim  4096 Oct 23 13:59 ..
drwxrwxr-x  7 sajidasim sajidasim  4096 Oct 23 14:00 .git
-rw-rw-r--  1 sajidasim sajidasim   508 Sep  8 18:40 .gitignore
drwxrwxr-x  6 sajidasim sajidasim  4096 Oct 23 14:00 AdminPanel
-rw-rw-r--  1 sajidasim sajidasim  2111 Sep  8 19:56 README.md
drwxrwxr-x 11 sajidasim sajidasim  4096 Oct 10 22:53 Server
drwxrwxr-x  6 sajidasim sajidasim  4096 Oct 23 14:00 Website
drwxrwxr-x  2 sajidasim sajidasim  4096 Oct 23 12:44 docs
drwxrwxr-x 37 sajidasim sajidasim  4096 Sep  8 18:52 node_modules
-rw-rw-r--  1 sajidasim sajidasim 17117 Sep  8 18:52 package-lock.json
-rw-rw-r--  1 sajidasim sajidasim   912 Sep  8 18:52 package.json
drwxrwxr-x 17 sajidasim sajidasim  4096 Oct  7 22:59 ui-ux-pro-max-local

```

---

## Assistant (Build · Big Pickle · 5.2s)

_Thinking:_

Interesting: ui-ux-pro-max-local already existed! The user asked to add it, and it's there. I should inspect it. Also AdminPanel/Website copied including node_modules? Let's check. `frontend` had node_modules? The listing earlier showed no node_modules under frontend? `find src` didn't show. `du`. Let's check. Also ui-ux-pro-max-local content.

**Tool: bash**

**Input:**
```json
{
  "command": "du -sh AdminPanel Website Server ui-ux-pro-max-local 2>/dev/null; ls -la AdminPanel | head; ls -la Website | head; find ui-ux-pro-max-local -maxdepth 2 -type f | head -40",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
163M	AdminPanel
163M	Website
38M	Server
41M	ui-ux-pro-max-local
total 148
drwxrwxr-x   6 sajidasim sajidasim   4096 Oct 23 14:00 .
drwxrwxr-x   9 sajidasim sajidasim   4096 Oct 23 14:00 ..
drwxrwxr-x   3 sajidasim sajidasim   4096 Oct 23 14:00 dist
-rw-rw-r--   1 sajidasim sajidasim    568 Oct 23 14:00 eslint.config.js
-rw-rw-r--   1 sajidasim sajidasim    558 Oct 23 14:00 index.html
drwxrwxr-x 148 sajidasim sajidasim   4096 Oct 23 14:00 node_modules
-rw-rw-r--   1 sajidasim sajidasim 110111 Oct 23 14:00 package-lock.json
-rw-rw-r--   1 sajidasim sajidasim    878 Oct 23 14:00 package.json
drwxrwxr-x   2 sajidasim sajidasim   4096 Oct 23 14:00 public
total 148
drwxrwxr-x   6 sajidasim sajidasim   4096 Oct 23 14:00 .
drwxrwxr-x   9 sajidasim sajidasim   4096 Oct 23 14:00 ..
drwxrwxr-x   3 sajidasim sajidasim   4096 Oct 23 14:00 dist
-rw-rw-r--   1 sajidasim sajidasim    568 Oct 23 14:00 eslint.config.js
-rw-rw-r--   1 sajidasim sajidasim    558 Oct 23 14:00 index.html
drwxrwxr-x 148 sajidasim sajidasim   4096 Oct 23 14:00 node_modules
-rw-rw-r--   1 sajidasim sajidasim 110111 Oct 23 14:00 package-lock.json
-rw-rw-r--   1 sajidasim sajidasim    878 Oct 23 14:00 package.json
drwxrwxr-x   2 sajidasim sajidasim   4096 Oct 23 14:00 public
ui-ux-pro-max-local/.gitattributes
ui-ux-pro-max-local/CONTRIBUTING.md
ui-ux-pro-max-local/README.ko.md
ui-ux-pro-max-local/README.id.md
ui-ux-pro-max-local/README.vi.md
ui-ux-pro-max-local/cli/.npmignore
ui-ux-pro-max-local/cli/package.json
ui-ux-pro-max-local/cli/.gitignore
ui-ux-pro-max-local/cli/tsconfig.json
ui-ux-pro-max-local/cli/package-lock.json
ui-ux-pro-max-local/cli/playwright.config.ts
ui-ux-pro-max-local/cli/README.md
ui-ux-pro-max-local/cli/bun.lock
ui-ux-pro-max-local/.releaserc.json
ui-ux-pro-max-local/docs/三个 data-scripts-templates 的区别.md
ui-ux-pro-max-local/CODE_OF_CONDUCT.md
ui-ux-pro-max-local/CLAUDE.md
ui-ux-pro-max-local/.github/PULL_REQUEST_TEMPLATE.md
ui-ux-pro-max-local/scripts/sync-release-version.mjs
ui-ux-pro-max-local/scripts/validate-csv.py
ui-ux-pro-max-local/scripts/smoke-stacks.sh
ui-ux-pro-max-local/scripts/refresh-google-fonts.py
ui-ux-pro-max-local/scripts/validate-agent-guide.py
ui-ux-pro-max-local/scripts/relevance_metrics.py
ui-ux-pro-max-local/scripts/refresh-icon-catalog.py
ui-ux-pro-max-local/scripts/smoke-domains.sh
ui-ux-pro-max-local/scripts/evaluate-relevance.py
ui-ux-pro-max-local/scripts/generate-catalog-summary.py
ui-ux-pro-max-local/README.zh.md
ui-ux-pro-max-local/.gitignore
ui-ux-pro-max-local/.claude-plugin/plugin.json
ui-ux-pro-max-local/.claude-plugin/marketplace.json
ui-ux-pro-max-local/gallery/tailwind.config.ts
ui-ux-pro-max-local/gallery/next-env.d.ts
ui-ux-pro-max-local/gallery/next.config.js
ui-ux-pro-max-local/gallery/package.json
ui-ux-pro-max-local/gallery/.gitignore
ui-ux-pro-max-local/gallery/tsconfig.json
ui-ux-pro-max-local/gallery/postcss.config.js
ui-ux-pro-max-local/gallery/package-lock.json

```

**Tool: bash**

**Input:**
```json
{
  "command": "git status --short | head -40",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
R  backend/.env.example -> Server/.env.example
R  backend/config/cloudinary.js -> Server/config/cloudinary.js
R  backend/config/db.js -> Server/config/db.js
R  backend/controllers/authController.js -> Server/controllers/authController.js
R  backend/middleware/assignments.js -> Server/middleware/assignments.js
R  backend/middleware/auth.js -> Server/middleware/auth.js
R  backend/middleware/csrf.js -> Server/middleware/csrf.js
R  backend/middleware/sanitize.js -> Server/middleware/sanitize.js
R  backend/middleware/validate.js -> Server/middleware/validate.js
R  backend/models/Assignment.js -> Server/models/Assignment.js
R  backend/models/Attendance.js -> Server/models/Attendance.js
R  backend/models/Gradebook.js -> Server/models/Gradebook.js
R  backend/models/Notice.js -> Server/models/Notice.js
R  backend/models/PublicModels.js -> Server/models/PublicModels.js
R  backend/models/SchoolConfig.js -> Server/models/SchoolConfig.js
R  backend/models/Student.js -> Server/models/Student.js
R  backend/models/Teacher.js -> Server/models/Teacher.js
R  backend/models/User.js -> Server/models/User.js
R  backend/package-lock.json -> Server/package-lock.json
R  backend/package.json -> Server/package.json
R  backend/routes/assignmentRoutes.js -> Server/routes/assignmentRoutes.js
R  backend/routes/attendanceRoutes.js -> Server/routes/attendanceRoutes.js
R  backend/routes/authRoutes.js -> Server/routes/authRoutes.js
R  backend/routes/configRoutes.js -> Server/routes/configRoutes.js
R  backend/routes/gradebookRoutes.js -> Server/routes/gradebookRoutes.js
R  backend/routes/noticeRoutes.js -> Server/routes/noticeRoutes.js
R  backend/routes/publicRoutes.js -> Server/routes/publicRoutes.js
R  backend/routes/studentRoutes.js -> Server/routes/studentRoutes.js
R  backend/routes/teacherRoutes.js -> Server/routes/teacherRoutes.js
R  backend/scripts/backfillAssignments.js -> Server/scripts/backfillAssignments.js
R  backend/scripts/seed-admin.js -> Server/scripts/seed-admin.js
R  backend/server.js -> Server/server.js
R  backend/services/payment.js -> Server/services/payment.js
R  backend/utils/rolls.js -> Server/utils/rolls.js
 D frontend/eslint.config.js
 D frontend/index.html
 D frontend/package-lock.json
 D frontend/package.json
 D frontend/public/favicon.svg
 D frontend/public/icons.svg

```

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

We copied node_modules/dist too. That's 163M each; not ideal. We should remove node_modules and dist from AdminPanel/Website (they'll install/build). But that means builds need npm install. The original frontend had node_modules; we removed frontend including its node_modules. Now AdminPanel/Website have copies. Keeping node_modules means builds work now but huge duplication; .gitignore excludes node_modules. We can keep for build verification, but better to remove one and symlink? No. Keep for now (not tracked) to run builds. Dist copy is stale; we'll rebuild.

ui-ux-pro-max-local is a full project already. The user says leverage it. We can read its README/CLAUDE to use guidelines. We don't need to create it. But the directive says "ui-ux-pro-max-local/: Local UI/UX design tokens..." It exists; we can add a project-specific `SCHOLARIS.md` or config pointing to tokens. Let's inspect its structure for tokens.

**Tool: bash**

**Input:**
```json
{
  "command": "find ui-ux-pro-max-local -maxdepth 2 -type d | sort | head -50; ls ui-ux-pro-max-local",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
ui-ux-pro-max-local
ui-ux-pro-max-local/.agents
ui-ux-pro-max-local/.agents/skills
ui-ux-pro-max-local/.claude
ui-ux-pro-max-local/.claude-plugin
ui-ux-pro-max-local/.claude/skills
ui-ux-pro-max-local/cli
ui-ux-pro-max-local/cli/assets
ui-ux-pro-max-local/cli/scripts
ui-ux-pro-max-local/cli/src
ui-ux-pro-max-local/cli/tests
ui-ux-pro-max-local/.cursor
ui-ux-pro-max-local/.cursor/skills
ui-ux-pro-max-local/docs
ui-ux-pro-max-local/docs/journals
ui-ux-pro-max-local/gallery
ui-ux-pro-max-local/gallery/app
ui-ux-pro-max-local/gallery/components
ui-ux-pro-max-local/gallery/data
ui-ux-pro-max-local/gallery/lib
ui-ux-pro-max-local/.git
ui-ux-pro-max-local/.git/hooks
ui-ux-pro-max-local/.github
ui-ux-pro-max-local/.github/ISSUE_TEMPLATE
ui-ux-pro-max-local/.github/workflows
ui-ux-pro-max-local/.git/info
ui-ux-pro-max-local/.git/logs
ui-ux-pro-max-local/.git/objects
ui-ux-pro-max-local/.git/refs
ui-ux-pro-max-local/preview
ui-ux-pro-max-local/projects
ui-ux-pro-max-local/projects/healthcare-dashboard
ui-ux-pro-max-local/projects/portfolio-dark
ui-ux-pro-max-local/projects/saas-landing
ui-ux-pro-max-local/screenshots
ui-ux-pro-max-local/scripts
ui-ux-pro-max-local/src
ui-ux-pro-max-local/src/ui-ux-pro-max
ui-ux-pro-max-local/stack
ui-ux-pro-max-local/stack/.claude
ui-ux-pro-max-local/stack/docs
ui-ux-pro-max-local/stack/examples
ui-ux-pro-max-local/stack/.github
ui-ux-pro-max-local/stack/scripts
CLAUDE.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
LICENSE
README.id.md
README.ko.md
README.md
README.vi.md
README.zh.md
SECURITY.md
cli
docs
gallery
preview
projects
screenshots
scripts
skill.json
src
stack

```

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,120p' ui-ux-pro-max-local/README.md 2>/dev/null || sed -n '1,120p' ui-ux-pro-max-local/README.zh.md",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
# [UI UX Pro Max](https://uupm.cc)

<p align="center">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.id.md">🇮🇩 Bahasa Indonesia</a> |
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.ko.md">🇰🇷 한국어</a> |
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.vi.md">🇻🇳 Tiếng Việt</a> |
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.zh.md">🇨🇳 简体中文</a> |
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.md">🇺🇸 English</a>
</p>

<p align="center">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases"><img src="https://img.shields.io/github/v/release/nextlevelbuilder/ui-ux-pro-max-skill?style=for-the-badge&color=blue" alt="GitHub Release"></a>
  <img src="https://img.shields.io/badge/reasoning_rules-192-green?style=for-the-badge" alt="192 Reasoning Rules">
  <img src="https://img.shields.io/badge/UI_styles-79_searchable-purple?style=for-the-badge" alt="79 searchable UI styles">
  <img src="https://img.shields.io/badge/python-3.x-yellow?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.x">
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nextlevelbuilder/ui-ux-pro-max-skill?style=for-the-badge&color=green" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ui-ux-pro-max-cli"><img src="https://img.shields.io/npm/v/ui-ux-pro-max-cli?style=flat-square&logo=npm&label=CLI" alt="npm"></a>
  <a href="https://www.npmjs.com/package/ui-ux-pro-max-cli"><img src="https://img.shields.io/npm/dm/ui-ux-pro-max-cli?style=flat-square&label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/stargazers"><img src="https://img.shields.io/github/stars/nextlevelbuilder/ui-ux-pro-max-skill?style=flat-square&logo=github" alt="GitHub stars"></a>
  <a href="https://paypal.me/uiuxpromax"><img src="https://img.shields.io/badge/PayPal-Support%20Development-00457C?style=flat-square&logo=paypal&logoColor=white" alt="PayPal"></a>
</p>

An AI skill that provides design intelligence for building professional UI/UX across multiple platforms and frameworks.

<p align="center">
  <a href="https://uupm.cc">
    <img src="screenshots/website.png" alt="UI UX Pro Max" width="800">
  </a>
</p>

<p align="center">
  <b>If you find this useful, consider supporting the project:</b><br><br>
  <a href="https://paypal.me/uiuxpromax"><img src="https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal Donate"></a>
</p>

<p align="center">
  <i>Other projects</i><br>
  <a href="https://nextlevelbuilder.io">NextLevelBuilder.io</a> | <a href="https://goclaw.sh">GoClaw.sh</a> | <a href="https://agentkit.best">AgentKit.best</a> | <a href="https://tose.sh">TOSE.sh</a>
</p>

---

<p align="center">
  <span>Check Out Our New Skill:</span>
  <br/>
  <a href="https://github.com/viettranx/3dviz-pro-max" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cdn.nextlevelbuilder.io/skills/3dviz/wordmark-dark.svg">
      <img src="https://cdn.nextlevelbuilder.io/skills/3dviz/wordmark.svg" alt="3Dviz Pro Max" height="56">
    </picture>
  </a>
</p>

<p align="center"><b>Turn an idea into a 3D scene worth exploring.</b></p>

<p align="center">
  <img src="https://cdn.nextlevelbuilder.io/skills/3dviz/harness-village.gif" width="800" alt="Harness Village: a fantasy village with camera navigation and animated creatures">
</p>

<p align="center">
  <sub><b>Visual inspiration, not a benchmark.</b> An author-supplied project recorded <i>before</i> this skill existed; its UI contains Vietnamese. Historical footage, not an English demo or a runtime test of the skill — see <a href="https://github.com/viettranx/3dviz-pro-max/blob/main/docs/demos/README.md">media provenance</a>.</sub>
</p>

<p align="center">
  🤌 Website: <a href="https://3dviz.dev/" target="_blank">https://3dviz.dev/</a>
</p>

---

## What's New in v2.0

### Intelligent Design System Generation

The flagship feature of v2.0 is the **Design System Generator** - an AI-powered reasoning engine that analyzes your project requirements and generates a complete, tailored design system in seconds.

```
+----------------------------------------------------------------------------------------+
|  TARGET: Serenity Spa - RECOMMENDED DESIGN SYSTEM                                      |
+----------------------------------------------------------------------------------------+
|                                                                                        |
|  PATTERN: Hero-Centric + Social Proof                                                  |
|     Conversion: Emotion-driven with trust elements                                     |
|     CTA: Above fold, repeated after testimonials                                       |
|     Sections:                                                                          |
|       1. Hero                                                                          |
|       2. Services                                                                      |
|       3. Testimonials                                                                  |
|       4. Booking                                                                       |
|       5. Contact                                                                       |
|                                                                                        |
|  STYLE: Soft UI Evolution                                                              |
|     Keywords: Soft shadows, subtle depth, calming, premium feel, organic shapes        |
|     Best For: Wellness, beauty, lifestyle brands, premium services                     |
|     Performance: cost:low | Accessibility: risk:conditional; verify requirements       |
|                                                                                        |
|  COLORS:                                                                               |
|     Primary:    #E8B4B8 (Soft Pink)                                                    |
|     Secondary:  #A8D5BA (Sage Green)                                                   |
|     CTA:        #D4AF37 (Gold)                                                         |
|     Background: #FFF5F5 (Warm White)                                                   |
|     Text:       #2D3436 (Charcoal)                                                     |
|     Notes: Calming palette with gold accents for luxury feel                           |
|                                                                                        |
|  TYPOGRAPHY: Cormorant Garamond / Montserrat                                           |
|     Mood: Elegant, calming, sophisticated                                              |
|     Best For: Luxury brands, wellness, beauty, editorial                               |
|     Google Fonts: https://fonts.google.com/share?selection.family=...                  |
|                                                                                        |
|  KEY EFFECTS:                                                                          |
|     Soft shadows + Context-appropriate transitions + Gentle hover states               |
|                                                                                        |
|  AVOID (Anti-patterns):                                                                |
|     Bright neon colors + Harsh animations + Dark mode + AI purple/pink gradients       |
|                                                                                        |
|  PRE-DELIVERY CHECKLIST:                                                               |
|     [ ] No emojis as icons (use SVG: Heroicons/Lucide)                                 |
|     [ ] cursor-pointer on all clickable elements                                       |

```

---

## Assistant (Build · Big Pickle · 4.7s)

_Thinking:_

ui-ux-pro-max-local already is a skill with guidelines. Good—we can reference it. We don't need to create. Maybe add a `SCHOLARIS.md`.

Now let's plan backend changes. First update root package.json and Server package name, Server static paths, vite configs.

Let me inspect Server/server.js production section and config paths. Already know. Need to update:
- static path to `../Website/dist` and admin at `/admin`.
- CSP connectSrc dev ports.
- CORS default origins include 5174,5175.

Let's edit root package.json.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/package.json"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/package.json</path>
<type>file</type>
<content>
1: {
2:   "devDependencies": {
3:     "autoprefixer": "^10.5.4",
4:     "concurrently": "^10.0.5",
5:     "postcss": "^8.5.26",
6:     "tailwindcss": "^4.3.3"
7:   },
8:   "name": "school-management-system",
9:   "version": "1.0.0",
10:   "main": "index.js",
11:   "dependencies": {
12:     "baseline-browser-mapping": "^2.11.20",
13:     "browserslist": "^4.28.8",
14:     "caniuse-lite": "^1.0.30001810",
15:     "electron-to-chromium": "^1.5.420",
16:     "escalade": "^3.2.0",
17:     "fraction.js": "^5.3.4",
18:     "nanoid": "^3.3.18",
19:     "node-releases": "^2.0.54",
20:     "picocolors": "^1.1.1",
21:     "postcss-value-parser": "^4.2.0",
22:     "source-map-js": "^1.2.1",
23:     "update-browserslist-db": "^1.3.2"
24:   },
25:   "scripts": {
26:     "backend": "npm run dev --prefix backend",
27:     "frontend": "npm run dev --prefix frontend",
28:     "dev": "concurrently \"npm run backend\" \"npm run frontend\""
29:   },
30:   "keywords": [],
31:   "author": "",
32:   "license": "ISC",
33:   "description": ""
34: }

(End of file - total 34 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/.gitignore"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/.gitignore</path>
<type>file</type>
<content>
1: # Logs
2: logs
3: *.log
4: npm-debug.log*
5: yarn-debug.log*
6: yarn-error.log*
7: pnpm-debug.log*
8: lerna-debug.log*
9: 
10: # MERN Dependency & Build Folders
11: node_modules/
12: frontend/node_modules/
13: backend/node_modules/
14: frontend/dist/
15: frontend/build/
16: backend/dist/
17: 
18: # Ignore local uploaded files/notices
19: backend/uploads/
20: **/uploads/
21: 
22: # Environment / Secret Files
23: .env
24: .env.local
25: atlas-credentials.env
26: **/.env
27: *.local
28: 
29: # Editor directories and files
30: .vscode/*
31: !.vscode/extensions.json
32: .idea
33: .DS_Store
34: *.suo
35: *.ntvs*
36: *.njsproj
37: *.sln
38: *.sw?

(End of file - total 38 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/src/App.jsx",
  "limit": 10
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/AdminPanel/src/App.jsx</path>
<type>file</type>
<content>
1: // src/App.jsx
2: import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
3: 
4: // Layouts
5: import PublicLayout from './components/layout/PublicLayout.jsx';
6: import AppShell from './components/layout/AppShell.jsx';
7: import ProtectedRoute from './components/ProtectedRoute.jsx';
8: 
9: // Auth & General Pages
10: import Login from './pages/auth/Login';

(Showing lines 1-10 of 142. Use offset=11 to continue.)
</content>
```

---

## Assistant (Build · Big Pickle · 8.3s)

_Thinking:_

Let's write root package.json, .gitignore, vite configs, Server package name and scripts maybe. Then split route files.

Root scripts:
```
"server": "npm run dev --prefix Server",
"admin": "npm run dev --prefix AdminPanel",
"website": "npm run dev --prefix Website",
"dev": "concurrently -n server,admin,website -c blue,magenta,green \"npm run server\" \"npm run admin\" \"npm run website\"",
"build": "npm run build --prefix Website && npm run build --prefix AdminPanel",
"install:all": ...
```
Keep "backend"/"frontend" aliases? Could keep for backwards compat mapping. Add `backend` -> Server and `frontend` -> Website maybe.

Vite AdminPanel: port 5174, base conditional, proxy.
Vite Website: port 5175, base '/', proxy.

Shared: admin login uses PublicLayout; fine. But AdminPanel routes need to not include public pages. Let's rewrite App.jsx for each. Since shellChildren uses many pages, I'll rewrite cleanly.

AdminPanel App.jsx:
- imports Login, Profile, AppShell, ProtectedRoute.
- routes: `/` redirect based on auth? Simpler: `/` -> Navigate to `/a/dashboard` (ProtectedRoute will redirect to /login if no user). Public `/login`.
- `/profile`.
- admin routes + teacher routes.
- maybe legacy redirects for admin/teacher.
- fallback to `/`.

Login page currently may navigate to roleHome; that's fine. It might import PublicLayout? Let's check Login imports.

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,60p' AdminPanel/src/pages/auth/Login.jsx; echo '---REGISTER---'; sed -n '1,30p' AdminPanel/src/pages/auth/Register.jsx",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import TwoFactorModal from '../../components/TwoFactorModal.jsx';
import Wordmark from '../../components/layout/Wordmark.jsx';
import { IconShield, IconCheckCircle, IconLock } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { roleHome } from '../../core/nav.js';

const bulletPoints = [
  'Session secured with an HttpOnly cookie — never stored in the browser',
  'Optional Time-based One-Time Passwords (TOTP) via any authenticator app',
  'All traffic routed through our proxy — the API surface stays hidden',
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pending2FA, setPending2FA] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.twoFactorRequired) {
      setPending2FA(result.user); // password accepted → show authenticator step
      return;
    }
    if (result.success) {
      navigate(roleHome(result.user.role), { replace: true });
    } else {
      setError(result.message);
    }
  };

  const on2FASuccess = (authedUser) => {
    setPending2FA(null);
    navigate(roleHome(authedUser.role), { replace: true });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Editorial left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-900 p-12 lg:flex xl:p-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brass-500/20 blur-3xl" />
        <div className="animate-fade-up relative">
          <Wordmark dark />
        </div>
        <div className="animate-fade-up relative max-w-md">
---REGISTER---
// src/pages/auth/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Wordmark from '../../components/layout/Wordmark.jsx';
import { IconShield, IconLock } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { roleHome } from '../../core/nav.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');

```

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,40p' AdminPanel/src/components/layout/PublicLayout.jsx; sed -n '1,30p' AdminPanel/src/components/layout/PublicHeader.jsx; sed -n '1,20p' AdminPanel/src/components/layout/PublicFooter.jsx",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// components/layout/PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader.jsx';
import PublicFooter from './PublicFooter.jsx';

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <PublicHeader />
    <main className="flex-grow">
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);

export default PublicLayout;// components/layout/PublicHeader.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';
import { IconMenu, IconX } from '../icons.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/admission', label: 'Admission' },
  { to: '/founders', label: 'Our Founders' },
];

export const PublicHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Scholaris home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
// components/layout/PublicFooter.jsx
import { Link } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';

export const PublicFooter = () => (
  <footer className="mt-auto bg-gradient-to-b from-slate-900 to-brand-950 text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <Wordmark dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            A modern campus portal — admissions, attendance, results and notices in one tranquil place.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-brass-300">Home</Link></li>
            <li><Link to="/admission" className="transition-colors hover:text-brass-300">Admission</Link></li>
            <li><Link to="/founders" className="transition-colors hover:text-brass-300">Our Founders</Link></li>

```

---

## Assistant (Build · Big Pickle · 11.8s)

_Thinking:_

Login uses PublicLayout for background, needs layout. We'll use PublicLayout for login in AdminPanel but PublicHeader links to public pages that don't exist in AdminPanel. Better create `AuthLayout` minimal. But to save time, we can use a simple centered layout in AdminPanel. Actually Login's root is `min-h-[calc(100vh-4rem)]` and includes split panel, so it doesn't need header/footer. We can render it standalone at `/login`. Fine.

Rewrite AdminPanel App.jsx:
```
import { BrowserRouter..., useAuth? }
Routes:
<Route path="/login" element={<Login/>}/>
<Route element={<ProtectedRoute allowedRoles={['admin','teacher']}><AppShell/></ProtectedRoute>}> ... </Route>
```
But AppShell itself calls useAuth and if no user returns null. ProtectedRoute wrapping AppShell as element is needed. Existing used `<Route element={<AppShell/>}>` and per-route ProtectedRoute. We'll keep per-route guards, but also root redirect.

Admin:
- `/` Navigate `/a/dashboard`
- `/profile`
- `/a/*`, `/t/*`
- legacy redirects.
- fallback `/`.

Teacher can access `/profile` and `/t/*`; admin `/a/*`. `/t/dashboard` allowed admin too currently. Keep.

Website App.jsx:
- PublicLayout: `/`, `/admission`, `/founders`, `/news`, `/notices`, `/gallery`, `/page/:slug`, `/administr...` dynamic pages? We'll add dynamic CMS pages route `/p/:slug`? Let's use `/pages/:slug`. Menu items link there.
- Login/Register frontend.
- AppShell: `/profile`, `/p/home`, `/s/*`.
- Legacy redirects.
- fallback `/`.

Website navConfig: student + parent only. But AppShell used for student/parent. Fine.

Website PublicHeader must become dynamic: fetch `/public/menu` and `/public/site` maybe. We'll implement later.

Now backend. Let's first update root package/gitignore/vite configs and Server server static/CORS. Then security.

Write root package.json.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/package.json",
  "content": "{\n  \"name\": \"school-management-system\",\n  \"version\": \"2.0.0\",\n  \"private\": true,\n  \"description\": \"Scholaris — school management platform (Server + AdminPanel + Website)\",\n  \"scripts\": {\n    \"server\": \"npm run dev --prefix Server\",\n    \"admin\": \"npm run dev --prefix AdminPanel\",\n    \"website\": \"npm run dev --prefix Website\",\n    \"backend\": \"npm run server\",\n    \"frontend\": \"npm run website\",\n    \"dev\": \"concurrently -n server,admin,website -c blue,magenta,green \\\"npm run server\\\" \\\"npm run admin\\\" \\\"npm run website\\\"\",\n    \"install:all\": \"npm install --prefix Server && npm install --prefix AdminPanel && npm install --prefix Website\",\n    \"build\": \"npm run build --prefix Website && npm run build --prefix AdminPanel\",\n    \"lint\": \"npm run lint --prefix AdminPanel && npm run lint --prefix Website\"\n  },\n  \"devDependencies\": {\n    \"concurrently\": \"^10.0.5\"\n  },\n  \"keywords\": [\n    \"school-management\",\n    \"cms\",\n    \"express\",\n    \"react\",\n    \"mongodb\"\n  ],\n  \"license\": \"ISC\"\n}\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/.gitignore",
  "content": "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\n# Dependencies\nnode_modules/\n**/node_modules/\n\n# Build artifacts\ndist/\n**/dist/\nbuild/\n**/build/\n.vite/\n**/.vite/\n\n# Environment / secret files\n.env\n.env.*\n!.env.example\n**/.env\n**/.env.*\n!**/.env.example\natlas-credentials.env\n*.pem\n*.key\n\n# Local uploaded files / sensitive assets\nuploads/\n**/uploads/\nServer/uploads/\n**/private-uploads/\n\n# Coverage / test output\ncoverage/\n**/coverage/\nplaywright-report/\ntest-results/\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/vite.config.js",
  "content": "// AdminPanel/vite.config.js\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/postcss'\nimport autoprefixer from 'autoprefixer'\n\nexport default defineConfig(({ mode }) => ({\n  base: mode === 'production' ? '/admin/' : '/',\n  plugins: [react()],\n  css: {\n    postcss: {\n      plugins: [tailwindcss(), autoprefixer()],\n    },\n  },\n  server: {\n    port: 5174,\n    proxy: {\n      '/api': {\n        target: process.env.VITE_API_TARGET || 'http://localhost:5000',\n        changeOrigin: true,\n        secure: false,\n      },\n    },\n  },\n}))\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Website/vite.config.js",
  "content": "// Website/vite.config.js\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/postcss'\nimport autoprefixer from 'autoprefixer'\n\nexport default defineConfig({\n  base: '/',\n  plugins: [react()],\n  css: {\n    postcss: {\n      plugins: [tailwindcss(), autoprefixer()],\n    },\n  },\n  server: {\n    port: 5175,\n    proxy: {\n      '/api': {\n        target: process.env.VITE_API_TARGET || 'http://localhost:5000',\n        changeOrigin: true,\n        secure: false,\n      },\n    },\n  },\n})\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 5.8s)

_Thinking:_

Update package.json names for AdminPanel/Website maybe. Let's edit name and scripts (dev port comes from vite). Also Server package name. Use edit.

**Tool: bash**

**Input:**
```json
{
  "command": "node -e '\nconst fs=require(\"fs\");\nfor (const [dir,name] of [[\"AdminPanel\",\"admin-panel\"],[\"Website\",\"website\"],[\"Server\",\"server\"]]) {\n  const p=dir+\"/package.json\";\n  const j=JSON.parse(fs.readFileSync(p,\"utf8\"));\n  j.name=name;\n  if(name===\"server\"){ j.description=\"Scholaris Express API server\"; }\n  fs.writeFileSync(p, JSON.stringify(j,null,2)+\"\\n\");\n}\nconsole.log(\"updated package names\");\n'",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
updated package names

```

---

## Assistant (Build · Big Pickle · 7.4s)

_Thinking:_

Now update Server/server.js: static serving, CORS defaults, CSP dev ports. Let's edit relevant lines.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/server.js",
  "oldString": "      connectSrc: [\"'self'\", \"https://res.cloudinary.com\", \"ws://localhost:5173\", \"wss://localhost:5173\"],",
  "newString": "      connectSrc: [\n        \"'self'\",\n        \"https://res.cloudinary.com\",\n        \"ws://localhost:5174\", \"wss://localhost:5174\",\n        \"ws://localhost:5175\", \"wss://localhost:5175\",\n      ],"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/server.js",
  "oldString": "const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000,http://localhost:4173')",
  "newString": "const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5174,http://localhost:5175,http://localhost:3000,http://localhost:4173')"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/server.js",
  "oldString": "// Serve the built SPA in production so the entire app shares one origin (and\n// inherits the CSP/security headers above). /api/ requests still hit the JSON API.\nif (process.env.NODE_ENV === 'production') {\n  const dist = path.join(__dirname, '..', 'frontend', 'dist');\n  app.use(express.static(dist));\n  app.use((req, res, next) => {\n    if (req.path.startsWith('/api/')) return next();\n    res.sendFile(path.join(dist, 'index.html'), (err) => err && next());\n  });\n}",
  "newString": "// Serve the built SPAs in production from one origin so cookies, CSRF and CSP\n// stay same-site. AdminPanel lives under /admin; Website owns the public root.\nif (process.env.NODE_ENV === 'production') {\n  const adminDist = path.join(__dirname, '..', 'AdminPanel', 'dist');\n  const websiteDist = path.join(__dirname, '..', 'Website', 'dist');\n\n  app.use('/admin', express.static(adminDist));\n  app.get('/admin/*', (req, res, next) => {\n    res.sendFile(path.join(adminDist, 'index.html'), (err) => err && next());\n  });\n\n  app.use(express.static(websiteDist));\n  app.use((req, res, next) => {\n    if (req.path.startsWith('/api/') || req.path.startsWith('/admin')) return next();\n    res.sendFile(path.join(websiteDist, 'index.html'), (err) => err && next());\n  });\n}"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 4.4s)

_Thinking:_

Now backend security models/utils. Let's read User model, auth middleware, auth controller, csrf.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/User.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/models/User.js</path>
<type>file</type>
<content>
1: // models/User.js
2: const mongoose = require('mongoose');
3: const bcrypt = require('bcryptjs');
4: 
5: const UserSchema = new mongoose.Schema({
6:   name: {
7:     type: String,
8:     required: [true, 'Please add a name']
9:   },
10:   email: {
11:     type: String,
12:     required: [true, 'Please add an email'],
13:     unique: true,
14:     match: [
15:       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
16:       'Please add a valid email'
17:     ]
18:   },
19:   password: {
20:     type: String,
21:     required: [true, 'Please add a password'],
22:     minlength: 8,
23:     select: false // Automatically excludes password when fetching users
24:   },
25:   role: {
26:     type: String,
27:     enum: ['admin', 'teacher', 'student', 'parent'],
28:     default: 'student'
29:   },
30:   profileImage: {
31:     type: String,
32:     default: "" // Local default fallback handled on frontend assets folder
33:   },
34:   twoFactorEnabled: {
35:     type: Boolean,
36:     default: false
37:   },
38:   twoFactorSecret: {
39:     type: String,
40:     default: "",
41:     select: false // Never returned to the client
42:   }
43: }, { timestamps: true });
44: 
45: // Encrypt password using pure modern async/await syntax
46: UserSchema.pre('save', async function () {
47:   // 1. If password hasn't changed, return immediately to exit the function
48:   if (!this.isModified('password')) {
49:     return;
50:   }
51: 
52:   // 2. Hash the password safely using try/catch
53:   try {
54:     const salt = await bcrypt.genSalt(12);
55:     this.password = await bcrypt.hash(this.password, salt);
56:   } catch (error) {
57:     throw new Error(error); // Automatically forwards database errors to Express
58:   }
59: });
60: 
61: 
62: // Custom method to compare entered password with hashed password in database
63: UserSchema.methods.matchPassword = async function (enteredPassword) {
64:   return await bcrypt.compare(enteredPassword, this.password);
65: };
66: 
67: // Defense-in-depth: never let a serialized user leak the password hash or the
68: // TOTP secret, even if a future route forgets its explicit projection.
69: UserSchema.set('toJSON', {
70:   transform: (_doc, ret) => {
71:     delete ret.password;
72:     delete ret.twoFactorSecret;
73:     return ret;
74:   },
75: });
76: 
77: module.exports = mongoose.model('User', UserSchema);

(End of file - total 77 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/controllers/authController.js</path>
<type>file</type>
<content>
1: // controllers/authController.js
2: const jwt = require('jsonwebtoken');
3: const speakeasy = require('speakeasy');
4: const qrcode = require('qrcode');
5: const User = require('../models/User');
6: const {
7:   signSessionToken,
8:   signPreauthToken,
9:   sessionCookieOptions,
10:   clearSessionCookie,
11: } = require('../middleware/auth');
12: 
13: const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
14: 
15: // Serialize a user document into the safe client-facing shape (no secrets).
16: const publicUser = (user) => ({
17:   _id: user._id,
18:   name: user.name,
19:   email: user.email,
20:   role: user.role,
21:   profileImage: user.profileImage || '',
22:   twoFactorEnabled: Boolean(user.twoFactorEnabled),
23: });
24: 
25: // @desc    Register a new account (public self-registration is always a 'parent')
26: // @route   POST /api/auth/register
27: // @access  Public
28: const registerUser = async (req, res) => {
29:   const { name, email, password } = req.body;
30: 
31:   try {
32:     if (typeof name !== 'string' || !EMAIL_REGEX.test(email) || password.length < 8) {
33:       return res.status(400).json({ success: false, message: 'Invalid registration payload.' });
34:     }
35: 
36:     // ⚠️ SECURITY: Public self-registration ALWAYS creates a 'parent' account.
37:     const SAFE_PUBLIC_ROLE = 'parent';
38: 
39:     const userExists = await User.findOne({ email: email.toLowerCase().trim() });
40:     if (userExists) {
41:       return res.status(400).json({ success: false, message: 'User already exists' });
42:     }
43: 
44:     const user = await User.create({
45:       name: name.trim(),
46:       email: email.toLowerCase().trim(),
47:       password,
48:       role: SAFE_PUBLIC_ROLE,
49:     });
50: 
51:     // Issued as an HttpOnly cookie — the JWT never touches JavaScript storage.
52:     res.cookie('token', signSessionToken(user), sessionCookieOptions());
53: 
54:     res.status(201).json({ success: true, user: publicUser(user) });
55:   } catch (error) {
56:     console.error(error);
57:     res.status(500).json({ success: false, message: 'Registration failed.' });
58:   }
59: };
60: 
61: // @desc    Authenticate user via email/password (cookie session + optional 2FA)
62: // @route   POST /api/auth/login
63: // @access  Public
64: const loginUser = async (req, res) => {
65:   const { email, password } = req.body;
66: 
67:   try {
68:     if (typeof email !== 'string' || typeof password !== 'string') {
69:       return res.status(400).json({ success: false, message: 'Invalid credentials format.' });
70:     }
71: 
72:     const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password +twoFactorSecret');
73: 
74:     if (user && (await user.matchPassword(password))) {
75:       // 2FA enforced first: hand out a short-lived preauth token instead of the session.
76:       if (user.twoFactorEnabled && user.twoFactorSecret) {
77:         res.cookie('preauth', signPreauthToken(user._id), {
78:           ...sessionCookieOptions(),
79:           maxAge: 10 * 60 * 1000,
80:         });
81:         return res.json({
82:           success: true,
83:           twoFactorRequired: true,
84:           user: { _id: user._id, name: user.name, email: user.email },
85:         });
86:       }
87: 
88:       res.cookie('token', signSessionToken(user), sessionCookieOptions());
89:       return res.json({ success: true, user: publicUser(user) });
90:     }
91: 
92:     return res.status(401).json({ success: false, message: 'Invalid email or password' });
93:   } catch (error) {
94:     console.error(error);
95:     res.status(500).json({ success: false, message: 'Login failed.' });
96:   }
97: };
98: 
99: // @desc    Return the currently authenticated user (session bootstrap for the SPA)
100: // @route   GET /api/auth/me
101: // @access  Private
102: const getMe = async (req, res) => {
103:   res.json({ success: true, user: publicUser(req.user) });
104: };
105: 
106: // @desc    Log out: destroy the session + preauth + csrf cookies
107: // @route   POST /api/auth/logout
108: // @access  Private
109: const logoutUser = (req, res) => {
110:   clearSessionCookie(res);
111:   res.json({ success: true, message: 'Logged out.' });
112: };
113: 
114: // @desc    Begin TOTP setup: generate a secret + QR code (enabled only after verify)
115: // @route   POST /api/auth/2fa/setup
116: // @access  Private
117: const setupTwoFactor = async (req, res) => {
118:   try {
119:     const secret = speakeasy.generateSecret({ name: `SchoolPortal:${req.user.email}` });
120: 
121:     // Persist immediately but keep it dormant until a valid code confirms it.
122:     req.user.twoFactorSecret = secret.base32;
123:     req.user.twoFactorEnabled = false;
124:     await req.user.save();
125: 
126:     let otpauthUrl = secret.otpauth_url;
127:     let qrDataUrl = '';
128:     if (otpauthUrl) {
129:       qrDataUrl = await qrcode.toDataURL(otpauthUrl);
130:     } else {
131:       otpauthUrl = `otpauth://totp/SchoolPortal:${encodeURIComponent(req.user.email)}?secret=${secret.base32}&issuer=SchoolPortal`;
132:       qrDataUrl = await qrcode.toDataURL(otpauthUrl);
133:     }
134: 
135:     res.json({ success: true, secret: secret.base32, otpauthUrl, qrCode: qrDataUrl });
136:   } catch (error) {
137:     console.error(error);
138:     res.status(500).json({ success: false, message: '2FA setup failed.' });
139:   }
140: };
141: 
142: // @desc    Complete 2FA — either enable during setup, or finish login with a preauth token
143: // @route   POST /api/auth/2fa/verify
144: // @access  Public (preauth cookie) or Private (setup)
145: const verifyTwoFactor = async (req, res) => {
146:   const { code } = req.body;
147: 
148:   try {
149:     let user;
150:     let preauthConsumed = false;
151: 
152:     if (req.cookies && req.cookies.preauth) {
153:       // Login-in-progress path: identity comes from the preauth cookie.
154:       try {
155:         const decoded = jwt.verify(req.cookies.preauth, process.env.JWT_SECRET);
156:         if (decoded.purpose !== '2fa') {
157:           return res.status(401).json({ success: false, message: 'Invalid verification session.' });
158:         }
159:         user = await User.findById(decoded.id).select('+twoFactorSecret');
160:         preauthConsumed = true;
161:       } catch (e) {
162:         return res.status(401).json({ success: false, message: 'Verification session expired. Please log in again.' });
163:       }
164:     } else if (req.user) {
165:       // Setup path: user already holds a session.
166:       user = req.user;
167:       user = await User.findById(user._id).select('+twoFactorSecret');
168:     }
169: 
170:     if (!user || !user.twoFactorSecret) {
171:       return res.status(400).json({ success: false, message: '2FA is not configured for this account.' });
172:     }
173: 
174:     const valid = speakeasy.totp.verify({
175:       secret: user.twoFactorSecret,
176:       encoding: 'base32',
177:       token: code,
178:       window: 1,
179:     });
180: 
181:     if (!valid) {
182:       return res.status(401).json({ success: false, message: 'Invalid verification code.' });
183:     }
184: 
185:     if (preauthConsumed) {
186:       // Complete login: swap the short-lived preauth cookie for a real session.
187:       res.cookie('token', signSessionToken(user), sessionCookieOptions());
188:       res.clearCookie('preauth', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
189:       return res.json({ success: true, user: publicUser(user) });
190:     }
191: 
192:     // Enable the account's 2FA permanently.
193:     user.twoFactorEnabled = true;
194:     await user.save();
195:     return res.json({ success: true, message: 'Two-factor authentication enabled.' });
196:   } catch (error) {
197:     console.error(error);
198:     res.status(500).json({ success: false, message: 'Verification failed.' });
199:   }
200: };
201: 
202: // @desc    Disable TOTP by confirming the current code
203: // @route   POST /api/auth/2fa/disable
204: // @access  Private
205: const disableTwoFactor = async (req, res) => {
206:   const { code } = req.body;
207:   try {
208:     const user = await User.findById(req.user._id).select('+twoFactorSecret');
209:     if (!user || !user.twoFactorSecret) {
210:       return res.status(400).json({ success: false, message: '2FA is not enabled for this account.' });
211:     }
212: 
213:     const valid = speakeasy.totp.verify({
214:       secret: user.twoFactorSecret,
215:       encoding: 'base32',
216:       token: code,
217:       window: 1,
218:     });
219:     if (!valid) {
220:       return res.status(401).json({ success: false, message: 'Invalid verification code.' });
221:     }
222: 
223:     user.twoFactorSecret = '';
224:     user.twoFactorEnabled = false;
225:     await user.save();
226:     res.json({ success: true, message: 'Two-factor authentication disabled.' });
227:   } catch (error) {
228:     console.error(error);
229:     res.status(500).json({ success: false, message: 'Request failed.' });
230:   }
231: };
232: 
233: module.exports = {
234:   registerUser,
235:   loginUser,
236:   getMe,
237:   logoutUser,
238:   setupTwoFactor,
239:   verifyTwoFactor,
240:   disableTwoFactor,
241: };

(End of file - total 241 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/auth.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/middleware/auth.js</path>
<type>file</type>
<content>
1: // middleware/auth.js
2: const jwt = require('jsonwebtoken');
3: const User = require('../models/User');
4: 
5: // Session JWT lifetime (8 hours). 2FA "preauth" tokens are deliberately short-lived.
6: const SESSION_EXPIRY = process.env.JWT_EXPIRY || '8h';
7: const PREAUTH_EXPIRY = '10m';
8: 
9: // Sign the main session token (only ever delivered via an HttpOnly cookie).
10: const signSessionToken = (user) =>
11:   jwt.sign({ id: user._id, role: user.role, purpose: 'session' }, process.env.JWT_SECRET, {
12:     expiresIn: SESSION_EXPIRY,
13:   });
14: 
15: // Short-lived token proving the password step passed so a TOTP code can be exchanged for a session.
16: const signPreauthToken = (userId) =>
17:   jwt.sign({ id: userId, purpose: '2fa' }, process.env.JWT_SECRET, { expiresIn: PREAUTH_EXPIRY });
18: 
19: const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
20: 
21: // Cookie options for the session token. Secure only in production (local dev is http).
22: const sessionCookieOptions = () => ({
23:   httpOnly: true,
24:   secure: process.env.NODE_ENV === 'production',
25:   sameSite: 'lax',
26:   maxAge: 8 * 60 * 60 * 1000, // matches 8h expiry
27:   path: '/',
28: });
29: 
30: const clearSessionCookie = (res) => {
31:   res.clearCookie('token', {
32:     httpOnly: true,
33:     secure: process.env.NODE_ENV === 'production',
34:     sameSite: 'lax',
35:     path: '/',
36:   });
37:   res.clearCookie('preauth', {
38:     httpOnly: true,
39:     secure: process.env.NODE_ENV === 'production',
40:     sameSite: 'lax',
41:     path: '/',
42:   });
43: };
44: 
45: // Protect: accepts the session token from an HttpOnly cookie (primary) or a Bearer
46: // header (fallback for programmatic/testing clients). Never trusts client roles.
47: const protect = async (req, res, next) => {
48:   let token = null;
49: 
50:   // 1. Primary: HttpOnly cookie session
51:   if (req.cookies && req.cookies.token) {
52:     token = req.cookies.token;
53:   }
54: 
55:   // 2. Fallback: Bearer header (API tooling / backward compatibility)
56:   if (
57:     !token &&
58:     req.headers.authorization &&
59:     req.headers.authorization.startsWith('Bearer')
60:   ) {
61:     token = req.headers.authorization.split(' ')[1];
62:   }
63: 
64:   if (!token) {
65:     return res.status(401).json({ success: false, message: 'Not authorized, no session found' });
66:   }
67: 
68:   try {
69:     const decoded = verifyToken(token);
70: 
71:     // Reject non-session tokens (e.g. a 2FA preauth token must never open sessions)
72:     if (decoded.purpose && decoded.purpose !== 'session') {
73:       return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
74:     }
75: 
76:     const user = await User.findById(decoded.id).select('-password -twoFactorSecret');
77:     if (!user) {
78:       return res.status(401).json({ success: false, message: 'Not authorized, account no longer exists' });
79:     }
80: 
81:     req.user = user;
82:     return next();
83:   } catch (error) {
84:     return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
85:   }
86: };
87: 
88: // Optional auth: resolves a session when present (2FA verify / optional routes),
89: // but never blocks the request. `req.user` stays undefined for anonymous callers.
90: const softAuth = async (req, res, next) => {
91:   let token = null;
92:   if (req.cookies && req.cookies.token) token = req.cookies.token;
93:   else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
94:     token = req.headers.authorization.split(' ')[1];
95:   }
96: 
97:   if (!token) return next();
98: 
99:   try {
100:     const decoded = verifyToken(token);
101:     if (decoded.purpose && decoded.purpose !== 'session') return next();
102:     const user = await User.findById(decoded.id).select('-password -twoFactorSecret');
103:     if (user) req.user = user;
104:   } catch (error) {
105:     // Invalid/expired session — treat as anonymous.
106:   }
107:   next();
108: };
109: 
110: // Restrict a route to specific roles
111: const authorizeRoles = (...roles) => {
112:   return (req, res, next) => {
113:     if (!req.user || !roles.includes(req.user.role)) {
114:       return res.status(403).json({
115:         success: false,
116:         message: 'Not authorized to access this resource',
117:       });
118:     }
119:     next();
120:   };
121: };
122: 
123: module.exports = {
124:   protect,
125:   softAuth,
126:   authorizeRoles,
127:   signSessionToken,
128:   signPreauthToken,
129:   verifyToken,
130:   sessionCookieOptions,
131:   clearSessionCookie,
132: };

(End of file - total 132 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/csrf.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/middleware/csrf.js</path>
<type>file</type>
<content>
1: // middleware/csrf.js
2: // Double-submit cookie pattern: every response may carry a `csrf` cookie (readable
3: // by JS) and every state-changing request must echo it in the X-CSRF-Token header.
4: // SameSite=Lax on the session cookie already blocks cross-site POSTs; this is
5: // defense-in-depth against subdomain/session-riding attacks.
6: const crypto = require('crypto');
7: 
8: const csrfCookieOptions = () => ({
9:   httpOnly: false, // must be readable by the SPA to echo the header
10:   secure: process.env.NODE_ENV === 'production',
11:   sameSite: 'lax',
12:   maxAge: 24 * 60 * 60 * 1000,
13:   path: '/',
14: });
15: 
16: // Ensure a csrf cookie exists on every response so the very first POST works.
17: const csrfInit = (req, res, next) => {
18:   if (!req.cookies || !req.cookies.csrf) {
19:     const token = crypto.randomBytes(24).toString('hex');
20:     res.cookie('csrf', token, csrfCookieOptions());
21:     req.csrfToken = token;
22:   } else {
23:     req.csrfToken = req.cookies.csrf;
24:   }
25:   next();
26: };
27: 
28: // Verify the double-submit token on all non-safe HTTP methods.
29: const csrfProtect = (req, res, next) => {
30:   const method = req.method.toUpperCase();
31:   if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return next();
32: 
33:   const header = req.headers['x-csrf-token'];
34:   const cookie = req.cookies && req.cookies.csrf;
35: 
36:   if (!header || !cookie || header !== cookie) {
37:     return res.status(403).json({ success: false, message: 'Security token verification failed.' });
38:   }
39:   next();
40: };
41: 
42: module.exports = { csrfInit, csrfProtect }; // eslint-disable-line no-undef

(End of file - total 42 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 15.4s)

_Thinking:_

Implement crypto utility. Use AES-256-GCM. Format `enc:v1:<iv hex>:<tag hex>:<ciphertext hex>`. Key from `TWO_FACTOR_ENCRYPTION_KEY`; if 64 hex use, if base64 len 32 use, else sha256. Add helpers.

Update User model:
- fields failedLoginAttempts, lockUntil.
- methods registerFailedLogin, resetLoginFailures, isLocked.
- We won't encrypt in schema hook automatically because setup controller will encrypt before save. But safer to add setter? Could add pre-save hook that encrypts if not already prefixed. But then `twoFactorSecret` may be set to encrypted string in controller; hook would double-encrypt unless check prefix. Simpler: controllers use encrypt/decrypt explicitly. Also `setupTwoFactor` returns plain secret (needed for QR) while stores encrypted.
- Add `passwordChangedAt` date.

Update clearSessionCookie to clear `csrf` too (httpOnly false). Add `clearCsrfCookie` export? Just clear in helper.

Lockout: 5 attempts, 15 min. In login:
- find user; if user.lockUntil > now → 423? Use 429 or 401 generic. Return 429 with message "Account temporarily locked. Try again later." (Don't reveal? It's fine.)
- If bad password and user exists: registerFailedLogin; 401 generic.
- On success: reset.

Password reset:
- `POST /api/auth/forgot-password` public, validate email. Always 200 generic. Find user; create token raw 32 bytes hex, store sha256 hash, expires 30 min; send email with link `${CLIENT_ORIGIN}/reset-password?token=...`; need CLIENT_URL first origin or `APP_URL`.
- `POST /api/auth/reset-password` public, token+newPassword. Find token hash, unused, not expired; update user password; mark used; delete other tokens; reset lock; clear session? Return success. (No session)
- `POST /api/auth/change-password` protected, currentPassword, newPassword. Verify current, update. Optionally invalidate old sessions via `passwordChangedAt` — we can include `iat` check in protect: if token iat < passwordChangedAt, reject. That adds revocation on password change. Implement: in protect, if user.passwordChangedAt && decoded.iat*1000 < passwordChangedAt.getTime() → 401. But existing tokens issued before feature have no passwordChangedAt. Good. On password change/reset set passwordChangedAt = now. This addresses session revocation partially.
- Email service: create `services/email.js` with sendMail. Reuse in publicRoutes? We can keep public as is; or update. Fine.

Need validation schemas for forgot/reset/change. Add to validate.js.

Auth routes refactor: we'll move inline handlers to controllers? To limit scope, I'll create controllers for auth domain now including user admin handlers maybe later. The directive asks all routes. Let's at least do auth fully. We'll move inline handlers from authRoutes to `controllers/userController.js` later. For now add new routes using controller functions.

Let me write crypto util, email service, PasswordResetToken model, update User, auth middleware, auth controller. Then routes + validation.

First utils/crypto.js.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/utils/crypto.js",
  "content": "// utils/crypto.js\n// AES-256-GCM helpers for secrets that must be recoverable server-side\n// (currently the TOTP secret). Values are stored as:\n//   enc:v1:<iv-hex>:<auth-tag-hex>:<ciphertext-hex>\nconst crypto = require('crypto');\n\nconst PREFIX = 'enc:v1:';\n\nconst deriveKey = () => {\n  const raw = process.env.TWO_FACTOR_ENCRYPTION_KEY || process.env.JWT_SECRET || '';\n  if (!raw) throw new Error('Missing encryption key material.');\n\n  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, 'hex');\n\n  try {\n    const b64 = Buffer.from(raw, 'base64');\n    if (b64.length === 32) return b64;\n  } catch {\n    // not base64 — fall through to KDF\n  }\n\n  // Deterministic 32-byte key from arbitrary passphrase material.\n  return crypto.createHash('sha256').update(`scholaris:2fa:${raw}`).digest();\n};\n\nconst isEncrypted = (value) => typeof value === 'string' && value.startsWith(PREFIX);\n\nconst encryptSecret = (plaintext) => {\n  if (!plaintext) return '';\n  if (isEncrypted(plaintext)) return plaintext;\n\n  const key = deriveKey();\n  const iv = crypto.randomBytes(12);\n  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);\n  const ciphertext = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);\n  const tag = cipher.getAuthTag();\n\n  return `${PREFIX}${iv.toString('hex')}:${tag.toString('hex')}:${ciphertext.toString('hex')}`;\n};\n\nconst decryptSecret = (stored) => {\n  if (!stored) return '';\n  if (!isEncrypted(stored)) return stored; // legacy plaintext rows still work\n\n  const parts = stored.slice(PREFIX.length).split(':');\n  if (parts.length !== 3) throw new Error('Malformed encrypted secret.');\n\n  const [ivHex, tagHex, dataHex] = parts;\n  const key = deriveKey();\n  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));\n  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));\n  const plaintext = Buffer.concat([\n    decipher.update(Buffer.from(dataHex, 'hex')),\n    decipher.final(),\n  ]);\n  return plaintext.toString('utf8');\n};\n\nconst sha256 = (value) => crypto.createHash('sha256').update(String(value)).digest('hex');\n\nmodule.exports = { encryptSecret, decryptSecret, isEncrypted, sha256 };\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/services/email.js",
  "content": "// services/email.js\n// Small SMTP wrapper. Email is optional: callers should treat failures as\n// non-fatal so core flows (password reset request, admission status) still work.\nconst nodemailer = require('nodemailer');\n\nconst isConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);\n\nconst escapeHtml = (value) =>\n  String(value ?? '')\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#39;');\n\nconst getTransport = () =>\n  nodemailer.createTransport({\n    host: process.env.SMTP_HOST || 'smtp.gmail.com',\n    port: Number(process.env.SMTP_PORT) || 587,\n    secure: Number(process.env.SMTP_PORT) === 465,\n    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },\n  });\n\nconst sendMail = async ({ to, subject, html, text }) => {\n  if (!isConfigured()) return { skipped: true };\n  const transport = getTransport();\n  return transport.sendMail({\n    from: process.env.SMTP_FROM || process.env.SMTP_USER,\n    to,\n    subject,\n    text,\n    html: html || undefined,\n  });\n};\n\nmodule.exports = { sendMail, isConfigured, escapeHtml };\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/PasswordResetToken.js",
  "content": "// models/PasswordResetToken.js\nconst mongoose = require('mongoose');\n\nconst PasswordResetTokenSchema = new mongoose.Schema(\n  {\n    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },\n    tokenHash: { type: String, required: true, unique: true },\n    expiresAt: { type: Date, required: true },\n    usedAt: { type: Date, default: null },\n  },\n  { timestamps: true }\n);\n\n// MongoDB TTL index: expired tokens are purged automatically.\nPasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });\n\nmodule.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 6.6s)

_Thinking:_

Update User model. Add fields and methods.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/User.js",
  "oldString": "  twoFactorSecret: {\n    type: String,\n    default: \"\",\n    select: false // Never returned to the client\n  }\n}, { timestamps: true });",
  "newString": "  twoFactorSecret: {\n    type: String,\n    default: \"\",\n    select: false // Encrypted AES-256-GCM payload; never returned to the client\n  },\n  failedLoginAttempts: {\n    type: Number,\n    default: 0,\n    select: false\n  },\n  lockUntil: {\n    type: Date,\n    default: null,\n    select: false\n  },\n  passwordChangedAt: {\n    type: Date,\n    default: null\n  }\n}, { timestamps: true });"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/User.js",
  "oldString": "// Custom method to compare entered password with hashed password in database\nUserSchema.methods.matchPassword = async function (enteredPassword) {\n  return await bcrypt.compare(enteredPassword, this.password);\n};",
  "newString": "// Custom method to compare entered password with hashed password in database\nUserSchema.methods.matchPassword = async function (enteredPassword) {\n  return await bcrypt.compare(enteredPassword, this.password);\n};\n\nconst MAX_FAILED_ATTEMPTS = 5;\nconst LOCK_DURATION_MS = 15 * 60 * 1000;\n\nUserSchema.methods.isLocked = function () {\n  return Boolean(this.lockUntil && this.lockUntil.getTime() > Date.now());\n};\n\n// Increment failures and lock the account after the threshold. Resets the\n// counter whenever a lock is (re)applied to keep the window bounded.\nUserSchema.methods.registerFailedLogin = async function () {\n  if (this.isLocked()) return;\n\n  this.failedLoginAttempts = (this.failedLoginAttempts || 0) + 1;\n  if (this.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {\n    this.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);\n    this.failedLoginAttempts = 0;\n  }\n  await this.save();\n};\n\nUserSchema.methods.resetLoginFailures = async function () {\n  if (!this.failedLoginAttempts && !this.lockUntil) return;\n  this.failedLoginAttempts = 0;\n  this.lockUntil = null;\n  await this.save();\n};"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 6.6s)

_Thinking:_

Update auth middleware: clear csrf; token revocation via passwordChangedAt. Also maybe cookie maxAge match JWT_EXPIRY? Not necessary. Add `clearCsrfCookie`? Simpler include in clearSessionCookie.

Need csrf cookie options with httpOnly false.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/auth.js",
  "oldString": "  res.clearCookie('preauth', {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    path: '/',\n  });\n};",
  "newString": "  res.clearCookie('preauth', {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    path: '/',\n  });\n  // The CSRF cookie must be cleared too; otherwise a stale token survives logout.\n  res.clearCookie('csrf', {\n    httpOnly: false,\n    secure: process.env.NODE_ENV === 'production',\n    sameSite: 'lax',\n    path: '/',\n  });\n};"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/auth.js",
  "oldString": "    const user = await User.findById(decoded.id).select('-password -twoFactorSecret');\n    if (!user) {\n      return res.status(401).json({ success: false, message: 'Not authorized, account no longer exists' });\n    }\n\n    req.user = user;",
  "newString": "    const user = await User.findById(decoded.id).select('-password -twoFactorSecret');\n    if (!user) {\n      return res.status(401).json({ success: false, message: 'Not authorized, account no longer exists' });\n    }\n\n    // Password changes/resets revoke older sessions (JWT iat is in seconds).\n    if (\n      user.passwordChangedAt &&\n      decoded.iat &&\n      decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime() - 1000\n    ) {\n      return res.status(401).json({ success: false, message: 'Session expired. Please sign in again.' });\n    }\n\n    req.user = user;"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 9.9s)

_Thinking:_

Now update authController with encryption, lockout, password flows. Add imports. Need `publicUser` maybe export? Not necessary.

Also setup 2FA: encrypt secret before save; return plain secret. Verify: decrypt. Disable: decrypt. Login: select lock fields; check lock; on failure register; on success reset. Careful: `registerFailedLogin` saves document; user selected password. Fine.

Password reset flow needs `PasswordResetToken`, crypto, email. Add functions.

Add `changePassword`, `requestPasswordReset`, `resetPassword`.

Implementation details:
- requestPasswordReset: validate email string; find user. If found, delete existing unused tokens, create raw token `crypto.randomBytes(32).toString('hex')`, hash sha256, expires 30min. Build reset URL using `process.env.APP_URL || (CLIENT_URL first) || 'http://localhost:5175'`. Send email. Always return generic success.
- resetPassword: token, password. Find by hash; if invalid/used/expired → 400 generic "Invalid or expired reset token."; load user with password; set password, passwordChangedAt; save; mark used; delete other tokens.
- changePassword: currentPassword, newPassword; load user with password; compare; ensure new != current; set, passwordChangedAt, save; clear session? Keep current session valid if token iat maybe before passwordChangedAt → protect would reject it on next request. That's a problem: after changing password, current session token iat is before passwordChangedAt, so user gets logged out. That's acceptable/expected. We can issue a new token in response to keep them signed in. Better: re-issue session cookie after change. Include signSessionToken. Do that.
- resetPassword doesn't issue session.

Also 2FA preauth verification decrypt.

Let's edit.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "const jwt = require('jsonwebtoken');\nconst speakeasy = require('speakeasy');\nconst qrcode = require('qrcode');\nconst User = require('../models/User');\nconst {\n  signSessionToken,\n  signPreauthToken,\n  sessionCookieOptions,\n  clearSessionCookie,\n} = require('../middleware/auth');",
  "newString": "const crypto = require('crypto');\nconst jwt = require('jsonwebtoken');\nconst speakeasy = require('speakeasy');\nconst qrcode = require('qrcode');\nconst User = require('../models/User');\nconst PasswordResetToken = require('../models/PasswordResetToken');\nconst { sendMail, isConfigured: emailConfigured, escapeHtml } = require('../services/email');\nconst { encryptSecret, decryptSecret, sha256 } = require('../utils/crypto');\nconst {\n  signSessionToken,\n  signPreauthToken,\n  sessionCookieOptions,\n  clearSessionCookie,\n} = require('../middleware/auth');\n\nconst RESET_TOKEN_TTL_MS = 30 * 60 * 1000;"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password +twoFactorSecret');\n\n    if (user && (await user.matchPassword(password))) {\n      // 2FA enforced first: hand out a short-lived preauth token instead of the session.\n      if (user.twoFactorEnabled && user.twoFactorSecret) {\n        res.cookie('preauth', signPreauthToken(user._id), {\n          ...sessionCookieOptions(),\n          maxAge: 10 * 60 * 1000,\n        });\n        return res.json({\n          success: true,\n          twoFactorRequired: true,\n          user: { _id: user._id, name: user.name, email: user.email },\n        });\n      }\n\n      res.cookie('token', signSessionToken(user), sessionCookieOptions());\n      return res.json({ success: true, user: publicUser(user) });\n    }\n\n    return res.status(401).json({ success: false, message: 'Invalid email or password' });",
  "newString": "    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(\n      '+password +twoFactorSecret +failedLoginAttempts +lockUntil'\n    );\n\n    // Per-account lockout (IP rate limits alone cannot stop targeted attacks).\n    if (user && user.isLocked()) {\n      return res.status(429).json({\n        success: false,\n        message: 'Account temporarily locked after repeated failed attempts. Try again later.',\n      });\n    }\n\n    if (user && (await user.matchPassword(password))) {\n      await user.resetLoginFailures();\n\n      // 2FA enforced first: hand out a short-lived preauth token instead of the session.\n      if (user.twoFactorEnabled && user.twoFactorSecret) {\n        res.cookie('preauth', signPreauthToken(user._id), {\n          ...sessionCookieOptions(),\n          maxAge: 10 * 60 * 1000,\n        });\n        return res.json({\n          success: true,\n          twoFactorRequired: true,\n          user: { _id: user._id, name: user.name, email: user.email },\n        });\n      }\n\n      res.cookie('token', signSessionToken(user), sessionCookieOptions());\n      return res.json({ success: true, user: publicUser(user) });\n    }\n\n    if (user) await user.registerFailedLogin();\n    return res.status(401).json({ success: false, message: 'Invalid email or password' });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## User

---

## Assistant (Compaction · Big Pickle · 20.2s)

_Thinking:_

Let me produce the anchored summary from the conversation. Need to capture objective: full-scope refactor of Scholaris school management system per directive: restructure into Server/, AdminPanel/, Website/, ui-ux-pro-max-local/; security hardening; payments; data integrity; CMS; mobile-first redesign; audit; docs.

Important details: prior fix of MONGODB_URI/MONGO_URI; docs created; filenames uppercase; ui-ux-pro-max-local already existed (pre-existing full skill repo, 41M, has own .git); AdminPanel/Website copied from old frontend including node_modules and dist (163M each); original frontend removed; backend git mv'd to Server; root package.json still references backend/frontend (not yet updated); server.js still serves old frontend/dist path (needs update); .gitignore still references frontend/backend; docs still refer to old paths; ui-ux-pro-max-local already exists so no need to create, but may add project-specific guidance.

Work state completed: docs created (PRD.md, ARCHITECTURE.md, DESIGN.md, MEMORY.md, RULES.md, TRACKER.md), env mismatch fix, repo restructure git mv backend→Server, copied frontend→AdminPanel and Website, removed frontend, verified git status shows renames.

Active: just started reading AdminPanel/src/App.jsx to begin split; root scripts/configs not updated.

Blocked: none yet, but note massive scope; no tests. Potential issue: node_modules duplication, ui-ux-pro-max-local has own .git (nested git repo) — git status may treat it? It existed before and wasn't untracked? Actually git status earlier only showed docs/ untracked; ui-ux-pro-max-local must be ignored or untracked already? It wasn't in git status output—maybe it's in .gitignore? No. It existed before and presumably untracked but not shown? The git status --short showed only docs/. Hmm, maybe ui-ux-pro-max-local is a nested git repo and appears as untracked directory? It should. But output only docs/. Perhaps it's in .gitignore via global? Or it was already tracked? We don't know. Note it exists and contains its own .git; avoid committing it or decide.

Next moves: update root package.json scripts (server/admin/website/dev concurrently), Server package name/paths, Vite configs ports/base/proxy, server.js static serving & CSP/CORS, .gitignore; then split App.jsx/navConfig for AdminPanel and Website; then backend security features.

Relevant files list with paths.

Need exact file paths: /home/sajidasim/school-management-system/Server/server.js, config/db.js, controllers/authController.js, middleware/auth.js, csrf.js, sanitize.js, validate.js, assignments.js, models/User.js, PublicModels.js, routes/*.js, services/payment.js, utils/rolls.js, scripts/seed-admin.js, backfillAssignments.js; AdminPanel/src/App.jsx, navConfig.js, core/api.js, context/AuthContext.jsx; Website same; docs; root package.json; .gitignore; ui-ux-pro-max-local.

Also mention planned features details: AES-256-GCM 2FA encryption, PasswordResetToken model, lockout fields, logout clears csrf, payment guards/atomic findOneAndUpdate/sparse unique paymentTxnId, cascade cleanup, transactions, controller extraction, CMS models (MenuItem, SitePage, GalleryItem, News, Facility, AcademicInfo, Announcement), admin production at /admin with basename/base, website at root.

Keep terse. Use exact strings.

## Objective
- Execute the full Scholaris refactor directive: restructure repo into `Server/`, `AdminPanel/`, `Website/`, `ui-ux-pro-max-local/`; harden security; fix payments/data integrity; add a WordPress-style CMS; redesign mobile-first; audit and update docs.
- The project is the school management system at `/home/sajidasim/school-management-system`.

## Important Details
- Prior DB fix: code now accepts `process.env.MONGODB_URI || process.env.MONGO_URI` in `Server/config/db.js`, `Server/scripts/seed-admin.js`, `Server/scripts/backfillAssignments.js`. Atlas initially returned `bad auth : authentication failed`.
- Docs were created with uppercase names: `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/MEMORY.md`, `docs/RULES.md`, `docs/TRACKER.md`. User originally wrote mixed-case (`Architecture.MD`, `DEsign.MD`, etc.); agent used uppercase and offered renaming.
- `ui-ux-pro-max-local/` already existed before this request (41M, full skill repo with its own `.git`, README, `skill.json`, `CLAUDE.md`, tokens/guidance). Do not recreate; reference/leverage it.
- Structure done via `git mv backend Server`; `frontend` was copied to both `AdminPanel/` and `Website/`, then `rm -rf frontend`. Both copies are 163M because they include `node_modules/` and stale `dist/`; these are not tracked.
- Root `package.json` still references `backend`/`frontend`; `.gitignore` still references `frontend/`/`backend/`; `Server/server.js` likely still serves `../frontend/dist`; docs still describe old paths. All need updating.
- Planned production topology: Website at `/`, AdminPanel at `/admin` (Vite `base:'/admin/'`, router basename from `import.meta.env.BASE_URL`), same API origin.
- Planned dev ports: Server 5000, AdminPanel 5174, Website 5175; Vite proxies `/api` via `VITE_API_TARGET`.
- Security requirements: email-token password reset + authenticated password change; logout must clear `csrf` too; AES-256-GCM encrypt `twoFactorSecret`; per-account failed-login lockout.
- Payments: reject `Waived`/`Rejected`/`Paid`; atomic `findOneAndUpdate` idempotency; unique sparse `paymentTxnId` index.
- Data: cascade cleanup for `Attendance`/`Gradebook`; Mongoose transactions for User+Profile create, delete+roll reindex; extract all inline handlers from `routes/*.js` to `Server/controllers/`.
- CMS requirements: dynamic site identity, pages, navbar menu links with dropdowns/reorder, gallery, news, notices, announcements, facilities, academic info; Website fetches menu/content dynamically.
- Public navbar target groups: Home, Administration, Academic, Beyond Academics, Campus Facilities, Result, Placement/Achievements, Admission, Careers, Gallery, Notice, News.
- Mobile-first target ≤375px with slide-over drawers, sticky headers, touch-friendly nav, horizontal-scroll tables.
- Final step must include vulnerability audit/fixes, README rewrite, all six docs updates, `.env.example` update, `.gitignore` excluding `.env`, `dist`, logs, uploads.
- No automated tests/CI exist. Frontend is plain JS/JSX, no TypeScript. Backend is CommonJS.
- Do not commit unless explicitly asked. Never expose `.env` secrets.

## Work State
### Completed
- Created `docs/` with all six documentation files, based on codebase exploration; fixed duplicate PRD requirement IDs (`FR-ADM-*` admissions vs `FR-ADMIN-*` admin).
- Fixed Mongo env-var mismatch as above.
- Restructured: `backend/` → `Server/` via `git mv`; copied old `frontend/` to `AdminPanel/` and `Website/`; deleted `frontend/`.
- Confirmed `git status --short` shows renames for all backend files and untracked `docs/`.
- Confirmed `ui-ux-pro-max-local/` exists with its own docs/guidelines.

### Active
- Beginning frontend split: just read first 10 lines of `/home/sajidasim/school-management-system/AdminPanel/src/App.jsx`.
- Need to rewrite `App.jsx` and `navConfig.js` in both `AdminPanel` and `Website` to remove irrelevant role pages/routes.
- Root orchestration/config still unmodified.

### Blocked
- (none yet)
- Potential caution: `ui-ux-pro-max-local` contains a nested `.git` directory; verify whether it is tracked/ignored before staging.
- Potential caution: duplicated `node_modules`/`dist` in `AdminPanel` and `Website` inflate repo; remove or ignore as appropriate.

## Next Move
1. Update `/home/sajidasim/school-management-system/package.json` scripts to `server`, `admin`, `website`, and concurrent `dev`; update `Server/package.json` name if needed.
2. Update `Server/server.js` production static serving (`Website/dist` at `/`, `AdminPanel/dist` at `/admin`), CORS/CSP for ports 5174/5175, and `.gitignore` for `AdminPanel/dist`, `Website/dist`, `Server/dist`, logs, uploads.
3. Split frontend routes/config: AdminPanel keeps `/login`, `/profile`, `/a/*`, `/t/*`; Website keeps public, `/login`, `/register`, `/profile`, `/p/*`, `/s/*`; update both Vite configs (`base`, port, `/api` proxy).

## Relevant Files
- `/home/sajidasim/school-management-system/package.json`: root scripts still point to old `backend`/`frontend`.
- `/home/sajidasim/school-management-system/.gitignore`: old paths; needs new apps/build/log/env coverage.
- `/home/sajidasim/school-management-system/Server/server.js`: bootstrap, middleware order, route mounts, production SPA serving, CSP/CORS.
- `/home/sajidasim/school-management-system/Server/config/db.js`: DB connection with `MONGODB_URI || MONGO_URI`.
- `/home/sajidasim/school-management-system/Server/controllers/authController.js`: register/login/2FA/logout; target for reset/change-password/lockout.
- `/home/sajidasim/school-management-system/Server/middleware/auth.js`: JWT cookies, `protect`, `softAuth`, `authorizeRoles`.
- `/home/sajidasim/school-management-system/Server/middleware/csrf.js`: double-submit CSRF.
- `/home/sajidasim/school-management-system/Server/middleware/sanitize.js`: Express 5 `Object.defineProperty` query fix.
- `/home/sajidasim/school-management-system/Server/middleware/validate.js`: Zod schemas.
- `/home/sajidasim/school-management-system/Server/middleware/assignments.js`: `canAccessClass`, `requireAssignment`, `getTeacherScope`.
- `/home/sajidasim/school-management-system/Server/models/User.js`: add lockout fields, 2FA encryption handling.
- `/home/sajidasim/school-management-system/Server/models/PublicModels.js`: `SchoolInfo` + `Application`; extend CMS/payment fields.
- `/home/sajidasim/school-management-system/Server/routes/*.js`: auth, public, teacher, gradebook, attendance, notice, config, assignment, student — extract to controllers.
- `/home/sajidasim/school-management-system/Server/services/payment.js`: sandbox adapter; add real-provider contract/guards.
- `/home/sajidasim/school-management-system/Server/utils/rolls.js`: roll reindexing for transactions.
- `/home/sajidasim/school-management-system/Server/scripts/seed-admin.js`: env alias + admin bootstrap.
- `/home/sajidasim/school-management-system/Server/scripts/backfillAssignments.js`: assignment backfill.
- `/home/sajidasim/school-management-system/AdminPanel/src/App.jsx`: currently full app route table; needs admin/teacher-only split.
- `/home/sajidasim/school-management-system/AdminPanel/src/components/layout/navConfig.js`: role nav config; split admin/teacher.
- `/home/sajidasim/school-management-system/Website/src/App.jsx`: needs public/student/parent-only split.
- `/home/sajidasim/school-management-system/Website/src/components/layout/navConfig.js`: split student/parent.
- `/home/sajidasim/school-management-system/AdminPanel/src/core/api.js` and `Website/src/core/api.js`: shared Axios client; keep.
- `/home/sajidasim/school-management-system/AdminPanel/src/context/AuthContext.jsx` and `Website/src/context/AuthContext.jsx`: session bootstrap/2FA.
- `/home/sajidasim/school-management-system/AdminPanel/vite.config.js` and `Website/vite.config.js`: ports/base/proxy.
- `/home/sajidasim/school-management-system/docs/PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `MEMORY.md`, `RULES.md`, `TRACKER.md`: must be updated for new structure/features.
- `/home/sajidasim/school-management-system/README.md`: outdated; rewrite for `Server/`, `AdminPanel/`, `Website/`.
- `/home/sajidasim/school-management-system/Server/.env.example`: update vars (`MONGODB_URI` alias, `TRUST_PROXY`, `VITE_API_TARGET`, `TWO_FACTOR_ENCRYPTION_KEY`, `ADMIN_URL`, `WEBSITE_URL`).
- `/home/sajidasim/school-management-system/ui-ux-pro-max-local/`: existing design-system skill; reference for tokens/guidelines.

---

## User

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

Continue implementing. Need edit setup/verify/disable encryption, add password functions, exports.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "    // Persist immediately but keep it dormant until a valid code confirms it.\n    req.user.twoFactorSecret = secret.base32;\n    req.user.twoFactorEnabled = false;\n    await req.user.save();",
  "newString": "    // Persist encrypted immediately but keep it dormant until a valid code confirms it.\n    req.user.twoFactorSecret = encryptSecret(secret.base32);\n    req.user.twoFactorEnabled = false;\n    await req.user.save();"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "    const valid = speakeasy.totp.verify({\n      secret: user.twoFactorSecret,\n      encoding: 'base32',\n      token: code,\n      window: 1,\n    });\n\n    if (!valid) {\n      return res.status(401).json({ success: false, message: 'Invalid verification code.' });\n    }",
  "newString": "    const valid = speakeasy.totp.verify({\n      secret: decryptSecret(user.twoFactorSecret),\n      encoding: 'base32',\n      token: String(code || ''),\n      window: 1,\n    });\n\n    if (!valid) {\n      return res.status(401).json({ success: false, message: 'Invalid verification code.' });\n    }"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "    const valid = speakeasy.totp.verify({\n      secret: user.twoFactorSecret,\n      encoding: 'base32',\n      token: code,\n      window: 1,\n    });\n    if (!valid) {\n      return res.status(401).json({ success: false, message: 'Invalid verification code.' });\n    }\n\n    user.twoFactorSecret = '';\n    user.twoFactorEnabled = false;\n    await user.save();\n    res.json({ success: true, message: 'Two-factor authentication disabled.' });",
  "newString": "    const valid = speakeasy.totp.verify({\n      secret: decryptSecret(user.twoFactorSecret),\n      encoding: 'base32',\n      token: String(code || ''),\n      window: 1,\n    });\n    if (!valid) {\n      return res.status(401).json({ success: false, message: 'Invalid verification code.' });\n    }\n\n    user.twoFactorSecret = '';\n    user.twoFactorEnabled = false;\n    await user.save();\n    res.json({ success: true, message: 'Two-factor authentication disabled.' });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 7.4s)

_Thinking:_

Now add password functions before module.exports. Also 2FA verify preauth should check lock? lock only at password stage, okay.

Add.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/authController.js",
  "oldString": "module.exports = {\n  registerUser,\n  loginUser,\n  getMe,\n  logoutUser,\n  setupTwoFactor,\n  verifyTwoFactor,\n  disableTwoFactor,\n};",
  "newString": "// @desc    Request a password-reset email (always returns a generic response)\n// @route   POST /api/auth/forgot-password\n// @access  Public\nconst requestPasswordReset = async (req, res) => {\n  const { email } = req.body;\n  const generic = {\n    success: true,\n    message: 'If an account exists for that email, a reset link has been sent.',\n  };\n\n  try {\n    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {\n      // Do not leak validation differences for unknown accounts.\n      return res.json(generic);\n    }\n\n    const user = await User.findOne({ email: email.toLowerCase().trim() });\n    if (!user) return res.json(generic);\n\n    await PasswordResetToken.deleteMany({ user: user._id, usedAt: null });\n\n    const rawToken = crypto.randomBytes(32).toString('hex');\n    await PasswordResetToken.create({\n      user: user._id,\n      tokenHash: sha256(rawToken),\n      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),\n    });\n\n    const baseUrl =\n      process.env.APP_URL ||\n      (process.env.CLIENT_URL || 'http://localhost:5175').split(',')[0].trim();\n    const resetUrl = `${baseUrl.replace(/\\/$/, '')}/reset-password?token=${rawToken}`;\n\n    if (emailConfigured()) {\n      const safeName = escapeHtml(user.name);\n      await sendMail({\n        to: user.email,\n        subject: 'Reset your Scholaris password',\n        text: `Hi ${user.name}, reset your password within 30 minutes: ${resetUrl}`,\n        html: `<p>Hi ${safeName},</p><p>Use the link below within 30 minutes to reset your password.</p><p><a href=\"${resetUrl}\">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,\n      }).catch((err) => console.error('Password reset email failed:', err.message));\n    } else if (process.env.NODE_ENV !== 'production') {\n      // Local development without SMTP: surface the link in the server log only.\n      console.log(`[password-reset] ${user.email}: ${resetUrl}`);\n    }\n\n    return res.json(generic);\n  } catch (error) {\n    console.error(error);\n    return res.json(generic);\n  }\n};\n\n// @desc    Consume a reset token and set a new password\n// @route   POST /api/auth/reset-password\n// @access  Public\nconst resetPassword = async (req, res) => {\n  const { token, password } = req.body;\n\n  try {\n    if (typeof token !== 'string' || token.length < 32 || typeof password !== 'string' || password.length < 8) {\n      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });\n    }\n\n    const record = await PasswordResetToken.findOne({\n      tokenHash: sha256(token),\n      usedAt: null,\n      expiresAt: { $gt: new Date() },\n    });\n\n    if (!record) {\n      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });\n    }\n\n    const user = await User.findById(record.user).select('+password');\n    if (!user) {\n      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });\n    }\n\n    user.password = password;\n    user.passwordChangedAt = new Date();\n    user.failedLoginAttempts = 0;\n    user.lockUntil = null;\n    await user.save();\n\n    record.usedAt = new Date();\n    await record.save();\n    await PasswordResetToken.deleteMany({ user: user._id, _id: { $ne: record._id } });\n\n    clearSessionCookie(res);\n    return res.json({ success: true, message: 'Password updated. You can now sign in.' });\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({ success: false, message: 'Password reset failed.' });\n  }\n};\n\n// @desc    Change password while signed in\n// @route   PUT /api/auth/change-password\n// @access  Private\nconst changePassword = async (req, res) => {\n  const { currentPassword, newPassword } = req.body;\n\n  try {\n    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || newPassword.length < 8) {\n      return res.status(400).json({ success: false, message: 'Passwords must be at least 8 characters.' });\n    }\n\n    const user = await User.findById(req.user._id).select('+password');\n    if (!user || !(await user.matchPassword(currentPassword))) {\n      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });\n    }\n\n    if (await user.matchPassword(newPassword)) {\n      return res.status(400).json({ success: false, message: 'New password must differ from the current one.' });\n    }\n\n    user.password = newPassword;\n    user.passwordChangedAt = new Date();\n    await user.save();\n\n    // Re-issue the session so the current device stays signed in.\n    res.cookie('token', signSessionToken(user), sessionCookieOptions());\n    return res.json({ success: true, message: 'Password changed successfully.' });\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({ success: false, message: 'Password change failed.' });\n  }\n};\n\nmodule.exports = {\n  registerUser,\n  loginUser,\n  getMe,\n  logoutUser,\n  setupTwoFactor,\n  verifyTwoFactor,\n  disableTwoFactor,\n  requestPasswordReset,\n  resetPassword,\n  changePassword,\n};"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 2.8s)

_Thinking:_

Now update auth routes + validation schemas. Read routes/authRoutes.js and validate.js.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/routes/authRoutes.js</path>
<type>file</type>
<content>
1: // routes/authRoutes.js
2: const express = require('express');
3: const router = express.Router();
4: const mongoose = require('mongoose');
5: const {
6:   registerUser,
7:   loginUser,
8:   getMe,
9:   logoutUser,
10:   setupTwoFactor,
11:   verifyTwoFactor,
12:   disableTwoFactor,
13: } = require('../controllers/authController');
14: const { protect, softAuth, authorizeRoles } = require('../middleware/auth');
15: const { validate, schemas } = require('../middleware/validate');
16: const User = require('../models/User');
17: 
18: const Student = require('../models/Student');
19: const Teacher = require('../models/Teacher');
20: const Notice = require('../models/Notice');
21: const { reindexRollsAfterDelete } = require('../utils/rolls');
22: const { getTeacherScope } = require('../middleware/assignments');
23: 
24: // Public Gateways
25: router.post('/register', validate(schemas.register), registerUser);
26: router.post('/login', validate(schemas.login), loginUser);
27: 
28: // Session bootstrap + lifecycle
29: router.get('/me', protect, getMe);
30: router.post('/logout', protect, logoutUser);
31: 
32: // 2FA (TOTP)
33: router.post('/2fa/setup', protect, setupTwoFactor);
34: router.post('/2fa/verify', softAuth, validate(schemas.twoFactorVerify), verifyTwoFactor);
35: router.post('/2fa/disable', validate(schemas.twoFactorVerify), protect, disableTwoFactor);
36: 
37: // Private Gateway - Handles standard profile updates
38: router.put('/profile', protect, validate(schemas.profile), async (req, res) => {
39:   try {
40:     const user = await User.findById(req.user.id);
41: 
42:     if (user) {
43:       user.name = req.body.name || user.name;
44:       user.email = req.body.email || user.email;
45:       user.profileImage = req.body.profileImage || user.profileImage;
46: 
47:       const updatedUser = await user.save();
48: 
49:       res.json({
50:         success: true,
51:         user: {
52:           _id: updatedUser._id,
53:           name: updatedUser.name,
54:           email: updatedUser.email,
55:           role: updatedUser.role,
56:           profileImage: updatedUser.profileImage,
57:           twoFactorEnabled: Boolean(updatedUser.twoFactorEnabled),
58:         },
59:       });
60:     } else {
61:       res.status(404).json({ success: false, message: 'User context reference dropped.' });
62:     }
63:   } catch (error) {
64:     res.status(500).json({ success: false, message: 'Request failed.' });
65:   }
66: });
67: 
68: // @desc    Fetch automated live statistics counters for Admin Dashboard indicators
69: // @route   GET /api/auth/dashboard-stats
70: // @access  Private (Admins only)
71: router.get('/dashboard-stats', protect, authorizeRoles('admin'), async (req, res) => {
72:   try {
73:     const [studentCount, teacherCount, noticeCount] = await Promise.all([
74:       User.countDocuments({ role: 'student' }),
75:       User.countDocuments({ role: 'teacher' }),
76:       Notice ? Notice.countDocuments({}) : Promise.resolve(0),
77:     ]);
78: 
79:     const pendingTasksCount = await Student.countDocuments({
80:       $or: [{ gradeClass: 'Unassigned' }, { rollNumber: { $exists: false } }],
81:     });
82: 
83:     res.json({
84:       success: true,
85:       stats: {
86:         registeredStudents: studentCount,
87:         activeTeachers: teacherCount,
88:         noticesPublished: noticeCount,
89:         pendingTasks: pendingTasksCount,
90:       },
91:     });
92:   } catch (error) {
93:     res.status(500).json({ success: false, message: 'Request failed.' });
94:   }
95: });
96: 
97: router.get('/users', protect, authorizeRoles('admin'), async (req, res) => {
98:   try {
99:     const { role, search } = req.query;
100: 
101:     let matchQuery = {};
102: 
103:     if (role) {
104:       matchQuery.role = role;
105:     }
106: 
107:     if (search) {
108:       const safeSearch = String(search).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
109:       matchQuery.$or = [
110:         { name: { $regex: safeSearch, $options: 'i' } },
111:         { email: { $regex: safeSearch, $options: 'i' } },
112:       ];
113:     }
114: 
115:     const users = await User.aggregate([
116:       { $match: matchQuery },
117:       { $project: { password: 0 } },
118:       {
119:         $lookup: {
120:           from: 'teachers',
121:           localField: '_id',
122:           foreignField: 'userId',
123:           as: 'teacherProfile',
124:         },
125:       },
126:       {
127:         $lookup: {
128:           from: 'students',
129:           localField: '_id',
130:           foreignField: 'userId',
131:           as: 'studentProfile',
132:         },
133:       },
134:       {
135:         $addFields: {
136:           customId: {
137:             $cond: {
138:               if: { $eq: ['$role', 'teacher'] },
139:               then: { $arrayElemAt: ['$teacherProfile.teacherId', 0] },
140:               else: "",
141:             },
142:           },
143:           rollNumber: {
144:             $cond: {
145:               if: { $eq: ['$role', 'student'] },
146:               then: { $arrayElemAt: ['$studentProfile.rollNumber', 0] },
147:               else: null,
148:             },
149:           },
150:           classTeacherOf: {
151:             $cond: {
152:               if: { $eq: ['$role', 'teacher'] },
153:               then: { $arrayElemAt: ['$teacherProfile.classTeacherOf', 0] },
154:               else: 'None',
155:             },
156:           },
157:           extraField1: {
158:             $cond: {
159:               if: { $eq: ['$role', 'teacher'] },
160:               then: { $arrayElemAt: ['$teacherProfile.department', 0] },
161:               else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] },
162:             },
163:           },
164:           extraField2: {
165:             $cond: {
166:               if: { $eq: ['$role', 'teacher'] },
167:               then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
168:               else: { $arrayElemAt: ['$studentProfile.parentContact', 0] },
169:             },
170:           },
171:         },
172:       },
173:       { $project: { password: 0, teacherProfile: 0, studentProfile: 0 } },
174:       { $sort: { extraField1: 1, rollNumber: 1 } },
175:     ]);
176: 
177:     res.json({ success: true, data: users });
178:   } catch (error) {
179:     res.status(500).json({ success: false, message: 'Request failed.' });
180:   }
181: });
182: 
183: // @desc    Creation framework for new students or teachers (Admins can create both, Teachers can create students only)
184: // @route   POST /api/auth/users/create
185: // @access  Private (Admins & Teachers only)
186: router.post('/users/create', protect, authorizeRoles('admin', 'teacher'), validate(schemas.createUser), async (req, res) => {
187:   const { name, email, password, role, customId, extraField1, extraField2 } = req.body;
188: 
189:   try {
190:     if (req.user.role === 'teacher' && role !== 'student') {
191:       return res.status(403).json({ success: false, message: 'Unauthorized: Teachers are only permitted to register student accounts.' });
192:     }
193: 
194:     if (!['admin', 'teacher', 'student', 'parent'].includes(role)) {
195:       return res.status(400).json({ success: false, message: 'Invalid role configuration.' });
196:     }
197: 
198:     const normalizedEmail = email.toLowerCase().trim();
199:     const userExists = await User.findOne({ email: normalizedEmail });
200:     if (userExists) {
201:       return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
202:     }
203: 
204:     let assignedClass = extraField1 || 'Unassigned';
205:     if (req.user.role === 'teacher') {
206:       const scope = await getTeacherScope(req.user.id);
207:       const requested = extraField1 && scope.classTeacherClasses.includes(extraField1)
208:         ? extraField1
209:         : scope.classTeacherClasses[0];
210:       if (!requested) {
211:         return res.status(403).json({ success: false, message: 'You are not assigned as a class teacher to any class.' });
212:       }
213:       assignedClass = requested;
214:     }
215: 
216:     const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role });
217: 
218:     if (role === 'student') {
219:       const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;
220: 
221:       await Student.create({
222:         userId: user._id,
223:         studentId: customId || `STU-${Date.now().toString().slice(-4)}`,
224:         gradeClass: assignedClass,
225:         parentContact: extraField2 || '',
226:         guardianName: req.body.guardianName || '',
227:         rollNumber: absoluteRollNumber,
228:       });
229:     } else if (role === 'teacher') {
230:       const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;
231: 
232:       await Teacher.create({
233:         userId: user._id,
234:         teacherId: absoluteTeacherId,
235:         department: extraField1 || 'General Education',
236:         qualification: extraField2 || '',
237:         classTeacherOf: req.body.classTeacherOf || 'None',
238:       });
239:     }
240: 
241:     res.status(201).json({ success: true, message: `Successfully instantiated new ${role} account portal entry!` });
242:   } catch (error) {
243:     res.status(500).json({ success: false, message: 'Request failed.' });
244:   }
245: });
246: 
247: // Targeted single user data aggregation resolver
248: router.get('/users/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
249:   try {
250:     const user = await User.aggregate([
251:       { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
252:       { $project: { password: 0 } },
253:       {
254:         $lookup: {
255:           from: 'teachers',
256:           localField: '_id',
257:           foreignField: 'userId',
258:           as: 'teacherProfile',
259:         },
260:       },
261:       {
262:         $lookup: {
263:           from: 'students',
264:           localField: '_id',
265:           foreignField: 'userId',
266:           as: 'studentProfile',
267:         },
268:       },
269:       {
270:         $addFields: {
271:           customId: {
272:             $cond: {
273:               if: { $eq: ['$role', 'teacher'] },
274:               then: { $arrayElemAt: ['$teacherProfile.teacherId', 0] },
275:               else: {
276:                 $cond: {
277:                   if: { $eq: ['$role', 'student'] },
278:                   then: { $arrayElemAt: ['$studentProfile.studentId', 0] },
279:                   else: "",
280:                 },
281:               },
282:             },
283:           },
284:           extraField1: {
285:             $cond: {
286:               if: { $eq: ['$role', 'teacher'] },
287:               then: { $arrayElemAt: ['$teacherProfile.department', 0] },
288:               else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] },
289:             },
290:           },
291:           extraField2: {
292:             $cond: {
293:               if: { $eq: ['$role', 'teacher'] },
294:               then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
295:               else: { $arrayElemAt: ['$studentProfile.parentContact', 0] },
296:             },
297:           },
298:           twoFactorEnabled: '$twoFactorEnabled',
299:         },
300:       },
301:       { $project: { password: 0, twoFactorSecret: 0, teacherProfile: 0, studentProfile: 0 } },
302:     ]);
303: 
304:     if (!user || user.length === 0) {
305:       return res.status(404).json({ success: false, message: 'Target profile reference dropped.' });
306:     }
307: 
308:     res.json({ success: true, data: user[0] });
309:   } catch (error) {
310:     res.status(500).json({ success: false, message: 'Request failed.' });
311:   }
312: });
313: 
314: // Private Gateway - Modify user privileges
315: router.patch('/users/:id/role', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.changeRole), async (req, res) => {
316:   const { role } = req.body;
317: 
318:   try {
319:     const user = await User.findById(req.params.id);
320:     if (!user) {
321:       return res.status(404).json({ success: false, message: 'Target user record not found.' });
322:     }
323: 
324:     user.role = role;
325:     await user.save();
326: 
327:     // Never serialize the password hash back to the client.
328:     const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role };
329: 
330:     res.json({ success: true, message: `User role successfully shifted to ${role}.`, data: safeUser });
331:   } catch (error) {
332:     res.status(500).json({ success: false, message: 'Request failed.' });
333:   }
334: });
335: 
336: // @desc    Allow Admin to delete a teacher from the entire system
337: // @route   DELETE /api/auth/users/teacher/:id
338: // @access  Private (Admins only)
339: router.delete('/users/teacher/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
340:   try {
341:     const { password } = req.body;
342:     const adminUser = await User.findById(req.user.id).select('+password');
343: 
344:     const isMatch = password && (await adminUser.matchPassword(password));
345:     if (!isMatch) {
346:       return res.status(401).json({ success: false, message: 'Security check failed: Password authentication mismatch.' });
347:     }
348: 
349:     const targetUser = await User.findById(req.params.id);
350:     if (!targetUser) {
351:       return res.status(404).json({ success: false, message: 'Target profile reference dropped.' });
352:     }
353: 
354:     let message = 'Teacher profile cleanly purged from all cloud layers.';
355: 
356:     if (targetUser.role === 'student') {
357:       // Remove BOTH the Student profile and the User account, then close the
358:       // roll-number gap — previously only the User was removed, orphaning the
359:       // Student document and leaving a hole in the class roll list.
360:       const student = await Student.findOne({ userId: targetUser._id });
361:       if (student) {
362:         await Student.deleteOne({ _id: student._id });
363:         await reindexRollsAfterDelete(student.gradeClass, student.rollNumber);
364:       }
365:       await User.deleteOne({ _id: targetUser._id });
366:       message = 'Student profile cleanly purged from all cloud layers.';
367:     } else {
368:       await Teacher.deleteOne({ userId: targetUser._id });
369:       await User.deleteOne({ _id: targetUser._id });
370:     }
371: 
372:     res.json({ success: true, message });
373:   } catch (error) {
374:     res.status(500).json({ success: false, message: 'Request failed.' });
375:   }
376: });
377: 
378: // Private Gateway - Admin override to delegate credentials to separate collections
379: router.put('/users/:id/credentials', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.updateCredentials), async (req, res) => {
380:   const { customId, password, extraField1, extraField2 } = req.body;
381: 
382:   try {
383:     const user = await User.findById(req.params.id);
384:     if (!user) {
385:       return res.status(404).json({ success: false, message: 'Target user record not found.' });
386:     }
387: 
388:     if (password && password.trim() !== '') {
389:       user.password = password;
390:       await user.save();
391:     }
392: 
393:     if (user.role === 'student') {
394:       await Student.findOneAndUpdate(
395:         { userId: user._id },
396:         {
397:           userId: user._id,
398:           studentId: customId,
399:           gradeClass: extraField1 || 'Unassigned',
400:           parentContact: extraField2 || '',
401:         },
402:         { upsert: true, new: true }
403:       );
404:     } else if (user.role === 'teacher') {
405:       await Teacher.findOneAndUpdate(
406:         { userId: user._id },
407:         {
408:           userId: user._id,
409:           teacherId: customId,
410:           department: extraField1 || 'General Education',
411:           qualification: extraField2 || '',
412:           classTeacherOf: req.body.classTeacherOf || 'None',
413:         },
414:         { upsert: true, new: true }
415:       );
416:     }
417: 
418:     res.json({ success: true, message: 'Credentials safely isolated across role-specific collections!' });
419:   } catch (error) {
420:     res.status(500).json({ success: false, message: 'Request failed.' });
421:   }
422: });
423: 
424: module.exports = router;

(End of file - total 424 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/validate.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/middleware/validate.js</path>
<type>file</type>
<content>
1: // middleware/validate.js
2: const { z } = require('zod');
3: 
4: // Generic middleware factory: validates a request source against a Zod schema.
5: // Strips unknown keys (prevents mass-assignment) and returns a GENERIC 400 on
6: // failure so no schema internals are leaked.
7: const validate = (schema, source = 'body') => {
8:   return (req, res, next) => {
9:     try {
10:       const data = req[source];
11:       req[source] = schema.parse(data === undefined ? {} : data);
12:       next();
13:     } catch (err) {
14:       return res.status(400).json({ success: false, message: 'Invalid request payload.' });
15:     }
16:   };
17: };
18: 
19: const schemas = {
20:   // Auth ----------------------------------------------------------------------
21:   register: z.object({
22:     name: z.string().trim().min(2).max(80),
23:     email: z.string().trim().email().toLowerCase(),
24:     password: z.string().min(8).max(128),
25:   }),
26:   login: z.object({
27:     email: z.string().trim().email().toLowerCase(),
28:     password: z.string().min(1).max(128),
29:   }),
30:   profile: z.object({
31:     name: z.string().trim().min(2).max(80).optional(),
32:     email: z.string().trim().email().toLowerCase().optional(),
33:     // Avatars are stored as base64 data URLs. The client caps uploads at 1MB
34:     // (~1.4M base64 chars); allow headroom while staying under the 2mb body limit.
35:     profileImage: z.string().max(2_000_000).optional(),
36:   }),
37: 
38:   // User management ------------------------------------------------------------
39:   createUser: z.object({
40:     name: z.string().trim().min(2).max(80),
41:     email: z.string().trim().email().toLowerCase(),
42:     password: z.string().min(8).max(128),
43:     role: z.enum(['admin', 'teacher', 'student', 'parent']),
44:     customId: z.string().trim().max(40).optional().or(z.literal('')),
45:     extraField1: z.string().trim().max(80).optional().or(z.literal('')),
46:     extraField2: z.string().trim().max(120).optional().or(z.literal('')),
47:     rollNumber: z.number().int().min(1).max(500).optional(),
48:     guardianName: z.string().trim().max(80).optional().or(z.literal('')),
49:     classTeacherOf: z.string().trim().max(80).optional().or(z.literal('None')),
50:   }),
51:   updateCredentials: z.object({
52:     customId: z.string().trim().max(40).optional().or(z.literal('')),
53:     password: z.string().min(8).max(128).optional().or(z.literal('')),
54:     extraField1: z.string().trim().max(80).optional().or(z.literal('')),
55:     extraField2: z.string().trim().max(120).optional().or(z.literal('')),
56:     classTeacherOf: z.string().trim().max(80).optional().or(z.literal('None')),
57:   }),
58:   changeRole: z.object({ role: z.enum(['admin', 'teacher', 'student', 'parent']) }),
59:   deleteGuard: z.object({ password: z.string().min(1).max(128) }),
60: 
61:   // Notices ---------------------------------------------------------------------
62:   createNotice: z.object({
63:     title: z.string().trim().min(3).max(160),
64:     content: z.string().trim().min(3).max(5000),
65:     targetAudience: z.enum(['all', 'student', 'teacher']),
66:   }),
67:   passwordCheck: z.object({ password: z.string().min(1).max(128) }),
68:   idParam: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
69: 
70:   // Attendance ------------------------------------------------------------------
71:   submitAttendance: z.object({
72:     classId: z.string().trim().max(80),
73:     date: z.string().min(8).max(20),
74:     records: z.array(z.object({
75:       studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
76:       status: z.enum(['Present', 'Absent', 'Late']),
77:     })).max(2000),
78:   }),
79:   teacherSubmitAttendance: z.object({
80:     classId: z.string().trim().max(80).optional().or(z.literal('')),
81:     date: z.string().min(8).max(20),
82:     records: z.array(z.object({
83:       studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
84:       status: z.enum(['Present', 'Absent', 'Late']),
85:     })).max(2000),
86:   }),
87:   classParam: z.object({ classId: z.string().trim().min(1).max(80) }),
88:   heatmapQuery: z.object({
89:     year: z.coerce.number().int().min(2000).max(2100).optional(),
90:     month: z.coerce.number().int().min(1).max(12).optional(),
91:   }),
92:   byDateQuery: z.object({ date: z.string().min(8).max(20) }),
93: 
94:   // Teacher student management -----------------------------------------------------
95:   teacherEditStudent: z.object({
96:     gradeClass: z.string().trim().max(80).optional(),
97:     parentContact: z.string().trim().max(60).optional(),
98:     name: z.string().trim().min(2).max(80).optional(),
99:     email: z.string().trim().email().toLowerCase().optional(),
100:     rollNumber: z.coerce.number().int().min(1).max(500).optional(),
101:   }),
102: 
103:   // Gradebook ----------------------------------------------------------------------
104:   spreadsheetParams: z.object({
105:     classId: z.string().trim().min(1).max(80),
106:     subjectName: z.string().trim().min(1).max(80),
107:     termName: z.string().trim().min(1).max(80),
108:   }),
109:   bulkSubmit: z.object({
110:     classId: z.string().trim().max(80),
111:     subject: z.string().trim().min(1).max(80),
112:     term: z.string().trim().min(1).max(80),
113:     scores: z.array(z.object({
114:       studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
115:       marksObtained: z.coerce.number().min(0).max(100),
116:     })).max(2000),
117:   }),
118:   togglePublish: z.object({
119:     classId: z.string().trim().max(80),
120:     term: z.string().trim().min(1).max(80),
121:     publishState: z.boolean(),
122:   }),
123: 
124:   // Assignments ---------------------------------------------------------------------
125:   assignmentCreate: z.object({
126:     teacher: z.string().regex(/^[0-9a-fA-F]{24}$/),
127:     class: z.string().trim().min(1).max(80),
128:     subject: z.string().trim().max(80).optional().or(z.literal('')),
129:     academicYear: z.string().trim().max(20).optional().or(z.literal('')),
130:     isClassTeacher: z.boolean().optional(),
131:   }),
132:   assignmentUpdate: z.object({
133:     subject: z.string().trim().max(80).optional().or(z.literal('')),
134:     academicYear: z.string().trim().max(20).optional().or(z.literal('')),
135:     isClassTeacher: z.boolean().optional(),
136:   }),
137:   assignmentQuery: z.object({
138:     teacher: z.string().regex(/^[0-9a-fA-F]{24}$/).optional().or(z.literal('')),
139:     class: z.string().trim().max(80).optional().or(z.literal('')),
140:     subject: z.string().trim().max(80).optional().or(z.literal('')),
141:     academicYear: z.string().trim().max(20).optional().or(z.literal('')),
142:   }),
143: 
144:   // School config ---------------------------------------------------------------------
145:   configUpdate: z.object({
146:     classes: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
147:     subjects: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
148:     examTerms: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
149:   }),
150:   toggleOffDay: z.object({ dayIndex: z.coerce.number().int().min(0).max(6) }),
151:   toggleHoliday: z.object({ dateStr: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/) }),
152: 
153:   // Public website ---------------------------------------------------------------------
154:   infoUpdate: z.object({
155:     welcomeTitle: z.string().trim().max(200).optional(),
156:     aboutText: z.string().trim().max(4000).optional(),
157:     admissionFeeAmount: z.coerce.number().min(0).max(1000000).optional(),
158:   }),
159:   founderAdd: z.object({
160:     name: z.string().trim().min(2).max(80),
161:     designation: z.string().trim().min(2).max(120),
162:     quote: z.string().trim().min(2).max(1000),
163:   }),
164:   founderIdParam: z.object({ founderId: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
165: 
166:   // Admissions -------------------------------------------------------------------------
167:   admissionApply: z.object({
168:     studentNameEn: z.string().trim().min(2).max(80),
169:     studentNameBn: z.string().trim().min(2).max(120),
170:     targetClass: z.string().trim().min(1).max(80),
171:     dateOfBirth: z.string().min(8).max(20),
172:     birthCertificateNo: z.string().trim().min(4).max(40),
173:     emailAddress: z.string().trim().email().toLowerCase(),
174:     fatherNameEn: z.string().trim().min(2).max(80),
175:     fatherNameBn: z.string().trim().min(2).max(120),
176:     fatherNid: z.string().trim().max(40).optional().or(z.literal('')),
177:     motherNameEn: z.string().trim().min(2).max(80),
178:     motherNameBn: z.string().trim().min(2).max(120),
179:     motherNid: z.string().trim().max(40).optional().or(z.literal('')),
180:     parentPhone: z.string().trim().min(8).max(20),
181:     guardianNameEn: z.string().trim().max(80).optional().or(z.literal('')),
182:     guardianNameBn: z.string().trim().max(120).optional().or(z.literal('')),
183:     guardianPhone: z.string().trim().max(20).optional().or(z.literal('')),
184:   }),
185:   payAdmission: z.object({
186:     paymentMethod: z.string().trim().max(32).optional(),
187:     txnId: z.string().trim().min(4).max(64),
188:   }),
189:   appIdParam: z.object({ appId: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
190:   applicationPatch: z.object({
191:     status: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
192:     // Admins may waive a fee but may NOT mark an application "Paid" directly —
193:     // payments must pass through the server-side payment adapter so the amount
194:     // and transaction reference are always server-verified.
195:     paymentStatus: z.enum(['Unpaid', 'Waived']).optional(),
196:   }),
197: 
198:   // 2FA ----------------------------------------------------------------------------------
199:   twoFactorVerify: z.object({ code: z.string().trim().regex(/^\d{6}$/) }),
200: };
201: 
202: module.exports = { validate, schemas };

(End of file - total 202 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

Add schemas forgotPassword, resetPassword, changePassword. Routes.

Also note `requestPasswordReset` rate-limited? authRoutes may be under limiter. We'll check server mounts later.

Add to schemas.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/middleware/validate.js",
  "oldString": "  login: z.object({\n    email: z.string().trim().email().toLowerCase(),\n    password: z.string().min(1).max(128),\n  }),",
  "newString": "  login: z.object({\n    email: z.string().trim().email().toLowerCase(),\n    password: z.string().min(1).max(128),\n  }),\n  forgotPassword: z.object({\n    email: z.string().trim().email().toLowerCase(),\n  }),\n  resetPassword: z.object({\n    token: z.string().trim().min(32).max(128),\n    password: z.string().min(8).max(128),\n  }),\n  changePassword: z.object({\n    currentPassword: z.string().min(1).max(128),\n    newPassword: z.string().min(8).max(128),\n  }),"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "  setupTwoFactor,\n  verifyTwoFactor,\n  disableTwoFactor,\n} = require('../controllers/authController');",
  "newString": "  setupTwoFactor,\n  verifyTwoFactor,\n  disableTwoFactor,\n  requestPasswordReset,\n  resetPassword,\n  changePassword,\n} = require('../controllers/authController');"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "router.post('/register', validate(schemas.register), registerUser);\nrouter.post('/login', validate(schemas.login), loginUser);\n\n// Session bootstrap + lifecycle\nrouter.get('/me', protect, getMe);\nrouter.post('/logout', protect, logoutUser);",
  "newString": "router.post('/register', validate(schemas.register), registerUser);\nrouter.post('/login', validate(schemas.login), loginUser);\nrouter.post('/forgot-password', validate(schemas.forgotPassword), requestPasswordReset);\nrouter.post('/reset-password', validate(schemas.resetPassword), resetPassword);\n\n// Session bootstrap + lifecycle\nrouter.get('/me', protect, getMe);\nrouter.post('/logout', protect, logoutUser);\nrouter.put('/change-password', protect, validate(schemas.changePassword), changePassword);"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 2.9s)

_Thinking:_

Now payments. Read payment service, public routes, PublicModels.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/services/payment.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/services/payment.js</path>
<type>file</type>
<content>
1: // services/payment.js
2: //
3: // Provider-agnostic payment adapter for the public admission fee.
4: //
5: // Design goals (see audit Q1):
6: //   * The amount is ALWAYS determined server-side (application.payableAmount);
7: //     a client-supplied amount is never read.
8: //   * One file per provider. A real gateway (bKash / Nagad / SSLCommerz) is
9: //     added by implementing an adapter with the same contract below and setting
10: //     PAYMENT_PROVIDER — no route changes required.
11: //   * The default "sandbox" adapter performs NO network call and is explicitly
12: //     labelled. It is refused outright in production so a mock payment flow can
13: //     never silently ship to real users.
14: //
15: // Adapter contract:
16: //   async verify({ application, txnId, method }) ->
17: //     { verified: true, amount, reference, provider, sandbox }
18: //   or throws an Error with an optional `.status` code.
19: //
20: // A real adapter MUST perform a server-to-server lookup of `txnId` with the
21: // gateway and confirm the paid amount is >= application.payableAmount before
22: // resolving `verified: true`.
23: 
24: const PROVIDER = (process.env.PAYMENT_PROVIDER || 'sandbox').toLowerCase();
25: 
26: const adapters = {
27:   // Development-only simulator. Performs no external verification; the caller
28:   // still enforces idempotency and a server-set amount.
29:   sandbox: async ({ application, txnId, method }) => {
30:     return {
31:       verified: true,
32:       amount: Number(application.payableAmount) || 0,
33:       reference: String(txnId).trim(),
34:       method: typeof method === 'string' && method.trim() ? method.trim().slice(0, 32) : 'Sandbox',
35:       provider: 'sandbox',
36:       sandbox: true,
37:     };
38:   },
39: 
40:   // Example stub for a real provider. Enable with PAYMENT_PROVIDER=bkash and
41:   // fill in the server-to-server verification call + credentials.
42:   // bkash: async ({ application, txnId }) => { ... },
43: };
44: 
45: const isSandbox = PROVIDER === 'sandbox';
46: 
47: const verifyPayment = async (ctx) => {
48:   const adapter = adapters[PROVIDER];
49:   if (!adapter) {
50:     const err = new Error('The configured payment provider is not available.');
51:     err.status = 503;
52:     throw err;
53:   }
54:   // Never allow the sandbox simulator to serve production traffic.
55:   if (isSandbox && process.env.NODE_ENV === 'production') {
56:     const err = new Error('Payment provider not configured for production.');
57:     err.status = 503;
58:     throw err;
59:   }
60:   return adapter(ctx);
61: };
62: 
63: module.exports = { PROVIDER, isSandbox, verifyPayment };

(End of file - total 63 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/PublicModels.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/models/PublicModels.js</path>
<type>file</type>
<content>
1: // backend/models/PublicModels.js
2: const mongoose = require('mongoose');
3: 
4: // 1. Founding Member Individual Record Schema Template
5: const FounderSchema = new mongoose.Schema({
6:   name: { type: String, required: true },
7:   designation: { type: String, required: true },
8:   quote: { type: String, required: true },
9:   image: { type: String, default: "" }
10: });
11: 
12: // 2. Global School Website Parameters Schema
13: const SchoolInfoSchema = new mongoose.Schema({
14:   welcomeTitle: { type: String, default: "Welcome to Institutional Excellence" },
15:   aboutText: { type: String, default: "Providing top-tier educational frameworks and global curriculum standard structures." },
16:   schoolLogo: { type: String, default: "" },
17:   bannerImage: { type: String, default: "" },
18:   // Server-controlled admission fee (single source of truth for the public
19:   // admission form). Never trust a client-supplied amount.
20:   admissionFeeAmount: { type: Number, default: 500, min: 0, max: 1000000 },
21:   founders: [FounderSchema]
22: }, { timestamps: true });
23: 
24: // 3. 🟢 FIXED: Admission Application Schema with all extended data parameters
25: const ApplicationSchema = new mongoose.Schema({
26:   studentNameEn: { type: String, required: true },
27:   studentNameBn: { type: String, required: true },
28:   targetClass: { type: String, required: true },
29:   dateOfBirth: { type: Date, required: true },
30:   birthCertificateNo: { type: String, required: true },
31:   emailAddress: { type: String, required: true },
32: 
33:   // Parents Profile Matrix (Dual-Language & NIDs)
34:   fatherNameEn: { type: String, required: true },
35:   fatherNameBn: { type: String, required: true },
36:   fatherNid: { type: String },
37:   motherNameEn: { type: String, required: true },
38:   motherNameBn: { type: String, required: true },
39:   motherNid: { type: String },
40:   parentPhone: { type: String, required: true },
41: 
42:   // Emergency Legal Guardian Backup
43:   guardianNameEn: { type: String },
44:   guardianNameBn: { type: String },
45:   guardianPhone: { type: String },
46: 
47:   // Fee and MFS Verification Fields
48:   payableAmount: { type: Number, default: 500 },
49:   paidAmount: { type: Number, default: 0 },
50:   paymentStatus: { type: String, default: 'Unpaid' },
51:   paymentMethod: { type: String },
52:   paymentTxnId: { type: String },
53:   paymentProvider: { type: String },
54:   paymentVerifiedAt: { type: Date },
55: 
56:   // Oversight Workflow Status
57:   applicationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
58: }, { timestamps: true });
59: 
60: module.exports = {
61:   SchoolInfo: mongoose.model('SchoolInfo', SchoolInfoSchema),
62:   Application: mongoose.model('Application', ApplicationSchema)
63: };

(End of file - total 63 lines)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"payment\\|pay\\|Application\\|paymentStatus\\|paymentTxn\" Server/routes/publicRoutes.js | head -80",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
9:const { SchoolInfo, Application } = require('../models/PublicModels');
11:const { verifyPayment } = require('../services/payment');
130:    // applicationStatus, paidAmount, paymentStatus and paymentTxnId.
131:    const payload = {
148:      payableAmount: fee,
150:      paymentStatus: 'Unpaid',
155:    const missing = required.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
160:    const newApp = await Application.create(payload);
163:      message: 'Application recorded. Proceeding to payment token verification.',
165:      payableAmount: fee
167:  } catch (error) { res.status(400).json({ success: false, message: 'Application could not be recorded.' }); }
170:// Admission fee payment. The amount is determined entirely server-side by the
171:// payment adapter (never from the request body) and the flow is idempotent.
172:// @route   POST /api/public/pay-admission/:appId
173:router.post('/pay-admission/:appId', validate(schemas.appIdParam, 'params'), validate(schemas.payAdmission), async (req, res) => {
174:  const { paymentMethod, txnId } = req.body;
177:    const app = await Application.findById(req.params.appId);
178:    if (!app) return res.status(404).json({ success: false, message: 'Application voucher absent.' });
181:    if (app.paymentStatus === 'Paid') {
187:    const result = await verifyPayment({ application: app, txnId, method: paymentMethod });
189:    app.paymentStatus = 'Paid';
190:    app.paidAmount = Number(result.amount) || Number(app.payableAmount) || 0;
191:    app.paymentTxnId = result.reference;
192:    app.paymentMethod = result.method;
193:    app.paymentProvider = result.provider;
194:    app.paymentVerifiedAt = new Date();
200:        ? 'Fee payment recorded (sandbox mode). Your application is now under review.'
201:        : 'Fee payment received. Your application is now under review.',
215:    const list = await Application.find({}).sort({ createdAt: -1 }).lean();
223:  const { status, paymentStatus } = req.body;
225:    const appRecord = await Application.findById(req.params.appId);
226:    if (!appRecord) return res.status(404).json({ success: false, message: 'Application entry missing.' });
229:    if (paymentStatus) appRecord.paymentStatus = paymentStatus;
242:        html: `<p>Dear Parent, your application tracking code <strong>#${appRecord._id}</strong> for <strong>${appRecord.studentNameEn}</strong> status updated to: <strong>${appRecord.applicationStatus}</strong> (Payment: ${appRecord.paymentStatus}).</p>`

```

---

## Assistant (Build · Big Pickle · 2.7s)

_Thinking:_

We need modify publicRoutes injection: old app.paymentStatus = 'Paid' etc likely fixed already? Let's read lines 160-260.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/publicRoutes.js",
  "offset": 110,
  "limit": 180
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/routes/publicRoutes.js</path>
<type>file</type>
<content>
110:     const [config, schoolConfig] = await Promise.all([
111:       SchoolInfo.findOne().lean(),
112:       SchoolConfig.findOne().lean(),
113:     ]);
114:     // Server-set fee: use the configured amount, fall back to the default when
115:     // the field is absent (legacy documents). The client never supplies this.
116:     const fee = Math.max(0, Number(config?.admissionFeeAmount ?? DEFAULT_ADMISSION_FEE) || 0);
117: 
118:     // The class list is controlled by the admin in Settings (SchoolConfig). Only
119:     // accept a class that is actually registered in the database.
120:     const approvedClasses = Array.isArray(schoolConfig?.classes) ? schoolConfig.classes : [];
121:     if (approvedClasses.length > 0 && !approvedClasses.includes(req.body.targetClass)) {
122:       return res.status(400).json({
123:         success: false,
124:         message: 'The targeted class is not approved in the school database. Please choose a class from the current list.',
125:       });
126:     }
127: 
128:     // ⚠️ SECURITY: Explicit allow-list instead of spreading req.body.
129:     // This prevents mass assignment of server-controlled fields such as
130:     // applicationStatus, paidAmount, paymentStatus and paymentTxnId.
131:     const payload = {
132:       studentNameEn: req.body.studentNameEn,
133:       studentNameBn: req.body.studentNameBn,
134:       targetClass: req.body.targetClass,
135:       dateOfBirth: req.body.dateOfBirth,
136:       birthCertificateNo: req.body.birthCertificateNo,
137:       emailAddress: req.body.emailAddress,
138:       fatherNameEn: req.body.fatherNameEn,
139:       fatherNameBn: req.body.fatherNameBn,
140:       fatherNid: req.body.fatherNid,
141:       motherNameEn: req.body.motherNameEn,
142:       motherNameBn: req.body.motherNameBn,
143:       motherNid: req.body.motherNid,
144:       parentPhone: req.body.parentPhone,
145:       guardianNameEn: req.body.guardianNameEn,
146:       guardianNameBn: req.body.guardianNameBn,
147:       guardianPhone: req.body.guardianPhone,
148:       payableAmount: fee,
149:       paidAmount: 0,
150:       paymentStatus: 'Unpaid',
151:       applicationStatus: 'Pending'
152:     };
153: 
154:     const required = ['studentNameEn', 'studentNameBn', 'targetClass', 'dateOfBirth', 'birthCertificateNo', 'emailAddress', 'fatherNameEn', 'fatherNameBn', 'motherNameEn', 'motherNameBn', 'parentPhone'];
155:     const missing = required.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
156:     if (missing.length) {
157:       return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
158:     }
159: 
160:     const newApp = await Application.create(payload);
161:     res.status(201).json({
162:       success: true,
163:       message: 'Application recorded. Proceeding to payment token verification.',
164:       applicationId: newApp._id,
165:       payableAmount: fee
166:     });
167:   } catch (error) { res.status(400).json({ success: false, message: 'Application could not be recorded.' }); }
168: });
169: 
170: // Admission fee payment. The amount is determined entirely server-side by the
171: // payment adapter (never from the request body) and the flow is idempotent.
172: // @route   POST /api/public/pay-admission/:appId
173: router.post('/pay-admission/:appId', validate(schemas.appIdParam, 'params'), validate(schemas.payAdmission), async (req, res) => {
174:   const { paymentMethod, txnId } = req.body;
175: 
176:   try {
177:     const app = await Application.findById(req.params.appId);
178:     if (!app) return res.status(404).json({ success: false, message: 'Application voucher absent.' });
179: 
180:     // Idempotency: never allow an already-paid voucher to be re-marked / re-priced
181:     if (app.paymentStatus === 'Paid') {
182:       return res.status(409).json({ success: false, message: 'This application has already been paid.' });
183:     }
184: 
185:     // Server-to-server verification (or the explicitly-labelled sandbox adapter).
186:     // Throws a 503 when no usable provider is configured.
187:     const result = await verifyPayment({ application: app, txnId, method: paymentMethod });
188: 
189:     app.paymentStatus = 'Paid';
190:     app.paidAmount = Number(result.amount) || Number(app.payableAmount) || 0;
191:     app.paymentTxnId = result.reference;
192:     app.paymentMethod = result.method;
193:     app.paymentProvider = result.provider;
194:     app.paymentVerifiedAt = new Date();
195:     await app.save();
196: 
197:     res.json({
198:       success: true,
199:       message: result.sandbox
200:         ? 'Fee payment recorded (sandbox mode). Your application is now under review.'
201:         : 'Fee payment received. Your application is now under review.',
202:       sandbox: !!result.sandbox,
203:     });
204:   } catch (error) {
205:     if (error.status === 503) {
206:       return res.status(503).json({ success: false, message: 'Payment is temporarily unavailable.' });
207:     }
208:     res.status(500).json({ success: false, message: 'Payment could not be processed.' });
209:   }
210: });
211: 
212: // @route   GET /api/public/applications (Admin Only)
213: router.get('/applications', protect, authorizeRoles('admin'), async (req, res) => {
214:   try {
215:     const list = await Application.find({}).sort({ createdAt: -1 }).lean();
216:     res.json({ success: true, data: list });
217:   } catch (error) { res.status(500).json({ success: false, message: 'Request failed.' }); }
218: });
219: 
220: // 🟢 UPGRADED EVALUATION ENDPOINT WITH STATUS VERIFICATIONS
221: // @route   PATCH /api/public/application/:appId
222: router.patch('/application/:appId', protect, authorizeRoles('admin'), validate(schemas.appIdParam, 'params'), validate(schemas.applicationPatch), async (req, res) => {
223:   const { status, paymentStatus } = req.body;
224:   try {
225:     const appRecord = await Application.findById(req.params.appId);
226:     if (!appRecord) return res.status(404).json({ success: false, message: 'Application entry missing.' });
227: 
228:     if (status) appRecord.applicationStatus = status;
229:     if (paymentStatus) appRecord.paymentStatus = paymentStatus;
230:     await appRecord.save();
231: 
232: 
233:     // Fire Nodemailer email alert pipeline if configured
234:     if (process.env.SMTP_USER && process.env.SMTP_PASS) {
235:       const transporter = nodemailer.createTransport({
236:         host: process.env.SMTP_HOST || 'smtp.gmail.com', port: 587, secure: false,
237:         auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
238:       });
239:       await transporter.sendMail({
240:         from: `"Admissions Desk Hub" <${process.env.SMTP_USER}>`, to: appRecord.emailAddress,
241:         subject: `Admission Intake Status Update: #${appRecord._id.toString().slice(-6).toUpperCase()}`,
242:         html: `<p>Dear Parent, your application tracking code <strong>#${appRecord._id}</strong> for <strong>${appRecord.studentNameEn}</strong> status updated to: <strong>${appRecord.applicationStatus}</strong> (Payment: ${appRecord.paymentStatus}).</p>`
243:       }).catch(e => console.error(`Mail dispatch failed: ${e.message}`));
244:     }
245: 
246:     res.json({ success: true, message: ' Vouchers parameters saved cleanly on Atlas chains.' });
247:   } catch (error) { res.status(500).json({ success: false, message: 'Request failed.' }); }
248: });
249: 
250: module.exports = router;

(End of file - total 250 lines)
</content>
```

---

## Assistant (Build · Big Pickle · 10.7s)

_Thinking:_

Payment route currently not allowlist guard for Waived/Rejected. It only blocks Paid. Need reject Waived/Rejected. Make atomic update with findOneAndUpdate filter `paymentStatus: {$nin: ['Paid','Waived','Rejected']}` and set. But we need verify first. Sequence: fetch app; guard; verify; then atomic update with filter to prevent races. Unique sparse index on paymentTxnId. If duplicate key error 11000 → 409.

Add pre-check:
```
if (['Paid','Waived','Rejected'].includes(app.paymentStatus)) 409
```
Then after verify:
```
const updated = await Application.findOneAndUpdate(
 {_id: app._id, paymentStatus: {$nin: [...]}},
 {$set:{...}},
 {new:true}
)
if (!updated) 409
```
Catch duplicate key.

Add index in schema `paymentTxnId: {type:String, index:{unique:true,sparse:true}}`. But existing index may not be unique since field existed non-indexed; adding is fine; but duplicate existing data could fail index creation. Sparse + unique may fail if duplicates exist. We can keep index declaration but mongoose autoIndex may error log only. Accept. Also note paymentTxnId default undefined not ''. Currently default undefined. Good.

Also application update PATCH restrict paid fields? Validation only allows Unpaid/Waived. Guard: cannot mark Waived if already Paid? Should not allow downgrade paid to unpaid/waived. Add:
```
if (paymentStatus && ['Paid'].includes(appRecord.paymentStatus) && paymentStatus !== 'Paid') 400
```
since schema rejects Paid only allows Unpaid/Waived, so once paid admin cannot alter. Good.

Also applicationStatus transition? Not necessary.

Let's edit.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/PublicModels.js",
  "oldString": "  paymentTxnId: { type: String },",
  "newString": "  // Unique (sparse) so the same gateway transaction can never pay two vouchers.\n  paymentTxnId: { type: String, index: { unique: true, sparse: true } },"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/publicRoutes.js",
  "oldString": "    // Idempotency: never allow an already-paid voucher to be re-marked / re-priced\n    if (app.paymentStatus === 'Paid') {\n      return res.status(409).json({ success: false, message: 'This application has already been paid.' });\n    }\n\n    // Server-to-server verification (or the explicitly-labelled sandbox adapter).\n    // Throws a 503 when no usable provider is configured.\n    const result = await verifyPayment({ application: app, txnId, method: paymentMethod });\n\n    app.paymentStatus = 'Paid';\n    app.paidAmount = Number(result.amount) || Number(app.payableAmount) || 0;\n    app.paymentTxnId = result.reference;\n    app.paymentMethod = result.method;\n    app.paymentProvider = result.provider;\n    app.paymentVerifiedAt = new Date();\n    await app.save();\n\n    res.json({",
  "newString": "    // Final states are immutable: a paid/waived/rejected voucher must not be\n    // re-priced or re-marked by replaying the payment endpoint.\n    if (['Paid', 'Waived', 'Rejected'].includes(app.paymentStatus)) {\n      return res.status(409).json({\n        success: false,\n        message: app.paymentStatus === 'Paid'\n          ? 'This application has already been paid.'\n          : 'This application is not open for payment.',\n      });\n    }\n\n    // Server-to-server verification (or the explicitly-labelled sandbox adapter).\n    // Throws a 503 when no usable provider is configured.\n    const result = await verifyPayment({ application: app, txnId, method: paymentMethod });\n\n    // Atomic compare-and-set: concurrent requests cannot both settle the fee.\n    const updated = await Application.findOneAndUpdate(\n      {\n        _id: app._id,\n        paymentStatus: { $nin: ['Paid', 'Waived', 'Rejected'] },\n      },\n      {\n        $set: {\n          paymentStatus: 'Paid',\n          paidAmount: Number(result.amount) || Number(app.payableAmount) || 0,\n          paymentTxnId: result.reference,\n          paymentMethod: result.method,\n          paymentProvider: result.provider,\n          paymentVerifiedAt: new Date(),\n        },\n      },\n      { new: true }\n    );\n\n    if (!updated) {\n      return res.status(409).json({ success: false, message: 'This application has already been settled.' });\n    }\n\n    res.json({"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/publicRoutes.js",
  "oldString": "  } catch (error) {\n    if (error.status === 503) {\n      return res.status(503).json({ success: false, message: 'Payment is temporarily unavailable.' });\n    }\n    res.status(500).json({ success: false, message: 'Payment could not be processed.' });\n  }\n});",
  "newString": "  } catch (error) {\n    if (error.status === 503) {\n      return res.status(503).json({ success: false, message: 'Payment is temporarily unavailable.' });\n    }\n    // Duplicate transaction reference — the same gateway payment was replayed.\n    if (error.code === 11000) {\n      return res.status(409).json({ success: false, message: 'That transaction reference has already been used.' });\n    }\n    res.status(500).json({ success: false, message: 'Payment could not be processed.' });\n  }\n});"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/publicRoutes.js",
  "oldString": "    if (status) appRecord.applicationStatus = status;\n    if (paymentStatus) appRecord.paymentStatus = paymentStatus;\n    await appRecord.save();",
  "newString": "    // A settled (Paid) voucher cannot be downgraded through the admin patch.\n    if (paymentStatus && appRecord.paymentStatus === 'Paid') {\n      return res.status(409).json({ success: false, message: 'Paid applications cannot change payment status.' });\n    }\n\n    if (status) appRecord.applicationStatus = status;\n    if (paymentStatus) appRecord.paymentStatus = paymentStatus;\n    await appRecord.save();"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 3.5s)

_Thinking:_

Note: waiving after rejected? `applicationPatch` allows paymentStatus Unpaid/Waived; if app paymentStatus 'Rejected' and set Waived maybe okay. Fine.

Now data integrity: cascade cleanup for attendance/gradebook on teacher/user delete; transactions for create and delete. Read models and utils/rolls.

**Tool: bash**

**Input:**
```json
{
  "command": "ls Server/models; echo ---; sed -n '1,120p' Server/models/Attendance.js; echo ---; sed -n '1,120p' Server/models/Gradebook.js; echo ---; sed -n '1,120p' Server/utils/rolls.js",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
Assignment.js
Attendance.js
Gradebook.js
Notice.js
PasswordResetToken.js
PublicModels.js
SchoolConfig.js
Student.js
Teacher.js
User.js
---
// backend/models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: [true, 'Please add a class identifier or grade level (e.g., Grade 10-A)']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Points to the User model we created earlier
        required: true
      },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present'
      }
    }
  ],
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tracks which teacher logged this attendance sheet
    required: true
  }
}, { timestamps: true });

// Prevent duplicate entries: Ensures a class can only have ONE attendance sheet per day
AttendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
---
// backend/models/Gradebook.js
const mongoose = require('mongoose');

const GradebookSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links to the base user account
    required: true
  },
  classId: {
    type: String, // e.g., "Grade 10-A", "Grade 10-B"
    required: true
  },
  term: {
    type: String, // e.g., "Mid-Term Exam", "Final Exam"
    required: true
  },
  subject: {
    type: String, // e.g., "Science", "Mathematics", "English"
    required: true
  },
  marksObtained: {
    type: Number,
    required: [true, 'Please add the marks obtained'],
    min: [0, 'Marks cannot be less than 0'],
    max: [100, 'Marks cannot exceed 100']
  },
  letterGrade: {
    type: String, // Automatically calculated (A+, A, B, F)
    default: 'F'
  },
  // 🟢 NEW: Controls student visibility blocks globally
  isPublished: {
    type: Boolean,
    default: false // All entries remain hidden drafts by default!
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tracks the specific teacher who input these marks
    required: true
  }
}, { timestamps: true });

// 🟢 CRUCIAL COMPOSITE INDEX: Prevents a teacher from entering duplicate Science marks 
// for the same student, in the same class, during the same exam term.
GradebookSchema.index({ studentId: 1, classId: 1, term: 1, subject: 1 }, { unique: true });

// Auto-calculate letter grades before saving to Atlas
GradebookSchema.pre('save', function (next) {
  const marks = this.marksObtained;
  if (marks >= 90) this.letterGrade = 'A+';
  else if (marks >= 80) this.letterGrade = 'A';
  else if (marks >= 70) this.letterGrade = 'B';
  else if (marks >= 60) this.letterGrade = 'C';
  else if (marks >= 50) this.letterGrade = 'D';
  else this.letterGrade = 'F';
  next();
});

module.exports = mongoose.model('Gradebook', GradebookSchema);
---
// backend/utils/rolls.js
const Student = require('../models/Student');

// Close the gap left by a deleted student: decrement every roll number above the
// removed one within the same class so the sequence stays contiguous (1..n).
// Processing in ascending order guarantees each target slot is already free,
// avoiding unique-index ({ gradeClass, rollNumber }) collisions.
const reindexRollsAfterDelete = async (gradeClass, removedRoll) => {
  if (!gradeClass) return;
  const removed = Number(removedRoll);
  if (!Number.isFinite(removed)) return;

  const toShift = await Student.find({ gradeClass, rollNumber: { $gt: removed } })
    .sort({ rollNumber: 1 })
    .select('rollNumber');

  for (const student of toShift) {
    student.rollNumber = student.rollNumber - 1;
    await student.save();
  }
};

module.exports = { reindexRollsAfterDelete };

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"delete\\|remove\\|findByIdAndDelete\\|deleteOne\\|deleteMany\" Server/controllers Server/routes | grep -v node_modules | head -80",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
Server/controllers/authController.js:271:    await PasswordResetToken.deleteMany({ user: user._id, usedAt: null });
Server/controllers/authController.js:339:    await PasswordResetToken.deleteMany({ user: user._id, _id: { $ne: record._id } });
Server/routes/noticeRoutes.js:113:router.delete('/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
Server/routes/noticeRoutes.js:139:    await Notice.deleteOne({ _id: req.params.id });
Server/routes/publicRoutes.js:95:router.delete('/founder/:founderId', protect, authorizeRoles('admin'), validate(schemas.founderIdParam, 'params'), async (req, res) => {
Server/routes/publicRoutes.js:101:    res.json({ success: true, message: 'Founding member card removed successfully.' });
Server/routes/assignmentRoutes.js:109:router.delete('/admin/assignments/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
Server/routes/assignmentRoutes.js:111:    const removed = await Assignment.findByIdAndDelete(req.params.id);
Server/routes/assignmentRoutes.js:112:    if (!removed) {
Server/routes/assignmentRoutes.js:115:    res.json({ success: true, message: 'Assignment removed successfully.' });
Server/routes/teacherRoutes.js:349:// @desc    Allow Class Teachers to delete a student out of their class roster with password confirmation
Server/routes/teacherRoutes.js:350:// @route   DELETE /api/teacher/users/delete/:id
Server/routes/teacherRoutes.js:352:router.delete('/users/delete/:id', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
Server/routes/teacherRoutes.js:379:        // 4. Cascade delete across both student data schemas collections safely
Server/routes/teacherRoutes.js:380:        await Student.deleteOne({ userId: req.params.id });
Server/routes/teacherRoutes.js:381:        await User.deleteOne({ _id: req.params.id });
Server/routes/authRoutes.js:342:// @desc    Allow Admin to delete a teacher from the entire system
Server/routes/authRoutes.js:345:router.delete('/users/teacher/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
Server/routes/authRoutes.js:364:      // roll-number gap — previously only the User was removed, orphaning the
Server/routes/authRoutes.js:368:        await Student.deleteOne({ _id: student._id });
Server/routes/authRoutes.js:371:      await User.deleteOne({ _id: targetUser._id });
Server/routes/authRoutes.js:374:      await Teacher.deleteOne({ userId: targetUser._id });
Server/routes/authRoutes.js:375:      await User.deleteOne({ _id: targetUser._id });

```

---

## Assistant (Build · Big Pickle · 10.4s)

_Thinking:_

Need transactions. Mongoose transactions require replica set; Atlas yes, local maybe not. Can implement helper `withTransaction` that falls back if transactions unsupported? Better to avoid breaking local. Could use `mongoose.startSession` and catch "Transaction numbers are only allowed on a replica set member or mongos" then retry without. But complexity. Directive explicitly asks transactions. Implement a helper utility `runInTransaction` that attempts and falls back with console.warn. Then use for user create/delete.

But reindex rolls uses saves with session? Need optional session param. Update `reindexRollsAfterDelete(gradeClass, removedRoll, session)` and `.session(session)`.

Delete cascades: Attendance has `records.studentId`, submittedBy; Gradebook `studentId`, submittedBy. For deleting a student: remove Gradebook by studentId; pull their attendance records from Attendance (or delete sheets that only contain them? The record array can be updated with $pull; empty sheets maybe leave). Also remove assignments? Student not teacher. For teacher delete: Gradebook submittedBy, Attendance submittedBy — but deleting a teacher leaves historical grades. Better set submittedBy? Required field. Could delete? Data integrity suggests cascade for teacher's assignments and unassign class teacher. The directive: "cascade cleanup for Attendance/Gradebook". Likely for student deletion remove their records; for teacher deletion remove assignments (already?), maybe leave submittedBy. We'll do:
- Student delete: delete Gradebook `{studentId}`, pull attendance record from all Attendance docs, then delete Student; reindex.
- Teacher delete: delete Assignment `{teacher: id}`; set Teacher deletions; maybe attendance submittedBy and gradebook submittedBy cascades would delete all their entered data (bad). But "cascade cleanup" could mean clean references. We'll leave historical records but that references deleted user. Could use `$set submittedBy` to admin? No. Let's keep cascade for student-specific and teacher's assignments. Also pull from Attendance records if deleted user is student.

Need `Attendance.updateMany({ 'records.studentId': id }, { $pull: { records: { studentId: id } } }, { session })`.

Transaction helper:
```
// utils/transaction.js
const mongoose=require('mongoose');
const supportsTransactions = ... env? 
async function runInTransaction(fn){
 const session=await mongoose.startSession();
 try { let result; await session.withTransaction(async()=>{result=await fn(session)}); return result; }
 catch(err){ if (err.code===20 || /replica set|Transaction numbers/.test(err.message)){ return fn(null);} throw err; }
 finally { await session.endSession(); }
}
```
But if `fn` created docs then transaction aborted, retrying without session is fine. If error occurs after partial writes within transaction, aborted rollback. Good. But `withTransaction` may retry transient errors automatically; fine.
If session null, functions call `.session(null)`? Mongo supports `.session(null)`? It treats as no session? likely yes but avoid by conditional helper. We can define `const opts = session ? {session} : {}`.

However, for create user+profile inside runInTransaction, code uses `User.create([doc], {session})` returns array. For no session plain. We can write helper inside route:
```
const createOptions = session ? { session } : {};
const [user] = await User.create([{...}], createOptions);
```
Mongoose `Model.create([doc], {session})` always array. For save: `await doc.save(createOptions)`.

Modify authRoutes create and delete. Also teacherRoutes delete. Let's read teacher delete section.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/teacherRoutes.js",
  "offset": 330,
  "limit": 80
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/Server/routes/teacherRoutes.js</path>
<type>file</type>
<content>
330:                     parentContact: parentContact || currentStudentDoc.parentContact,
331:                     rollNumber: rollNumber ? Number(rollNumber) : currentStudentDoc.rollNumber
332:                 }
333:             }
334:         );
335: 
336:         const user = await User.findById(req.params.id);
337:         if (user) {
338:             if (name) user.name = name;
339:             if (email) user.email = email;
340:             await user.save();
341:         }
342: 
343:         res.json({ success: true, message: 'Student records updated cleanly!' });
344:     } catch (error) {
345:         res.status(500).json({ success: false, message: 'Request failed.' });
346:     }
347: });
348: 
349: // @desc    Allow Class Teachers to delete a student out of their class roster with password confirmation
350: // @route   DELETE /api/teacher/users/delete/:id
351: // @access  Private (Teachers only)
352: router.delete('/users/delete/:id', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
353:     const { password } = req.body; // 🟢 Extract the challenge verification password from the body request
354: 
355:     if (!password) {
356:         return res.status(400).json({ success: false, message: 'Please enter your login password to authorize this deletion.' });
357:     }
358: 
359:     try {
360:         // 1. Fetch the logged-in teacher's account details and explicitly include the hidden password field hash
361:         const teacherUser = await User.findById(req.user.id).select('+password');
362:         if (!teacherUser) {
363:             return res.status(404).json({ success: false, message: 'Teacher identity profile record absent.' });
364:         }
365: 
366:         // 2. 🟢 CRUCIAL SECURITY CHECK: Verify if the input password matches the teacher's true credentials hash string
367:         const isMatch = await teacherUser.matchPassword(password);
368:         if (!isMatch) {
369:             return res.status(401).json({ success: false, message: 'Security check failed: Password authentication mismatch.' });
370:         }
371: 
372:         // 3. Locate the profile and ensure class boundary isolation criteria match
373:         const student = await Student.findOne({ userId: req.params.id });
374: 
375:         if (!student || !(await canAccessClass(req.user, student.gradeClass))) {
376:             return res.status(403).json({ success: false, message: 'Unauthorized profile deletion boundaries. Access Denied.' });
377:         }
378: 
379:         // 4. Cascade delete across both student data schemas collections safely
380:         await Student.deleteOne({ userId: req.params.id });
381:         await User.deleteOne({ _id: req.params.id });
382: 
383:         // 5. Close the roll-number gap left behind so the class stays contiguous.
384:         await reindexRollsAfterDelete(student.gradeClass, student.rollNumber);
385: 
386:         res.json({ success: true, message: 'Student successfully unlinked and dropped from system registries.' });
387:     } catch (error) {
388:         res.status(500).json({ success: false, message: 'Request failed.' });
389:     }
390: });
391: 
392: 
393: 
394: 
395: 
396: module.exports = router;

(End of file - total 396 lines)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"require\" Server/routes/teacherRoutes.js | head -30; sed -n '1,45p' Server/routes/teacherRoutes.js",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
2:const express = require('express');
4:const { protect, authorizeRoles } = require('../middleware/auth');
5:const { validate, schemas } = require('../middleware/validate');
6:const { canAccessClass, getTeacherScope } = require('../middleware/assignments');
7:const Teacher = require('../models/Teacher');
8:const Student = require('../models/Student');
9:const User = require('../models/User');
10:const Attendance = require('../models/Attendance');
11:const SchoolConfig = require('../models/SchoolConfig');
12:const { reindexRollsAfterDelete } = require('../utils/rolls');
// backend/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { canAccessClass, getTeacherScope } = require('../middleware/assignments');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const SchoolConfig = require('../models/SchoolConfig');
const { reindexRollsAfterDelete } = require('../utils/rolls');

// @desc    Get the logged-in teacher's assigned class and student roster
// @route   GET /api/teacher/my-class
// @access  Private (Teachers only)
router.get('/my-class', protect, authorizeRoles('teacher'), async (req, res) => {
    try {
        const scope = await getTeacherScope(req.user.id);
        const targetClass = req.query.classId || scope.classTeacherOf || scope.classTeacherClasses[0];

        if (!targetClass) {
            return res.status(400).json({ success: false, message: 'You are not assigned as a Class Teacher to any active class.' });
        }
        if (!scope.classTeacherClasses.includes(targetClass)) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        const teacherProfile = await Teacher.findOne({ userId: req.user.id }).lean();

        // 2. Fetch all students whose gradeClass matches, sorted chronologically by roll numbers
        const studentsInClass = await Student.find({ gradeClass: targetClass })
            .populate('userId', 'name email profileImage')
            .sort({ rollNumber: 1 }) // 🟢 Sorts list from Roll 1 onwards immediately
            .lean();

        // 3. Format the data into a clean structure for the frontend roster
        const formattedRoster = studentsInClass.map(student => ({
            _id: student.userId?._id || student._id,
            studentCollectionId: student._id,
            studentId: student.studentId,
            rollNumber: student.rollNumber || 'N/A', // 🟢 Pass the live sequential roll number here
            name: student.userId?.name || 'Unknown Student',
            email: student.userId?.email || '',
            profileImage: student.userId?.profileImage || '',

```

---

## Assistant (Build · Big Pickle · 6.6s)

_Thinking:_

Implement transaction helper. Use it in both deletes and create.

Also assignment routes delete maybe cascades? When deleting a user teacher: delete Assignment. Let's add.

First transaction util.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/utils/transaction.js",
  "content": "// utils/transaction.js\n// Runs a unit of work inside a MongoDB transaction when the deployment supports\n// it (replica set / mongos, e.g. Atlas). Standalone dev instances fall back to\n// the same callback without a session so local development keeps working.\nconst mongoose = require('mongoose');\n\nconst TRANSACTION_UNSUPPORTED = new Set([20, 251]); // IllegalOperation, NoSuchTransaction\n\nconst isUnsupportedTransactionError = (err) =>\n  TRANSACTION_UNSUPPORTED.has(err?.code) ||\n  /replica set|mongos|Transaction numbers are only allowed|transactions are not supported/i.test(\n    String(err?.message || '')\n  );\n\nconst runInTransaction = async (work) => {\n  let session;\n  try {\n    session = await mongoose.startSession();\n  } catch {\n    return work(null);\n  }\n\n  let result;\n  try {\n    await session.withTransaction(async () => {\n      result = await work(session);\n    });\n    return result;\n  } catch (err) {\n    if (isUnsupportedTransactionError(err)) {\n      console.warn('MongoDB transactions unavailable; running without one.');\n      return work(null);\n    }\n    throw err;\n  } finally {\n    await session.endSession();\n  }\n};\n\nmodule.exports = { runInTransaction };\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/utils/rolls.js",
  "oldString": "const reindexRollsAfterDelete = async (gradeClass, removedRoll) => {",
  "newString": "const reindexRollsAfterDelete = async (gradeClass, removedRoll, session = null) => {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/utils/rolls.js",
  "oldString": "  const toShift = await Student.find({ gradeClass, rollNumber: { $gt: removed } })\n    .sort({ rollNumber: 1 })\n    .select('rollNumber');\n\n  for (const student of toShift) {\n    student.rollNumber = student.rollNumber - 1;\n    await student.save();\n  }",
  "newString": "  const query = Student.find({ gradeClass, rollNumber: { $gt: removed } })\n    .sort({ rollNumber: 1 })\n    .select('rollNumber');\n  if (session) query.session(session);\n\n  const toShift = await query;\n\n  for (const student of toShift) {\n    student.rollNumber = student.rollNumber - 1;\n    await student.save(session ? { session } : {});\n  }"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 7.1s)

_Thinking:_

Need attendace/gradebook imports. Modify teacherRoutes imports and delete block. Use runInTransaction.

```
const { runInTransaction } = require('../utils/transaction');
const Gradebook = require('../models/Gradebook');
const Assignment = require('../models/Assignment');
```
Delete:
```
await runInTransaction(async(session)=>{
 const opts=session?{session}:{};
 await Gradebook.deleteMany({studentId:id}, opts);
 await Attendance.updateMany({'records.studentId':id}, {$pull:{records:{studentId:id}}}, opts);
 await Student.deleteOne({userId:id}, opts);
 await User.deleteOne({_id:id}, opts);
 await reindexRollsAfterDelete(student.gradeClass, student.rollNumber, session);
});
```
Note student already loaded outside transaction for access check; okay.

Also delete assignment references? Student no. Fine.

AuthRoutes create transaction:
```
const { runInTransaction } = require('../utils/transaction');
...
const result = await runInTransaction(async(session)=>{
 const opts=session?{session}:{};
 const [user] = await User.create([{...}], opts);
 if role student: await Student.create([{...}], opts) (create array)
...
 return user;
});
```
Need `User.create` with array and opts. Do it.

Auth delete transaction:
```
const { Gradebook, Attendance, Assignment }...
await runInTransaction(async(session)=>{
 const opts...
 if student:
   const student = await Student.findOne({userId}).session? 
```
We currently find student inside. Load before transaction or inside. Do inside. For teacher delete:
- `Assignment.deleteMany({teacher: targetUser._id}, opts)` (teacher field refs User id per schema)
- `Student.deleteOne` for student.
- Attendance pull for student.
- Gradebook deleteMany studentId.
- reindex.
- Teacher.deleteOne.
- User.deleteOne.
Also delete PasswordResetToken for user.

Also auth create needs roll reindex? no.

Let's patch teacherRoutes.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/teacherRoutes.js",
  "oldString": "const Attendance = require('../models/Attendance');\nconst SchoolConfig = require('../models/SchoolConfig');\nconst { reindexRollsAfterDelete } = require('../utils/rolls');",
  "newString": "const Attendance = require('../models/Attendance');\nconst Gradebook = require('../models/Gradebook');\nconst SchoolConfig = require('../models/SchoolConfig');\nconst { reindexRollsAfterDelete } = require('../utils/rolls');\nconst { runInTransaction } = require('../utils/transaction');"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/teacherRoutes.js",
  "oldString": "        // 4. Cascade delete across both student data schemas collections safely\n        await Student.deleteOne({ userId: req.params.id });\n        await User.deleteOne({ _id: req.params.id });\n\n        // 5. Close the roll-number gap left behind so the class stays contiguous.\n        await reindexRollsAfterDelete(student.gradeClass, student.rollNumber);",
  "newString": "        // 4. Atomic cascade: grades, attendance rows, profile, account, then\n        // close the roll-number gap — all in one transaction where supported.\n        await runInTransaction(async (session) => {\n            const opts = session ? { session } : {};\n            const studentId = student.userId;\n\n            await Gradebook.deleteMany({ studentId }, opts);\n            await Attendance.updateMany(\n                { 'records.studentId': studentId },\n                { $pull: { records: { studentId } } },\n                opts\n            );\n            await Student.deleteOne({ userId: studentId }, opts);\n            await User.deleteOne({ _id: studentId }, opts);\n\n            // 5. Close the roll-number gap left behind so the class stays contiguous.\n            await reindexRollsAfterDelete(student.gradeClass, student.rollNumber, session);\n        });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 5.7s)

_Thinking:_

Patch authRoutes imports and create/delete. Use PasswordResetToken, Attendance, Gradebook, Assignment, transaction, reindex already.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "const Student = require('../models/Student');\nconst Teacher = require('../models/Teacher');\nconst Notice = require('../models/Notice');\nconst { reindexRollsAfterDelete } = require('../utils/rolls');\nconst { getTeacherScope } = require('../middleware/assignments');",
  "newString": "const Student = require('../models/Student');\nconst Teacher = require('../models/Teacher');\nconst Notice = require('../models/Notice');\nconst Attendance = require('../models/Attendance');\nconst Gradebook = require('../models/Gradebook');\nconst Assignment = require('../models/Assignment');\nconst PasswordResetToken = require('../models/PasswordResetToken');\nconst { reindexRollsAfterDelete } = require('../utils/rolls');\nconst { runInTransaction } = require('../utils/transaction');\nconst { getTeacherScope } = require('../middleware/assignments');"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "    const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role });\n\n    if (role === 'student') {\n      const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;\n\n      await Student.create({\n        userId: user._id,\n        studentId: customId || `STU-${Date.now().toString().slice(-4)}`,\n        gradeClass: assignedClass,\n        parentContact: extraField2 || '',\n        guardianName: req.body.guardianName || '',\n        rollNumber: absoluteRollNumber,\n      });\n    } else if (role === 'teacher') {\n      const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;\n\n      await Teacher.create({\n        userId: user._id,\n        teacherId: absoluteTeacherId,\n        department: extraField1 || 'General Education',\n        qualification: extraField2 || '',\n        classTeacherOf: req.body.classTeacherOf || 'None',\n      });\n    }",
  "newString": "    // Account + role profile are created atomically so a failure can never leave\n    // a User without its Student/Teacher document (or vice versa).\n    await runInTransaction(async (session) => {\n      const opts = session ? { session } : {};\n      const [user] = await User.create(\n        [{ name: name.trim(), email: normalizedEmail, password, role }],\n        opts\n      );\n\n      if (role === 'student') {\n        const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;\n\n        await Student.create(\n          [{\n            userId: user._id,\n            studentId: customId || `STU-${Date.now().toString().slice(-4)}`,\n            gradeClass: assignedClass,\n            parentContact: extraField2 || '',\n            guardianName: req.body.guardianName || '',\n            rollNumber: absoluteRollNumber,\n          }],\n          opts\n        );\n      } else if (role === 'teacher') {\n        const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;\n\n        await Teacher.create(\n          [{\n            userId: user._id,\n            teacherId: absoluteTeacherId,\n            department: extraField1 || 'General Education',\n            qualification: extraField2 || '',\n            classTeacherOf: req.body.classTeacherOf || 'None',\n          }],\n          opts\n        );\n      }\n    });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 5.1s)

_Thinking:_

Now replace delete block.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "    let message = 'Teacher profile cleanly purged from all cloud layers.';\n\n    if (targetUser.role === 'student') {\n      // Remove BOTH the Student profile and the User account, then close the\n      // roll-number gap — previously only the User was removed, orphaning the\n      // Student document and leaving a hole in the class roll list.\n      const student = await Student.findOne({ userId: targetUser._id });\n      if (student) {\n        await Student.deleteOne({ _id: student._id });\n        await reindexRollsAfterDelete(student.gradeClass, student.rollNumber);\n      }\n      await User.deleteOne({ _id: targetUser._id });\n      message = 'Student profile cleanly purged from all cloud layers.';\n    } else {\n      await Teacher.deleteOne({ userId: targetUser._id });\n      await User.deleteOne({ _id: targetUser._id });\n    }",
  "newString": "    let message = 'Teacher profile cleanly purged from all cloud layers.';\n\n    await runInTransaction(async (session) => {\n      const opts = session ? { session } : {};\n\n      if (targetUser.role === 'student') {\n        // Remove the Student profile, grades and attendance rows too, then\n        // close the roll-number gap so the class roll stays contiguous.\n        const student = await Student.findOne({ userId: targetUser._id }).session(session || null);\n        if (student) {\n          await Gradebook.deleteMany({ studentId: targetUser._id }, opts);\n          await Attendance.updateMany(\n            { 'records.studentId': targetUser._id },\n            { $pull: { records: { studentId: targetUser._id } } },\n            opts\n          );\n          await Student.deleteOne({ _id: student._id }, opts);\n          await reindexRollsAfterDelete(student.gradeClass, student.rollNumber, session);\n        }\n        await User.deleteOne({ _id: targetUser._id }, opts);\n        message = 'Student profile cleanly purged from all cloud layers.';\n      } else {\n        // Remove teaching assignments and reset class-teacher ownership.\n        await Assignment.deleteMany({ teacher: targetUser._id }, opts);\n        await Teacher.deleteOne({ userId: targetUser._id }, opts);\n        await User.deleteOne({ _id: targetUser._id }, opts);\n      }\n\n      await PasswordResetToken.deleteMany({ user: targetUser._id }, opts);\n    });"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 3.6s)

_Thinking:_

`.session(session || null)` may not exist? Query.session accepts null and returns query; likely okay but safer conditional. Let's patch:
```
let q = Student.findOne(...); if (session) q=q.session(session); const student=await q;
```
Do.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/authRoutes.js",
  "oldString": "        const student = await Student.findOne({ userId: targetUser._id }).session(session || null);",
  "newString": "        const studentQuery = Student.findOne({ userId: targetUser._id });\n        if (session) studentQuery.session(session);\n        const student = await studentQuery;"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 14.6s)

_Thinking:_

Now CMS. This is large. Need models and routes/controllers and frontend. Let's design minimal robust CMS:

Models in `Server/models/CmsModels.js`:
- MenuItem: label, url, location ('header'|'footer'), parent (ObjectId null), order, isExternal, isActive, openInNewTab.
- SitePage: title, slug (unique), content (HTML/markdown?), excerpt, isPublished, showInMenu? handled by menu.
- GalleryItem: title, image, category, order, isPublished.
- News: title, slug, excerpt, content, coverImage, category ('news'|'notice'|'announcement'), isPublished, publishedAt.
- Facility: title, description, icon, image, order, isPublished.
- AcademicInfo: section key unique, title, content, order, isPublished? Could be sections.
- Announcement: maybe use News category. Directive included Announcement separately; but News category can cover. Add `Announcement` model? Keep simpler: News supports `type: ['news','notice','announcement']`.

Also SchoolInfo extend fields: schoolName, tagline, address, phone, email, social links, heroImage, mission, vision, about, stats? Add in PublicModels SchoolInfo.

Routes `cmsRoutes.js`:
Public GET:
- `/api/public/site` returns school info + menu (header/footer tree) + maybe academic info; can extend existing `/public/info`.
- `/api/public/menu` returns menu tree.
- `/api/public/pages/:slug`
- `/api/public/gallery`
- `/api/public/news` query type, limit
- `/api/public/news/:slug`
- `/api/public/facilities`
- `/api/public/academic`
Admin protected:
- CRUD menu, pages, gallery, news, facilities, academic, site info patch.
Could mount under `/api/admin/cms` with protect+authorizeRoles('admin').
Use generic controller? To save time, implement `controllers/cmsController.js` with handlers.

Need update PublicHeader to fetch menu and site. Could add a `usePublicContent` context? Simpler fetch in header with useEffect; fallback links.

Add admin CMS UI page? Directive requires admin CMS. Need at least an admin page to manage. Implement `AdminPanel/src/pages/admin/CmsManager.jsx` with tabs, fetch endpoints, simple forms. Add route/nav. This is significant but doable.

Also Website dynamic pages: `ContentPage.jsx`, `NewsPage.jsx`, `GalleryPage.jsx`, `FacilitiesPage.jsx`, `AcademicPage.jsx`. Maybe one generic page for CMS pages and lists.

Given time, implement backend CMS fully and frontend minimal.

First models.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/CmsModels.js",
  "content": "// models/CmsModels.js\n// WordPress-style content primitives: a navigable menu tree, standalone pages,\n// news/notices/announcements, gallery items, facilities and academic sections.\nconst mongoose = require('mongoose');\n\nconst slugify = (value) =>\n  String(value || '')\n    .toLowerCase()\n    .trim()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/^-+|-+$/g, '')\n    .slice(0, 120);\n\nconst MenuItemSchema = new mongoose.Schema(\n  {\n    label: { type: String, required: true, trim: true, maxlength: 80 },\n    url: { type: String, required: true, trim: true, maxlength: 500 },\n    location: { type: String, enum: ['header', 'footer'], default: 'header', index: true },\n    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null, index: true },\n    order: { type: Number, default: 0 },\n    isExternal: { type: Boolean, default: false },\n    openInNewTab: { type: Boolean, default: false },\n    isActive: { type: Boolean, default: true },\n  },\n  { timestamps: true }\n);\n\nconst SitePageSchema = new mongoose.Schema(\n  {\n    title: { type: String, required: true, trim: true, maxlength: 160 },\n    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },\n    excerpt: { type: String, default: '', maxlength: 400 },\n    content: { type: String, default: '', maxlength: 100000 },\n    coverImage: { type: String, default: '' },\n    isPublished: { type: Boolean, default: false, index: true },\n    showTitle: { type: Boolean, default: true },\n    order: { type: Number, default: 0 },\n  },\n  { timestamps: true }\n);\n\nSitePageSchema.pre('validate', function () {\n  if (!this.slug && this.title) this.slug = slugify(this.title);\n  else if (this.slug) this.slug = slugify(this.slug);\n});\n\nconst NewsSchema = new mongoose.Schema(\n  {\n    title: { type: String, required: true, trim: true, maxlength: 200 },\n    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },\n    type: { type: String, enum: ['news', 'notice', 'announcement'], default: 'news', index: true },\n    excerpt: { type: String, default: '', maxlength: 500 },\n    content: { type: String, default: '', maxlength: 100000 },\n    coverImage: { type: String, default: '' },\n    isPublished: { type: Boolean, default: false, index: true },\n    publishedAt: { type: Date, default: Date.now, index: true },\n    expiresAt: { type: Date, default: null },\n  },\n  { timestamps: true }\n);\n\nNewsSchema.pre('validate', function () {\n  if (!this.slug && this.title) this.slug = slugify(this.title);\n  else if (this.slug) this.slug = slugify(this.slug);\n});\n\nconst GalleryItemSchema = new mongoose.Schema(\n  {\n    title: { type: String, default: '', trim: true, maxlength: 160 },\n    image: { type: String, required: true },\n    category: { type: String, default: 'Campus', trim: true, maxlength: 80, index: true },\n    order: { type: Number, default: 0 },\n    isPublished: { type: Boolean, default: true, index: true },\n  },\n  { timestamps: true }\n);\n\nconst FacilitySchema = new mongoose.Schema(\n  {\n    title: { type: String, required: true, trim: true, maxlength: 160 },\n    description: { type: String, default: '', maxlength: 5000 },\n    icon: { type: String, default: '' },\n    image: { type: String, default: '' },\n    order: { type: Number, default: 0 },\n    isPublished: { type: Boolean, default: true, index: true },\n  },\n  { timestamps: true }\n);\n\nconst AcademicInfoSchema = new mongoose.Schema(\n  {\n    key: { type: String, required: true, unique: true, lowercase: true, trim: true },\n    title: { type: String, required: true, trim: true, maxlength: 160 },\n    content: { type: String, default: '', maxlength: 50000 },\n    items: { type: [String], default: [] },\n    order: { type: Number, default: 0 },\n    isPublished: { type: Boolean, default: true, index: true },\n  },\n  { timestamps: true }\n);\n\nmodule.exports = {\n  slugify,\n  MenuItem: mongoose.model('MenuItem', MenuItemSchema),\n  SitePage: mongoose.model('SitePage', SitePageSchema),\n  News: mongoose.model('News', NewsSchema),\n  GalleryItem: mongoose.model('GalleryItem', GalleryItemSchema),\n  Facility: mongoose.model('Facility', FacilitySchema),\n  AcademicInfo: mongoose.model('AcademicInfo', AcademicInfoSchema),\n};\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/models/PublicModels.js",
  "oldString": "const SchoolInfoSchema = new mongoose.Schema({\n  welcomeTitle: { type: String, default: \"Welcome to Institutional Excellence\" },\n  aboutText: { type: String, default: \"Providing top-tier educational frameworks and global curriculum standard structures.\" },\n  schoolLogo: { type: String, default: \"\" },\n  bannerImage: { type: String, default: \"\" },",
  "newString": "const SchoolInfoSchema = new mongoose.Schema({\n  schoolName: { type: String, default: \"Scholaris\" },\n  tagline: { type: String, default: \"A modern campus portal\" },\n  welcomeTitle: { type: String, default: \"Welcome to Institutional Excellence\" },\n  aboutText: { type: String, default: \"Providing top-tier educational frameworks and global curriculum standard structures.\" },\n  mission: { type: String, default: \"\" },\n  vision: { type: String, default: \"\" },\n  address: { type: String, default: \"\" },\n  phone: { type: String, default: \"\" },\n  email: { type: String, default: \"\" },\n  facebook: { type: String, default: \"\" },\n  youtube: { type: String, default: \"\" },\n  schoolLogo: { type: String, default: \"\" },\n  bannerImage: { type: String, default: \"\" },"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 22.2s)

_Thinking:_

CMS controller. Need robust update helper: whitelist fields per model. Use generic parse. For menu tree, sort and build. Admin CRUD.

Write `Server/controllers/cmsController.js`.

Functions:
- `getSite` public: SchoolInfo + SchoolConfig? Just info and menu.
- `getMenu`: query active; build tree. Need docs lean; map children.
- `getPage`, `listNews`, `getNews`, `listGallery`, `listFacilities`, `listAcademic`.
- Admin:
  - list/save/delete for each collection.
  - `saveMenuItem` create/update; prevent parent=self; for menu reorder maybe mass reorder endpoint `PUT /menu/reorder` body items [{id,parent,order}].
  - `savePage`, `saveNews`, `saveGallery`, `saveFacility`, `saveAcademic`.
  - `updateSite`.
- Use `pick` with allowed fields, parse booleans/numbers. Validation route schemas maybe too much; use manual with sanitization. Need avoid mass assignment.

Implement `sanitizeString` etc. For content allowing HTML, admin only; okay. Public page content rendered with dangerouslySetInnerHTML? Risk stored XSS by admin only; acceptable but sanitize on render? Could strip script via simple regex in frontend. We'll render plain text/paragraphs maybe. Better use `content` as rich text but sanitize basic with DOMPurify not installed. We can render as plain text with whitespace-pre-line for safety. So content can be Markdown-ish plain. Good.

Helper `parseList`.

Let's write.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/controllers/cmsController.js",
  "content": "// controllers/cmsController.js\nconst mongoose = require('mongoose');\nconst { SchoolInfo } = require('../models/PublicModels');\nconst {\n  MenuItem,\n  SitePage,\n  News,\n  GalleryItem,\n  Facility,\n  AcademicInfo,\n} = require('../models/CmsModels');\n\nconst isId = (value) => mongoose.Types.ObjectId.isValid(value);\n\nconst str = (value, max = 200) =>\n  typeof value === 'string' ? value.trim().slice(0, max) : undefined;\nconst bool = (value) => (typeof value === 'boolean' ? value : undefined);\nconst num = (value) => (Number.isFinite(Number(value)) ? Number(value) : undefined);\nconst date = (value) => {\n  if (!value) return undefined;\n  const d = new Date(value);\n  return Number.isNaN(d.getTime()) ? undefined : d;\n};\n\nconst pickDefined = (obj) =>\n  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));\n\n// Build a nested menu tree from a flat, ordered list.\nconst buildMenuTree = (items) => {\n  const byId = new Map();\n  const roots = [];\n\n  for (const item of items) {\n    byId.set(String(item._id), { ...item, children: [] });\n  }\n  for (const item of items) {\n    const node = byId.get(String(item._id));\n    const parentId = item.parent ? String(item.parent) : null;\n    if (parentId && byId.has(parentId)) byId.get(parentId).children.push(node);\n    else roots.push(node);\n  }\n  return roots;\n};\n\nconst sorted = (items) =>\n  [...items].sort((a, b) => (a.order || 0) - (b.order || 0) || String(a.label || a.title || '').localeCompare(String(b.label || b.title || '')));\n\n// Public --------------------------------------------------------------------\nconst getPublicSite = async (req, res) => {\n  try {\n    const [info, menu] = await Promise.all([\n      SchoolInfo.findOne().lean(),\n      MenuItem.find({ location: 'header', isActive: true }).sort({ order: 1, label: 1 }).lean(),\n    ]);\n    // Never expose the fee configuration on the public site payload.\n    const safeInfo = info ? { ...info } : {};\n    delete safeInfo.admissionFeeAmount;\n    res.json({ success: true, site: safeInfo, menu: buildMenuTree(sorted(menu)) });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load site content.' });\n  }\n};\n\nconst getPublicMenu = async (req, res) => {\n  try {\n    const location = req.query.location === 'footer' ? 'footer' : 'header';\n    const menu = await MenuItem.find({ location, isActive: true }).sort({ order: 1, label: 1 }).lean();\n    res.json({ success: true, data: buildMenuTree(sorted(menu)) });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load menu.' });\n  }\n};\n\nconst getPageBySlug = async (req, res) => {\n  try {\n    const page = await SitePage.findOne({ slug: String(req.params.slug || '').toLowerCase(), isPublished: true }).lean();\n    if (!page) return res.status(404).json({ success: false, message: 'Page not found.' });\n    res.json({ success: true, data: page });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load page.' });\n  }\n};\n\nconst listPublicNews = async (req, res) => {\n  try {\n    const filter = { isPublished: true, publishedAt: { $lte: new Date() } };\n    if (['news', 'notice', 'announcement'].includes(req.query.type)) filter.type = req.query.type;\n    if (req.query.q) filter.title = { $regex: String(req.query.q).slice(0, 80), $options: 'i' };\n    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);\n    const data = await News.find(filter).sort({ publishedAt: -1 }).limit(limit).lean();\n    res.json({ success: true, data });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load news.' });\n  }\n};\n\nconst getPublicNewsBySlug = async (req, res) => {\n  try {\n    const item = await News.findOne({\n      slug: String(req.params.slug || '').toLowerCase(),\n      isPublished: true,\n      publishedAt: { $lte: new Date() },\n    }).lean();\n    if (!item) return res.status(404).json({ success: false, message: 'Article not found.' });\n    res.json({ success: true, data: item });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load article.' });\n  }\n};\n\nconst listPublicGallery = async (req, res) => {\n  try {\n    const filter = { isPublished: true };\n    if (req.query.category) filter.category = String(req.query.category).slice(0, 80);\n    const data = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 }).lean();\n    res.json({ success: true, data });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load gallery.' });\n  }\n};\n\nconst listPublicFacilities = async (req, res) => {\n  try {\n    const data = await Facility.find({ isPublished: true }).sort({ order: 1, title: 1 }).lean();\n    res.json({ success: true, data });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load facilities.' });\n  }\n};\n\nconst listPublicAcademic = async (req, res) => {\n  try {\n    const data = await AcademicInfo.find({ isPublished: true }).sort({ order: 1, title: 1 }).lean();\n    res.json({ success: true, data });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load academic information.' });\n  }\n};\n\n// Admin ---------------------------------------------------------------------\nconst listAdmin = (Model, sort = { order: 1, createdAt: -1 }) => async (req, res) => {\n  try {\n    const data = await Model.find({}).sort(sort).lean();\n    res.json({ success: true, data });\n  } catch {\n    res.status(500).json({ success: false, message: 'Unable to load content.' });\n  }\n};\n\nconst saveMenuItem = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      label: str(req.body.label, 80),\n      url: str(req.body.url, 500),\n      location: ['header', 'footer'].includes(req.body.location) ? req.body.location : undefined,\n      parent: isId(req.body.parent) ? req.body.parent : req.body.parent === null ? null : undefined,\n      order: num(req.body.order),\n      isExternal: bool(req.body.isExternal),\n      openInNewTab: bool(req.body.openInNewTab),\n      isActive: bool(req.body.isActive),\n    });\n\n    if (!payload.label || !payload.url) {\n      return res.status(400).json({ success: false, message: 'Label and URL are required.' });\n    }\n    if (payload.parent && String(payload.parent) === String(req.params.id)) {\n      return res.status(400).json({ success: false, message: 'A menu item cannot be its own parent.' });\n    }\n\n    const item = req.params.id\n      ? await MenuItem.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await MenuItem.create(payload);\n\n    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });\n    res.json({ success: true, data: item });\n  } catch {\n    res.status(400).json({ success: false, message: 'Menu item could not be saved.' });\n  }\n};\n\nconst reorderMenu = async (req, res) => {\n  try {\n    const items = Array.isArray(req.body.items) ? req.body.items.slice(0, 500) : [];\n    await Promise.all(\n      items\n        .filter((item) => isId(item.id))\n        .map((item) =>\n          MenuItem.findByIdAndUpdate(item.id, {\n            order: num(item.order) ?? 0,\n            parent: isId(item.parent) ? item.parent : null,\n          })\n        )\n    );\n    res.json({ success: true, message: 'Menu order saved.' });\n  } catch {\n    res.status(400).json({ success: false, message: 'Menu order could not be saved.' });\n  }\n};\n\nconst savePage = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      title: str(req.body.title, 160),\n      slug: str(req.body.slug, 120),\n      excerpt: str(req.body.excerpt, 400) ?? '',\n      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 100000) : undefined,\n      coverImage: str(req.body.coverImage, 2_000_000) ?? '',\n      isPublished: bool(req.body.isPublished),\n      showTitle: bool(req.body.showTitle),\n      order: num(req.body.order),\n    });\n    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });\n\n    const page = req.params.id\n      ? await SitePage.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await SitePage.create(payload);\n\n    if (!page) return res.status(404).json({ success: false, message: 'Page not found.' });\n    res.json({ success: true, data: page });\n  } catch (err) {\n    const dup = err.code === 11000;\n    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That slug is already in use.' : 'Page could not be saved.' });\n  }\n};\n\nconst saveNews = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      title: str(req.body.title, 200),\n      slug: str(req.body.slug, 120),\n      type: ['news', 'notice', 'announcement'].includes(req.body.type) ? req.body.type : undefined,\n      excerpt: str(req.body.excerpt, 500) ?? '',\n      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 100000) : undefined,\n      coverImage: str(req.body.coverImage, 2_000_000) ?? '',\n      isPublished: bool(req.body.isPublished),\n      publishedAt: date(req.body.publishedAt),\n      expiresAt: req.body.expiresAt === null ? null : date(req.body.expiresAt),\n    });\n    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });\n\n    const item = req.params.id\n      ? await News.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await News.create(payload);\n\n    if (!item) return res.status(404).json({ success: false, message: 'Article not found.' });\n    res.json({ success: true, data: item });\n  } catch (err) {\n    const dup = err.code === 11000;\n    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That slug is already in use.' : 'Article could not be saved.' });\n  }\n};\n\nconst saveGalleryItem = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      title: str(req.body.title, 160) ?? '',\n      image: str(req.body.image, 2_000_000),\n      category: str(req.body.category, 80) ?? 'Campus',\n      order: num(req.body.order),\n      isPublished: bool(req.body.isPublished),\n    });\n    if (!payload.image) return res.status(400).json({ success: false, message: 'Image is required.' });\n\n    const item = req.params.id\n      ? await GalleryItem.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await GalleryItem.create(payload);\n\n    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found.' });\n    res.json({ success: true, data: item });\n  } catch {\n    res.status(400).json({ success: false, message: 'Gallery item could not be saved.' });\n  }\n};\n\nconst saveFacility = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      title: str(req.body.title, 160),\n      description: str(req.body.description, 5000) ?? '',\n      icon: str(req.body.icon, 80) ?? '',\n      image: str(req.body.image, 2_000_000) ?? '',\n      order: num(req.body.order),\n      isPublished: bool(req.body.isPublished),\n    });\n    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });\n\n    const item = req.params.id\n      ? await Facility.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await Facility.create(payload);\n\n    if (!item) return res.status(404).json({ success: false, message: 'Facility not found.' });\n    res.json({ success: true, data: item });\n  } catch {\n    res.status(400).json({ success: false, message: 'Facility could not be saved.' });\n  }\n};\n\nconst saveAcademicInfo = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      key: str(req.body.key, 80)?.toLowerCase(),\n      title: str(req.body.title, 160),\n      content: typeof req.body.content === 'string' ? req.body.content.slice(0, 50000) : undefined,\n      items: Array.isArray(req.body.items)\n        ? req.body.items.filter((i) => typeof i === 'string').slice(0, 100).map((i) => i.slice(0, 500))\n        : undefined,\n      order: num(req.body.order),\n      isPublished: bool(req.body.isPublished),\n    });\n    if (!payload.title) return res.status(400).json({ success: false, message: 'Title is required.' });\n\n    const item = req.params.id\n      ? await AcademicInfo.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })\n      : await AcademicInfo.create(payload);\n\n    if (!item) return res.status(404).json({ success: false, message: 'Academic section not found.' });\n    res.json({ success: true, data: item });\n  } catch (err) {\n    const dup = err.code === 11000;\n    res.status(dup ? 409 : 400).json({ success: false, message: dup ? 'That key is already in use.' : 'Academic section could not be saved.' });\n  }\n};\n\nconst updateSiteInfo = async (req, res) => {\n  try {\n    const payload = pickDefined({\n      schoolName: str(req.body.schoolName, 120),\n      tagline: str(req.body.tagline, 200),\n      welcomeTitle: str(req.body.welcomeTitle, 200),\n      aboutText: str(req.body.aboutText, 4000),\n      mission: str(req.body.mission, 4000),\n      vision: str(req.body.vision, 4000),\n      address: str(req.body.address, 300),\n      phone: str(req.body.phone, 60),\n      email: str(req.body.email, 120),\n      facebook: str(req.body.facebook, 300),\n      youtube: str(req.body.youtube, 300),\n      schoolLogo: str(req.body.schoolLogo, 2_000_000),\n      bannerImage: str(req.body.bannerImage, 2_000_000),\n      admissionFeeAmount:\n        req.body.admissionFeeAmount !== undefined\n          ? Math.max(0, Math.min(1_000_000, Number(req.body.admissionFeeAmount) || 0))\n          : undefined,\n    });\n\n    const info = await SchoolInfo.findOneAndUpdate({}, payload, {\n      new: true,\n      upsert: true,\n      runValidators: true,\n      setDefaultsOnInsert: true,\n    });\n    res.json({ success: true, data: info });\n  } catch {\n    res.status(400).json({ success: false, message: 'Site settings could not be saved.' });\n  }\n};\n\nconst removeContent = (Model, label) => async (req, res) => {\n  try {\n    if (!isId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid id.' });\n    const removed = await Model.findByIdAndDelete(req.params.id);\n    if (!removed) return res.status(404).json({ success: false, message: `${label} not found.` });\n    res.json({ success: true, message: `${label} deleted.` });\n  } catch {\n    res.status(400).json({ success: false, message: `${label} could not be deleted.` });\n  }\n};\n\nmodule.exports = {\n  getPublicSite,\n  getPublicMenu,\n  getPageBySlug,\n  listPublicNews,\n  getPublicNewsBySlug,\n  listPublicGallery,\n  listPublicFacilities,\n  listPublicAcademic,\n  listMenu: listAdmin(MenuItem, { location: 1, order: 1 }),\n  listPages: listAdmin(SitePage),\n  listNews: listAdmin(News, { publishedAt: -1 }),\n  listGallery: listAdmin(GalleryItem),\n  listFacilities: listAdmin(Facility),\n  listAcademic: listAdmin(AcademicInfo),\n  saveMenuItem,\n  reorderMenu,\n  savePage,\n  saveNews,\n  saveGalleryItem,\n  saveFacility,\n  saveAcademicInfo,\n  updateSiteInfo,\n  deleteMenu: removeContent(MenuItem, 'Menu item'),\n  deletePage: removeContent(SitePage, 'Page'),\n  deleteNews: removeContent(News, 'Article'),\n  deleteGallery: removeContent(GalleryItem, 'Gallery item'),\n  deleteFacility: removeContent(Facility, 'Facility'),\n  deleteAcademic: removeContent(AcademicInfo, 'Academic section'),\n};\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 3.8s)

_Thinking:_

Need routes. `cmsRoutes.js` public and admin maybe combined with both. Mount in server. Let's inspect server route mounts.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"app.use('/api\\|require('./routes\" Server/server.js",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
12:const attendanceRoutes = require('./routes/attendanceRoutes');
14:const authRoutes = require('./routes/authRoutes');
15:const noticeRoutes = require('./routes/noticeRoutes');
16:const teacherRoutes = require('./routes/teacherRoutes');
17:const gradebookRoutes = require('./routes/gradebookRoutes');
18:const assignmentRoutes = require('./routes/assignmentRoutes');
113:app.use('/api', csrfProtect);
129:app.use('/api', globalLimiter);
130:app.use('/api/auth/login', authLimiter);
131:app.use('/api/auth/register', authLimiter);
132:app.use('/api/auth/2fa/verify', authLimiter);
143:app.use('/api/public/apply', publicWriteLimiter);
144:app.use('/api/public/pay-admission', publicWriteLimiter);
162:app.use('/api/auth', authRoutes);
163:app.use('/api/attendance', attendanceRoutes);
164:app.use('/api/notices', noticeRoutes);
165:app.use('/api/teacher', teacherRoutes);
166:app.use('/api/grades', gradebookRoutes);
167:app.use('/api', assignmentRoutes);
168:app.use('/api/config', require('./routes/configRoutes'));
169:app.use('/api/student', require('./routes/studentRoutes'));
170:app.use('/api/public', require('./routes/publicRoutes'));

```

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,80p' Server/routes/publicRoutes.js",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// backend/routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const cloudinary = require('../config/cloudinary');
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { SchoolInfo, Application } = require('../models/PublicModels');
const SchoolConfig = require('../models/SchoolConfig');
const { verifyPayment } = require('../services/payment');

const DEFAULT_ADMISSION_FEE = 500;

const storage = multer.memoryStorage();

// Only permit common image formats and cap the upload size to prevent abuse/DoS
const imageFileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Validation failed: only JPEG, PNG, WEBP or GIF images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 2 } // 5MB per file
});

const streamUpload = (buffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image' }, (err, res) => {
      if (err) return reject(err);
      resolve(res.secure_url);
    });
    stream.end(buffer);
  });
};

// @desc    Get public school profiles information and leadership matrix
// @route   GET /api/public/info
router.get('/info', async (req, res) => {
  try {
    let info = await SchoolInfo.findOne().lean();
    if (!info) info = await SchoolInfo.create({});
    res.json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Update base school website text parameters (Admin Only)
// @route   POST /api/public/info/update
router.post('/info/update', protect, authorizeRoles('admin'), upload.fields([{ name: 'logo' }, { name: 'banner' }]), validate(schemas.infoUpdate), async (req, res) => {
  const { welcomeTitle, aboutText, admissionFeeAmount } = req.body;
  try {
    let info = await SchoolInfo.findOne() || new SchoolInfo();
    info.welcomeTitle = welcomeTitle || info.welcomeTitle;
    info.aboutText = aboutText || info.aboutText;
    if (admissionFeeAmount !== undefined) info.admissionFeeAmount = admissionFeeAmount;

    // upload.fields() yields arrays keyed by field name — index [0] is required.
    if (req.files?.logo?.[0]) info.schoolLogo = await streamUpload(req.files.logo[0].buffer, 'school_branding');
    if (req.files?.banner?.[0]) info.bannerImage = await streamUpload(req.files.banner[0].buffer, 'school_branding');

    await info.save();
    res.json({ success: true, message: 'Website updated live!', data: info });
  } catch (error) {
    console.error('public info/update failed:', error);
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Append a new Founding Member Profile Card
// @route   POST /api/public/founder/add
router.post('/founder/add', protect, authorizeRoles('admin'), upload.single('founderPhoto'), validate(schemas.founderAdd), async (req, res) => {
  const { name, designation, quote } = req.body;

```

---

## Assistant (Build · Big Pickle · 7.1s)

_Thinking:_

Create cmsRoutes with public and admin paths. Mount:
`app.use('/api/public', require('./routes/cmsRoutes'))` but publicRoutes also /api/public. Better cmsRoutes exports two routers or a router with `/cms` under public and `/admin/cms`. Simpler single `cmsRoutes` mounted at `/api` with paths:
- `/public/site`, `/public/menu`, `/public/pages/:slug`, `/public/news`, `/public/news/:slug`, `/public/gallery`, `/public/facilities`, `/public/academic`
- `/admin/cms/...`.
Mount `app.use('/api', cmsRoutes)` before publicRoutes. Fine.

Write routes.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/routes/cmsRoutes.js",
  "content": "// routes/cmsRoutes.js\nconst express = require('express');\nconst router = express.Router();\nconst { protect, authorizeRoles } = require('../middleware/auth');\nconst cms = require('../controllers/cmsController');\n\n// Public content -------------------------------------------------------------\nrouter.get('/public/site', cms.getPublicSite);\nrouter.get('/public/menu', cms.getPublicMenu);\nrouter.get('/public/pages/:slug', cms.getPageBySlug);\nrouter.get('/public/news', cms.listPublicNews);\nrouter.get('/public/news/:slug', cms.getPublicNewsBySlug);\nrouter.get('/public/gallery', cms.listPublicGallery);\nrouter.get('/public/facilities', cms.listPublicFacilities);\nrouter.get('/public/academic', cms.listPublicAcademic);\n\n// Admin content --------------------------------------------------------------\nrouter.use('/admin/cms', protect, authorizeRoles('admin'));\n\nrouter.get('/admin/cms/menu', cms.listMenu);\nrouter.post('/admin/cms/menu', cms.saveMenuItem);\nrouter.put('/admin/cms/menu/reorder', cms.reorderMenu);\nrouter.put('/admin/cms/menu/:id', cms.saveMenuItem);\nrouter.delete('/admin/cms/menu/:id', cms.deleteMenu);\n\nrouter.get('/admin/cms/pages', cms.listPages);\nrouter.post('/admin/cms/pages', cms.savePage);\nrouter.put('/admin/cms/pages/:id', cms.savePage);\nrouter.delete('/admin/cms/pages/:id', cms.deletePage);\n\nrouter.get('/admin/cms/news', cms.listNews);\nrouter.post('/admin/cms/news', cms.saveNews);\nrouter.put('/admin/cms/news/:id', cms.saveNews);\nrouter.delete('/admin/cms/news/:id', cms.deleteNews);\n\nrouter.get('/admin/cms/gallery', cms.listGallery);\nrouter.post('/admin/cms/gallery', cms.saveGalleryItem);\nrouter.put('/admin/cms/gallery/:id', cms.saveGalleryItem);\nrouter.delete('/admin/cms/gallery/:id', cms.deleteGallery);\n\nrouter.get('/admin/cms/facilities', cms.listFacilities);\nrouter.post('/admin/cms/facilities', cms.saveFacility);\nrouter.put('/admin/cms/facilities/:id', cms.saveFacility);\nrouter.delete('/admin/cms/facilities/:id', cms.deleteFacility);\n\nrouter.get('/admin/cms/academic', cms.listAcademic);\nrouter.post('/admin/cms/academic', cms.saveAcademicInfo);\nrouter.put('/admin/cms/academic/:id', cms.saveAcademicInfo);\nrouter.delete('/admin/cms/academic/:id', cms.deleteAcademic);\n\nrouter.put('/admin/cms/site', cms.updateSiteInfo);\n\nmodule.exports = router;\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Server/server.js",
  "oldString": "app.use('/api/public', require('./routes/publicRoutes'));",
  "newString": "app.use('/api/public', require('./routes/publicRoutes'));\napp.use('/api', require('./routes/cmsRoutes'));"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 4.0s)

_Thinking:_

Order: cmsRoutes after publicRoutes still works for `/api/public/site` because publicRoutes router doesn't match and calls next. Fine. But `/api/public/pages/:slug` etc no conflict.

Add auth rate limiter for forgot/reset? Maybe later.

Now frontend Admin split. Rewrite App.jsx/navConfig. Need understand shell pages names. We have imports. Write AdminPanel App.jsx based on existing but remove public/student/parent and PublicLayout. Let's craft.

AdminPanel navConfig currently includes admin, teacher, student, parent. Edit to only admin/teacher. Read file.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/src/components/layout/navConfig.js"
}
```

**Output:**
```
<path>/home/sajidasim/school-management-system/AdminPanel/src/components/layout/navConfig.js</path>
<type>file</type>
<content>
1: // components/layout/navConfig.js
2: // Role-scoped navigation configuration consumed by the app sidebar.
3: import {
4:   IconDashboard,
5:   IconBell,
6:   IconBook,
7:   IconCalendar,
8:   IconUsers,
9:   IconChart,
10:   IconClipboard,
11:   IconPlus,
12:   IconShield,
13:   IconSparkles,
14:   IconHome,
15: } from '../icons.jsx';
16: 
17: export const NAV = {
18:   student: [
19:     { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },
20:     { to: '/s/notices', label: 'Notices', icon: IconBell },
21:     { to: '/s/grades', label: 'Report Card', icon: IconBook },
22:     { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },
23:   ],
24:   teacher: [
25:     { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },
26:     { to: '/t/roster', label: 'My Roster', icon: IconUsers },
27:     { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },
28:     { to: '/t/analytics', label: 'Analytics', icon: IconChart },
29:     { to: '/t/gradebook', label: 'Gradebook', icon: IconClipboard },
30:     { to: '/t/notices', label: 'Notices', icon: IconBell },
31:     { to: '/t/users/create', label: 'Add Student', icon: IconPlus },
32:   ],
33:   admin: [
34:     { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },
35:     { to: '/a/users', label: 'All Users', icon: IconUsers },
36:     { to: '/a/users/create', label: 'Create User', icon: IconPlus },
37:     { to: '/a/assignments', label: 'Assignments', icon: IconShield },
38:     { to: '/a/notices', label: 'Notices', icon: IconBell },
39:     { to: '/a/approvals', label: 'Admissions', icon: IconClipboard },
40:     { to: '/a/website', label: 'Public Website', icon: IconSparkles },
41:     { to: '/a/settings', label: 'Settings', icon: IconShield },
42:   ],
43:   parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],
44: };

(End of file - total 44 lines)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,200p' AdminPanel/src/App.jsx",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout.jsx';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Auth & General Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

// Shared Pages
import SharedNoticeBoard from './pages/shared/NoticeBoard';

// Parent page
import ParentHome from './pages/parent/ParentHome';

// Public Pages
import PublicPortal from './pages/userpublic/PublicPortal';
import PublicAdmission from './pages/userpublic/PublicAdmission';
import PublicFounders from './pages/userpublic/PublicFounders';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotices from './pages/student/StudentNotices';
import StudentGrades from './pages/student/StudentGrades';
import StudentAttendanceHub from './pages/student/StudentAttendanceHub';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherRoster from './pages/teacher/TeacherRoster';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherGradebook from './pages/teacher/TeacherGradebook';
import TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';
import TeacherEditStudent from './pages/teacher/TeacherEditStudent';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserRoster from './pages/admin/AdminUserRoster';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminNoticeBoard from './pages/admin/AdminNoticeBoard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminWebsiteManager from './pages/admin/AdminWebsiteManager';
import AdminAppApproval from './pages/admin/AdminAppApproval';
import AdminApplicationDetails from './pages/admin/AdminApplicationDetails';
import AdminAssignments from './pages/admin/AdminAssignments';

// Map legacy /student|teacher|admin/* paths onto the new /s|/t|/a/* structure.
const legacyRoleRedirects = [
  ['/student/dashboard', '/s/dashboard'],
  ['/student/notices', '/s/notices'],
  ['/student/grades', '/s/grades'],
  ['/student/attendance', '/s/attendance'],
  ['/teacher/dashboard', '/t/dashboard'],
  ['/teacher/roster', '/t/roster'],
  ['/teacher/attendance', '/t/attendance'],
  ['/teacher/analytics', '/t/analytics'],
  ['/teacher/gradebook', '/t/gradebook'],
  ['/teacher/notices', '/t/notices'],
  ['/teacher/users/create', '/t/users/create'],
  ['/teacher/users/edit/:id', '/t/users/edit/:id'],
  ['/admin/dashboard', '/a/dashboard'],
  ['/admin/users', '/a/users'],
  ['/admin/users/create', '/a/users/create'],
  ['/admin/users/edit/:id', '/a/users/edit/:id'],
  ['/admin/notices', '/a/notices'],
  ['/admin/settings', '/a/settings'],
  ['/admin/website', '/a/website'],
  ['/admin/approvals', '/a/approvals'],
  ['/admin/application/:id', '/a/applications/:id'],
  ['/admin/assignments', '/a/assignments'],
];

const shellChildren = [
  <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  <Route key="parent" path="/p/home" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,

  // Student
  <Route key="sd" path="/s/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,
  <Route key="sn" path="/s/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,
  <Route key="sg" path="/s/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,
  <Route key="sa" path="/s/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,

  // Teacher
  <Route key="td" path="/t/dashboard" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />,
  <Route key="tr" path="/t/roster" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />,
  <Route key="tt" path="/t/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />,
  <Route key="ty" path="/t/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />,
  <Route key="tb" path="/t/gradebook" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />,
  <Route key="tn" path="/t/notices" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />,
  <Route key="tc" path="/t/users/create" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />,
  <Route key="te" path="/t/users/edit/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />,

  // Admin
  <Route key="ad" path="/a/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />,
  <Route key="au" path="/a/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserRoster /></ProtectedRoute>} />,
  <Route key="aun" path="/a/users/create" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />,
  <Route key="aue" path="/a/users/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUser /></ProtectedRoute>} />,
  <Route key="an" path="/a/notices" element={<ProtectedRoute allowedRoles={['admin']}><AdminNoticeBoard /></ProtectedRoute>} />,
  <Route key="as" path="/a/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />,
  <Route key="aw" path="/a/website" element={<ProtectedRoute allowedRoles={['admin']}><AdminWebsiteManager /></ProtectedRoute>} />,
  <Route key="aa" path="/a/approvals" element={<ProtectedRoute allowedRoles={['admin']}><AdminAppApproval /></ProtectedRoute>} />,
  <Route key="aap" path="/a/applications/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminApplicationDetails /></ProtectedRoute>} />,
  <Route key="aas" path="/a/assignments" element={<ProtectedRoute allowedRoles={['admin']}><AdminAssignments /></ProtectedRoute>} />,

  // Legacy role-route redirects (feature parity: old bookmarks keep working)
  ...legacyRoleRedirects.map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  )),
];

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC + AUTH SITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admission" element={<PublicAdmission />} />
          <Route path="/founders" element={<PublicFounders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Legacy public redirects */}
          <Route path="/public/admission" element={<Navigate to="/admission" replace />} />
          <Route path="/public/founders" element={<Navigate to="/founders" replace />} />
        </Route>

        {/* AUTHENTICATED WORKSPACE */}
        <Route element={<AppShell />}>{shellChildren}</Route>

        {/* Fallthrough */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## Assistant (Build · Big Pickle · 11.0s)

_Thinking:_

AdminPanel App rewrite. Router basename={import.meta.env.BASE_URL}. Login standalone but existing Login page relies on no header, just min-h calc. Fine. Register not needed.

Need roleHome imported by Login from `core/nav.js`; okay.

Admin routes include new CMS manager page to create.

Let's write App.jsx and navConfig.

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/src/App.jsx",
  "content": "// src/App.jsx — AdminPanel (admin + teacher console only)\nimport { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';\n\nimport AppShell from './components/layout/AppShell.jsx';\nimport ProtectedRoute from './components/ProtectedRoute.jsx';\n\nimport Login from './pages/auth/Login';\nimport Profile from './pages/auth/Profile';\nimport SharedNoticeBoard from './pages/shared/NoticeBoard';\n\nimport TeacherDashboard from './pages/teacher/TeacherDashboard';\nimport TeacherRoster from './pages/teacher/TeacherRoster';\nimport TeacherAttendance from './pages/teacher/TeacherAttendance';\nimport TeacherAnalytics from './pages/teacher/TeacherAnalytics';\nimport TeacherGradebook from './pages/teacher/TeacherGradebook';\nimport TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';\nimport TeacherEditStudent from './pages/teacher/TeacherEditStudent';\n\nimport AdminDashboard from './pages/admin/AdminDashboard';\nimport AdminUserRoster from './pages/admin/AdminUserRoster';\nimport AdminCreateUser from './pages/admin/AdminCreateUser';\nimport AdminEditUser from './pages/admin/AdminEditUser';\nimport AdminNoticeBoard from './pages/admin/AdminNoticeBoard';\nimport AdminSettings from './pages/admin/AdminSettings';\nimport AdminWebsiteManager from './pages/admin/AdminWebsiteManager';\nimport AdminAppApproval from './pages/admin/AdminAppApproval';\nimport AdminApplicationDetails from './pages/admin/AdminApplicationDetails';\nimport AdminAssignments from './pages/admin/AdminAssignments';\nimport AdminCmsManager from './pages/admin/AdminCmsManager';\n\nconst legacyRoleRedirects = [\n  ['/student/dashboard', '/a/dashboard'],\n  ['/teacher/dashboard', '/t/dashboard'],\n  ['/teacher/roster', '/t/roster'],\n  ['/teacher/attendance', '/t/attendance'],\n  ['/teacher/analytics', '/t/analytics'],\n  ['/teacher/gradebook', '/t/gradebook'],\n  ['/teacher/notices', '/t/notices'],\n  ['/teacher/users/create', '/t/users/create'],\n  ['/teacher/users/edit/:id', '/t/users/edit/:id'],\n  ['/admin/dashboard', '/a/dashboard'],\n  ['/admin/users', '/a/users'],\n  ['/admin/users/create', '/a/users/create'],\n  ['/admin/users/edit/:id', '/a/users/edit/:id'],\n  ['/admin/notices', '/a/notices'],\n  ['/admin/settings', '/a/settings'],\n  ['/admin/website', '/a/website'],\n  ['/admin/approvals', '/a/approvals'],\n  ['/admin/application/:id', '/a/applications/:id'],\n  ['/admin/assignments', '/a/assignments'],\n];\n\nconst shellChildren = [\n  <Route key=\"profile\" path=\"/profile\" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,\n\n  <Route key=\"td\" path=\"/t/dashboard\" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />,\n  <Route key=\"tr\" path=\"/t/roster\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />,\n  <Route key=\"tt\" path=\"/t/attendance\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />,\n  <Route key=\"ty\" path=\"/t/analytics\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />,\n  <Route key=\"tb\" path=\"/t/gradebook\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />,\n  <Route key=\"tn\" path=\"/t/notices\" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />,\n  <Route key=\"tc\" path=\"/t/users/create\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />,\n  <Route key=\"te\" path=\"/t/users/edit/:id\" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />,\n\n  <Route key=\"ad\" path=\"/a/dashboard\" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />,\n  <Route key=\"au\" path=\"/a/users\" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserRoster /></ProtectedRoute>} />,\n  <Route key=\"aun\" path=\"/a/users/create\" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />,\n  <Route key=\"aue\" path=\"/a/users/edit/:id\" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUser /></ProtectedRoute>} />,\n  <Route key=\"an\" path=\"/a/notices\" element={<ProtectedRoute allowedRoles={['admin']}><AdminNoticeBoard /></ProtectedRoute>} />,\n  <Route key=\"as\" path=\"/a/settings\" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />,\n  <Route key=\"aw\" path=\"/a/website\" element={<ProtectedRoute allowedRoles={['admin']}><AdminWebsiteManager /></ProtectedRoute>} />,\n  <Route key=\"acms\" path=\"/a/cms\" element={<ProtectedRoute allowedRoles={['admin']}><AdminCmsManager /></ProtectedRoute>} />,\n  <Route key=\"aa\" path=\"/a/approvals\" element={<ProtectedRoute allowedRoles={['admin']}><AdminAppApproval /></ProtectedRoute>} />,\n  <Route key=\"aap\" path=\"/a/applications/:id\" element={<ProtectedRoute allowedRoles={['admin']}><AdminApplicationDetails /></ProtectedRoute>} />,\n  <Route key=\"aas\" path=\"/a/assignments\" element={<ProtectedRoute allowedRoles={['admin']}><AdminAssignments /></ProtectedRoute>} />,\n\n  ...legacyRoleRedirects.map(([from, to]) => (\n    <Route key={from} path={from} element={<Navigate to={to} replace />} />\n  )),\n];\n\nfunction App() {\n  return (\n    <Router basename={import.meta.env.BASE_URL}>\n      <Routes>\n        <Route path=\"/login\" element={<Login />} />\n        <Route path=\"/register\" element={<Navigate to=\"/login\" replace />} />\n        <Route element={<AppShell />}>{shellChildren}</Route>\n        <Route path=\"/\" element={<Navigate to=\"/a/dashboard\" replace />} />\n        <Route path=\"*\" element={<Navigate to=\"/\" replace />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/src/components/layout/navConfig.js",
  "oldString": "import {\n  IconDashboard,\n  IconBell,\n  IconBook,\n  IconCalendar,\n  IconUsers,\n  IconChart,\n  IconClipboard,\n  IconPlus,\n  IconShield,\n  IconSparkles,\n  IconHome,\n} from '../icons.jsx';\n\nexport const NAV = {\n  student: [\n    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },\n    { to: '/s/notices', label: 'Notices', icon: IconBell },\n    { to: '/s/grades', label: 'Report Card', icon: IconBook },\n    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },\n  ],\n  teacher: [",
  "newString": "import {\n  IconDashboard,\n  IconBell,\n  IconCalendar,\n  IconUsers,\n  IconChart,\n  IconClipboard,\n  IconPlus,\n  IconShield,\n  IconSparkles,\n} from '../icons.jsx';\n\nexport const NAV = {\n  teacher: ["
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/AdminPanel/src/components/layout/navConfig.js",
  "oldString": "    { to: '/a/website', label: 'Public Website', icon: IconSparkles },\n    { to: '/a/settings', label: 'Settings', icon: IconShield },\n  ],\n  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],\n};",
  "newString": "    { to: '/a/website', label: 'Public Website', icon: IconSparkles },\n    { to: '/a/cms', label: 'Content Studio', icon: IconSparkles },\n    { to: '/a/settings', label: 'Settings', icon: IconShield },\n  ],\n};"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 30.5s)

_Thinking:_

Need AdminCmsManager. Before that Website split and dynamic header.

Website App and navConfig. Read Website App.

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n '1,200p' Website/src/App.jsx",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout.jsx';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Auth & General Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

// Shared Pages
import SharedNoticeBoard from './pages/shared/NoticeBoard';

// Parent page
import ParentHome from './pages/parent/ParentHome';

// Public Pages
import PublicPortal from './pages/userpublic/PublicPortal';
import PublicAdmission from './pages/userpublic/PublicAdmission';
import PublicFounders from './pages/userpublic/PublicFounders';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentNotices from './pages/student/StudentNotices';
import StudentGrades from './pages/student/StudentGrades';
import StudentAttendanceHub from './pages/student/StudentAttendanceHub';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherRoster from './pages/teacher/TeacherRoster';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherGradebook from './pages/teacher/TeacherGradebook';
import TeacherCreateStudent from './pages/teacher/TeacherCreateStudent';
import TeacherEditStudent from './pages/teacher/TeacherEditStudent';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserRoster from './pages/admin/AdminUserRoster';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import AdminEditUser from './pages/admin/AdminEditUser';
import AdminNoticeBoard from './pages/admin/AdminNoticeBoard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminWebsiteManager from './pages/admin/AdminWebsiteManager';
import AdminAppApproval from './pages/admin/AdminAppApproval';
import AdminApplicationDetails from './pages/admin/AdminApplicationDetails';
import AdminAssignments from './pages/admin/AdminAssignments';

// Map legacy /student|teacher|admin/* paths onto the new /s|/t|/a/* structure.
const legacyRoleRedirects = [
  ['/student/dashboard', '/s/dashboard'],
  ['/student/notices', '/s/notices'],
  ['/student/grades', '/s/grades'],
  ['/student/attendance', '/s/attendance'],
  ['/teacher/dashboard', '/t/dashboard'],
  ['/teacher/roster', '/t/roster'],
  ['/teacher/attendance', '/t/attendance'],
  ['/teacher/analytics', '/t/analytics'],
  ['/teacher/gradebook', '/t/gradebook'],
  ['/teacher/notices', '/t/notices'],
  ['/teacher/users/create', '/t/users/create'],
  ['/teacher/users/edit/:id', '/t/users/edit/:id'],
  ['/admin/dashboard', '/a/dashboard'],
  ['/admin/users', '/a/users'],
  ['/admin/users/create', '/a/users/create'],
  ['/admin/users/edit/:id', '/a/users/edit/:id'],
  ['/admin/notices', '/a/notices'],
  ['/admin/settings', '/a/settings'],
  ['/admin/website', '/a/website'],
  ['/admin/approvals', '/a/approvals'],
  ['/admin/application/:id', '/a/applications/:id'],
  ['/admin/assignments', '/a/assignments'],
];

const shellChildren = [
  <Route key="profile" path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,
  <Route key="parent" path="/p/home" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,

  // Student
  <Route key="sd" path="/s/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,
  <Route key="sn" path="/s/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,
  <Route key="sg" path="/s/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,
  <Route key="sa" path="/s/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,

  // Teacher
  <Route key="td" path="/t/dashboard" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />,
  <Route key="tr" path="/t/roster" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherRoster /></ProtectedRoute>} />,
  <Route key="tt" path="/t/attendance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />,
  <Route key="ty" path="/t/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAnalytics /></ProtectedRoute>} />,
  <Route key="tb" path="/t/gradebook" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGradebook /></ProtectedRoute>} />,
  <Route key="tn" path="/t/notices" element={<ProtectedRoute allowedRoles={['teacher']}><SharedNoticeBoard /></ProtectedRoute>} />,
  <Route key="tc" path="/t/users/create" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCreateStudent /></ProtectedRoute>} />,
  <Route key="te" path="/t/users/edit/:id" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherEditStudent /></ProtectedRoute>} />,

  // Admin
  <Route key="ad" path="/a/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />,
  <Route key="au" path="/a/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserRoster /></ProtectedRoute>} />,
  <Route key="aun" path="/a/users/create" element={<ProtectedRoute allowedRoles={['admin']}><AdminCreateUser /></ProtectedRoute>} />,
  <Route key="aue" path="/a/users/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUser /></ProtectedRoute>} />,
  <Route key="an" path="/a/notices" element={<ProtectedRoute allowedRoles={['admin']}><AdminNoticeBoard /></ProtectedRoute>} />,
  <Route key="as" path="/a/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />,
  <Route key="aw" path="/a/website" element={<ProtectedRoute allowedRoles={['admin']}><AdminWebsiteManager /></ProtectedRoute>} />,
  <Route key="aa" path="/a/approvals" element={<ProtectedRoute allowedRoles={['admin']}><AdminAppApproval /></ProtectedRoute>} />,
  <Route key="aap" path="/a/applications/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminApplicationDetails /></ProtectedRoute>} />,
  <Route key="aas" path="/a/assignments" element={<ProtectedRoute allowedRoles={['admin']}><AdminAssignments /></ProtectedRoute>} />,

  // Legacy role-route redirects (feature parity: old bookmarks keep working)
  ...legacyRoleRedirects.map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  )),
];

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC + AUTH SITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/admission" element={<PublicAdmission />} />
          <Route path="/founders" element={<PublicFounders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Legacy public redirects */}
          <Route path="/public/admission" element={<Navigate to="/admission" replace />} />
          <Route path="/public/founders" element={<Navigate to="/founders" replace />} />
        </Route>

        {/* AUTHENTICATED WORKSPACE */}
        <Route element={<AppShell />}>{shellChildren}</Route>

        {/* Fallthrough */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
```

**Tool: bash**

**Input:**
```json
{
  "command": "cat Website/src/components/layout/navConfig.js; echo ---; sed -n '1,80p' Website/src/core/api.js",
  "workdir": "/home/sajidasim/school-management-system"
}
```

**Output:**
```
// components/layout/navConfig.js
// Role-scoped navigation configuration consumed by the app sidebar.
import {
  IconDashboard,
  IconBell,
  IconBook,
  IconCalendar,
  IconUsers,
  IconChart,
  IconClipboard,
  IconPlus,
  IconShield,
  IconSparkles,
  IconHome,
} from '../icons.jsx';

export const NAV = {
  student: [
    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/s/notices', label: 'Notices', icon: IconBell },
    { to: '/s/grades', label: 'Report Card', icon: IconBook },
    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },
  ],
  teacher: [
    { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/t/roster', label: 'My Roster', icon: IconUsers },
    { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },
    { to: '/t/analytics', label: 'Analytics', icon: IconChart },
    { to: '/t/gradebook', label: 'Gradebook', icon: IconClipboard },
    { to: '/t/notices', label: 'Notices', icon: IconBell },
    { to: '/t/users/create', label: 'Add Student', icon: IconPlus },
  ],
  admin: [
    { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },
    { to: '/a/users', label: 'All Users', icon: IconUsers },
    { to: '/a/users/create', label: 'Create User', icon: IconPlus },
    { to: '/a/assignments', label: 'Assignments', icon: IconShield },
    { to: '/a/notices', label: 'Notices', icon: IconBell },
    { to: '/a/approvals', label: 'Admissions', icon: IconClipboard },
    { to: '/a/website', label: 'Public Website', icon: IconSparkles },
    { to: '/a/settings', label: 'Settings', icon: IconShield },
  ],
  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],
};---
// src/core/api.js
// Single axios instance for the whole app.
//
//   • baseURL '/api'      → the API origin is hidden behind the Vite/Express proxy
//   • withCredentials     → HttpOnly session cookie travels with every request
//   • xsrfCookieName/…    → axios mirrors the double-submit `csrf` cookie into the
//                           X-CSRF-Token header automatically on state-changing calls
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'csrf',
  xsrfHeaderName: 'X-CSRF-Token',
  timeout: 25000,
});

// Normalize any failure into a safe, user-facing string (never expose internals).
export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (!err?.response) return err?.message === 'Network Error' ? 'Network error. Please check your connection.' : fallback;
  return err.response.data?.message || fallback;
};

export default api;
```

---

## Assistant (Build · Big Pickle · 73.4s)

**Tool: write**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Website/src/App.jsx",
  "content": "// src/App.jsx — Public Website (public + student/parent portal only)\nimport { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';\n\nimport PublicLayout from './components/layout/PublicLayout.jsx';\nimport AppShell from './components/layout/AppShell.jsx';\nimport ProtectedRoute from './components/ProtectedRoute.jsx';\n\nimport Login from './pages/auth/Login';\nimport Register from './pages/auth/Register';\nimport Profile from './pages/auth/Profile';\nimport SharedNoticeBoard from './pages/shared/NoticeBoard';\n\nimport ParentHome from './pages/parent/ParentHome';\n\nimport PublicPortal from './pages/userpublic/PublicPortal';\nimport PublicAdmission from './pages/userpublic/PublicAdmission';\nimport PublicFounders from './pages/userpublic/PublicFounders';\n\nimport StudentDashboard from './pages/student/StudentDashboard';\nimport StudentNotices from './pages/student/StudentNotices';\nimport StudentGrades from './pages/student/StudentGrades';\nimport StudentAttendanceHub from './pages/student/StudentAttendanceHub';\n\nconst legacyRoleRedirects = [\n  ['/student/dashboard', '/s/dashboard'],\n  ['/student/notices', '/s/notices'],\n  ['/student/grades', '/s/grades'],\n  ['/student/attendance', '/s/attendance'],\n];\n\nconst shellChildren = [\n  <Route key=\"profile\" path=\"/profile\" element={<ProtectedRoute><Profile /></ProtectedRoute>} />,\n  <Route key=\"parent\" path=\"/p/home\" element={<ProtectedRoute allowedRoles={['parent']}><ParentHome /></ProtectedRoute>} />,\n\n  <Route key=\"sd\" path=\"/s/dashboard\" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />,\n  <Route key=\"sn\" path=\"/s/notices\" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />,\n  <Route key=\"sg\" path=\"/s/grades\" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />,\n  <Route key=\"sa\" path=\"/s/attendance\" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendanceHub /></ProtectedRoute>} />,\n\n  ...legacyRoleRedirects.map(([from, to]) => (\n    <Route key={from} path={from} element={<Navigate to={to} replace />} />\n  )),\n];\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route element={<PublicLayout />}>\n          <Route path=\"/\" element={<PublicPortal />} />\n          <Route path=\"/admission\" element={<PublicAdmission />} />\n          <Route path=\"/founders\" element={<PublicFounders />} />\n          <Route path=\"/login\" element={<Login />} />\n          <Route path=\"/register\" element={<Register />} />\n          <Route path=\"/notices\" element={<SharedNoticeBoard />} />\n          <Route path=\"/public/admission\" element={<Navigate to=\"/admission\" replace />} />\n          <Route path=\"/public/founders\" element={<Navigate to=\"/founders\" replace />} />\n        </Route>\n\n        <Route element={<AppShell />}>{shellChildren}</Route>\n\n        <Route path=\"*\" element={<Navigate to=\"/\" replace />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · Big Pickle · 18.0s)

**Tool: edit**

**Input:**
```json
{
  "filePath": "/home/sajidasim/school-management-system/Website/src/components/layout/navConfig.js",
  "oldString": "// components/layout/navConfig.js\n// Role-scoped navigation configuration consumed by the app sidebar.\nimport {\n  IconDashboard,\n  IconBell,\n  IconBook,\n  IconCalendar,\n  IconUsers,\n  IconChart,\n  IconClipboard,\n  IconPlus,\n  IconShield,\n  IconSparkles,\n  IconHome,\n} from '../icons.jsx';\n\nexport const NAV = {\n  student: [\n    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },\n    { to: '/s/notices', label: 'Notices', icon: IconBell },\n    { to: '/s/grades', label: 'Report Card', icon: IconBook },\n    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },\n  ],\n  teacher: [\n    { to: '/t/dashboard', label: 'Overview', icon: IconDashboard },\n    { to: '/t/roster', label: 'My Roster', icon: IconUsers },\n    { to: '/t/attendance', label: 'Attendance', icon: IconCalendar },\n    { to: '/t/analytics', label: 'Analytics', icon: IconChart },\n    { to: '/t/gradebook', label: 'Gradebook', icon: IconClipboard },\n    { to: '/t/notices', label: 'Notices', icon: IconBell },\n    { to: '/t/users/create', label: 'Add Student', icon: IconPlus },\n  ],\n  admin: [\n    { to: '/a/dashboard', label: 'Overview', icon: IconDashboard },\n    { to: '/a/users', label: 'All Users', icon: IconUsers },\n    { to: '/a/users/create', label: 'Create User', icon: IconPlus },\n    { to: '/a/assignments', label: 'Assignments', icon: IconShield },\n    { to: '/a/notices', label: 'Notices', icon: IconBell },\n    { to: '/a/approvals', label: 'Admissions', icon: IconClipboard },\n    { to: '/a/website', label: 'Public Website', icon: IconSparkles },\n    { to: '/a/settings', label: 'Settings', icon: IconShield },\n  ],\n  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],\n};",
  "newString": "// components/layout/navConfig.js — Website (student/parent)\nimport { IconDashboard, IconBell, IconBook, IconCalendar, IconHome } from '../icons.jsx';\n\nexport const NAV = {\n  student: [\n    { to: '/s/dashboard', label: 'Overview', icon: IconDashboard },\n    { to: '/s/notices', label: 'Notices', icon: IconBell },\n    { to: '/s/grades', label: 'Report Card', icon: IconBook },\n    { to: '/s/attendance', label: 'Attendance', icon: IconCalendar },\n  ],\n  parent: [{ to: '/p/home', label: 'Overview', icon: IconHome }],\n};"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · Big Pickle · 599.8s)

---

## User

continue the unfinished task

---

## Assistant (Build · Big Pickle · 13.5s)

---

## User

continue the unfinished task

---

## Assistant (Build · Big Pickle · 12.2s)

---

