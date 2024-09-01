import { PaginateResponse } from "@/support/interfaces/others/PaginateResponse";
import { ServiceFilterOptions } from "@/support/interfaces/others/ServiceFilterOptions";
import { Resource } from "@/support/interfaces/resources/Resource";

export function serviceFactory<T extends Resource>(baseRoute:string){
    return {
      getAll: async (filters:ServiceFilterOptions = {}): Promise<PaginateResponse<T>> => {
        const url = route(`${baseRoute}.index`)

        try {
          return(await window.axios.get(url, {params: filters})).data;
        } catch (e) {
          console.log(`Error fetching resources: ${e}`)
          throw e
        }
      },
    }
}