// -------  Added Created By and Updated By  -------
import { notFound } from 'next/navigation';
import { getPostById } from '../_utils/blogMutations.server';
import BlogFormWrapper from '../_components/BlogFormWrapper';
import { saveBlogPost } from '../actions';
import type { BlogInputs } from "../_components/BlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  const plain: BlogInputs = {
    ...post,
    id: post.id,
    subHeading: post.subHeading ?? undefined,
    caption: post.caption ?? undefined,
    coverImage: post.coverImage ?? undefined,
    content: JSON.stringify(post.content),
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Edit blog post</h1>
  <BlogFormWrapper post={plain} action={saveBlogPost} />
    </div>
  );
}









// import { notFound } from 'next/navigation';
// import { getPostById } from '../_utils/blogMutations.server';
// import BlogForm from '../_components/BlogForm';
// import { saveBlogPost } from '../actions';
// import type { BlogInputs } from "../_components/BlogForm";

// export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const post = await getPostById(id);
//   if (!post) notFound();

//   const plain: BlogInputs = {
//     ...post,
//     id: post.id,
//     subHeading: post.subHeading ?? undefined,
//     caption: post.caption ?? undefined,
//     coverImage: post.coverImage ?? undefined,
//     content: JSON.stringify(post.content),
//   };

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Edit blog post</h1>
//       <BlogForm post={plain} onSave={saveBlogPost} />
//     </div>
//   );
// }





// import { notFound } from 'next/navigation';
// import { getPostById } from '../_utils/blogMutations.server';
// import BlogForm from '../_components/BlogForm';
// import { saveBlogPost } from '../actions';

// interface Props {
//   params: { id: string };
// }

// export default async function EditBlogPage({ params }: Props) {
//   const post = await getPostById(params.id);
//   if (!post) notFound();

//   const plain = { ...post, content: JSON.stringify(post.content) };

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Edit blog post</h1>
//       <BlogForm post={plain} onSave={saveBlogPost} />
//     </div>
//   );
// }