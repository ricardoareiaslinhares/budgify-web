import { api } from "./config";

type Response<T> = {
status: number;
message: string | null,
data: T
}

export const getRecords = async <T>(
  entity: string,
  params?: string,
): Promise<T[]> => {
  try {
    const response = await api.get<Response<T[]>>(`${entity}?${params}`);
    console.log("response.data =>", response.data); // Delete
    console.log("entity =>", entity); // Delete
    console.log("params =>", params); // Delete
    
    
    
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching records of ${entity}:`, error);
    throw error;
  }
};

export const getRecord = async <T>(
  entity: string,
  id: number,
  params: string
): Promise<T> => {
  try {
    const response = await api.get<Response<T>>(`${entity}/${id}?${params}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching record from ${entity}:`, error);
    throw error;
  }
}

export const updateRecord = async <T> (entity: string, id: number|string, data: Partial<T>, params?:string): Promise<T> => {
  try {
      const url = params ? `${entity}?id=${id}&${params}` : `${entity}?id=${id}`;
    
    const response = await api.patch<Response<T>>(url, data);
    return response.data.data
  } catch (error) {
    console.error(`Error updating record from ${entity} id of ${id}:`, error);
    throw error;
  }
}

export const deleteRecord = async <T>(entity: string, id: number | string, params?: string): Promise<T> => {
  console.log("entity, id =>", entity, id); // Delete
  
  try {
    const url = params ? `${entity}?id=${id}&${params}` : `${entity}?id=${id}`;
    
    const response = await api.delete<Response<T>>(url);
    console.log("Deleted record response =>", response); // Optional log

    return response.data.data;
  } catch (error) {
    console.error(`Error deleting record from ${entity} with id ${id}:`, error);
    throw error;
  }
};

export const createRecord = async <T>(
  entity: string,
  data: T
): Promise<T> => {
  try {
    const response = await api.post<Response<T>>(`${entity}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Error creating record in ${entity}:`, error);
    throw error;
  }
};
