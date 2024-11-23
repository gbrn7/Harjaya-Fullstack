import { DateRange } from "react-day-picker";
import { ServiceFilterOptions } from "../others/ServiceFilterOptions";
export interface ShipmentFilters extends ServiceFilterOptions{
  type?: string,
  query?: string,
  suppliers_id?: (string|number)[],
  raw_good_types_id?: (string|number)[],
  start_created_at?: string,
  end_created_at?: string
}