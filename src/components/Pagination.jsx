/**
 * Pagination bar with first / prev / page-numbers / next / last controls.
 * Shows up to 5 page number buttons, sliding the window as the current page moves.
 */
export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);

  /** Build the array of page numbers to display (max 5) */
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => {
      if (totalPages <= 5) return i + 1;
      if (page <= 3) return i + 1;
      if (page >= totalPages - 2) return totalPages - 4 + i;
      return page - 2 + i;
    },
  );

  const btnStyle = (active, disabled) => ({
    padding: '5px 10px',
    borderRadius: 7,
    border: active ? 'none' : '0.5px solid #D3D1C7',
    background: active ? '#534AB7' : 'none',
    color: active ? '#fff' : disabled ? '#B4B2A9' : 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 13,
    minWidth: active ? 34 : undefined,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem',
        flexWrap: 'wrap',
        gap: 8,
      }}>
      <span style={{ fontSize: 13, color: '#5F5E5A' }}>
        Showing {rangeStart}–{rangeEnd} of {totalItems}
      </span>

      <div style={{ display: 'flex', gap: 6 }}>
        {/* First */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          style={btnStyle(false, page === 1)}>
          «
        </button>
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          style={{ ...btnStyle(false, page === 1), padding: '5px 12px' }}>
          ‹ Prev
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={btnStyle(p === page, false)}>
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          style={{
            ...btnStyle(false, page === totalPages),
            padding: '5px 12px',
          }}>
          Next ›
        </button>
        {/* Last */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          style={btnStyle(false, page === totalPages)}>
          »
        </button>
      </div>
    </div>
  );
}
