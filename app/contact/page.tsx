import PageHero from "@/app/common/PageHero";
import ContactInfo from "./sections/ContactInfo";
import ContactInteraction from "./sections/ContactInteraction";
import { MAPS_EMBED_URL } from "./config";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="We're here to help. Reach out to us anytime."
        backgroundImage="/images/banners/Ciroc.png"
      />
      <ContactInfo />
      <ContactInteraction mapUrl={MAPS_EMBED_URL} />
    </>
  );
}




// import PageHero from '@/app/common/PageHero';
// import ContactInfo from './sections/ContactInfo';
// import ContactInteraction from './sections/ContactInteraction';


// export default function ContactPage() {
//   return (
//     <>
//       <PageHero
//         title="Contact Us"
//         description="We're here to help. Reach out to us anytime."
//         backgroundImage="/images/banners/Ciroc.png" // Replace with your actual image
//       />
//       <ContactInfo />
//       <ContactInteraction />
//     </>
//   );
// }
