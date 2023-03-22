import { type FastifyReply } from 'fastify';

const OPTIONS = {
  secure: true,
  httpOnly: true,
  sameSite: true,
};

export const setAuthCookies = (
  response: FastifyReply,
  accessToken: string,
  refreshToken: string,
) => {
  response
    .setCookie('accessToken', accessToken, OPTIONS)
    .setCookie('refreshToken', refreshToken, OPTIONS);
};
