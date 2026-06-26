import { useState } from 'react';
import { DEPARTMENTS } from '../pagination/utils/constants';

export default function FilterPanel({ filters, onChange, onClose }) {
  const [local, setLocal] = useState(filters);
  const set = (k, v) => setLocal((prev) => ({ ...prev, [k]: v }));
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-background-primary, #fff)',
          width: 300,
          minHeight: '100vh',
          padding: '1.5rem',
          borderLeft: '0.5px solid #D3D1C7',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}>
          <span style={{ fontWeight: 500, fontSize: 16 }}>Filter users</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
            }}>
            ✕
          </button>
        </div>
        {[
          { key: 'firstName', label: 'First name' },
          { key: 'lastName', label: 'Last name' },
          { key: 'email', label: 'Email' },
        ].map(({ key, label }) => (
          <div key={key} style={{ marginBottom: '1rem' }}>
            <label
              style={{
                fontSize: 13,
                color: '#5F5E5A',
                display: 'block',
                marginBottom: 4,
              }}>
              {label}
            </label>
            <input
              value={local[key]}
              onChange={(e) => set(key, e.target.value)}
              placeholder={`Filter by ${label.toLowerCase()}`}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        ))}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              fontSize: 13,
              color: '#5F5E5A',
              display: 'block',
              marginBottom: 4,
            }}>
            Department
          </label>
          <select
            value={local.department}
            onChange={(e) => set('department', e.target.value)}
            style={{ width: '100%' }}>
            <option value=''>All departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              onChange(local);
              onClose();
            }}
            style={{
              flex: 1,
              padding: '8px 0',
              borderRadius: 8,
              background: '#534AB7',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
            }}>
            Apply
          </button>
          <button
            onClick={() => {
              const empty = {
                firstName: '',
                lastName: '',
                email: '',
                department: '',
              };
              setLocal(empty);
              onChange(empty);
            }}
            style={{
              flex: 1,
              padding: '8px 0',
              borderRadius: 8,
              border: '0.5px solid #D3D1C7',
              background: 'none',
              cursor: 'pointer',
            }}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
