import {
  IGuardianOkResponse,
  IGuardianResponseResults,
} from "@gobal-types/types";
import xmlbuilder from "xmlbuilder2";

export const fetchJSONRSSFeed = async (sectionName: Readonly<string>) => {
  /**
   * Service that fetches JSON RSS feed from The Guardian's API
   *
   * @param sectionName (String): name of section to fetch
   * @returns (Object): with keys ok, rssFeedJSON, and status
   */

  const guardianAPIURI = `https://content.guardianapis.com/${sectionName}?api-key=${process.env.GUARDIAN_API_KEY}&format=json`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const guardianRespond = await fetch(guardianAPIURI, requestOptions);
    const rssFeedContent = await guardianRespond.json();

    return {
      ok: guardianRespond?.ok,
      rssFeedJSON: rssFeedContent.response,
      status: guardianRespond?.status,
    };
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
      error: `Error: Failed to fetch RSS feed from The Guardian | ${error}`,
      status: 400,
    };
  }
};

export const parseJSONToXML = async (rssContentJSON: Readonly<IGuardianOkResponse>) => {
  /**
   * Service that converts guardians JSON RSS feed to RSS (version 2.0) XML
   *
   * @param rssContentJSON (IGuardianOkResponse): JSON returned by Guardian RSS API
   * @returns rootXMLNode (XMLBuilder): xml RSS feed parsed from JSON RSS data
   */

  const rootXMLNode = xmlbuilder
    .create({ version: "2.0" })
    .ele("rss", { version: "2.0" });

  const channelXMLNode = rootXMLNode.ele("channel");

  const edition = rssContentJSON?.edition;

  channelXMLNode.ele("title").txt(`The Guardian ${edition.webTitle}`);

  channelXMLNode.ele("link").txt(edition.webUrl);

  channelXMLNode.ele("language").txt("en");

  channelXMLNode.ele("description");

  const feedResults: IGuardianResponseResults[] = rssContentJSON.results;

  for (const feedResult of feedResults) {
    channelXMLNode
      .ele("item")
      .ele("title")
      .txt(feedResult.webTitle)
      .up()
      .ele("link")
      .txt(feedResult.webUrl)
      .up()
      .ele("description")
      .up()
      .ele("pubDate")
      .txt(new Date(feedResult.webPublicationDate).toUTCString())
      .up()
      .ele("guid", { isPermaLink: true })
      .txt(feedResult.webUrl);
  }

  return rootXMLNode;
};
