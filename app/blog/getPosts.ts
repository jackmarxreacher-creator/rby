import { listPosts } from "@/app/cms/blog/_utils/blogMutations.server";
export const getBlogPosts = () => listPosts(true); // published only