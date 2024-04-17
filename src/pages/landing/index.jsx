import Discovery from "./discovery";
import Features from "./features";
// import Story from "./story";
import Analytics from "./analytics";
// import SuccessStories from "./successStories";
import FAQPage from "./faq";
// import Blogs from "./blogs";
import Footer from "./footer";

const LandingPage = () => {
  return (
    <section className="flex flex-col items-center gap-[102px] font-['Outfit']">
      <Discovery />
      <Features />
      {/*
      <Story />
      <SuccessStories />
      <Blogs />
      */}
      <Analytics />
      <FAQPage />
      <Footer />
    </section>
  )
}

export default LandingPage;