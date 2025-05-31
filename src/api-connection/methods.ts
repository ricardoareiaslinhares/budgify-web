import { api } from "./config";

export const getRecords = async <T>(
  entity: string,
  params?: string,
): Promise<T[]> => {
  try {
    const response = await api.get<T[]>(`${entity}?${params}`);
    console.log("response.data =>", response.data); // Delete
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching records of ${entity}:`, error);
    throw error;
  }
};

export const getRecord = async <T>(
  entity: string,
  id: number,
  params?: string,
): Promise<T> => {
  try {
    const response = await api.get<T>(`${entity}/${id}?${params}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching record from ${entity}:`, error);
    throw error;
  }
}

export const updateRecord = async <T> (entity: string, id: number|string, data: Partial<T>, params?:string): Promise<T> => {
  try {
    console.log("data updatea =>", data); // Delete
    
    const response = await api.patch<T>(`${entity}/${id}?${params}`, data)
    console.log("response =>", response); // Delete
    
    return response.data
  } catch (error) {
    console.error(`Error updating record from ${entity} id of ${id}:`, error);
    throw error;
  }
}
