import { NextFunction, Request, Response } from 'express';
import { AppError } from '../models/error';
import { TokenService } from '../services/token.service';
import { UserRepository } from '../../features/user/user.repository';

const tokenService = new TokenService();
const userRepository = new UserRepository();

export const RefreshAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new AppError(401, 'Autorización requerida');
  }

  const refreshToken = authorization.split('Bearer ')[1];
  let decodedToken;

  try {
    decodedToken = tokenService.verify(refreshToken);
  } catch (e: any) {
    throw new AppError(403, e.message);
  }

  if (!decodedToken) {
    throw new AppError(403, 'Token invalido 001');
  }

  if (!tokenService.isRefreshToken(decodedToken)) {
    throw new AppError(403, 'Tipo de token invalido');
  }

  const user = await userRepository.getRefreshTokenById(decodedToken.userId);

  if (!user) {
    throw new AppError(404, 'Usuario no existe');
  }

  if (!user.refreshToken) {
    throw new AppError(403, 'Token Invalido 0002');
  }

  const isValidRefreshToken = refreshToken === user.refreshToken;

  if (!isValidRefreshToken) {
    throw new AppError(403, 'Token Invalido 0003');
  }

  req.userId = decodedToken.userId;
  return next();
};
