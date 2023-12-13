import { environment } from '@/env';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(RegisterService);
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

      service.register(data);

      expect(httpClientSpy.post).toHaveBeenCalledWith(
        `${environment.apiUrl}/register`,
        data
      );
    });
  });
});
