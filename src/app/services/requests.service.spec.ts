import { RequestsService } from './requests.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestsService', () => {
  let service: RequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock HttpClient
    });
    service = TestBed.inject(RequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

