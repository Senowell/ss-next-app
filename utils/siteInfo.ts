import { fetchStrapi } from "./strapi";

export interface QuickLink {
  id: string;
  Label: string;
  URL: string;
  Open_In_New_Tab: boolean | null;
}

export interface MenuItem {
  id: string;
  Title: string;
  Links: QuickLink[];
}

export interface HeaderData {
  SiteName: string;
  QuickLinks: QuickLink[];
  Menu: MenuItem[];
}

export interface FooterData {
  SiteName: string;
  SiteDescription: string;
  Copy_Right_Info: string;
  QuickLinks: QuickLink[];
}

export interface SiteInfo {
  header: HeaderData;
  footer: FooterData;
}

const SITE_INFO_QUERY = `
  query SiteInfo {
    header {
      SiteName,
      QuickLinks {
        id,
        Label,
        URL,
        Open_In_New_Tab
      },
      Menu {
        id,
        Title,
        Links {
          id,
          Label,
          URL,
          Open_In_New_Tab
        }
      }
    },
    footer {
      SiteName,
      SiteDescription,
      Copy_Right_Info,
      QuickLinks {
        id,
        Label,
        URL,
        Open_In_New_Tab
      }
    }
  }
`;

export async function getSiteInfo(): Promise<SiteInfo> {
  try {
    const response = await fetchStrapi(SITE_INFO_QUERY, {}, "graphql");
    console.log("Fetched site info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch site info:", error);
    throw error;
  }
}
