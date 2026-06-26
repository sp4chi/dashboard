export default function ConfirmDialog({ message, onConfirm, onCancel }) {
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
          borderRadius: 12,
          padding: '1.5rem 1.75rem',
          width: 360,
          border: '0.5px solid #D3D1C7',
        }}>
        <p style={{ margin: '0 0 1.25rem', fontSize: 15, lineHeight: 1.6 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: '0.5px solid #D3D1C7',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
            }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: 'none',
              background: '#E24B4A',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
