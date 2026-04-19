import { fetchStrapi } from "./strapi";
import {
  richTextToPlainText,
  withStrapiBaseUrl,
  type StrapiMedia,
  type HomeFeaturedProduct,
} from "./homePage";

export interface ProductDownloadItem {
  Title: string;
  Description: string | null;
  Category: "Brochure" | "Flyer" | "Manual" | null;
  File: {
    url: string;
    name: string;
    size: number | null;
  } | null;
}

export interface FaqItem {
  Question: string;
  Answer: string;
}

export interface ProductDetail extends HomeFeaturedProduct {
  documentId?: string;
  downloads_section: ProductDownloadItem[] | null;
  faqs: FaqItem[] | null;
  associatedProducts: Array<{
    Title: string;
    Subtitle: string | null;
    Slug: string | null;
    documentId?: string;
    Gallery: StrapiMedia[] | null;
    Description?: unknown;
  }> | null;
}

const PRODUCT_BY_SLUG_QUERY = `
  query ProductBySlug($slug: String!) {
    products(filters: { Slug: { eq: $slug } }) {
      Title
      Subtitle
      Description
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
      downloads_section {
        Title
        Description
        Category
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

const PRODUCT_BY_SLUG_QUERY_NO_FAQS = `
  query ProductBySlug($slug: String!) {
    products(filters: { Slug: { eq: $slug } }) {
      Title
      Subtitle
      Description
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
      downloads_section {
        Title
        Description
        Category
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

function extractFirstProduct(response: unknown): ProductDetail | null {
  const data: unknown = (response as { data?: unknown } | undefined)?.data;
  const root = (data && typeof data === "object") ? (data as Record<string, unknown>) : undefined;

  const productsCandidate: unknown = root?.products;
  const list = asArray<ProductDetail>(productsCandidate).filter(Boolean);
  if (list.length > 0) return list[0];

  const nestedData =
    productsCandidate && typeof productsCandidate === "object"
      ? (productsCandidate as Record<string, unknown>).data
      : undefined;
  const nestedList = asArray<ProductDetail>(nestedData).filter(Boolean);
  if (nestedList.length > 0) return nestedList[0];

  const attrsList = nestedList
    .map((x) => {
      const rec = x as unknown as Record<string, unknown>;
      return rec?.attributes as unknown;
    })
    .filter(Boolean) as ProductDetail[];

  if (attrsList.length > 0) return attrsList[0];

  return null;
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  if (!slug || typeof slug !== "string") return null;

  const response = await fetchStrapi(PRODUCT_BY_SLUG_QUERY, { variables: { slug } }, "graphql");
  const product = extractFirstProduct(response);
  if (product) return product;

  const fallbackResponse = await fetchStrapi(PRODUCT_BY_SLUG_QUERY_NO_FAQS, { variables: { slug } }, "graphql");
  const fallbackProduct = extractFirstProduct(fallbackResponse);
  if (!fallbackProduct) return null;

  return {
    ...fallbackProduct,
    faqs: null,
  };
}

export function getProductImages(product: { Gallery: StrapiMedia[] | null } | null | undefined): string[] {
  const items = product?.Gallery ?? [];
  return items
    .map((m) => m?.url)
    .filter((u): u is string => typeof u === "string" && u.length > 0)
    .map(withStrapiBaseUrl);
}

export function getProductShortDescription(
  product: { Subtitle: string | null; Description: unknown } | null | undefined
): string {
  const subtitle = product?.Subtitle?.trim();
  if (subtitle) return subtitle;

  const text = richTextToPlainText(product?.Description);
  return text;
}

export function formatFileSize(sizeInKbOrMb: number | null | undefined): string {
  if (!sizeInKbOrMb || Number.isNaN(sizeInKbOrMb)) return "";

  // Strapi media size is commonly in KB. Convert to MB.
  const mb = sizeInKbOrMb / 1024;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;

  const kb = sizeInKbOrMb;
  return `${kb.toFixed(0)} KB`;
}
