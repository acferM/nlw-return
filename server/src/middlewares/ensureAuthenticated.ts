import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";

export function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization

  if (!auth) {
    throw new AppError('JWT missing', 401)
  }

  const [, token] = auth.split(' ')

  try {
    const secret = process.env.JWT_SECRET

    const decoded = verify(token, String(secret))

    const { sub } = decoded as { sub: string }

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT', 401)
  }
}