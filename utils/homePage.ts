import { fetchStrapi } from "./strapi";

export interface StrapiMedia {
  previewUrl: string | null;
  url: string;
  width: number | null;
  height: number | null;
  name: string;
  size: number | null;
  alternativeText: string | null;
}

type RichTextChild = {
  type: string;
  text?: string;
  children?: RichTextChild[];
};

type RichTextBlock = {
  type: string;
  level?: number;
  children?: RichTextChild[];
};

export interface HomeFeaturedProduct {
  Title: string;
  Subtitle: string | null;
  Description: RichTextBlock[] | null;
  Slug: string | null;
  documentId?: string;
  Gallery: StrapiMedia[] | null;
}

export interface FeaturedService {
  Title: string;
  Slug: string | null;
  FeaturedImage: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
  };
}

export interface HomePageData {
  homePage: {
    featuredProducts: HomeFeaturedProduct[];
    featuredServices: FeaturedService[];
  };
}

const HOME_PAGE_QUERY_PRODUCTS = `
  query HomePage {
    homePage {
      featuredProducts {
        Description
        Subtitle
        Title
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

const HOME_PAGE_QUERY_SERVICE = `
  query HomePage {
    homePage {
      featuredServices {
        Title
        Slug
        FeaturedImage {
          url
          alternativeText
          caption
        }
      }
    }
  }
`;

function flattenRichTextText(nodes: RichTextChild[] | undefined): string {
  if (!nodes || nodes.length === 0) return "";
  return nodes
    .map((node) => {
      const direct = typeof node.text === "string" ? node.text : "";
      const nested = node.children ? flattenRichTextText(node.children) : "";
      return `${direct}${nested}`;
    })
    .join("");
}

export function richTextToPlainText(blocks: unknown): string {
  const list = Array.isArray(blocks) ? (blocks as RichTextBlock[]) : [];
  if (list.length === 0) return "";

  const parts = list
    .map((block) => {
      const children = (block && typeof block === "object") ? (block as RichTextBlock).children : undefined;
      return flattenRichTextText(children);
    })
    .map((t) => t.trim())
    .filter(Boolean);

  return parts.join(" ");
}

export async function getHomeFeaturedProducts(): Promise<HomeFeaturedProduct[]> {
  const response = await fetchStrapi(HOME_PAGE_QUERY_PRODUCTS, {}, "graphql");
  return (response?.data as HomePageData | undefined)?.homePage?.featuredProducts ?? [];
}

export async function getHomeFeaturedServices(): Promise<FeaturedService[]> {
  const response = await fetchStrapi(HOME_PAGE_QUERY_SERVICE, {}, "graphql");
  return (response?.data as HomePageData | undefined)?.homePage?.featuredServices ?? [];
}
