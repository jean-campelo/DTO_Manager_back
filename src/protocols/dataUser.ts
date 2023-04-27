export type dataUser = {
  id: number;
  name: string;
  email: string;
  password: string;  
};

export type dataUserEntity = Omit<dataUser, "id">;
