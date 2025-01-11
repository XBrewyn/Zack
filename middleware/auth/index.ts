import { Response, Request } from 'express';
import StatusCode from '../../tools/StatusCode';
import { TResponse } from '../../types';
import Token from '../../tools/Token';

const middleware = async (req: Request, res: Response, next: any) => {
  const { token = '' }: any = req.query;
  const response: TResponse = {
    data: null,
    message: 'The token parameter is required.',
    status: StatusCode.BAD_REQUEST,
  };

  if (
    req.originalUrl === '/api/v1/scheduler-observer' ||
    await Token.isValid(token)
  ) {
    return next();
  } else if (token) {
    response.message = 'Invalid token.';
  }

  return res.status(StatusCode.OK).json(response);
};

export default middleware;
