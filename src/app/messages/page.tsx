export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold">Chats</h2>
        <ul className="mt-4">
          <li className="py-2 px-3 bg-blue-100 rounded-md cursor-pointer">Alice</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Bob</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Charlie</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Group Chat</li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Alice</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">New Message</button>
        </header>
        
        {/* Messages List */}
        <div className="flex-1 bg-white shadow-md rounded-md p-4 overflow-y-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`p-2 my-2 max-w-xs ${i % 2 === 0 ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end'} rounded-md`}> 
              Message {i + 1} 
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="mt-4 flex">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 p-2 border rounded-md" 
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
        </div>
      </main>
    </div>
  );
}