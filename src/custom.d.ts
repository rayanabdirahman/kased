import express from 'express';

export interface IExtendedRequest extends express.Request {
  auth?: { [key: string]: any };
  profile?: { [key: string]: any };
}