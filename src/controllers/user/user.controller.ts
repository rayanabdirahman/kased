import express from 'express';

export default class UserController {
  public test = (req: express.Request, res: express.Response) =>
    res.send('Hello user')
}
