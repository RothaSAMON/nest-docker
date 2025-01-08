import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieStrategy {
  setCookie(response: Response, token: string) {
    return response.cookie('token', token);
  }

  clearCookie(response: Response) {
    return response.clearCookie('token');
  }
}
