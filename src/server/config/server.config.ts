export interface ServerConfig {
  MONGO_DB_URL: string;
  TOKEN_SECRET: string;
}

export const SERVER_CONFIG: ServerConfig = {
  MONGO_DB_URL: process.env.MONGO_DB_URL as string,
  TOKEN_SECRET: process.env.TOKEN_SECRET as string,
};
