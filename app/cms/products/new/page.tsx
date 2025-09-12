import { createProduct } from "../actions";
import { ProductForm } from "../_components/ProductForm";

export default async function NewProductPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Product</h1>
      <ProductForm onSave={createProduct} />
    </div>
  );
}