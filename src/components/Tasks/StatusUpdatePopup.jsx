import React, { useState } from 'react';
import axios from 'axios';

const StatusUpdatePopup = ({ taskId, onClose, onStatusChanged, setMessage }) => {
  const [newStatus, setNewStatus] = useState('à faire');
  const [error, setError] = useState('');

  const handleStatusChange = async () => {
    try {
      await axios.patch(`http://localhost:3002/tasks/${taskId}/status`, { status: newStatus });
      setMessage('Statut de la tâche mis à jour avec succès.');
      onStatusChanged(); // Mettre à jour la liste des tâches
      onClose(); // Fermer la popup
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la mise à jour du statut.';
      setError(errorMessage); // Afficher l'erreur
      console.error('Erreur lors du changement de statut :', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-md p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Changer le Statut</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mb-4"
        >
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminé">Terminé</option>
        </select>
        <button
          onClick={handleStatusChange}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Modifier
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default StatusUpdatePopup;
