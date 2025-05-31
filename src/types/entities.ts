export type User = {
  id: number;
  name: string;
  mail: string;
  birthday: string; // consider `Date` if parsing later
  genre: string
  is_active: boolean;
  token: string;
  creation_date: string; // or `Date` if parsing
  role: string
};

export type Transaction = {
  id: number,
  date: string,
  amount: number,
  is_planned: boolean  
}
