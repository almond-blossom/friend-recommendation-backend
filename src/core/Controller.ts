import { Request, Response } from 'express';

interface Controller {
  handle(req: Request, res: Response): Promise<void>;
}

export {
  Controller, Response, Request,
};
