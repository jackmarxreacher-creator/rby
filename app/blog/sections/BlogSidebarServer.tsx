import { listPosts } from "@/app/cms/blog/_utils/blogMutations.server";
import { BlogSidebarClient } from "./BlogSidebarClient";

export async function BlogSidebarServer() {
  const recent = await listPosts(true); // published only
  const counts = await Promise.all(
    ["Distribution", "Logistics", "Partnerships", "Innovation", "Sustainability", "News"].map(async (cat) => ({
      category: cat,
      count: (await listPosts(true, cat as any)).length,
    }))
  );

  return <BlogSidebarClient recent={recent} counts={counts} />;
}