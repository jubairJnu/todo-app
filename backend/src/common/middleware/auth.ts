import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'src/config';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const token = auth.slice('Bearer '.length);
    try {
      const payload = jwt.verify(token, config.jwt.access_token);

      (req as any).user = payload;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
