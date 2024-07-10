import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

const AllOwner = ({ data }) => {
  const router = useRouter();

  const deleteOwner = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this owner?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4000/api/owner/del/${data.id}`)
        .then(() => {
          router.push("/Owner");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tr}>
            <td style={styles.td}>{data.username}</td>
            <td style={styles.td}>{data.email}</td>
            <td style={styles.td}>{data.role}</td>
            <td style={styles.td}>
              <span style={styles.status}>Active</span>
            </td>
            <td style={styles.td}>
              <button style={{ ...styles.button, ...styles.editButton }} onClick={() => router.push('./Edit')}>
                Edit
              </button>
              <button style={{ ...styles.button, ...styles.deleteButton }} onClick={deleteOwner}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    backgroundColor: '#f3f4f6',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4b5563',
    borderBottom: '2px solid #e5e7eb',
  },
  td: {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
  },
  tr: {
    transition: 'background-color 0.2s',
  },
  trHover: {
    backgroundColor: '#f1f5f9',
  },
  status: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#10b981',
    backgroundColor: '#d1fae5',
    borderRadius: '0.375rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ffffff',
    borderRadius: '0.375rem',
    marginRight: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    '&:hover': {
      backgroundColor: '#dc2626',
    },
  },
};

export default AllOwner;
