export default function Page() {
  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 p-4 shadow-md">
        <h2 className="text-xl font-bold">Emails</h2>
        <ul className="mt-4">
          <li className="py-2 px-3 bg-primary text-primary-content rounded-md cursor-pointer">Inbox</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-base-300 rounded-md">Sent</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-base-300 rounded-md">Drafts</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-base-300 rounded-md">Spam</li>
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Inbox</h1>
          <button className="btn btn-primary">Compose</button>
        </header>
        
        {/* Email List */}
        <div className="bg-base-100 shadow-md rounded-md">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="border-b p-4 hover:bg-base-300 cursor-pointer">
              <h2 className="font-semibold">Email Subject {i + 1}</h2>
              <p className="text-sm text-base-content/70">Sender {i + 1} - Preview of the email content...</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
