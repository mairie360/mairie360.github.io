export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold">Files</h2>
        <ul className="mt-4">
          <li className="py-2 px-3 bg-blue-100 rounded-md cursor-pointer">Documents</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Images</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Videos</li>
          <li className="py-2 px-3 mt-2 cursor-pointer hover:bg-gray-200 rounded-md">Archives</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Documents</h1>
          <button className="btn btn-primary">Upload File</button>
        </header>

        {/* File List */}
        <div className="bg-white shadow-md rounded-md">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="border-b p-4 hover:bg-gray-200 cursor-pointer">
              <h2 className="font-semibold">File_{i + 1}.pdf</h2>
              <p className="text-sm text-gray-600">Size: {Math.floor(Math.random() * 500) + 100} KB</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
