import React, { useState, useEffect } from 'react';
import { getOwners, createOwner } from '../api/ownerApi';
import './Owner.css';

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    const data = await getOwners();
    setOwners(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner({ ...newOwner, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOwner(newOwner);
    setNewOwner({ name: '', email: '' });
    fetchOwners();
  };

  return (
    <div className="owner">
      <h1>Owners</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newOwner.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newOwner.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <button type="submit">Add Owner</button>
      </form>
      <ul>
        {owners.map((owner) => (
          <li key={owner.id}>{owner.name} - {owner.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Owner;
