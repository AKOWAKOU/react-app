import React, { useState } from 'react';
import TasksPage from './components/Tasks/TasksPage';
import UsersPage from './components/Users/UsersPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div>
      <header className="bg-gray-800 p-4 flex justify-center">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 text-white ${activeTab === 'tasks' ? 'bg-blue-500' : 'bg-gray-600'} rounded-l`}
        >
          Tâches
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-white ${activeTab === 'users' ? 'bg-blue-500' : 'bg-gray-600'} rounded-r`}
        >
          Utilisateurs
        </button>
      </header>
      <div className="p-4">
        {activeTab === 'tasks' ? <TasksPage /> : <UsersPage />}
      </div>
    </div>
  );
};

export default App;
