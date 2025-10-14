import PageHero from "@/app/common/PageHero";
import CompanyProfile from "./sections/CompanyProfile";
import AboutPrinciples from "./sections/AboutPrinciples";
import ManagementTeam from "./sections/ManagementTeam";
import NewProductsMarquee from "./sections/NewProductsMarqueeServer";


export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Discover who we are and how we serve Ghana’s beverage distribution market."
        backgroundImage="/images/banners/aboutrby.jpg" // Replace with your image path
      />

      <main>
        <CompanyProfile />
        <AboutPrinciples />
        <ManagementTeam />
  <NewProductsMarquee />
      </main>
    </>
  );
}
