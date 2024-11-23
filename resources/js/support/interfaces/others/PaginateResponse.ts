import { PaginateLinks } from "./PaginateLinks";
import { PaginateMeta } from "./PaginateMeta";

export interface PaginateResponse<Resource> {
  data: Resource[],
  links:PaginateLinks,
  meta: PaginateMeta
}