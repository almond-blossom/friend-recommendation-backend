interface Controller {
  handle(req: Request, res: Response): Promise<void>;
}

interface Request {
  body: { [x: string]: any };
  params: { [x: string]: any };
}

interface Response {
  send: Send;
  json: Send;
  status(code: number): Response;
  sendStatus(code: number): Response;
}

type Send = (body?: any) => Response;

export {
  Controller, Request, Response,
};
