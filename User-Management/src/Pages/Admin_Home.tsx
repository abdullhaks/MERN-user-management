import { Link } from "react-router-dom";

function Admin_Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
      </header>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="bg-blue-800 text-white w-64 p-4 space-y-4">
          <div className="font-semibold text-lg mb-6">Navigation</div>
          <Link
            to="/admin/admin-users"
            className="block p-2 rounded hover:bg-blue-700"
          >
            User Management
          </Link>
          <Link
            to="/admin"
            className="block p-2 rounded hover:bg-blue-700"
          >
            Settings
          </Link>
          <Link
            to="/admin"
            className="block p-2 rounded hover:bg-blue-700"
          >
            Analytics
          </Link>
        </aside>

        {/* Main Section */}
        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to Admin Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Management Section */}
            <Link
              to="/admin/admin-users"
              className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-bold text-blue-900">User Management</h3>
              <p className="text-gray-600 mt-2">
                View and manage all users in the system.
              </p>
            </Link>

            {/* Reports Section */}
            <Link
              to="/admin"
              className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-bold text-blue-900">Reports</h3>
              <p className="text-gray-600 mt-2">
                Generate and view detailed system reports.
              </p>
            </Link>

            {/* Settings Section */}
            <Link
              to="/admin"
              className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-bold text-blue-900">Settings</h3>
              <p className="text-gray-600 mt-2">
                Configure system preferences and settings.
              </p>
            </Link>

            {/* Analytics Section */}
            <Link
              to="/admin"
              className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-bold text-blue-900">Analytics</h3>
              <p className="text-gray-600 mt-2">
                View data insights and analytics.
              </p>
            </Link>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2024 Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

export default Admin_Home;
