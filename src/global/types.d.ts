interface IGuardianResponseEdition {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  code: string;
}

interface IGuardianResponseSection {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  edition: IGuardianResponseEdition[];
}

export interface IGuardianResponseResults {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: string;
  pillarId: string;
  pillarName: string;
}

export interface IGuardianOkResponse {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  edition: IGuardianResponseEdition;
  section: IGuardianResponseSection;
  results: IGuardianResponseResults[];
}

export interface IGuardianErrorResponse {
  message: string;
  status: string;
}

export type RSSContentJSON = IGuardianErrorResponse | IGuardianOkResponse;
