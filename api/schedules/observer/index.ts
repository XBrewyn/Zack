import { Response, Request } from 'express';
import StatusCode from '../../../tools/StatusCode';
import Scheduler from '../../../tools/Scheduler';

const endpoint = async (_: Request, res: Response) => {
  const message: string = `Task observed at: ${new Date().toISOString()}`;

  Scheduler.observer();
  console.log(message);
  res.status(StatusCode.OK).json({ message });
}

export default endpoint;
