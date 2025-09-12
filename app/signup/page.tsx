"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // <-- new import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@rby.com");
  const [password, setPassword] = useState("ChangeMe!123");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR" | "VIEWER">("ADMIN"); // pick default
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      phoneNumber: phoneNumber || undefined, // optional
    });

    if (error) {
      setErr(error.message || "Sign up failed");
    } else {
      // For demo purposes we immediately PATCH the role to ADMIN
      // In production you’d do this server-side or via admin panel
      await authClient.organization.updateMemberRole({
        userId: data.user.id,
        role,
      });

      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <Card className="w-full max-w-md border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            Create Account
          </CardTitle>
          <CardDescription>
            Enter your details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Phone Number (optional) */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Role selector */}
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Error */}
            {err && <p className="text-sm text-red-500">{err}</p>}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("admin@rby.com");
//   const [password, setPassword] = useState("ChangeMe!123");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErr(null);
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/[...all]", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "signUp",
//           body: { email, password },
//         }),
//       });
//       if (!res.ok) {
//         const j = await res.json().catch(() => ({}));
//         throw new Error(j.error || "Sign up failed");
//       }
//       router.push("/login");
//     } catch (e: any) {
//       setErr(e.message || "Sign up failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl font-bold text-gray-800">Create Admin (temp)</CardTitle>
//           <CardDescription>Use this once, then remove this page.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             {err && <p className="text-sm text-red-500">{err}</p>}
//             <Button type="submit" disabled={loading} className="w-full bg-[#be965b] hover:bg-yellow-600 text-white">
//               {loading ? "Creating..." : "Create"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
