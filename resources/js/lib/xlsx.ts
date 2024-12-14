import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadShipmentDataToExcel(data:any[]=[]){
  const columns:IJsonSheet[] = [
    {
      sheet: "Pengiriman",
      columns: [
        {label: "ID Pengiriman", value: "id"},
        {label: "Supplier", value: "supplier.name"},
        {label: "Sopir", value: "driver_name"},
        {label: "Nomor Plat", value: "plat_number"},
        {label: "Tanggal diterima", value: "shipment_date"},
      ],
      content :data
    }
  ];

  let settings = {
    fileName: "Data Pengiriman",
  };

  xlsx(columns, settings)
}