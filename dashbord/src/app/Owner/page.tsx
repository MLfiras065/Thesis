"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AllOwner from './Owner';
import './styles.css';


const Owner = () => {
  const router = useRouter();
  const [owner, setOwner] = useState([]);
 
  const getOwner = () => {
    axios
      .get('http://localhost:4000/api/owner/getOwner')
      .then((response) => {
        setOwner(response.data);
        console.log('data', response.data);
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={owner}
          columns={owner}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      
      <div>
        {owner.map((el, index) => (
          <div className="ownerItem" key={index}>
            <AllOwner data={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Owner;
