import { Shipment } from "@/support/models/Shipment";
import { Resource } from "./Resource";
import { Supplier } from "@/support/models/Supplier";

export interface ShipmentResource extends Resource, Shipment{
  supplier: Supplier
}