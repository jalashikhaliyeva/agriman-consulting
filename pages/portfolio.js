import Header from "@/components/Header";
import Container from "@/components/Container";
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
import HeroNews from "@/components/HeroNews";
import BlogPage from "@/components/BlogPage";
import NewsHead from "@/components/HeroNews/NewsHead";
import { CardGrid } from "@/components/Blogs";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const hero = await getHero(lang);
    const categories = await getCategories(lang);
    const projects = await getProjects(lang);
    const contact = await getContact(lang);
    const socialLinks = await getSocialLinks(lang);
    const blogs = await getBlogs(lang);

    return {
      props: {
        hero,
        categories,
        settings,
        projects,
        socialLinks,
        contact,
        blogs,
      },
    };
  } catch (error) {
    return {
      props: {
        hero: null,
        categories: null,
        settings: null,
        projects: null,
        contact: null,
        socialLinks: null,
        blogs: null,
      },
    };
  }
}
export default function News({
  categories,
  settings,
  contact,
  socialLinks,
  blogs,
}) {
  const careerMeta =
    settings?.meta_tags?.find((tag) => tag.title === "Contact") || {};
  const breadcrumbData = settings?.breadcrumb;
  const servicesBreadcrumb = breadcrumbData?.find(
    (item) => item.page === "Contact"
  );

  const contactSectionData = settings?.section_title?.find(
    (section) => section.name === "Contact"
  );

  let bgUrl = servicesBreadcrumb?.image || "/images/hero/hero2.jpg";
  if (!bgUrl.startsWith("http://") && !bgUrl.startsWith("https://")) {
    bgUrl = bgUrl;
  }

  return (
    <>
      <Head>
        <title>
          {careerMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"}
        </title>
        <meta
          name="description"
          content={
            careerMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta
          name="keywords"
          content={
            careerMeta.meta_keywords ||
            "agriculture, farming, irrigation, smart farming"
          }
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            careerMeta.meta_title || "AGRIMAN - Smart Agricultural Solutions"
          }
        />
        <meta
          property="og:description"
          content={
            careerMeta.meta_description ||
            "Default description about agricultural services"
          }
        />
        <meta property="og:image" content={settings?.logo?.logo} />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
      <main className="relative rounded-b-4xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
        </div>

        <div className="relative">
          <Header categories={categories?.data} settings={settings} />

          <div className="relative z-10">
            <HeroNews data={servicesBreadcrumb} />
          </div>
        </div>
      </main>
      <div>
       <Container>

          <NewsHead />
       </Container>
      </div>
        
    <div>
      <Container>
      <BlogPage blogs={blogs} /> 

     
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
