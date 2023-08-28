export type ClientReviewTableContentItem = {
  id: string;
  date: string;
  total: string;
  nps: string;
};

export type PaginatedClientReviewDto = {
  date: string;
  total: number;
  nps: number;
};

export type CreateClientReviewDto = {
  clientId: number;
  date: string;
  score: number;
  reason: string;
};
