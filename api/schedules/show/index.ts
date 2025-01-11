import { Response, Request } from 'express';
import StatusCode from '../../../tools/StatusCode';
import storage from '../../../tools/Storage';
import { TStorage } from '../../../types';

const endpoint = async (req: Request, res: Response): Promise<void> => {
  const { date  = '' }: any = req.query;
  let data: TStorage = await storage.get();

  if (data[date]) {
    data = { [date]: data[date] };
  }

  res.status(StatusCode.OK).json({
    data,
    message: 'Successfuly',
    status: StatusCode.OK,
  });
};

export default endpoint;
