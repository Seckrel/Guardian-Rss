interface IGuardianErrorResponse {
    message: string;
    status: string;
}


interface IGuardianResponseEdition {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    code: string;
}

interface IGuardianOkResponse {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    edition: IGuardianResponseEdition;
}


interface IGuardianResponseSection {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string
    edition: IGuardianResponseEdition[]
}

interface IGuardianResponseResult {
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

export interface IGuardianResponse {
  response: IGuardianErrorResponse | IGuardianOkResponse;
  section?: IGuardianResponseSection
  results?: IGuardianResponseResult

}
