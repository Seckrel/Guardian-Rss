import { IGuardianResponse } from "@gobal-types/types";
export const fetchXMLRSSFeed = async (sectionName: string) => {
  const guardianAPIURI = `https://content.guardianapis.com/${sectionName}?api-key=${process.env.GUARDIAN_API_KEY}&format=json`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  let guardianRespond;
  try {
    guardianRespond = await fetch(guardianAPIURI, requestOptions);
    const rssFeedContent = await guardianRespond.json();

    return {
      ok: guardianRespond?.ok,
      message: rssFeedContent,
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

export const parseXMLToJSON = async (rssContentJSON: IGuardianResponse) => {

};
