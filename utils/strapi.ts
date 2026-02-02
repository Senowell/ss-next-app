interface FetchStrapiOptions {
  method?: string;
  body?: any;
}

export async function fetchStrapi(
  endpoint: string,
  options: FetchStrapiOptions = {},
  type: "rest" | "graphql" = "rest"
) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  let url = "";
  let requestBody: any = options.body;
  let method = options.method || "GET";

  // Handle GraphQL requests
  if (type === "graphql") {
    url = `${baseUrl}/graphql`;
    method = "POST";
    requestBody = {
      query: endpoint,
    };
  } else {
    // Handle REST API requests
    url = `${baseUrl}/api${endpoint}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
