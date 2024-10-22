import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onClose, onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur

    try {
      await axios.post('http://localhost:3002/users', { name, email });
      onUserCreated(); // Appeler la fonction pour mettre à jour la liste des utilisateurs
      onClose(); // Fermer le formulaire
    } catch (err) {
      setError('Erreur lors de la création de l’utilisateur.');
      console.error('Erreur lors de la création de l’utilisateur :', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-md p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Ajouter un Utilisateur</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
