import { ServiceFilterOptions } from "../others/ServiceFilterOptions";
export interface ShipmentFilters extends ServiceFilterOptions{
  type?: string,
  query?: string,
  suppliers?: (string|number)[],
  rawGoodTypes?: (string|number)[],
  start_created_at?: string|Date,
  end_created_at?: string|Date,
}