interface FetchStrapiOptions {
  method?: string;
  body?: unknown;
  variables?: Record<string, unknown>;
}

export async function fetchStrapi(
  endpoint: string,
  options: FetchStrapiOptions = {},
  type: "rest" | "graphql" = "rest"
) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");
  }

  let url = "";
  let requestBody: unknown = options.body;
  let method = options.method || "GET";

  // Handle GraphQL requests
  if (type === "graphql") {
    url = `${baseUrl}/graphql`;
    method = "POST";
    requestBody = {
      query: endpoint,
      variables: options.variables,
    };
  } else {
    // Handle REST API requests
    url = `${baseUrl}/api${endpoint}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(requestBody) : undefined,
    next: { revalidate: 60 }, // ISR (App Router)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Strapi fetch failed: ${res.status} ${res.statusText}`, errorText);
    throw new Error(`Failed to fetch from Strapi: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
