import { environment } from '@/env';
import { HttpClient } from '@angular/common/http';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { RegisterService } from './register.service';

describe(RegisterService.name, () => {
  let service: RegisterService;

  beforeEach(() => MockBuilder([RegisterService], [HttpClient]));

  beforeEach(() => {
    service = MockRender(RegisterService).point.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should call http post', () => {
      const data = {
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        login: 'test',
      };
      const httpClient = ngMocks.findInstance(HttpClient);
      spyOn(httpClient, 'post');

      service.register(data);

      expect(httpClient.post).toHaveBeenCalledWith(
        `${environment.apiUrl}/register`,
        data
      );
    });
  });
});
