import { useState } from 'react';
import FormField from './FormField';
import { validateUser } from '../pagination/utils/validation';

/**
 * Modal form for adding a new user or editing an existing one.
 * Calls onSave(formData) on valid submission; onCancel to dismiss.
 */
export default function UserForm({ user, existingUsers, onSave, onCancel }) {
  const isEdit = Boolean(user?.id);

  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    department: user?.department ?? '',
  });

  const [errors, setErrors] = useState({});

  /** Update a single field and clear its error */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    const errs = validateUser(form);

    // Duplicate email check (skip current user's own email when editing)
    const duplicate = existingUsers.find(
      (u) => u.email === form.email && u.id !== user?.id,
    );
    if (duplicate) errs.email = 'This email is already in use.';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSave({ ...form, name: `${form.firstName} ${form.lastName}` });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        style={{
          background: 'var(--color-background-primary, #fff)',
          borderRadius: 14,
          padding: '1.75rem',
          width: 420,
          border: '0.5px solid #D3D1C7',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}>
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
          <span style={{ fontWeight: 500, fontSize: 18 }}>
            {isEdit ? 'Edit user' : 'Add user'}
          </span>
          <button
            onClick={onCancel}
            aria-label='Close form'
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 20,
            }}>
            ✕
          </button>
        </div>

        {/* Fields */}
        <FormField
          fieldKey='firstName'
          label='First name'
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <FormField
          fieldKey='lastName'
          label='Last name'
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <FormField
          fieldKey='email'
          label='Email'
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          type='email'
        />
        <FormField
          fieldKey='department'
          label='Department'
          value={form.department}
          onChange={handleChange}
          error={errors.department}
        />

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: '0.5rem' }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 8,
              background: '#534AB7',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 14,
            }}>
            {isEdit ? 'Save changes' : 'Add user'}
          </button>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 8,
              border: '0.5px solid #D3D1C7',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
            }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
