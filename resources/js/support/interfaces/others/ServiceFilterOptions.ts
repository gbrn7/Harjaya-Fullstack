export interface ServiceFilterOptions<query> {
  page?: number ,
  perpage?:number,
  sortBy?: string,
  sortOrder?:'asc'|'desc',
  query: query,
  [key: string]:any // allow for additional filter option
}