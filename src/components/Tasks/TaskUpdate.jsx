import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskUpdate = ({ task, onUpdate, onCancel, users, setMessage }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assigned_to, setAssignedTo] = useState(task.assigned_to ? task.assigned_to._id : '');
  const [status, setStatus] = useState(task.status);
  const [due_date, setDueDate] = useState(task.due_date.split('T')[0]); // Convertir la date en format YYYY-MM-DD

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setAssignedTo(task.assigned_to ? task.assigned_to._id : '');
    setStatus(task.status);
    setDueDate(task.due_date.split('T')[0]); // Convertir la date en format YYYY-MM-DD
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3002/tasks/${task._id}`, {
        title,
        description,
        assigned_to: assigned_to ? assigned_to : null,
        status,
        due_date,
      });
      console.log('tasks udpade:',response)
      onUpdate();
      setMessage('Tâche mise à jour avec succès.');
      onCancel();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      setMessage('Erreur lors de la mise à jour de la tâche.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Modifier une tâche</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Titre</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Assigné à</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={assigned_to}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Non assigné</option>
              {users.map((user) => (
                <option key={user._id } value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Statut</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminé">Terminé</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date d'échéance</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded"
              value={due_date}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdate;
