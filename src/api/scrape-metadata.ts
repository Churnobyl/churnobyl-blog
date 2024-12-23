import metascraper from "metascraper";
import metascraperUrl from "metascraper-url";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";

const scraper = metascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage(),
]);

export default async function handler(
  req: { query: { url: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: metascraper.Metadata): void; new (): any };
    };
  }
) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await response.text();
    const metadata = await scraper({ html, url });
    res.status(200).json(metadata);
  } catch (error: any) {
    console.error("Error scraping metadata:", error.message);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
}
