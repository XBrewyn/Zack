import { Response, Request } from 'express';
import { TResponse } from '../../../types';
import Message from '../../../tools/Message';
import Scheduler from '../../../tools/Scheduler';
import StatusCode from '../../../tools/StatusCode';

const endpoint = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { date, schedule: time, email }: any = req.body;
  const response: TResponse = {
    data: null,
    message: Message.SCHEDULE_ADDED_FAILURE,
    status: StatusCode.BAD_REQUEST,
  };

  response.message = await Scheduler.add(date, time, email);

  if (response.message === Message.SCHEDULE_ADDED_SUCCESS) {
    response.data = { date, schedule: time, email };
    response.status = StatusCode.OK;
  }

  return res.status(response.status).json(response);
};

export default endpoint;
