export interface ServiceFilterOptions {
  page?: number,
  perpage?:number,
  sortBy?: string,
  sortOrder?:'asc'|'desc',
  
  [key: string]:any // allow for additional filter option
}