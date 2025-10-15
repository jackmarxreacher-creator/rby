// Temporarily simplified for debugging
export default function CmsDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-600">🎉 CMS Dashboard - Login Successful!</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <strong>Success!</strong> You are now authenticated and viewing the CMS dashboard.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
          <p className="text-green-600">✅ Logged in successfully</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Session Status</h3>
          <p className="text-green-600">✅ Session active</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">User Role</h3>
          <p className="text-green-600">✅ ADMIN access</p>
        </div>
      </div>
      
      <div className="mt-8">
        <a href="/test-session" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          View Session Details
        </a>
        <a href="/login" className="bg-red-500 text-white px-4 py-2 rounded">
          Test Logout
        </a>
      </div>
    </div>
  );
}

// import StatsCards from "./sections/StatsCards";
// import RecentCustomers from "./sections/RecentCustomers";
// import RecentRequests from "./sections/RecentRequests";
// import QuickActions from "./sections/QuickActions";

// export default function CmsDashboardPage() {
//   return (
//     <div>
//       {/* Stats Section */}
//       <StatsCards />

//       {/* Customers + Requests */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <RecentCustomers />
//         <RecentRequests />
//       </div>

//       {/* Quick Actions */}
//       <QuickActions />
//     </div>
//   );
// }




// import StatsCards from "./sections/StatsCards";
// import RecentCustomers from "./sections/RecentCustomers";
// import RecentRequests from "./sections/RecentRequests";
// import QuickActions from "./sections/QuickActions";

// export default function CmsDashboardPage() {
//   return (
//     <div>
//       {/* Stats Section */}
//       <StatsCards />

//       {/* Customers + Requests */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <RecentCustomers />
//         <RecentRequests />
//       </div>

//       {/* Quick Actions */}
//       <QuickActions />
//     </div>
//   );
// }
