import { TRouter } from '../types';
import show from '../api/schedules/show';
import add from '../api/schedules/add';
import observer from '../api/schedules/observer';

const config: TRouter[] = [
  {
    method: 'get',
    endpoint: show,
    path: 'schedules'
  },
  {
    method: 'post',
    endpoint: add,
    path: 'schedules'
  },
  {
    method: 'get',
    endpoint: observer,
    path: 'scheduler-observer'
  }
];

export default config;
