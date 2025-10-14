"use server";

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { getAuth } from "@/lib/auth";
import { logUserActivity } from "@/lib/logging";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function uploadImage(file: File | undefined) {
  if (!file || file.size === 0) return undefined;
  await ensureDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/images/users/${filename}`;
}

// Zod enums matching prisma
const StaffRoleEnum = z.enum(["ADMIN", "EDITOR", "MANAGER", "STAFF"]);
const DepartmentEnum = z.enum(["Administration", "Finance", "HR", "Sales", "Warehouse"]);

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: StaffRoleEnum.optional(),
  phoneNumber: z.string().optional(),
  department: DepartmentEnum.optional(),
  image: z.any().optional(),
});

type ActionResult = { ok: boolean; message?: string };

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function deleteUser(id: string) {
  try {
    const session = await getAuth();
    if (!session?.user?.id) return { ok: false, message: "Unauthorized" };

    const existingUser = await prisma.user.findUnique({ where: { id } });
    const name = existingUser?.name;
    if (existingUser?.image) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
      } catch {}
    }
    await prisma.user.delete({ where: { id } });

    await logUserActivity(
      session.user.id,
      "delete_user",
      `User deleted user profile with id=${id}`,
      { deletedUserId: id }
    );

    revalidatePath("/cms/users");
    return { ok: true, message: `Deleted user ${name ?? id}` };
  } catch (error: any) {
    console.error("deleteUser error", error);
    return { ok: false, message: error?.message || "Failed to delete user" };
  }
}

export async function createUser(form: FormData) {
  try {
    const values = {
      name: form.get("name") as string | null,
      email: form.get("email") as string | null,
      password: form.get("password") as string | null,
      role: form.get("role") as string | null,
      phoneNumber: form.get("phoneNumber") as string | null,
      department: form.get("department") as string | null,
      image: form.get("image") as File | undefined,
    };

    const parsed = userSchema.partial().parse(values);

    if (!parsed.email || !parsed.name) {
      return { ok: false, message: "name and email are required" } as ActionResult;
    }

    // Prevent duplicate email
    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) return { ok: false, message: "Email already taken" } as ActionResult;

    // Optional: handle image upload
    const imagePath = await uploadImage(parsed.image as File | undefined);

    const passwordToStore = parsed.password ? await (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = require("bcryptjs");
        return await bcrypt.hash(parsed.password!, 10);
      } catch (e) {
        return undefined;
      }
    })() : undefined;

    const created = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        emailVerified: false,
        role: (parsed.role as any) || undefined,
        phoneNumber: parsed.phoneNumber || undefined,
        department: (parsed.department as any) || undefined,
        image: imagePath || undefined,
      },
    });

    if (passwordToStore) {
      await prisma.account.create({
        data: {
          userId: created.id,
          accountId: created.id,
          providerId: "credential",
          password: passwordToStore,
        },
      });
    }

    await logUserActivity(null as any, "create_user", `Created user ${created.id}`, { createdUserId: created.id });

    revalidatePath("/cms/users");
    return { ok: true } as ActionResult;
  } catch (error: any) {
    if (error instanceof z.ZodError)
      return { ok: false, message: error.issues.map((i) => i.message).join(", ") } as ActionResult;
    return { ok: false, message: error?.message || "Failed to create user" } as ActionResult;
  }
}

export async function updateUser(id: string, form: FormData) {
  try {
    const values = {
      name: form.get("name") as string | null,
      email: form.get("email") as string | null,
      password: form.get("password") as string | null,
      role: form.get("role") as string | null,
      phoneNumber: form.get("phoneNumber") as string | null,
      department: form.get("department") as string | null,
      image: form.get("image") as File | undefined,
    };

    const parsed = userSchema.partial().parse(values);

    // Email uniqueness check
    if (parsed.email) {
      const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
      if (existing && existing.id !== id) return { ok: false, message: "Email already in use" } as ActionResult;
    }

    // Phone uniqueness check
    if (parsed.phoneNumber) {
      const dup = await prisma.user.findUnique({ where: { phoneNumber: parsed.phoneNumber } });
      if (dup && dup.id !== id) return { ok: false, message: "Phone number already in use" } as ActionResult;
    }

    // Handle image replacement
    let imagePath: string | undefined = undefined;
    if (parsed.image instanceof File) {
      imagePath = await uploadImage(parsed.image);
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (existingUser?.image) {
        try {
          await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
        } catch {}
      }
    }

    const hashedPassword = parsed.password ? await (async () => {
      try {
        const bcrypt = require("bcryptjs");
        return await bcrypt.hash(parsed.password!, 10);
      } catch (e) {
        return undefined;
      }
    })() : undefined;

    await prisma.user.update({
      where: { id },
      data: {
        name: parsed.name || undefined,
        email: parsed.email || undefined,
        role: (parsed.role as any) || undefined,
        phoneNumber: parsed.phoneNumber || undefined,
        department: (parsed.department as any) || undefined,
        ...(imagePath && { image: imagePath }),
      },
    });

    if (hashedPassword) {
      await prisma.account.updateMany({ where: { userId: id, providerId: "credential" }, data: { password: hashedPassword } });
    }

    await logUserActivity(null as any, "update_user", `Updated user ${id}`, { updatedUserId: id });
    revalidatePath("/cms/users");
    return { ok: true, message: "User updated" } as ActionResult;
  } catch (error: any) {
    if (error instanceof z.ZodError)
      return { ok: false, message: error.issues.map((i) => i.message).join(", ") } as ActionResult;
    return { ok: false, message: error?.message || "Failed to update user" } as ActionResult;
  }
}
// export async function createUser(data: FormData) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.parse(formValues);
//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;
//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;

//     const { data: userData, error } = await authClient.signUp.email({
//       email: validatedData.email!,
//       password: validatedData.password!,
//       name: validatedData.name!,
//     });

//     if (error) {
//       throw new Error(error.message || "Failed to create user");
//     }

//     await prisma.user.update({
//       where: { id: userData.user.id },
//       data: {
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     await logUserActivity(
//       user.id,
//       "create_user",
//       `User created a new user with id=${userData.user.id} and email=${validatedData.email}`,
//       { createdUserId: userData.user.id }
//     );

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({
//         where: { email: validatedData.email },
//       });
//       if (existingUser && existingUser.id !== id)
//         throw new Error("Email already taken.");
//     }

//     if (validatedData.phoneNumber) {
//       const duplicatePhone = await prisma.user.findUnique({
//         where: { phoneNumber: validatedData.phoneNumber },
//       });
//       if (duplicatePhone && duplicatePhone.id !== id)
//         throw new Error("Phone number already in use.");
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);
//       const existingUser = await prisma.user.findUnique({ where: { id } });
//       if (existingUser?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
//         } catch {}
//       }
//     }

//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     if (validatedData.password) {
//       throw new Error("Password update is not supported via CMS user form currently.");
//     }

//     await logUserActivity(
//       user.id,
//       "update_user",
//       `User updated user profile with id=${id} and email=${validatedData.email}`,
//       { updatedUserId: id }
//     );

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   try {
//     const existingUser = await prisma.user.findUnique({ where: { id } });
//     if (existingUser?.image) {
//       try {
//         await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
//       } catch {}
//     }
//     await prisma.user.delete({ where: { id } });

//     await logUserActivity(
//       user.id,
//       "delete_user",
//       `User deleted user profile with id=${id}`,
//       { deletedUserId: id }
//     );

//     revalidatePath("/cms/users");
//   } catch (error) {
//     throw new Error("Failed to delete user: " + (error as Error).message);
//   }
// }

// export async function getUsers() {
//   return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getUser(id: string) {
//   return prisma.user.findUnique({ where: { id } });
// }





// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";
// import { authClient } from "@/lib/auth-client"; // Import better auth client

// import { getCurrentUser } from "@/lib/auth-server";
// import { logUserActivity } from "@/lib/logging";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/users/${filename}`;
// }

// Legacy RoleEnum with VIEWER removed; roles are now ADMIN, EDITOR, MANAGER, STAFF

// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters").optional(),
//   role: RoleEnum.optional(),
//   phoneNumber: z.string().optional(),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) =>
//         !file ||
//         file === "" ||
//         file === null ||
//         (file instanceof File && file.size > 0),
//       "Invalid file upload"
//     ),
// });

// export async function createUser(data: FormData) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.parse(formValues);
//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;
//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;

//     // Use Better Auth client signUp.email() for user creation & password hashing
//     const { data: userData, error } = await authClient.signUp.email({
//       email: validatedData.email!,
//       password: validatedData.password!,
//       name: validatedData.name!,
//     });

//     if (error) {
//       throw new Error(error.message || "Failed to create user");
//     }

//     // Update more user fields in DB not managed by Better Auth signup
//     await prisma.user.update({
//       where: { id: userData.user.id },
//       data: {
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     await logUserActivity(
//       user.id,
//       "create_user",
//       `User created a new user with id=${userData.user.id} and email=${validatedData.email}`,
//       { createdUserId: userData.user.id }
//     );

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     /*  email uniqueness  */
//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({
//         where: { email: validatedData.email },
//       });
//       if (existingUser && existingUser.id !== id)
//         throw new Error("Email already taken.");
//     }

//     /*  phone duplicate guard  */
//     if (validatedData.phoneNumber) {
//       const duplicatePhone = await prisma.user.findUnique({
//         where: { phoneNumber: validatedData.phoneNumber },
//       });
//       if (duplicatePhone && duplicatePhone.id !== id)
//         throw new Error("Phone number already in use.");
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);
//       const existingUser = await prisma.user.findUnique({ where: { id } });
//       if (existingUser?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
//         } catch {}
//       }
//     }

//     // Update user record
//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     // If password is provided, update via Better Auth API or manage hash correctly
//     if (validatedData.password) {
//       throw new Error("Password update is not supported via CMS user form currently.");
//     }

//     await logUserActivity(
//       user.id,
//       "update_user",
//       `User updated user profile with id=${id} and email=${validatedData.email}`,
//       { updatedUserId: id }
//     );

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   const user = await getCurrentUser();
//   if (!session?.session?.user?.id) throw new Error("Unauthorized");

//   const existingUser = await prisma.user.findUnique({ where: { id } });
//   if (existingUser?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", existingUser.image));
//     } catch {}
//   }
//   await prisma.user.delete({ where: { id } });

//   await logUserActivity(
//     user.id,
//     "delete_user",
//     `User deleted user profile with id=${id}`,
//     { deletedUserId: id }
//   );

//   revalidatePath("/cms/users");
// }

// export async function getUsers() {
//   return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getUser(id: string) {
//   return prisma.user.findUnique({ where: { id } });
// }







// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";
// import { authClient } from "@/lib/auth-client"; // Import better auth client

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/users/${filename}`;
// }

// Legacy RoleEnum with VIEWER removed; roles are now ADMIN, EDITOR, MANAGER, STAFF

// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters").optional(),
//   role: RoleEnum.optional(),
//   phoneNumber: z.string().optional(),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) =>
//         !file ||
//         file === "" ||
//         file === null ||
//         (file instanceof File && file.size > 0),
//       "Invalid file upload"
//     ),
// });

// export async function createUser(data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.parse(formValues);
//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     // Upload image if present
//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;
//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;

//     // Use Better Auth client signUp.email() for user creation & password hashing
//     const { data: userData, error } = await authClient.signUp.email({
//       email: validatedData.email!,
//       password: validatedData.password!,
//       name: validatedData.name!,
//     });

//     if (error) {
//       throw new Error(error.message || "Failed to create user");
//     }

//     // Update more user fields in DB not managed by Better Auth signup
//     await prisma.user.update({
//       where: { id: userData.user.id },
//       data: {
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     /*  email uniqueness  */
//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({
//         where: { email: validatedData.email },
//       });
//       if (existingUser && existingUser.id !== id)
//         throw new Error("Email already taken.");
//     }

//     /*  phone duplicate guard  */
//     if (validatedData.phoneNumber) {
//       const duplicatePhone = await prisma.user.findUnique({
//         where: { phoneNumber: validatedData.phoneNumber },
//       });
//       if (duplicatePhone && duplicatePhone.id !== id)
//         throw new Error("Phone number already in use.");
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);
//       const user = await prisma.user.findUnique({ where: { id } });
//       if (user?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", user.image));
//         } catch {}
//       }
//     }

//     // Update user record
//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     // If password is provided, update via Better Auth API or manage hash correctly
//     if (validatedData.password) {
//       // Better Auth does not expose direct password update via API currently,
//       // So manual update with bcrypt hash will not work
//       // You would need to implement a password reset flow or use internal API if available
//       throw new Error("Password update is not supported via CMS user form currently.");
//     }

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   const user = await prisma.user.findUnique({ where: { id } });
//   if (user?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", user.image));
//     } catch {}
//   }
//   await prisma.user.delete({ where: { id } });
//   revalidatePath("/cms/users");
// }

// export async function getUsers() {
//   return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getUser(id: string) {
//   return prisma.user.findUnique({ where: { id } });
// }





// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import bcrypt from "bcryptjs";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/users/${filename}`;
// }

// Legacy RoleEnum with VIEWER removed; roles are now ADMIN, EDITOR, MANAGER, STAFF

// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters").optional(),
//   role: RoleEnum.optional(),
//   phoneNumber: z.string().optional(),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) =>
//         !file ||
//         file === "" ||
//         file === null ||
//         (file instanceof File && file.size > 0),
//       "Invalid file upload"
//     ),
// });

// export async function createUser(data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const existingUser = await prisma.user.findUnique({
//       where: { email: String(formValues.email) },
//     });
//     if (existingUser) throw new Error("Email already taken.");

//     /*  NEW  ----  phone duplicate guard  ----  */
//     if (formValues.phoneNumber) {
//       const duplicatePhone = await prisma.user.findUnique({
//         where: { phoneNumber: String(formValues.phoneNumber) },
//       });
//       if (duplicatePhone) throw new Error("Phone number already in use.");
//     }

//     const validatedData = userSchema.parse(formValues);
//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;

//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;
//     const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         emailVerified: false,
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         image: imagePath,
//       },
//     });

//     await prisma.account.create({
//       data: {
//         userId: user.id,
//         accountId: user.id,
//         providerId: "credential",
//         password: hashedPassword,
//       },
//     });

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     /*  email uniqueness  */
//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({
//         where: { email: validatedData.email },
//       });
//       if (existingUser && existingUser.id !== id)
//         throw new Error("Email already taken.");
//     }

//     /*  NEW  ----  phone duplicate guard  ----  */
//     if (validatedData.phoneNumber) {
//       const duplicatePhone = await prisma.user.findUnique({
//         where: { phoneNumber: validatedData.phoneNumber },
//       });
//       if (duplicatePhone && duplicatePhone.id !== id)
//         throw new Error("Phone number already in use.");
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) fileToUpload = validatedData.image;

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);
//       const user = await prisma.user.findUnique({ where: { id } });
//       if (user?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", user.image));
//         } catch {}
//       }
//     }

