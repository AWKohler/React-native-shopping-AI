import { getJson } from "serpapi";

export async function POST(request) {
  try {
    const body = await request.json();
    const { productName } = body;

    if (!productName) {
      return new Response(JSON.stringify({ error: "productName is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const json = await getJson({
      engine: "google_shopping",
      google_domain: "google.com",
      q: productName,
      api_key: "fe5b0868f3cb875e975a89a63bfae5a6d069ad315df8de9286a9a5b2699317c8"
    });

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

