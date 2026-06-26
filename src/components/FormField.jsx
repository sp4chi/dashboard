import { DEPARTMENTS } from '../pagination/utils/constants';

/**
 * Single labeled form field — supports text/email inputs and a department select.
 * Defined at module level (not inside another component) so React never remounts
 * it mid-keystroke, which would drop cursor focus.
 */
export default function FormField({
  fieldKey,
  label,
  type = 'text',
  value,
  onChange,
  error,
}) {
  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    borderColor: error ? '#E24B4A' : undefined,
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={`field-${fieldKey}`}
        style={{
          fontSize: 13,
          color: '#5F5E5A',
          display: 'block',
          marginBottom: 4,
        }}>
        {label}
      </label>

      {fieldKey === 'department' ? (
        <select
          id={`field-${fieldKey}`}
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          style={inputStyle}>
          <option value=''>Select department</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`field-${fieldKey}`}
          type={type}
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          placeholder={label}
          style={inputStyle}
        />
      )}

      {error && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#A32D2D' }}>
          {error}
        </p>
      )}
    </div>
  );
}
