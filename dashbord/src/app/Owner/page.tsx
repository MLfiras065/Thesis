"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './styles.css';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const Owner = () => {
  const [owner, setOwner] = useState([]);
 
  const getOwner = () => {
    axios
      .get('http://localhost:4000/api/owner/getOwner')
      .then((response) => {
        const ownerData = response.data.map((owner, index) => ({
          id: index + 1,
          firstName: owner.firstName,
          lastName: owner.lastName,
          age: owner.age,
        }));
        setOwner(ownerData);
        console.log('data', ownerData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <div className="ownerContainer">
      <div className="dataGrid">
        <DataGrid
          rows={owner}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Owner;
