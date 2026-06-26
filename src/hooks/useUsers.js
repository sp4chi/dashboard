import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users';

const EMPTY_FILTERS = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

export function useUsers() {
  // ── Raw data ──────────────────────────────────────────────────────────────
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  // Counter for locally-created users (JSONPlaceholder always returns id=11)
  const [nextId, setNextId] = useState(11);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // ── Toast notifications ───────────────────────────────────────────────────
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Load users on mount ───────────────────────────────────────────────────
  useEffect(() => {
    fetchUsers()
      .then(setAllUsers)
      .catch((err) => setApiError(err.message ?? 'Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  // ── Reset to page 1 when search/filter/sort/pageSize changes ─────────────
  useEffect(() => {
    setPage(1);
  }, [search, filters, pageSize, sortKey, sortDir]);

  // ── Derived: filtered + sorted list ──────────────────────────────────────
  const processed = useMemo(() => {
    let list = [...allUsers];

    // Global search across name, email, department
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q),
      );
    }

    // Column-level filters
    if (filters.firstName)
      list = list.filter((u) =>
        u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()),
      );
    if (filters.lastName)
      list = list.filter((u) =>
        u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()),
      );
    if (filters.email)
      list = list.filter((u) =>
        u.email.toLowerCase().includes(filters.email.toLowerCase()),
      );
    if (filters.department)
      list = list.filter((u) => u.department === filters.department);

    // Sort
    list.sort((a, b) => {
      let av = a[sortKey] ?? '';
      let bv = b[sortKey] ?? '';
      if (sortKey === 'id') {
        av = Number(av);
        bv = Number(bv);
      } else {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [allUsers, search, filters, sortKey, sortDir]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageSlice = processed.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // ── Sort toggle ───────────────────────────────────────────────────────────
  const toggleSort = useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return key;
      }
      setSortDir('asc');
      return key;
    });
  }, []);

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const addUser = useCallback(
    async (formData) => {
      try {
        await createUser(formData);
        const id = nextId;
        setNextId((n) => n + 1);
        setAllUsers((prev) => [
          ...prev,
          {
            id,
            name: formData.name,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            department: formData.department,
          },
        ]);
        showToast('User added successfully.');
        return true;
      } catch (err) {
        showToast(err.message ?? 'Failed to add user.', 'error');
        return false;
      }
    },
    [nextId, showToast],
  );

  const editUser = useCallback(
    async (id, formData) => {
      try {
        await updateUser(id, formData);
        setAllUsers((prev) =>
          prev.map((u) =>
            u.id === id
              ? {
                  ...u,
                  name: formData.name,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  department: formData.department,
                }
              : u,
          ),
        );
        showToast('User updated successfully.');
        return true;
      } catch (err) {
        showToast(err.message ?? 'Failed to update user.', 'error');
        return false;
      }
    },
    [showToast],
  );

  const removeUser = useCallback(
    async (id) => {
      try {
        await deleteUser(id);
        setAllUsers((prev) => prev.filter((u) => u.id !== id));
        showToast('User deleted.', 'info');
        return true;
      } catch (err) {
        showToast(err.message ?? 'Failed to delete user.', 'error');
        return false;
      }
    },
    [showToast],
  );

  return {
    // Data
    allUsers,
    loading,
    apiError,
    // Derived
    processed,
    pageSlice,
    totalPages,
    safePage,
    // Search / filter / sort
    search,
    setSearch,
    filters,
    setFilters,
    sortKey,
    sortDir,
    toggleSort,
    // Pagination
    pageSize,
    setPageSize,
    page: safePage,
    setPage,
    // CRUD
    addUser,
    editUser,
    removeUser,
    // Toast
    toast,
    setToast,
  };
}
