import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskUpdate from './TaskUpdate';
import StatusUpdatePopup from './StatusUpdatePopup'; 

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [statusPopupTaskId, setStatusPopupTaskId] = useState(null); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tasks/all');
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await axios.delete(`http://localhost:3002/tasks/${taskId}`);
        setMessage('Tâche supprimée avec succès.');
        fetchTasks();
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
        setMessage('Erreur lors de la suppression de la tâche.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des Tâches</h1>
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">{message}</div>}

      <button
        onClick={() => setShowAddTaskForm(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Ajouter une tâche
      </button>
      {showAddTaskForm && (
        <TaskForm
          onClose={() => setShowAddTaskForm(false)}
          onTaskCreated={fetchTasks}
          users={users}
          setMessage={setMessage}
        />
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Titre</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Assigné à</th>
            <th className="py-2 px-4 border-b">Statut</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="text-center border-t">
              <td className="py-2 px-4 border-b">{task._id}</td>
              <td className="py-2 px-4 border-b">{task.title}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.assigned_to ? task.assigned_to.name : 'Non assigné'}</td>
              <td className="py-2 px-4 border-b">{task.status}</td>
              <td className="py-2 px-4 border-b">{task.due_date.split('T')[0]}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => setTaskToUpdate(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Modifier
                </button>
                <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Supprimer
                </button>
                <button onClick={() => setStatusPopupTaskId(task._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
                  Changer Statut
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {taskToUpdate && (
        <TaskUpdate
          task={taskToUpdate}
          onUpdate={fetchTasks}
          onCancel={() => setTaskToUpdate(null)}
          users={users}
          setMessage={setMessage}
        />
      )}
      {statusPopupTaskId && (
        <StatusUpdatePopup
          taskId={statusPopupTaskId}
          currentStatus={tasks.find(task => task._id === statusPopupTaskId).status}
          onClose={() => setStatusPopupTaskId(null)}
          onStatusChanged={fetchTasks}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default TasksPage;
