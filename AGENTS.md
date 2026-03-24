<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Hub - EduPlatform Documentation Index

Welcome, Agent. This project follows a specific architecture and set of conventions. Please refer to the following documentation before making changes.

## 🧭 Project Architecture
- **[docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)**: Architectural patterns, directory structure, and conventions.

## 🔗 API Integration & Constants
- **[docs/API_ENDPOINTS_GUIDE.md](./docs/API_ENDPOINTS_GUIDE.md)**: API reference, request/response models.
- **[docs/API_REFACTORING_SUMMARY.md](./docs/API_REFACTORING_SUMMARY.md)**: Recent changes to the API structure.
- **[src/utils/constants.ts](./src/utils/constants.ts)**: Centralized constants (API, Roles, Permissions).

## 🚀 Deployment & Infrastructure
- **[docs/DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)**: General deployment.
- **[docs/DOCKER_COMPOSE_SETUP.md](./docs/DOCKER_COMPOSE_SETUP.md)**: Docker setup.
- **[docs/NGINX_SETUP_GUIDE.md](./docs/NGINX_SETUP_GUIDE.md)**: Reverse proxy configuration.

## 🛠️ Key Directories
- `src/app/`: Next.js App Router.
- `src/components/`: Reusable React components.
- `src/services/`: API client and services.
- `src/hooks/`: Custom React hooks for data fetching and state.
- `src/types/`: Global TypeScript interfaces.
- `src/utils/api/`: Modular API endpoint definitions.

---

**Note to Agents:** Always perform a `grep_search` or `glob` to verify current usage before introducing new patterns or libraries.
