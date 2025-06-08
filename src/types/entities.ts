export type User = {
  idUser: string;
  idUserGroup: string | null;
  name: string;
  email: string;
  dateOfBirth: string; 
  genre: number;      
  isActive: boolean;
  isAdmin: boolean;
  isManager: boolean;
  allowWalletWatch: boolean;
  isSuperAdmin: boolean;
  profilePic?: string;
  creationDate: string;

};

export type UserCreate = {
  name: string;
  email: string;
  dateOfBirth: string; 
  genre: number;       
  password:string,
  allowWalletWatch: boolean;
}

export type Transaction = {
  id: number,
  date: string,
  amount: number,
  is_planned: boolean  
}
