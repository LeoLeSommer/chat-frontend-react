export type PaginatedResponse<TElem, TCursor> = {
  data: TElem[];
  nextCursor: TCursor | null;
};
