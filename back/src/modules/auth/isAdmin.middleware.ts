import { Injectable, NestMiddleware, NotAcceptableException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization) throw new NotAcceptableException()

    const token = req.headers.authorization.slice(7)
    const { isAdmin, sub }: any = await verify(token, process.env.SECRET_KEY)

    if(!isAdmin) throw new NotAcceptableException()

    next();
  }
}
