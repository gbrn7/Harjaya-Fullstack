import { DateRange } from "./DateRange";
import { GenericFilters } from "./GenericFilters";
import { Keyword } from "./Keyword";

export interface ShipmentFilters{
  keyword: Keyword,
  dateRange: DateRange,
  suppliers: GenericFilters[],
  rawGoodTypes: GenericFilters[],
}