//     const hashedPassword = validatedData.password
//       ? await bcrypt.hash(validatedData.password, 10)
//       : undefined;

//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     if (hashedPassword) {
//       await prisma.account.updateMany({
//         where: { userId: id, providerId: "local" },
//         data: { password: hashedPassword },
//       });
//     }

//     revalidatePath("/cms/users");
//   } catch (error: any) {
//     if (error instanceof z.ZodError)
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   const user = await prisma.user.findUnique({ where: { id } });
//   if (user?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", user.image));
//     } catch {}
//   }
//   await prisma.user.delete({ where: { id } });
//   revalidatePath("/cms/users");
// }

// export async function getUsers() {
//   return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getUser(id: string) {
//   return prisma.user.findUnique({ where: { id } });
// }






// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import bcrypt from "bcryptjs";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;

//   // Optional: Add file type validation here (e.g., jpeg, png)
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/users/${filename}`;
// }

// // Zod enum matching your Prisma Role enum
// Legacy RoleEnum with VIEWER removed; roles are now ADMIN, EDITOR, MANAGER, STAFF

// // Handle file validation as before
// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters").optional(),
//   role: RoleEnum.optional(),
//   phoneNumber: z.string().optional(),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) =>
//         !file ||
//         file === "" ||
//         file === null ||
//         (file instanceof File && file.size > 0),
//       "Invalid file upload"
//     ),
// });

// export async function createUser(data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     // Check if email is already taken
//     const existingUser = await prisma.user.findUnique({
//       where: { email: String(formValues.email) },
//     });

//     if (existingUser) {
//       throw new Error("Email already taken. Please use a different email.");
//     }

//     const validatedData = userSchema.parse(formValues);

//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) {
//       fileToUpload = validatedData.image;
//     }

//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;
//     const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//     // Step 1: Create user without account
//     const user = await prisma.user.create({
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         emailVerified: true,
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         image: imagePath,
//       },
//     });

//     // Step 2: Create account linked to user with correct IDs
//     await prisma.account.create({
//       data: {
//         userId: user.id,
//         accountId: user.id,
//         providerId: "local",
//         password: hashedPassword,
//       },
//     });

//     revalidatePath("/cms/users");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       console.error("Validation issues:", error.issues);
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     }
//     console.error("Failed to create user:", error);
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     // Check if email changed and is available
//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
//       if (existingUser && existingUser.id !== id) {
//         throw new Error("Email already taken. Please choose another.");
//       }
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) {
//       fileToUpload = validatedData.image;
//     }

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);

//       // Delete previous image
//       const user = await prisma.user.findUnique({ where: { id } });
//       if (user?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", user.image));
//         } catch {}
//       }
//     }

//     const hashedPassword = validatedData.password
//       ? await bcrypt.hash(validatedData.password, 10)
//       : undefined;

//     // Update user data
//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     // Update account password if provided
//     if (hashedPassword) {
//       await prisma.account.updateMany({
//         where: { userId: id, providerId: "local" },
//         data: { password: hashedPassword },
//       });
//     }

//     revalidatePath("/cms/users");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       console.error("Validation issues:", error.issues);
//       throw new Error(error.issues.map((e) => e.message).join(", "));
//     }
//     console.error("Failed to update user:", error);
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });
//     if (user?.image) {
//       try {
//         await fs.unlink(path.join(process.cwd(), "public", user.image));
//       } catch {
//         /* ignore */
//       }
//     }
//     await prisma.user.delete({ where: { id } });
//     revalidatePath("/cms/users");
//   } catch (error) {
//     console.error("Failed to delete user:", error);
//     throw error;
//   }
// }

// export async function getUsers() {
//   try {
//     return await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     throw error;
//   }
// }

// export async function getUser(id: string) {
//   try {
//     return await prisma.user.findUnique({ where: { id } });
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw error;
//   }
// }





// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import bcrypt from "bcryptjs";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;

//   // Optional: Add file type validation here (e.g., jpeg, png)
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/users/${filename}`;
// }

