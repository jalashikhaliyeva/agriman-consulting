import { useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import CareerSection from "@/components/CareerSection";
import {
  getCategories,
  getHero,
  getSettings,
  getProjects,
  getContact,
  getSocialLinks,
} from "@/lib/api";
import HeroAboutSingle from "@/components/HeroAboutSingle";
import Head from "next/head";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const hero = await getHero(lang);
    const categories = await getCategories(lang);
    const projects = await getProjects(lang);
    const contact = await getContact(lang);
    const socialLinks = await getSocialLinks(lang);

    return {
      props: {
        hero,
        categories,
        settings,
        projects,
        contact,
        socialLinks,
      },
    };
  } catch (error) {
    return {
      props: {
        hero: null,
        categories: null,
        settings: null,
        projects: null,
        socialLinks: null,
        contact: null,
      },
    };
  }
}

export default function Career({
  hero,
  categories,
  settings,
  projects,
  contact,
  socialLinks,
}) {
  const careerMeta =
    settings?.meta_tags?.find((tag) => tag.title === "Career") || {};
  const breadcrumbData = settings?.breadcrumb;
  const servicesBreadcrumb = breadcrumbData?.find(
    (item) => item.page === "Career"
  );

  const careerSectionData = settings?.section_title?.find(
    (section) => section.name === "Career"
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
          {bgUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${bgUrl}")` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
        </div>

        <div className="relative">
          <Header categories={categories?.data} settings={settings} />

          <div className="relative z-10">
            <HeroAboutSingle data={servicesBreadcrumb} />
          </div>
        </div>
      </main>
      <div className="relative -mt-32 md:-mt-36 lg:-mt-28 z-30">
        <Container>
          <CareerSection contact={contact.data} data={careerSectionData} />
        </Container>
      </div>

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
