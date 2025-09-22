"use server";

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "users");

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function uploadImage(file: File) {
  if (!file || file.size === 0) return undefined;
  await ensureDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/images/users/${filename}`;
}

const RoleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: RoleEnum.optional(),
  phoneNumber: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        file === "" ||
        file === null ||
        (file instanceof File && file.size > 0),
      "Invalid file upload"
    ),
});

export async function createUser(data: FormData) {
  try {
    const formValues = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
      phoneNumber: data.get("phoneNumber"),
      image: data.get("image") as File | undefined,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: String(formValues.email) },
    });
    if (existingUser) throw new Error("Email already taken.");

    /*  NEW  ----  phone duplicate guard  ----  */
    if (formValues.phoneNumber) {
      const duplicatePhone = await prisma.user.findUnique({
        where: { phoneNumber: String(formValues.phoneNumber) },
      });
      if (duplicatePhone) throw new Error("Phone number already in use.");
    }

    const validatedData = userSchema.parse(formValues);
    if (!validatedData.password)
      throw new Error("Password is required for new user");

    let fileToUpload: File | undefined = undefined;
    if (validatedData.image instanceof File) fileToUpload = validatedData.image;

    const imagePath = fileToUpload ? await uploadImage(fileToUpload) : undefined;
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        emailVerified: true,
        role: validatedData.role ?? "VIEWER",
        phoneNumber: validatedData.phoneNumber,
        image: imagePath,
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "local",
        password: hashedPassword,
      },
    });

    revalidatePath("/cms/users");
  } catch (error: any) {
    if (error instanceof z.ZodError)
      throw new Error(error.issues.map((e) => e.message).join(", "));
    throw error;
  }
}

export async function updateUser(id: string, data: FormData) {
  try {
    const formValues = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password") || undefined,
      role: data.get("role"),
      phoneNumber: data.get("phoneNumber"),
      image: data.get("image") as File | undefined,
    };

    const validatedData = userSchema.partial().parse(formValues);

    /*  email uniqueness  */
    if (validatedData.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });
      if (existingUser && existingUser.id !== id)
        throw new Error("Email already taken.");
    }

    /*  NEW  ----  phone duplicate guard  ----  */
    if (validatedData.phoneNumber) {
      const duplicatePhone = await prisma.user.findUnique({
        where: { phoneNumber: validatedData.phoneNumber },
      });
      if (duplicatePhone && duplicatePhone.id !== id)
        throw new Error("Phone number already in use.");
    }

    let fileToUpload: File | undefined = undefined;
    if (validatedData.image instanceof File) fileToUpload = validatedData.image;

    let imagePath: string | undefined = undefined;
    if (fileToUpload) {
      imagePath = await uploadImage(fileToUpload);
      const user = await prisma.user.findUnique({ where: { id } });
      if (user?.image) {
        try {
          await fs.unlink(path.join(process.cwd(), "public", user.image));
        } catch {}
      }
    }

    const hashedPassword = validatedData.password
      ? await bcrypt.hash(validatedData.password, 10)
      : undefined;

    await prisma.user.update({
      where: { id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role,
        phoneNumber: validatedData.phoneNumber,
        ...(imagePath && { image: imagePath }),
      },
    });

    if (hashedPassword) {
      await prisma.account.updateMany({
        where: { userId: id, providerId: "local" },
        data: { password: hashedPassword },
      });
    }

    revalidatePath("/cms/users");
  } catch (error: any) {
    if (error instanceof z.ZodError)
      throw new Error(error.issues.map((e) => e.message).join(", "));
    throw error;
  }
}

export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user?.image) {
    try {
      await fs.unlink(path.join(process.cwd(), "public", user.image));
    } catch {}
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/cms/users");
}

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}






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
// const RoleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);

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
//         role: validatedData.role ?? "VIEWER",
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
// const RoleEnum = z.enum(["ADMIN", "EDITOR", "VIEWER"]);

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
//         role: validatedData.role ?? "VIEWER",
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
