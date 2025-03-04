export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold">Calendars</h2>
        <ul className="mt-4">
          <li className="py-2 px-3 bg-blue-100 rounded-md cursor-pointer">Work</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Personal</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Meetings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">March 2025</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Event</button>
        </header>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold">{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className="border p-4 text-center bg-white rounded-md">
              {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
