import PageHero from "@/app/common/PageHero";
import OrderForm from "@/app/cms/requests/_components/OrderForm";
import Appreciation from "./sections/Appreciation";
import Countdown from "./sections/Countdown";
import { submitRequest } from "./actions";
import { getProducts } from "@/app/products-services/actions";
import RequestClient from "./sections/RequestClient"; // new wrapper

export default async function RequestPage() {
  const products = await getProducts(); // ➜ server side

  return (
    <>
      <PageHero
        title="Request an Order"
        description="Tell us what you need and we’ll get back to you shortly."
        backgroundImage="/images/banners/product-1024x300.png"
      />
      <section className="container mx-auto py-12 px-6">
        <RequestClient products={products} />
      </section>
    </>
  );
}

