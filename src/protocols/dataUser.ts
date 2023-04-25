export type dataUser = {
  id: number;
  email: string;
  password: string;
};

export type dataUserEntity = Omit<dataUser, "id">;
