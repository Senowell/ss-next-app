import { fetchStrapi, getStrapiMedia } from "./strapi";
import { type StrapiMedia } from "./homePage";
import { formatFileSize } from "./product";

export interface ServiceApplication {
  id: string;
  title: string;
  items: string | null;
}

export interface ServiceAsset {
  id: string;
  name: string;
}

export interface ServiceDownloadItem {
  id: string;
  Title: string;
  Category: "Brochure" | "Flyer" | "Manual" | null;
  Description: string | null;
  File: {
    url: string;
    name: string;
    size: number | null;
  } | null;
}

export interface ServiceAssociatedProduct {
  Title: string;
  Subtitle: string | null;
  Slug: string | null;
  Gallery: StrapiMedia[] | null;
}

export interface FaqItem {
  Question: string;
  Answer: string;
}

export interface ServiceDetail {
  HeroTitle: string;
  HeroSubtitle: string | null;
  Description: string | null;
  ChallengeTitle: string | null;
  ChallengeDescription: string | null;
  ServiceApplication: ServiceApplication[] | null;
  ServiceAssert: ServiceAsset[] | null;
  DownloadsSection: ServiceDownloadItem[] | null;
  associatedProducts: ServiceAssociatedProduct[] | null;
  faqs: FaqItem[] | null;
}

const SERVICE_BY_SLUG_QUERY = `
  query ServiceBySlug($slug: String!) {
    services(filters: { Slug: { eq: $slug } }) {
      HeroTitle
      HeroSubtitle
      Description
      ChallengeTitle
      ChallengeDescription
      ServiceApplication {
        id
        title
        items
      }
      ServiceAssert {
        id
        name
      }
      DownloadsSection {
        id
        Title
        Category
        Description
        File {
          url
          name
          size
        }
      }
      associatedProducts {
        Title
        Subtitle
        Slug
        Gallery {
          previewUrl
          url
          width
          height
          name
          size
          alternativeText
        }
      }
      faqs {
        Question
        Answer
      }
    }
  }
`;

const SERVICE_BY_SLUG_QUERY_NO_FAQS = `
  query ServiceBySlug($slug: String!) {
    services(filters: { Slug: { eq: $slug } }) {
      HeroTitle
      HeroSubtitle
      Description
      ChallengeTitle
      ChallengeDescription
      ServiceApplication {
        id
        title
        items
      }
      ServiceAssert {
        id
        name
      }
      DownloadsSection {
        id
        Title
        Category
        Description
        File {
          url
          name
          size
        }
      }
      associatedProducts {
        Title
        Subtitle
        Slug
        Gallery {
          previewUrl
          url
          width
          height
          name
          size
          alternativeText
        }
      }
    }
  }
`;

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function extractFirstService(response: unknown): ServiceDetail | null {
  const data: unknown = (response as { data?: unknown } | undefined)?.data;
  const root = data && typeof data === "object" ? (data as Record<string, unknown>) : undefined;

  const servicesCandidate: unknown = root?.services;
  const list = asArray<ServiceDetail>(servicesCandidate).filter(Boolean);
  if (list.length > 0) return list[0];

  return null;
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  if (!slug || typeof slug !== "string") return null;

  const response = await fetchStrapi(SERVICE_BY_SLUG_QUERY, { variables: { slug } }, "graphql");
  const service = extractFirstService(response);
  if (service) return service;

  const fallbackResponse = await fetchStrapi(SERVICE_BY_SLUG_QUERY_NO_FAQS, { variables: { slug } }, "graphql");
  const fallbackService = extractFirstService(fallbackResponse);
  if (!fallbackService) return null;

  return {
    ...fallbackService,
    faqs: null,
  };
}

export function getServiceDownloads(service: ServiceDetail) {
  return (service.DownloadsSection ?? []).map((d, idx) => {
    const fileType = d.Category ?? (d.File?.name?.split(".").pop()?.toUpperCase() || "");
    const fileSize = formatFileSize(d.File?.size);
    return {
      id: idx + 1,
      title: d.Title,
      fileType,
      fileSize,
    };
  });
}

export function getServiceAssociatedProducts(service: ServiceDetail) {
  return (service.associatedProducts ?? []).map((p, idx) => {
    const firstImage = p.Gallery?.[0]?.url;
    return {
      id: p.Slug ?? String(idx + 1),
      title: p.Title,
      description: p.Subtitle ?? "",
      image: firstImage ? getStrapiMedia(firstImage) : undefined,
    };
  });
}

/** Convert the items string of a ServiceApplication (bullet list) into lines. */
export function splitBulletItems(items: string | null | undefined): string[] {
  if (!items) return [];
  return items
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}
