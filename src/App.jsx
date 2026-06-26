import { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { PAGE_SIZE_OPTIONS } from './pagination/utils/constants';

import Spinner from './components/Spinner';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import FilterPanel from './components/FilterPanel';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

import './styles/global.css';

export default function App() {
  const {
    allUsers,
    loading,
    apiError,
    processed,
    pageSlice,
    totalPages,
    search,
    setSearch,
    filters,
    setFilters,
    sortKey,
    sortDir,
    toggleSort,
    pageSize,
    setPageSize,
    page,
    setPage,
    addUser,
    editUser,
    removeUser,
    toast,
    setToast,
  } = useUsers();

  // Local UI state — which modal is open
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formUser, setFormUser] = useState(null); // null = add, object = edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // ── Form handlers ─────────────────────────────────────────────────────────
  const openAddForm = () => {
    setFormUser(null);
    setShowForm(true);
  };
  const openEditForm = (user) => {
    setFormUser(user);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setFormUser(null);
  };

  const handleSave = async (formData) => {
    const ok = formUser
      ? await editUser(formUser.id, formData)
      : await addUser(formData);
    if (ok) closeForm();
  };

  // ── Delete handlers ───────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    await removeUser(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '1.5rem 1rem',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}>
      {/* Page header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 4px' }}>
          User management
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: '#5F5E5A' }}>
          {loading
            ? 'Loading…'
            : `${processed.length} user${processed.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* API error banner */}
      {apiError && (
        <div
          style={{
            background: '#FCEBEB',
            color: '#791F1F',
            border: '0.5px solid #F09595',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: '1rem',
            fontSize: 14,
          }}>
          ⚠ {apiError} — showing any locally added users only.
        </div>
      )}

      {/* Toolbar */}
      <div
        className='desktop-controls'
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by name, email, department…'
          style={{ flex: 1, minWidth: 200 }}
        />

        <button
          onClick={() => setShowFilter(true)}
          style={{
            padding: '7px 14px',
            borderRadius: 8,
            border: `0.5px solid ${activeFilterCount ? '#534AB7' : '#D3D1C7'}`,
            background: activeFilterCount ? '#EEEDFE' : 'none',
            color: activeFilterCount ? '#3C3489' : 'inherit',
            cursor: 'pointer',
            fontSize: 14,
            whiteSpace: 'nowrap',
          }}>
          Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
        </button>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{ width: 110 }}>
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>

        <button
          onClick={openAddForm}
          style={{
            padding: '7px 16px',
            borderRadius: 8,
            background: '#534AB7',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 14,
            whiteSpace: 'nowrap',
          }}>
          + Add user
        </button>
      </div>

      {/* Table / spinner */}
      {loading ? (
        <Spinner />
      ) : (
        <UserTable
          users={pageSlice}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
          onEdit={openEditForm}
          onDelete={setDeleteTarget}
        />
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={processed.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {/* Overlays */}
      {showFilter && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      {showForm && (
        <UserForm
          user={formUser}
          existingUsers={allUsers}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete ${deleteTarget.name}? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
