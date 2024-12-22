const { getJson } = require("serpapi");

export async function POST(request: Request) {
  try {

    console.log("productdetails called")

    const body = await request.json();
    const { product_id } = body;

    if (!product_id) {
      return new Response(
        JSON.stringify({ error: "product_id is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // SerpAPI's getJson callback approach wrapped in a Promise
    const serpData = await new Promise((resolve, reject) => {
      getJson(
        {
          api_key: "fe5b0868f3cb875e975a89a63bfae5a6d069ad315df8de9286a9a5b2699317c8",
          engine: "google_product",
          google_domain: "google.com",
          gl: "us",
          hl: "en",
          product_id: product_id,
        },
        (json: any) => {
          if (json?.error) {
            return reject(new Error(json.error));
          }
          resolve(json);
        }
      );
    });

    console.log(serpData)

    return new Response(JSON.stringify(serpData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Error fetching product details from SerpAPI:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
