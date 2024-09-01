import { ShipmentResource } from "@/support/interfaces/resources/ShipmentResource";
import { serviceFactory } from "./serviceFactory";
import { ROUTES } from "@/constants/Index";

export const shipmentService = {
  ...serviceFactory<ShipmentResource>(ROUTES.SHIPMENTS),
  customFunctionExample: async () => {
    console.log("custom function")
  }
}