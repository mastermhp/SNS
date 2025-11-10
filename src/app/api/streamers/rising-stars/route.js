export async function GET() {
  try {
    const response = await fetch("https://api.slicenshare.com/api/v1/public/streamers/rising-stars", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("Error fetching rising stars:", error)
    return Response.json(
      {
        success: false,
        error: error.message,
        data: [],
      },
      { status: 500 },
    )
  }
}
