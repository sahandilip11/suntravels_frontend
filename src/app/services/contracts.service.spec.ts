import { TestBed } from '@angular/core/testing';
import { ContractsService } from './contracts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractsService', () => {
  let service: ContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock HttpClient
    });
    service = TestBed.inject(ContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

