"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface Props {
  initial?: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string | null;
    role?: "ADMIN" | "EDITOR" | "VIEWER";
  };
  onSave: (data: FormData) => Promise<void>;
}

const MAX_FILE_SIZE = 5_000_000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const roles = ["VIEWER", "EDITOR", "ADMIN"] as const;

export function UserForm({ initial, onSave }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Create a dynamic schema based on whether we are editing or creating
  const createSchema = () =>
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: initial
        ? z.string().min(0).optional() // editing: password optional
        : z.string().min(6, "Password must be at least 6 characters"), // creating: required
      phoneNumber: z.string().optional(),
      role: z.enum(roles),
      image: z
        .any()
        .optional()
        .refine(
          (file) => {
            if (!file) return true;
            return (
              file instanceof File &&
              ACCEPTED_IMAGE_TYPES.includes(file.type) &&
              file.size <= MAX_FILE_SIZE
            );
          },
          "Invalid or too large file; only jpeg, jpg, png, webp up to 5MB allowed"
        ),
    });

  // Instantiate schema dynamically so it is reactive to "initial" on first render only
  const [userFormSchema] = useState(createSchema);

  type FormDataType = z.infer<typeof userFormSchema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: initial?.name || "",
      email: initial?.email || "",
      phoneNumber: initial?.phoneNumber ?? "",
      role: initial?.role || "VIEWER",
      password: "",
      image: undefined,
    },
  });

  async function onSubmit(data: FormDataType) {
    setErr(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber ?? "");
      formData.append("role", data.role);
      if (data.password) formData.append("password", data.password);
      if (data.image) formData.append("image", data.image);

      await onSave(formData);
      router.push("/cms/users");
    } catch (e: any) {
      setErr(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-[#1c1c1c]">
          {initial ? "Edit User" : "Add User"}
        </CardTitle>
        <CardDescription className="text-[#4a4a4a]">
          Fill in the details below
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label>Name</Label>
            <Input
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label>Phone (optional)</Label>
              <Input
                type="tel"
                {...register("phoneNumber")}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label>Password{!initial && " (required)"}</Label>
            <Input
              type="password"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              required={!initial}
              className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Image</Label>
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="border-[#cccccc] file:bg-[#be965b] file:text-black file:font-medium"
                  />
                )}
              />
              {errors.image && (
                <p className="text-sm text-red-600">
                  {String(errors.image.message)} {/* ✅ coerce to string */}
                </p>
              )}
            </div>

            <div>
              <Label>Role</Label>
              <select
                {...register("role")}
                className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2 text-sm focus:border-[#be965b] focus:ring-[#be965b]"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-sm text-red-600">
                  {String(errors.role.message)} {/* ✅ coerce to string */}
                </p>
              )}
            </div>
          </div>

          {err && <p className="text-sm text-[#7b2e2e]">{err}</p>}

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#be965b] hover:bg-[#a88248] text-black"
            >
              {loading ? "Saving…" : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="border-[#cccccc] text-[#4a4a4a] hover:bg-[#f3ede5]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}





// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

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

// interface Props {
//   initial?: {
//     id?: string;
//     name?: string;
//     email?: string;
//     phoneNumber?: string | null;
//     role?: "ADMIN" | "EDITOR" | "VIEWER";
//   };
//   onSave: (data: FormData) => Promise<void>;
// }

// const MAX_FILE_SIZE = 5_000_000; // 5MB
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// const roles = ["VIEWER", "EDITOR", "ADMIN"] as const;

// export function UserForm({ initial, onSave }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   // Create a dynamic schema based on whether we are editing or creating
//   const createSchema = () =>
//     z.object({
//       name: z.string().min(1, "Name is required"),
//       email: z.string().email("Invalid email address"),
//       password: initial
//         ? z.string().min(0).optional() // editing: password optional
//         : z.string().min(6, "Password must be at least 6 characters"), // creating: required
//       phoneNumber: z.string().optional(),
//       role: z.enum(roles),
//       image: z
//         .any()
//         .optional()
//         .refine(
//           (file) => {
//             if (!file) return true;
//             return (
//               file instanceof File &&
//               ACCEPTED_IMAGE_TYPES.includes(file.type) &&
//               file.size <= MAX_FILE_SIZE
//             );
//           },
//           "Invalid or too large file; only jpeg, jpg, png, webp up to 5MB allowed"
//         ),
//     });

//   // Instantiate schema dynamically so it is reactive to "initial" on first render only
//   const [userFormSchema] = useState(createSchema);

//   type FormDataType = z.infer<typeof userFormSchema>;

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormDataType>({
//     resolver: zodResolver(userFormSchema),
//     defaultValues: {
//       name: initial?.name || "",
//       email: initial?.email || "",
//       phoneNumber: initial?.phoneNumber ?? "",
//       role: initial?.role || "VIEWER",
//       password: "",
//       image: undefined,
//     },
//   });

//   async function onSubmit(data: FormDataType) {
//     setErr(null);
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("phoneNumber", data.phoneNumber ?? "");
//       formData.append("role", data.role);
//       if (data.password) formData.append("password", data.password);
//       if (data.image) formData.append("image", data.image);

//       await onSave(formData);
//       router.push("/cms/users");
//     } catch (e: any) {
//       setErr(e.message || "Save failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm">
//       <CardHeader className="text-center">
//         <CardTitle className="text-xl font-bold text-[#1c1c1c]">
//           {initial ? "Edit User" : "Add User"}
//         </CardTitle>
//         <CardDescription className="text-[#4a4a4a]">
//           Fill in the details below
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//           <div>
//             <Label>Name</Label>
//             <Input
//               {...register("name")}
//               aria-invalid={errors.name ? "true" : "false"}
//               className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 {...register("email")}
//                 aria-invalid={errors.email ? "true" : "false"}
//                 className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-600">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <Label>Phone (optional)</Label>
//               <Input
//                 type="tel"
//                 {...register("phoneNumber")}
//                 aria-invalid={errors.phoneNumber ? "true" : "false"}
//                 className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//               />
//               {errors.phoneNumber && (
//                 <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <Label>Password{!initial && " (required)"}</Label>
//             <Input
//               type="password"
//               {...register("password")}
//               aria-invalid={errors.password ? "true" : "false"}
//               required={!initial}
//               className="border-[#cccccc] focus:border-[#be965b] focus:ring-[#be965b]"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Image</Label>
//               <Controller
//                 control={control}
//                 name="image"
//                 render={({ field }) => (
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => field.onChange(e.target.files?.[0])}
//                     className="border-[#cccccc] file:bg-[#be965b] file:text-black file:font-medium"
//                   />
//                 )}
//               />
//               {errors.image && (
//                 <p className="text-sm text-red-600">{errors.image.message}</p>
//               )}
//             </div>

//             <div>
//               <Label>Role</Label>
//               <select
//                 {...register("role")}
//                 className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2 text-sm focus:border-[#be965b] focus:ring-[#be965b]"
//               >
//                 {roles.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//               {errors.role && (
//                 <p className="text-sm text-red-600">{errors.role.message}</p>
//               )}
//             </div>
//           </div>

//           {err && <p className="text-sm text-[#7b2e2e]">{err}</p>}

//           <div className="flex gap-3">
//             <Button
//               type="submit"
//               disabled={loading}
//               className="bg-[#be965b] hover:bg-[#a88248] text-black"
//             >
//               {loading ? "Saving…" : "Save"}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => window.history.back()}
//               className="border-[#cccccc] text-[#4a4a4a] hover:bg-[#f3ede5]"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


