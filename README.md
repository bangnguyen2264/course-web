# EduPlatform - Educational Course Management System

A modern, full-featured educational platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Perfect for creating and managing online courses.

## 🎯 Project Overview

EduPlatform is a production-ready learning management system (LMS) with:
- ✅ User authentication and authorization
- ✅ Role-based access control (Admin, Teacher, Student)
- ✅ Course management
- ✅ Progress tracking
- ✅ Responsive design

## 📋 Quick Start

### Prerequisites
- Node.js 18+ (required for Next.js 16)
- npm or yarn

## 📖 Documentation

For detailed technical guides, API references, and deployment instructions, please see the **[docs/](./docs/README.md)** directory.

- **[Project Structure](./docs/PROJECT_STRUCTURE.md)**: Architectural overview.
- **[API Endpoints Guide](./docs/API_ENDPOINTS_GUIDE.md)**: API reference.
- **[Deployment & Infrastructure](./docs/DEPLOYMENT_GUIDE.md)**: Deployment guides.

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL and secrets
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Lint code with Biome
npm run lint

# Format code with Biome
npm run format
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── profile/
│   │   └── layout.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # Reusable React components
│   ├── auth/                     # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── ui/                       # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── services/                     # API service layer
│   ├── axios.config.ts           # Axios instance with interceptors
│   ├── authService.ts            # Auth API calls
│   ├── courseService.ts          # Course API calls
│   ├── userService.ts            # User API calls
│   └── index.ts                  # Exports
│
├── context/                      # React Context for state
│   └── AuthContext.tsx           # Global auth state
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Auth context hook
│   ├── useApi.ts                 # Generic API hook
│   ├── useCourse.ts              # Course operations hook
│   └── index.ts                  # Exports
│
├── types/                        # TypeScript type definitions
│   ├── auth.ts
│   ├── course.ts
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
│
├── utils/                        # Utility functions
│   ├── constants.ts              # API endpoints, roles, permissions
│   ├── helpers.ts                # Helper functions
│   ├── validators.ts             # Form validators
│   └── index.ts
│
└── middleware.ts                 # Next.js middleware (optional)
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full access, user management
- **Teacher**: Can create and manage courses
- **Student**: Can view and enroll in courses

### Auth Flow
1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to requests
5. Protected routes use `ProtectedRoute` component

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## 🎨 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.0 | React framework with SSR & optimizations |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first CSS |
| Axios | latest | HTTP client |
| Biome | 2.2.0 | Linting & formatting |

## 📦 Key Features

### Axios Configuration
- **Auto token injection**: Automatically adds JWT to requests
- **Token refresh**: Intercepts 401s and refreshes tokens
- **Error handling**: Consistent error responses

### Custom Hooks
- `useAuth()`: Access auth context
- `useApi()`: Generic API call handler with loading state
- `useCourse()`: Course-related operations

### UI Components
- `Button`: Primary, secondary, danger variants with loading states
- `Card`: Flexible card layout with sections
- `Modal`: Centered modal with backdrop
- Responsive design with Tailwind

### Type Safety
- Full TypeScript with strict mode
- Shared types across services
- Generic API response types

## 🚀 Usage Examples

### Using Authentication

```tsx
import { useAuth } from "@/hooks";

export function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div>Welcome {user?.name}!</div>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </>
  );
}
```

### Fetching Courses

```tsx
import { useCourse } from "@/hooks";

export function CourseList() {
  const { courses, isLoading, fetchCourses } = useCourse();

  useEffect(() => {
    fetchCourses(1, 10);
  }, []);

  return (
    <div>
      {isLoading ? "Loading..." : courses.map(c => <div>{c.title}</div>)}
    </div>
  );
}
```

### Protected Routes

```tsx
import { ProtectedRoute } from "@/components/auth";

export function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={["admin"]}>
      <div>Admin only content</div>
    </ProtectedRoute>
  );
}
```

## 🔧 API Integration

### Connect to Your Backend

The app expects a RESTful API at the endpoint specified in `NEXT_PUBLIC_API_URL`.

#### Required Endpoints

**Auth**
- `POST /auth/login` - Login user
- `POST /auth/register` - Register user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user

**Courses**
- `GET /courses?page=1&pageSize=10` - List courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create course
- `PUT /courses/:id` - Update course
- `POST /courses/:id/enroll` - Enroll in course
- `GET /courses/:id/progress` - Get progress

**Users**
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update profile
- `GET /users/:id/stats` - Get user stats

## 🛠️ Development Guidelines

### Adding a New Page

1. Create route folder: `src/app/(dashboard)/courses/page.tsx`
2. Use `ProtectedRoute` if page needs authentication
3. Use `useCourse()` hook for data fetching
4. Import UI components from `@/components/ui`

### Adding a New API Service

1. Create `src/services/featureService.ts`
2. Use `apiClient` for requests
3. Export from `src/services/index.ts`
4. Create corresponding hook in `src/hooks/`

### Form Validation

Use validators from `@/utils/validators.ts`:
- `validateEmail()` - Email format
- `validatePassword()` - Strong passwords
- `validateRequired()` - Required fields
- `validatePhone()` - Phone numbers

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Check code with Biome
npm run format   # Format code with Biome
```

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Guide](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Happy Learning!** 🚀
