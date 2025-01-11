import { Router } from 'express';
import { TRouter } from '../types';
import config from './config';

const router: Router = Router();

config.forEach(({ method, endpoint, path }: TRouter): void => {
  router[method](`/${path}`, endpoint);
});

export default router;
