"use server";
import { createRequest } from "@/app/cms/requests/actions";

export async function submitRequest(data: FormData) {
  // 1️⃣  create the order (guest flag = true)
  const res = await createRequest(data, true);
  return res;
}



// "use server";
// import { createRequest } from "@/app/cms/requests/actions";

// export async function submitRequest(data: FormData) {
//   // 1️⃣  create the order
//   await createRequest(data);
//   // 2️⃣  NO redirect – client will show appreciation card + countdown → home
// }





// "use server";
// import { createRequest } from "@/app/cms/requests/actions";
// import { redirect } from "next/navigation";

// export async function submitRequest(data: FormData) {
//   await createRequest(data);          // creates the order
//   redirect("/");                      // ➜ send public users to home
// }




// "use server";
// import { createRequest } from "@/app/cms/requests/actions";

// export async function submitRequest(data: FormData) {
//   // delegate to the existing CMS logic
//   return createRequest(data);
// }

