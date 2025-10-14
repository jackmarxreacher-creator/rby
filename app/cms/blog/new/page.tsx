import BlogFormWrapper from '../_components/BlogFormWrapper';
import { saveBlogPost } from '../actions';

export default function NewBlogPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">New blog post</h1>
      <BlogFormWrapper action={saveBlogPost} />
    </div>
  );
}





// import BlogForm from '../_components/BlogForm';
// import { saveBlogPost } from '../actions';

// export default function NewBlogPage() {
//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">New blog post</h1>
//       <BlogForm onSave={saveBlogPost} />
//     </div>
//   );
// }