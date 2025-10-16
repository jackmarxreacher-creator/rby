import StatsCards from "./sections/StatsCards";
import RecentCustomers from "./sections/RecentCustomers";
import RecentRequests from "./sections/RecentRequests";
import QuickActions from "./sections/QuickActions";

export default function CmsDashboardPage() {
  return (
    <div>
      {/* Stats Section */}
      <StatsCards />

      {/* Customers + Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentCustomers />
        <RecentRequests />
      </div>

      {/* Quick Actions */}
      <QuickActions />
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
