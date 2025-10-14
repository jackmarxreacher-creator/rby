"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // ① import the client
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
import LogoSpinner from "@/components/ui/LogoSpinner"; // import spinner component

export default function CmsLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setErr(error.message || "Login failed");
      setLoading(false);
    } else {
      router.push("/cms");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <Card className="w-full max-w-md border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <img
            src="/images/logos/rby_color_logo.webp"
            alt="RBY Logo"
            className="h-12 w-12 mx-auto mb-3"
          />
          <CardTitle className="text-xl font-bold text-gray-800">
            RBY CMS Login
          </CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {err && <p className="text-sm text-red-500">{err}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
            >
              {loading ? <LogoSpinner /> : "Login"}
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
// import { authClient } from "@/lib/auth-client"; // ① import the client
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErr(null);
//     setLoading(true);

//     const { data, error } = await authClient.signIn.email({
//       email,
//       password,
//     });

//     if (error) {
//       setErr(error.message || "Login failed");
//     } else {
//       router.push("/cms");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             className="h-12 w-12 mx-auto mb-3"
//           />
//           <CardTitle className="text-xl font-bold text-gray-800">
//             RBY CMS Login
//           </CardTitle>
//           <CardDescription>Please sign in to continue</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {err && <p className="text-sm text-red-500">{err}</p>}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
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
//           action: "signIn",
//           body: { email, password },
//         }),
//       });
//       if (!res.ok) {
//         const j = await res.json().catch(() => ({}));
//         throw new Error(j.error || "Invalid credentials");
//       }
//       router.push("/cms");
//     } catch (e: any) {
//       setErr(e.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img src="/images/logos/rby_color_logo.webp" alt="RBY Logo" className="h-12 w-12 mx-auto mb-3" />
//           <CardTitle className="text-xl font-bold text-gray-800">RBY CMS Login</CardTitle>
//           <CardDescription>Please sign in to continue</CardDescription>
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
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { signIn } from "@/lib/auth-client";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await signIn.email({ email, password });

//       if (res.error) {
//         throw new Error(res.error.message || "Invalid credentials");
//       }

//       router.push("/cms");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             className="h-12 w-12 mx-auto mb-3"
//           />
//           <CardTitle className="text-xl font-bold text-gray-800">
//             RBY CMS Login
//           </CardTitle>
//           <CardDescription>Please sign in to continue</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//               />
//             </div>

//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ Correct endpoint is [...all]
//       const res = await fetch("/api/auth/[...all]", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "signIn",
//           body: { email, password },
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.error || "Invalid credentials");
//       }

//       router.push("/cms");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             className="h-12 w-12 mx-auto mb-3"
//           />
//           <CardTitle className="text-xl font-bold text-gray-800">
//             RBY CMS Login
//           </CardTitle>
//           <CardDescription>Please sign in to continue</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//               />
//             </div>

//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ Call Better Auth catch-all endpoint
//       const res = await fetch("/api/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "signIn", // tell Better Auth we want to log in
//           body: { email, password },
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.error || "Invalid credentials");
//       }

//       // ✅ Redirect on success
//       router.push("/cms");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             className="h-12 w-12 mx-auto mb-3"
//           />
//           <CardTitle className="text-xl font-bold text-gray-800">
//             RBY CMS Login
//           </CardTitle>
//           <CardDescription>Please sign in to continue</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//               />
//             </div>

//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CmsLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) throw new Error("Invalid credentials");

//       router.push("/cms");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
//       <Card className="w-full max-w-md border border-gray-200 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             src="/images/logos/rby_color_logo.webp"
//             alt="RBY Logo"
//             className="h-12 w-12 mx-auto mb-3"
//           />
//           <CardTitle className="text-xl font-bold text-gray-800">
//             RBY CMS Login
//           </CardTitle>
//           <CardDescription>
//             Please sign in to continue
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//               />
//             </div>

//             {error && (
//               <p className="text-sm text-red-500">{error}</p>
//             )}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#be965b] hover:bg-yellow-600 text-white"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
