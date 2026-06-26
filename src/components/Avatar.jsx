import { avatarColor, initials } from '../pagination/utils/avatar';

export default function Avatar({ id, firstName, lastName, size = 36 }) {
  const { bg, text } = avatarColor(id);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}>
      {initials(firstName, lastName)}
    </div>
  );
}
