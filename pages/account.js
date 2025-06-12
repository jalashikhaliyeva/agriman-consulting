import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Systems from "@/components/Systems";
import LogoMarquee from "@/components/LogoMarquee";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import React from "react";
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
import UserAccountSection from "@/components/UserAccountSection";

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

  const heroData = hero?.hero || [];
  const breadcrumbData = hero?.breadcrumb || {};
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgUrl = useMemo(() => {
    const url = mounted
      ? heroData?.[currentSlide]?.image
      : heroData?.[0]?.image;

    if (!url) return "/images/hero/hero2.jpg";
    return url.startsWith("http://") || url.startsWith("https://") ? url : url;
  }, [heroData, currentSlide, mounted]);

  const slidesData = useMemo(() => {
    return heroData.map((item) => ({
      stats: {
        projects: breadcrumbData.number_1 + (breadcrumbData.text_1 ? "" : "+"),
        satisfaction:
          breadcrumbData.number_2 + (breadcrumbData.text_2 ? "%" : ""),
      },
      description: breadcrumbData.description,
      heroTitle: item.title,
      heroDesc: item.description,
    }));
  }, [heroData, breadcrumbData]);

  const servicesCategory =
    categories?.data?.find((cat) => cat.slug === "xidmetler") || null;
  const systemsCategory =
    categories?.data?.find((cat) => cat.slug === "suvarma") || null;

  const categoryOrder = categories?.data?.map((cat) => cat.slug) || [];

  const firstComponentIsServices =
    categoryOrder.indexOf("xidmetler") < categoryOrder.indexOf("suvarma");

  const firstCategory = firstComponentIsServices ? "xidmetler" : "suvarma";

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

      <Header categories={categories?.data} settings={settings} />

      <UserAccountSection />

      <div className="relative lg:-mt-6 z-20">
        <Container>
          <Footer
            socialLinks={socialLinks?.data}
            contact={contact?.data}
            settings={settings}
          />
        </Container>
      </div>
    </>
  );
}
