import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: number): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_SECRET as string,
    { expiresIn: '7d' }
  );
};

export const verifyRefreshToken = (token: string): { userId: number } | null => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET as string) as { userId: number };
    return decoded;
  } catch {
    return null;
  }
};

export const setRefreshTokenCookie = (
  res: any,
  refreshToken: string
): void => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  });
};

export const clearRefreshTokenCookie = (res: any): void => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/'
  });
};
