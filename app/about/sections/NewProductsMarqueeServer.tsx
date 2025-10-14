import { prisma } from '@/lib/prisma';
import NewProductsMarqueeClient from './NewProductsMarquee';
import { newProducts as fallbackProducts } from '@/data/newProducts';

export default async function NewProductsMarqueeServer() {
  // Try to fetch from database, fallback to static data if DB unavailable
  let products: Array<{ id: string; name: string; image: string | null }> = [];
  
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, image: true },
    });
  } catch (error) {
    // Database unavailable (e.g., during build without DATABASE_URL)
    console.warn("Database unavailable, using fallback products for marquee");
  }

  if (!products || products.length === 0) {
    // use the static dataset as placeholder when DB has no products or is unavailable
    const items = fallbackProducts.map((p, i) => ({ id: `placeholder-${i}`, name: p.name, image: p.image }));
    return <NewProductsMarqueeClient products={items} />;
  }

  // normalize image paths (ensure non-null)
  const items = products.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image ?? '/images/new_products/placeholder.png',
  }));

  return <NewProductsMarqueeClient products={items} />;
}
