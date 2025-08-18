export interface IUser {
  id: string;
  login: string;
  password?: string;
}

export interface IRecipesFilter{
  q?: string;
  sort?: 'asc' | 'desc';
  mode?: "all" | "me";
  category?: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface IPagination {
  page?: number;
  limit?: number;
}