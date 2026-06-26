export const API_BASE = 'https://jsonplaceholder.typicode.com/users';
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Design',
  'Operations',
  'Product',
];

// Map numeric IDs to departments (mock since API doesn't have departments)
export const DEPT_MAP = {};
for (let i = 1; i <= 100; i++)
  DEPT_MAP[i] = DEPARTMENTS[i % DEPARTMENTS.length];