// // Zod enum matching your Prisma Role enum
// Legacy RoleEnum with VIEWER removed; roles are now ADMIN, EDITOR, MANAGER, STAFF

// // Handle file validation as before
// const userSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters").optional(),
//   role: RoleEnum.optional(),
//   phoneNumber: z.string().optional(),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) =>
//         !file ||
//         file === "" ||
//         file === null ||
//         (file instanceof File && file.size > 0),
//       "Invalid file upload"
//     ),
// });

// export async function createUser(data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password"),
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     // Check if email is already taken
//     const existingUser = await prisma.user.findUnique({
//       where: { email: String(formValues.email) },
//     });

//     if (existingUser) {
//       throw new Error("Email already taken. Please use a different email.");
//     }

//     const validatedData = userSchema.parse(formValues);

//     if (!validatedData.password)
//       throw new Error("Password is required for new user");

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) {
//       fileToUpload = validatedData.image;
//     }

//     const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;
//     const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//     // Step 1: Create user without account
//     const user = await prisma.user.create({
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         emailVerified: true,
//         // VIEWER removed: no client-side default role. Admins should assign roles via CMS.
//         role: validatedData.role || undefined,
//         phoneNumber: validatedData.phoneNumber,
//         image: imagePath,
//       },
//     });

//     // Step 2: Create account linked to user with correct IDs
//     await prisma.account.create({
//       data: {
//         userId: user.id,
//         accountId: user.id,
//         providerId: "local",
//         password: hashedPassword,
//       },
//     });

//     revalidatePath("/cms/users");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       console.error("Validation errors:", error.errors);
//       throw new Error(error.errors.map((e) => e.message).join(", "));
//     }
//     console.error("Failed to create user:", error);
//     throw error;
//   }
// }

// export async function updateUser(id: string, data: FormData) {
//   try {
//     const formValues = {
//       name: data.get("name"),
//       email: data.get("email"),
//       password: data.get("password") || undefined,
//       role: data.get("role"),
//       phoneNumber: data.get("phoneNumber"),
//       image: data.get("image") as File | undefined,
//     };

//     const validatedData = userSchema.partial().parse(formValues);

//     // Check if email changed and is available
//     if (validatedData.email) {
//       const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
//       if (existingUser && existingUser.id !== id) {
//         throw new Error("Email already taken. Please choose another.");
//       }
//     }

//     let fileToUpload: File | undefined = undefined;
//     if (validatedData.image instanceof File) {
//       fileToUpload = validatedData.image;
//     }

//     let imagePath: string | undefined = undefined;
//     if (fileToUpload) {
//       imagePath = await uploadImage(fileToUpload);

//       // Delete previous image
//       const user = await prisma.user.findUnique({ where: { id } });
//       if (user?.image) {
//         try {
//           await fs.unlink(path.join(process.cwd(), "public", user.image));
//         } catch {}
//       }
//     }

//     const hashedPassword = validatedData.password
//       ? await bcrypt.hash(validatedData.password, 10)
//       : undefined;

//     // Update user data
//     await prisma.user.update({
//       where: { id },
//       data: {
//         name: validatedData.name,
//         email: validatedData.email,
//         role: validatedData.role,
//         phoneNumber: validatedData.phoneNumber,
//         ...(imagePath && { image: imagePath }),
//       },
//     });

//     // Update account password if provided
//     if (hashedPassword) {
//       await prisma.account.updateMany({
//         where: { userId: id, providerId: "local" },
//         data: { password: hashedPassword },
//       });
//     }

//     revalidatePath("/cms/users");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       console.error("Validation errors:", error.errors);
//       throw new Error(error.errors.map((e) => e.message).join(", "));
//     }
//     console.error("Failed to update user:", error);
//     throw error;
//   }
// }

// export async function deleteUser(id: string) {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });
//     if (user?.image) {
//       try {
//         await fs.unlink(path.join(process.cwd(), "public", user.image));
//       } catch {
//         /* ignore */
//       }
//     }
//     await prisma.user.delete({ where: { id } });
//     revalidatePath("/cms/users");
//   } catch (error) {
//     console.error("Failed to delete user:", error);
//     throw error;
//   }
// }

// export async function getUsers() {
//   try {
//     return await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     throw error;
//   }
// }

// export async function getUser(id: string) {
//   try {
//     return await prisma.user.findUnique({ where: { id } });
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw error;
//   }
// }
