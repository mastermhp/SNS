const UPSTREAM = "https://api.slicenshare.com";

async function handler(req, { params }) {
  const { path } = await params;
  const segments = Array.isArray(path) ? path.join("/") : path;
  const url = `${UPSTREAM}/api/${segments}`;

  const headers = {
    "Content-Type": "application/json",
  };

  // Forward the Authorization header if present
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const fetchOptions = {
    method: req.method,
    headers,
  };

  // Forward body for non-GET requests
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      const body = await req.text();
      if (body) {
        fetchOptions.body = body;
      }
    } catch {
      // no body
    }
  }

  console.log(`[proxy] ${req.method} ${url}`);

  try {
    const upstream = await fetch(url, fetchOptions);
    const responseBody = await upstream.text();

    console.log(`[proxy] Response: ${upstream.status} - ${responseBody.substring(0, 200)}`);

    return new Response(responseBody, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error(`[proxy] Upstream error:`, err.message);
    return new Response(
      JSON.stringify({ message: "Proxy error: " + err.message }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
