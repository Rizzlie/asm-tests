import { environment } from '@/env';
import { http, HttpResponse } from 'msw';

const registerHandler = http.post(
  `${environment.apiUrl}/register`,
  async ({ request }) => {
    // @ts-ignore
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
