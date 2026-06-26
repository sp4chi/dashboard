import Avatar from './Avatar';
import Badge from './Badge';

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name', hideMobile: true },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department', hideMobile: true },
  { key: null, label: 'Actions' },
];

/** Arrow indicator shown in sortable column headers */
function SortIcon({ col, sortKey, sortDir }) {
  if (sortKey !== col)
    return <span style={{ color: '#B4B2A9', marginLeft: 4 }}>↕</span>;
  return (
    <span style={{ color: '#534AB7', marginLeft: 4 }}>
      {sortDir === 'asc' ? '↑' : '↓'}
    </span>
  );
}

/**
 * Renders the user data table with sortable headers and per-row Edit / Delete actions.
 */
export default function UserTable({
  users,
  sortKey,
  sortDir,
  onSort,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className='table-wrap'
      style={{
        border: '0.5px solid #D3D1C7',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          minWidth: 600,
        }}>
        <colgroup>
          <col style={{ width: 50 }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '22%' }} className='hide-mobile' />
          <col style={{ width: '26%' }} />
          <col style={{ width: '16%' }} className='hide-mobile' />
          <col style={{ width: 110 }} />
        </colgroup>

        <thead>
          <tr style={{ background: '#F1EFE8' }}>
            {COLUMNS.map(({ key, label, hideMobile }) => (
              <th
                key={label}
                className={hideMobile ? 'hide-mobile' : undefined}
                onClick={key ? () => onSort(key) : undefined}
                style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#5F5E5A',
                  cursor: key ? 'pointer' : 'default',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {label}
                {key && (
                  <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  color: '#888780',
                  fontSize: 14,
                }}>
                No users match your search or filters.
              </td>
            </tr>
          ) : (
            users.map((user, idx) => (
              <tr
                key={user.id}
                style={{
                  borderTop: '0.5px solid #D3D1C7',
                  background:
                    idx % 2 === 0
                      ? 'var(--color-background-primary, #fff)'
                      : 'var(--color-background-secondary, #FAFAF8)',
                }}>
                {/* ID */}
                <td
                  style={{
                    padding: '10px 14px',
                    fontSize: 13,
                    color: '#888780',
                  }}>
                  {user.id}
                </td>

                {/* First name + avatar */}
                <td style={{ padding: '10px 14px' }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar
                      id={user.id}
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                      {user.firstName}
                    </span>
                  </div>
                </td>

                {/* Last name */}
                <td
                  className='hide-mobile'
                  style={{
                    padding: '10px 14px',
                    fontSize: 14,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                  {user.lastName}
                </td>

                {/* Email */}
                <td
                  style={{
                    padding: '10px 14px',
                    fontSize: 13,
                    color: '#185FA5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                  <a
                    href={`mailto:${user.email}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}>
                    {user.email}
                  </a>
                </td>

                {/* Department */}
                <td className='hide-mobile' style={{ padding: '10px 14px' }}>
                  <Badge label={user.department} />
                </td>

                {/* Actions */}
                <td style={{ padding: '10px 14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      justifyContent: 'center',
                    }}>
                    <button
                      onClick={() => onEdit(user)}
                      title='Edit user'
                      style={{
                        padding: '5px 10px',
                        borderRadius: 7,
                        border: '0.5px solid #D3D1C7',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: 13,
                        color: '#444441',
                      }}>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      title='Delete user'
                      style={{
                        padding: '5px 10px',
                        borderRadius: 7,
                        border: '0.5px solid #F09595',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: 13,
                        color: '#A32D2D',
                      }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
