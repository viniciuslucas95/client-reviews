export type ClientTableContentItem = {
  id: string;
  name: string;
  contactName: string;
  date: string;
  cnpj?: string;
  score?: string;
};

export type PaginatedClientDto = {
  id: number;
  name: string;
  contactName: string;
  date: string;
  cnpj?: string;
  score?: number;
};

export type PaginatedClientForReviewCreationDto = {
  id: number;
  name: string;
  contactName: string;
  cnpj?: string;
  lastReviewDate: string;
};

export type CreateClientDto = {
  name: string;
  contactName: string;
  date: string;
  cnpj?: string;
};
