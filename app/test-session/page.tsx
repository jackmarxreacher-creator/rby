// Test page to debug session issues
import { getAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function TestSessionPage() {
  try {
    console.log("=== SESSION DEBUG ===");
    
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    console.log("All cookies:", allCookies);
    
    const session = await getAuth();
    console.log("Session result:", session);
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Session Debug</h1>
        <div className="space-y-4">
          <div>
            <strong>Cookies:</strong>
            <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">
              {allCookies || "No cookies"}
            </pre>
          </div>
          <div>
            <strong>Session:</strong>
            <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
          <div>
            <strong>User:</strong>
            <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">
              {session?.user ? JSON.stringify(session.user, null, 2) : "No user"}
            </pre>
          </div>
        </div>
        <div className="mt-8">
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Login
          </a>
          <a href="/cms" className="bg-green-500 text-white px-4 py-2 rounded ml-4">
            Try CMS
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Session debug error:", error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Session Debug Error</h1>
        <pre className="bg-red-100 p-4 text-red-800">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <div className="mt-4">
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Login
          </a>
        </div>
      </div>
    );
  }
}