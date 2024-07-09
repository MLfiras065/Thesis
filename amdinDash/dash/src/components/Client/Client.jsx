import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Client.css'; 


const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients'); 
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`http://localhost:3000/api/clients/${clientId}`); 
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="client-container">
      <h2>Clients</h2>
      <ul className="client-list">
        {clients.map(client => (
          <li key={client.id} className="client-item">
            <span>{client.name}</span>
            <button onClick={() => handleDelete(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Client;
