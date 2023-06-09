export const fetchXMLRSSFeed = async (sectionName: string) => {
  const guardianAPIURI = `https://content.guardianapis.com/${sectionName}?api-key=${process.env.GUARDIAN_API_KEY}&format=xml`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  let guardianRespond;
  try {
    guardianRespond = await fetch(guardianAPIURI, requestOptions);
    const rssFeedContent: string = await guardianRespond.text();

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
