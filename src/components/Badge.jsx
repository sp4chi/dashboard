export default function Badge({ label }) {
  const colors = {
    Engineering: { bg: '#EEEDFE', color: '#3C3489' },
    Marketing: { bg: '#E6F1FB', color: '#0C447C' },
    Sales: { bg: '#E1F5EE', color: '#085041' },
    HR: { bg: '#FBEAF0', color: '#72243E' },
    Finance: { bg: '#EAF3DE', color: '#27500A' },
    Design: { bg: '#FAECE7', color: '#712B13' },
    Operations: { bg: '#FAEEDA', color: '#633806' },
    Product: { bg: '#FCEBEB', color: '#791F1F' },
  };
  const c = colors[label] ?? { bg: '#F1EFE8', color: '#444441' };
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        fontSize: 12,
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: 99,
      }}>
      {label}
    </span>
  );
}
