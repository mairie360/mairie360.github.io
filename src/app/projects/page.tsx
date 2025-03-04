'use client';

import { useState } from 'react';

export default function Page() {
  const [view, setView] = useState('kanban');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold">Project Views</h2>
        <ul className="mt-4">
          <li
            onClick={() => setView('kanban')}
            className={`py-2 px-3 rounded-md cursor-pointer ${view === 'kanban' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
          >
            Kanban
          </li>
          <li
            onClick={() => setView('table')}
            className={`py-2 px-3 mt-2 cursor-pointer ${view === 'table' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
          >
            Table
          </li>
          <li
            onClick={() => setView('roadmap')}
            className={`py-2 px-3 mt-2 cursor-pointer ${view === 'roadmap' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
          >
            Roadmap
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Project Overview</h1>
        </header>

        {/* Conditional View Rendering */}
        {view === 'kanban' && (
          <div className="flex gap-8">
            {['To Do', 'In Progress', 'Completed'].map(status => (
              <div key={status} className="w-64 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{status}</h3>
                <div className="bg-gray-200 p-3 mb-2 rounded-md shadow-sm">Task 1</div>
                <div className="bg-gray-200 p-3 mb-2 rounded-md shadow-sm">Task 2</div>
              </div>
            ))}
          </div>
        )}

        {view === 'table' && (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Task</th>
                <th className="border-b px-4 py-2 text-left">Status</th>
                <th className="border-b px-4 py-2 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b px-4 py-2">Task 1</td>
                <td className="border-b px-4 py-2">To Do</td>
                <td className="border-b px-4 py-2">2025-03-01</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Task 2</td>
                <td className="border-b px-4 py-2">In Progress</td>
                <td className="border-b px-4 py-2">2025-03-10</td>
              </tr>
            </tbody>
          </table>
        )}

        {view === 'roadmap' && (
          <div className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">Milestone 1</h3>
              <p className="text-sm text-gray-600">Due Date: 2025-03-01</p>
              <ul className="mt-4 list-disc pl-6">
                <li className="text-sm">Task 1</li>
                <li className="text-sm">Task 2</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">Milestone 2</h3>
              <p className="text-sm text-gray-600">Due Date: 2025-04-01</p>
              <ul className="mt-4 list-disc pl-6">
                <li className="text-sm">Task 3</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}