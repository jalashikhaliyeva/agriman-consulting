import { useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HeroAbout from "@/components/HeroAbout";
import ServicesPageSection from "@/components/ServicesPageSection";
import LogoMarquee from "@/components/LogoMarquee";
import AboutSection from "@/components/AboutSection";

export default function About() {
  const mockLandingInfo = [
    {
      title: "Welcome to Our Platform",
      desc: "Discover amazing features and services that will transform your experience. <strong>Join us today!</strong>",
      heroTitle: "Aqıllı Kənd Təsərrüfatı İlə Gələcəyə Doğru",
      heroDesc:
        "Əsas məqsədimiz kənd təsərrüfatı müəssisələrini, sahibkarları və fermerləri dəstəkləməkdir – ekspert səviyyəsində becərmə üzrə konsaltinq xidməti göstərərək, yüksək keyfiyyətli və bol məhsuldarlığı təmin etməkdir.",
      button_text: "Get Started",

      image: "/images/hero/hero2.jpg",
    },
    {
      title: "Premium Solutions",
      desc: "Our cutting-edge technology provides the best solutions for your needs. <em>Try it now!</em>",
      heroTitle: "Second Slide Title",
      heroDesc:
        "Second slide description text would go here with different content.",
      button_text: "Learn More",
      image: "/images/hero/hero22.jpg",
    },
    {
      title: "Join Our Community",
      desc: "Become part of a growing network of professionals and enthusiasts. <u>Register now</u>!",
      heroTitle: "Third Slide Title",
      heroDesc:
        "Third slide description text would go here with different content.",
      button_text: "Get Started",
      image: "/images/services/img1.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const bgUrl = mockLandingInfo[currentSlide].image;

  return (
    <>
      <main className="relative rounded-b-4xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
        </div>

        <div className="relative z-20">
          <Header />

          <Hero
            slidesData={mockLandingInfo.map((item) => ({
              stats: {
                projects: "150+",
                satisfaction: "99%",
              },
              description: item.desc,
            }))}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </div>
      </main>

      <Container>
        <AboutSection />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}
