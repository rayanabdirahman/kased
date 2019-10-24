import express from 'express';

export interface IExtendedRequest extends express.Request {
  auth?: { [key: string]: any };
  profile?: { [key: string]: any };
  product?: { [key: string]: any };
  category?: { [key: string]: any };
}