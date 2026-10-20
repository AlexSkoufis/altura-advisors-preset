import site from "@/content/site.json";
import home from "@/content/home.json";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Transactions from "@/components/Transactions";
import Scenarios from "@/components/Scenarios";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Why from "@/components/Why";
import FocusAreas from "@/components/FocusAreas";
import Testimonials from "@/components/Testimonials";
import Playbook from "@/components/Playbook";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageAnimations from "@/components/PageAnimations";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Header site={site} />
      <main id="main">
        <Hero content={{ hero: home.hero }} />
        <Transactions content={{ transactions: home.transactions }} />
        <Scenarios content={{ scenarios: home.scenarios }} />
        <Services content={{ services: home.services }} />
        <Process content={{ process: home.process }} />
        <Why content={{ why: home.why }} />
        <FocusAreas content={{ focus: home.focus }} />
        <Testimonials content={{ testimonials: home.testimonials }} />
        <Playbook content={{ playbook: home.playbook }} />
        <Contact content={{ contact: home.contact }} site={site} />
      </main>
      <Footer site={site} />
      <SmoothScroll />
      <PageAnimations />
    </>
  );
}
