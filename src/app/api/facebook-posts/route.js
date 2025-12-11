import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN
    
    if (!pageId || !accessToken) {
      console.log('[v0] Facebook credentials not configured, using fallback content')
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    console.log('[v0] Fetching Facebook posts...')
    
    // Fetch posts from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v23.0/${pageId}/posts?fields=id,message,full_picture,created_time,permalink_url&limit=5&access_token=${accessToken}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      console.log('[v0] Facebook API error:', response.status)
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    const data = await response.json()
    console.log('[v0] Facebook posts fetched successfully:', data.data?.length || 0, 'posts')
    
    return NextResponse.json({ posts: data.data || [] })
  } catch (error) {
    console.error('[v0] Error fetching Facebook posts:', error)
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}
