"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:4000/api/user/get")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete(`http://localhost:4000/api/user/del/${id}`)
        .then(() => {
          // Filter out the deleted user from the state
          setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => deleteUser(params.row.id)}
          className="deleteButton"
          style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}
        >
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => { getUsers() }, []);

  return (
    <div className="ownerContainer" style={{ padding: '20px' }}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Page;
