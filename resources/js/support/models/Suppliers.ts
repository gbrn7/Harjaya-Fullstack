import { Resource } from "../interfaces/resources";

export interface Suppliers extends Resource{
  id: number,
  name:string,
  company: string,
  address: string,
  phone_num:string
}