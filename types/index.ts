import { Response, Request, NextFunction } from 'express';

type TStorage = {
  [key: string]: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
};

type TDateTime = {
  date: string;
  time: string;
};

type TResponse = {
  data: TStorage | null;
  message: string;
  status: number;
};

type TRouter = {
  endpoint: (req: Request, res: Response, next: NextFunction) => void;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
};

export type {
  TStorage,
  TDateTime,
  TResponse,
  TRouter,
};
