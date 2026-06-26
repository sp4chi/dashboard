export default function Spinner() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: '2.5px solid #D3D1C7',
          borderTopColor: '#534AB7',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  );
}
