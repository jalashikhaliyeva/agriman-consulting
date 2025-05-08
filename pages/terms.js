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
  getTerms,
} from "@/lib/api";
import HeroAboutSingle from "@/components/HeroAboutSingle";
import Head from "next/head";

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const settings = await getSettings(lang);
    const terms = await getTerms(lang);
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
        terms,

        socialLinks,
      },
    };
  } catch (error) {
    return {
      props: {
        hero: null,
        terms: null,
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
  terms,
}) {
  const careerMeta =
    settings?.meta_tags?.find((tag) => tag.title === "Career") || {};
  const breadcrumbData = settings?.breadcrumb;
  const servicesBreadcrumb = breadcrumbData?.find(
    (item) => item.page === "Career"
  );

  console.log(terms, "terms");

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
      <Header categories={categories.data} settings={settings} />

      <main className="container mx-auto px-4 py-28">
        <article className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-extrabold mb-6">{terms.data.title}</h1>
          {terms.data.description.split("\n\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          <footer className="mt-12 text-sm text-gray-500">
            <p>
              Last updated: {new Date(terms.timestamp).toLocaleDateString()}
            </p>
          </footer>
        </article>
      </main>

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
