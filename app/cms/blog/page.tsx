import { Suspense } from 'react';
import { listPosts } from './_utils/blogMutations.server';
import { BlogCard } from './_components/BlogCard';
import { BlogTable } from './_components/BlogTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ViewToggle } from '@/components/ui/ViewToggle';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const posts = await listPosts(false);
  const currentView: 'card' | 'table' = view === 'table' ? 'table' : 'card';

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]"></h1>

        <div className="flex items-center gap-4">
          <ViewToggle current={currentView} basePath="/cms/blog" />
          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/blog/new">Add Post</Link>
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No blog posts yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/blog/new">Create your first post</Link>
          </Button>
        </div>
      ) : currentView === 'table' ? (
        <BlogTable posts={posts} />
      ) : (
        <BlogCard posts={posts} />
      )}
    </div>
  );
}




// import { Suspense } from "react";
// import { listPosts } from "./_utils/blogMutations.server";
// import BlogCard  from "./_components/BlogCard";
// import BlogTable  from "./_components/BlogTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "@/components/ui/ViewToggle";

// export default async function BlogPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const posts = await listPosts(false); // drafts + published
//   const currentView: "card" | "table" = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Blog Posts</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/blog" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/blog/new">Add Post</Link>
//           </Button>
//         </div>
//       </div>

//       {posts.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No blog posts yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/blog/new">Create your first post</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <BlogTable posts={posts} />
//       ) : (
//         <BlogCard posts={posts} />
//       )}
//     </div>
//   );
// }




// import { listPosts } from './_utils/blogMutations.server';
// import BlogTable from './_components/BlogTable';

// export default async function BlogDashboardPage() {
//   const posts = await listPosts(false); // show drafts too
//   return (
//     <div className="p-6">
//       <div className="mb-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Blog posts</h1>
//         <a href="/cms/blog/new" className="btn-primary">
//           New post
//         </a>
//       </div>
//       <BlogTable posts={posts} />
//     </div>
//   );
// }