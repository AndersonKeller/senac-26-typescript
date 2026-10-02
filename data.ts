interface Usuario {
  id: string;
  email: string;
  password: string;
  username: string;
}
export interface ReturnUsuario {
  id: string;
  email: string;
  username: string;
}
export const data: Usuario[] = [
  {
    id: "2",
    email: "teste@email.com",
    password: "1234",
    username: "teste",
  },
];
