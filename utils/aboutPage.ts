import { fetchStrapi } from "./strapi";

export interface AboutMedia {
  url: string;
  alternativeText: string | null;
}

export interface AboutIntroSection {
  id: string;
  title: string;
  content: unknown;
}

export interface AboutLeader {
  id: string;
  name: string;
  position: string;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  photo: AboutMedia | null;
}

export interface AboutSolution {
  id: string;
  title: string;
  theme: "dark" | "light" | null;
  content: unknown;
}

export interface AboutCompanyNews {
  Title: string;
  Summary: string | null;
  Slug: string;
  CoverImage: AboutMedia | null;
}

export interface AboutPageData {
  heroTitle: string | null;
  introSection: AboutIntroSection | null;
  leadership: AboutLeader[];
  Solutions: AboutSolution[];
  companyNews: AboutCompanyNews[];
}

const ABOUT_PAGE_QUERY = `
  query AboutPage {
    aboutPage {
      heroTitle
      introSection {
        id
        title
        content
      }
      leadership {
        id
        name
        position
        linkedinUrl
        twitterUrl
        photo {
          url
          alternativeText
        }
      }
      Solutions {
        id
        title
        theme
        content
      }
      companyNews {
        Title
        Summary
        Slug
        CoverImage {
          url
          alternativeText
        }
      }
    }
  }
`;

export async function getAboutPage(): Promise<AboutPageData | null> {
  const data = await fetchStrapi(ABOUT_PAGE_QUERY, {}, "graphql");
  return data?.data?.aboutPage ?? null;
}
