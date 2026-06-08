import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'source'],
  }
});

export async function GET() {
  try {
    // Fetch Google News RSS for Ujjain Mahakumbh 2028
    const feed = await parser.parseURL('https://news.google.com/rss/search?q=Ujjain+Kumbh+OR+Simhastha+2028&hl=en-IN&gl=IN&ceid=IN:en');
    
    const newsItems = feed.items.slice(0, 15).map((item) => ({
      id: item.guid || Math.random().toString(),
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source || item.creator || 'Google News',
      contentSnippet: item.contentSnippet || item.content,
    }));

    return NextResponse.json({
      status: "success",
      articles: newsItems,
    });
  } catch (error) {
    console.error('News API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
