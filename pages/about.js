import { useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import React from "react";

import {
  getAbout,
  getBanner,
  getBlogs,
  getCategories,
  getContact,
  getHero,
  getProjects,
  getSettings,
  getSocialLinks,
} from "@/lib/api";
import Head from "next/head";
import HeroParent from "@/components/HeroParent";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const about = await getAbout(lang);
    const hero = await getHero(lang);
    const categories = await getCategories(lang);
    const projects = await getProjects(lang);
    const blogs = await getBlogs(lang);
    const contact = await getContact(lang);
    const socialLinks = await getSocialLinks(lang);
    const banner = await getBanner(lang);

    return {
      props: {
        hero,
        categories,
        projects,
        blogs,
        settings,
        about,
        socialLinks,
        contact,
        banner,
      },
    };
  } catch (error) {
    return {
      props: {
        hero: null,
        categories: null,
        projects: null,
        blogs: null,
        settings: null,
        about: null,
        contact: null,
        socialLinks: null,
        banner: null,
      },
    };
  }
}
export default function About({
  hero,
  categories,
  projects,
  blogs,
  settings,
  contact,
  socialLinks,
  banner,
  about,
}) {
  const aboutMeta =
    settings?.meta_tags?.find((tag) => tag.title === "About") || {};

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

  return (
    <>
      <Head>
        <title>
          {aboutMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"}
        </title>
        <meta
          name="description"
          content={
            aboutMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta
          name="keywords"
          content={
            aboutMeta.meta_keywords ||
            "agriculture, farming, irrigation, smart farming"
          }
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            aboutMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"
          }
        />
        <meta
          property="og:description"
          content={
            aboutMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta property="og:image" content={settings?.logo?.logo} />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
      <main className="relative rounded-b-4xl  overflow-hidden">
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
            <HeroParent
              slidesData={slidesData}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              heroData={heroData}
              breadcrumbData={breadcrumbData}
            />
          </div>
        </div>
      </main>

      {/* AboutSection overlapping with Hero */}
      <div className="relative -mt-32 md:-mt-36 lg:-mt-24 z-30">
        <Container>
          <AboutSection banner={banner} about={about} />
        </Container>
      </div>

      <Container>
        <Footer
          socialLinks={socialLinks.data}
          contact={contact.data}
          settings={settings}
        />
      </Container>
    </>
  );
}
