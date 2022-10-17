export interface Token {
  name: string;
  img: string;
}

export interface Blockchain {
  name: string;
  img: string;
}

export interface Fee {
  token: Token;
  amount: number;
}
