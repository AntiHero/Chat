import { type FastifyReply } from 'fastify';

export const setAuthCookies = (
  response: FastifyReply,
  accessToken: string,
  refreshToken: string,
) => {
  response
    .setCookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .setCookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
};
