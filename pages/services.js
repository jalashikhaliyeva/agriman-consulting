import { useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import ServicesPageSection from "@/components/ServicesPageSection";
import LogoMarquee from "@/components/LogoMarquee";
import HeroAboutSingle from "@/components/HeroAboutSingle";
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

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const contact = await getContact(lang);
    const about = await getAbout(lang);
    const hero = await getHero(lang);
    const categories = await getCategories(lang);
    const projects = await getProjects(lang);
    const blogs = await getBlogs(lang);
    const banner = await getBanner(lang);
    const socialLinks = await getSocialLinks(lang);

    return {
      props: {
        hero,
        categories,
        projects,
        blogs,
        settings,
        about,
        banner,
        contact,
        socialLinks
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
        banner: null,
        contact: null,
        socialLinks: null,
      },
    };
  }
}

export default function Services({
  hero,
  settings,
  categories,
  banner,
  projects,
  contact,
  socialLinks
}) {
  const aboutMeta =
    settings?.meta_tags?.find((tag) => tag.title === "About") || {};

  const breadcrumbData = settings?.breadcrumb;
  const servicesBreadcrumb = breadcrumbData?.find(
    (item) => item.page === "Services"
  );
  let bgUrl = servicesBreadcrumb.image || "/images/hero/hero2.jpg";
  if (!bgUrl.startsWith("http://") && !bgUrl.startsWith("https://")) {
    bgUrl = bgUrl;
  }


  return (
    <>
      <Head>
        <title>{"AGRIMAN - Smart Agricultural Solutions"}</title>
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
      <main className="relative rounded-b-4xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          {bgUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${bgUrl}")` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
        </div>

        <div className="relative z-20">
          <Header categories={categories.data} settings={settings} />

          <HeroAboutSingle data={servicesBreadcrumb} />
        </div>
      </main>

      <Container>
        <ServicesPageSection categories={categories} banner={banner} />
      </Container>
      <Container>
        <LogoMarquee projects={projects} />
      </Container>

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
