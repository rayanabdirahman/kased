import express from 'express';
import logger from '../../helpers/logger';
import { ErrorMessage } from '../../constants';

// tslint:disable-next-line: no-var-requires
const braintree = require('braintree');

export default class BraintreeController {
  private gateway: any;

  constructor() {
    this.gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });
  }

  // generate braintree token for user
  public generateToken =  async (req: express.Request, res: express.Response) => {
    try {
      this.gateway.clientToken.generate({}, (error: any, response: any) => {
        if (error) {
          return res.status(500).send({ error });
        }

        return res.status(200).send(response);
      });
    } catch (error) {
      const message = error.message || error;
      logger.error(`<<<BrainTreeController.list>>> ${ErrorMessage.BRAINTREE_CLIENT_TOKEN}: ${message}`);
      res.send({ error: message });
    }
  }
}
