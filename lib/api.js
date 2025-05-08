const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // Remove the default language detection from navigator since we'll pass it explicitly
};

async function fetchFromEndpoint(endpoint, options = {}, lang = "en") {
  const url = `${baseUrl}/${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        "Accept-Language": lang, // Add language header
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching ${url}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API request failed: ${error.message}`, {
      endpoint,
      url,
      error,
    });
    throw error;
  }
}

// Updated GET functions with lang parameter
export async function getHero(lang) {
  return fetchFromEndpoint("hero", {}, lang);
}

export async function getProjects(lang) {
  return fetchFromEndpoint("projects", {}, lang);
}

export async function getCategories(lang) {
  return fetchFromEndpoint("categories", {}, lang);
}

export async function getSingleService(slug, lang) {
  return fetchFromEndpoint(`service/${slug}`, {}, lang);
}

export async function getBanner(lang) {
  return fetchFromEndpoint("banner", {}, lang);
}
export async function getTerms(lang) {
  return fetchFromEndpoint("page/terms-and-conditions", {}, lang);
}
export async function getSettings(lang) {
  return fetchFromEndpoint("setting", {}, lang);
}

export async function getFooter(lang) {
  return fetchFromEndpoint("footertext", {}, lang);
}

export async function getContact(lang) {
  return fetchFromEndpoint("contact", {}, lang);
}

export async function getSocialLinks(lang) {
  return fetchFromEndpoint("sociallinks", {}, lang);
}

export async function getBlogs(lang) {
  return fetchFromEndpoint("blogs", {}, lang);
}

export async function getSingleBlog(slug, lang) {
  return fetchFromEndpoint(`blog/${slug}`, {}, lang);
}

export async function getAbout(lang) {
  return fetchFromEndpoint("about", {}, lang);
}

// POST functions can also be updated if needed
export async function postContactForm(
  { name, email, phone, subject, message },
  lang
) {
  return fetchFromEndpoint(
    "contact-form",
    {
      method: "POST",
      body: JSON.stringify({ name, email, phone, subject, message }),
    },
    lang
  );
}

export async function postCareerForm(
  { name, email, phone, profession, message, cv },
  lang
) {
  return fetchFromEndpoint(
    "career-form",
    {
      method: "POST",
      body: JSON.stringify({ name, email, phone, profession, message, cv }),
    },
    lang
  );
}
