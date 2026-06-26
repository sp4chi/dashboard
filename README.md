# User Management Dashboard

A React application for viewing, adding, editing, and deleting users via the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock API.

---

## Features

- View all users in a sortable, paginated table
- Add, edit, and delete users (simulated via JSONPlaceholder)
- Global search across name, email, and department
- Column-level filter panel (first name, last name, email, department)
- Pagination with configurable page size (10 / 25 / 50 / 100)
- Client-side form validation with duplicate email detection
- Toast notifications for all CRUD outcomes
- Responsive layout — last name and department columns collapse on mobile

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default).

### 4. Build for production

```bash
npm run build
```

Output is written to the `dist/` folder. Preview the production build locally with:

```bash
npm run preview
```

---

## Project Structure

```
src/
├── App.jsx                  # Root component — layout and modal orchestration
├── main.jsx                 # React entry point
├── api/
│   └── users.js             # All fetch / POST / PUT / DELETE calls
├── components/
│   ├── Avatar.jsx           # Initials avatar with palette-based color
│   ├── Badge.jsx            # Department pill badge
│   ├── ConfirmDialog.jsx    # Delete confirmation modal
│   ├── FilterPanel.jsx      # Slide-in filter drawer
│   ├── FormField.jsx        # Reusable labeled input / select
│   ├── Pagination.jsx       # Page navigation controls
│   ├── Spinner.jsx          # Loading indicator
│   ├── Toast.jsx            # Success / error / info notification
│   ├── UserForm.jsx         # Add / edit user modal form
│   └── UserTable.jsx        # Sortable data table
├── hooks/
│   └── useUsers.js          # All state: data fetching, CRUD, filter,
├── pagination/utils/
│              ├── avatarColors.js      # Color palette + initials helper
│              ├── constants.js         # API_BASE, DEPARTMENTS, PAGE_SIZE_OPTIONS
│              └── validation.js        # Client-side form validation
└── styles/
    └── global.css           # Base input styles, keyframes, responsive helpers
```

---

## Assumptions

- **Departments** — JSONPlaceholder's `/users` endpoint does not include a department field. Departments are deterministically assigned based on `user.id % 8` so they are stable across reloads.
- **Persistence** — JSONPlaceholder simulates POST / PUT / DELETE responses but does not persist changes. Added, edited, and deleted users are reflected in local React state only and will reset on page refresh.
- **User IDs** — JSONPlaceholder always returns `id: 11` for POST responses. Locally created users are assigned incrementing IDs starting at 11 to avoid key collisions.
- **Authentication** — No auth layer is implemented; this is a front-end-only demonstration.

---

## Challenges & Reflections

### Challenges faced

**1. Component remounting causing lost input focus**  
The original single-file version defined the `Field` component inside `UserForm`'s render scope. Because the function reference changed on every render, React treated it as a new component type each time and unmounted/remounted the DOM node — dropping cursor focus after every keystroke. The fix was moving `FormField` to its own module-level file so React always sees a stable reference.

**2. Sort toggle firing only once**  
The `toggleSort` function originally called `setSortDir` inside the updater callback of `setSortKey`. React's state batching meant the inner `setSortDir` call wasn't always flushed as a separate update, so the direction only toggled once. The fix was reading `sortKey` directly from the closure (with it listed as a `useCallback` dependency) and calling `setSortKey` and `setSortDir` as independent top-level statements.

**3. JSONPlaceholder limitations**  
The API doesn't persist mutations, returns a fixed `id: 11` for all POST requests, and has no department field. Working around these required local state management for all changes and deterministic department assignment — both of which are noted as assumptions in the README.

---

### Improvements given more time

**Testing**  
Add unit tests for `validation.js` and `useUsers.js` (with a mocked `api/users.js`), and component tests with React Testing Library covering the form validation flow and CRUD interactions.

**Real backend**  
Replace JSONPlaceholder with a real REST API (e.g. Express + PostgreSQL) so mutations persist. The `api/users.js` module is already isolated so only that file would need to change.

**Optimistic updates**  
Currently the UI waits for the API response before updating. Applying the change to local state immediately (and rolling back on error) would make the app feel faster.

**URL-driven state**  
Sync search, filters, sort, and page to query parameters so users can share or bookmark a specific view.

**Accessible modals**  
Add focus trapping and `aria-modal` to the form and confirmation dialogs so they are fully keyboard- and screen-reader-accessible.

**Virtualised list**  
For very large datasets, replace the paginated table with a virtualised list (e.g. TanStack Virtual) to keep rendering fast regardless of row count.

**Dark mode**  
The CSS already uses `var(--color-background-primary)` tokens — wiring those to a `prefers-color-scheme` media query or a toggle would be straightforward.
