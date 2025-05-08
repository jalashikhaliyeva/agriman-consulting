import { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Services from "@/components/Services";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Systems from "@/components/Systems";
import LogoMarquee from "@/components/LogoMarquee";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import {
  getBlogs,
  getCategories,
  getContact,
  getHero,
  getProjects,
  getSettings,
  getSocialLinks,
} from "@/lib/api";
import Head from "next/head";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const hero = await getHero(lang);
    const categories = await getCategories(lang);
    const projects = await getProjects(lang);
    const blogs = await getBlogs(lang);
    const contact = await getContact(lang);
    const socialLinks = await getSocialLinks(lang);

    return {
      props: {
        hero,
        categories,
        projects,
        blogs,
        settings,
        socialLinks,
        contact,
      },
    };
  } catch (error) {
    return {
      props: {
        hero: null,
        categories: null,
        socialLinks: null,
        projects: null,
        blogs: null,
        settings: null,
        contact: null,
      },
    };
  }
}

export default function Home({
  hero,
  categories,
  projects,
  blogs,
  settings,
  socialLinks,
  contact,
}) {
  const homeMeta =
    settings?.meta_tags?.find((tag) => tag.title === "Home") || {};

  const heroData = hero?.hero;
  const breadcrumbData = hero?.breadcrumb;
  const [currentSlide, setCurrentSlide] = useState(0);

  let bgUrl = heroData[currentSlide]?.image || "/images/hero/hero2.jpg";
  if (!bgUrl.startsWith("http://") && !bgUrl.startsWith("https://")) {
    bgUrl = bgUrl;
  }

  const slidesData = heroData.map((item) => ({
    stats: {
      projects: breadcrumbData.number_1 + (breadcrumbData.text_1 ? "" : "+"),
      satisfaction:
        breadcrumbData.number_2 + (breadcrumbData.text_2 ? "%" : ""),
    },
    description: breadcrumbData.description,
    heroTitle: item.title,
    heroDesc: item.description,
  }));

  const servicesCategory =
    categories?.data?.find((cat) => cat.slug === "xidmetler") || null;
  const systemsCategory =
    categories?.data?.find((cat) => cat.slug === "suvarma") || null;

  const categoryOrder = categories?.data?.map((cat) => cat.slug) || [];

  // Determine which component comes first
  const firstComponentIsServices =
    categoryOrder.indexOf("xidmetler") < categoryOrder.indexOf("suvarma");
  const firstCategory = firstComponentIsServices ? "xidmetler" : "suvarma";
  const firstCategoryData = firstComponentIsServices
    ? servicesCategory
    : systemsCategory;

  return (
    <>
      <Head>
        <title>
          {homeMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"}
        </title>
        <meta
          name="description"
          content={
            homeMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta
          name="keywords"
          content={
            homeMeta.meta_keywords ||
            "agriculture, farming, irrigation, smart farming"
          }
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            homeMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"
          }
        />
        <meta
          property="og:description"
          content={
            homeMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta property="og:image" content={settings?.logo?.logo} />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
      <main className="relative rounded-b-4xl overflow-hidden pb-48 md:pb-52 lg:pb-56">
        <div className="absolute inset-0 z-0">
          {bgUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${bgUrl}")` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />
        </div>

        <div className="relative">
          <Header categories={categories.data} settings={settings} />

          <div className="relative z-10">
            <Hero
              slidesData={slidesData}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              heroData={heroData}
              breadcrumbData={breadcrumbData}
            />
          </div>
        </div>
      </main>

      {/* First Component (overlapping with Hero) */}
      <div className="relative -mt-36 z-30">
        <Container>
          {firstComponentIsServices ? (
            <Services data={servicesCategory} />
          ) : (
            <Systems data={systemsCategory} />
          )}
        </Container>
      </div>

      {/* Render remaining components */}
      <div className="">
        {categoryOrder.map((categoryName, index) => {
          // Skip the first category as it's already rendered above
          if (categoryName === firstCategory) return null;

          if (categoryName === "xidmetler") {
            return (
              <Container key="services">
                <Services data={servicesCategory} />
              </Container>
            );
          } else if (categoryName === "suvarma") {
            return (
              <Container key="systems">
                <Systems data={systemsCategory} />
              </Container>
            );
          }
          return null;
        })}
      </div>

      <Container>
        <LogoMarquee projects={projects} />
      </Container>
      <div className="relative z-10">
        <Container>
          <BlogSection blogs={blogs} />
        </Container>
      </div>
      <div className="relative  lg:-mt-6 z-20">
        <Container>
          <Footer
            socialLinks={socialLinks.data}
            contact={contact.data}
            settings={settings}
          />
        </Container>
      </div>
    </>
  );
}
