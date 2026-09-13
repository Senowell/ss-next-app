import { fetchStrapi } from "@/utils/strapi";

export interface CommitmentItem {
  id: string;
  statement: string;
}

export interface CoverageArea {
  id: string;
  title: string;
  body?: string;
}

export interface DownloadFile {
  url: string;
  name: string;
  size: number;
}

export interface DownloadItem {
  id: string;
  label: string;
  file: DownloadFile;
}

export interface SecurityStatementData {
  pageTitle?: string;
  metaDescription?: string;
  objectivesIntro?: string;
  legalFoundation?: string;
  commitments?: CommitmentItem[];
  transparencyParagraph?: string;
  staffNote?: string;
  privacyStatementTitle?: string;
  companyDetails?: string;
  introduction?: string;
  coverageAreas?: CoverageArea[];
  contactEmail?: string;
  signatoryName?: string;
  signatoryTitle?: string;
  statementDate?: string;
  lastRevised?: string;
  downloads?: DownloadItem[];
}

const SECURITY_STATEMENT_QUERY = `
  query SecurityStatement {
    securityStatement {
      pageTitle
      metaDescription
      objectivesIntro
      legalFoundation
      commitments {
        id
        statement
      }
      transparencyParagraph
      staffNote
      privacyStatementTitle
      companyDetails
      introduction
      coverageAreas {
        id
        title
        body
      }
      contactEmail
      signatoryName
      signatoryTitle
      statementDate
      lastRevised
      downloads {
        id
        label
        file {
          url
          name
          size
        }
      }
    }
  }
`;

export async function getSecurityStatement(): Promise<SecurityStatementData | null> {
  const data = await fetchStrapi(SECURITY_STATEMENT_QUERY, {}, "graphql");
  return (data?.data as { securityStatement?: SecurityStatementData } | undefined)
    ?.securityStatement ?? null;
}
