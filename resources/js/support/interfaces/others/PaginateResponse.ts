// import { PaginateMeta } from "./PaginateMeta";

export interface PaginateResponse<Resource> {
  data: Resource[],
  current_page: number,
  from: number,
  last_page:number,
  path: string,
  per_page: number,
  to: number,
  total: number,
  // meta: PaginateMeta
}