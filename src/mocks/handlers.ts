import { environment } from '@/env';
import { http, HttpResponse } from 'msw';

const registerHandler = http.post(
  `${environment.apiUrl}/register`,
  async ({ request }) => {
    // @ts-expect-error - TS complains about missing `json` method on `Body`.
    const { login } = await request.json();

    if (login === 'mockAdmin') {
      return new HttpResponse(null, {
        status: 401,
      });
    }

    return HttpResponse.json({
      success: true,
    });
  }
);

export const handlers = [registerHandler];
