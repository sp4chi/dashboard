export default function Toast({ message, type, onClose }) {
  const colors = {
    success: { bg: '#EAF3DE', color: '#27500A', border: '#97C459' },
    error: { bg: '#FCEBEB', color: '#791F1F', border: '#F09595' },
    info: { bg: '#E6F1FB', color: '#0C447C', border: '#85B7EB' },
  };
  const c = colors[type] ?? colors.info;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 14,
        fontWeight: 500,
        maxWidth: 340,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: c.color,
          fontSize: 16,
          padding: 0,
          lineHeight: 1,
        }}>
        ✕
      </button>
    </div>
  );
}
