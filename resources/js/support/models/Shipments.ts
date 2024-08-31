import { Suppliers } from "./Suppliers";

export interface Shipment{
  id: number,
  supplier:Suppliers,
  plat_number: string,
  driver_name: string,
  shipment_date: string,
}