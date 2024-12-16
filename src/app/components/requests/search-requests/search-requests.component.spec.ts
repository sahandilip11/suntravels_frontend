import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchRequestsComponent } from './search-requests.component';
import { RequestsService } from '../../../services/requests.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SearchRequestsComponent', () => {
  let component: SearchRequestsComponent;
  let fixture: ComponentFixture<SearchRequestsComponent>;
  let requestsServiceSpy: jasmine.SpyObj<RequestsService>;

  beforeEach(async () => {
    requestsServiceSpy = jasmine.createSpyObj('RequestsService', ['searchRequests']);
    requestsServiceSpy.searchRequests.and.returnValue(of([])); // Default mock for `searchRequests`

    await TestBed.configureTestingModule({
      imports: [SearchRequestsComponent, HttpClientTestingModule],
      providers: [{ provide: RequestsService, useValue: requestsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form with required fields', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();

    const checkInDateInput = fixture.debugElement.query(By.css('input[name="checkInDate"]'));
    expect(checkInDateInput).toBeTruthy();

    const numberOfNightsInput = fixture.debugElement.query(By.css('input[name="numberOfNights"]'));
    expect(numberOfNightsInput).toBeTruthy();
  });


  it('should remove a room request when "Cancel" button is clicked', () => {
    component.addRoomRequest(); // Add one room request
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));
    cancelButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.searchRequest.roomRequests.length).toBe(0);
  });

  it('should call searchRequests on form submit', () => {
    component.searchRequest.checkInDate = '2024-12-25';
    component.searchRequest.numberOfNights = 3;
    component.addRoomRequest();
    component.searchRequest.roomRequests[0] = { numberOfAdults: 2, numberOfRooms: 1 };
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    expect(requestsServiceSpy.searchRequests).toHaveBeenCalledWith(component.searchRequest);
  });

  it('should display search results when available', async () => {
    // Arrange
    const mockResults = [
      {
        hotelName: 'Test Hotel',
        availabilityStatus: 'Available',
        price: 200,
        roomType: [{ typeName: 'Deluxe', maxNoAdults: 2, perPersonPrice: 100 }],
      },
    ];
    requestsServiceSpy.searchRequests.and.returnValue(of(mockResults));
  
    // Act
    component.isLoading = false; // Ensure loading is false
    component.searchResults = mockResults; // Populate mock data
    fixture.detectChanges(); // Trigger DOM updates
    await fixture.whenStable(); // Wait for async operations to complete
  
    // Assert
    const resultsTable = fixture.nativeElement.querySelector('.results-table');
    expect(resultsTable).toBeTruthy(); // Ensure the table exists
  
    const firstHotelNameCell = resultsTable.querySelector('tbody tr td');
    expect(firstHotelNameCell.textContent.trim()).toBe('Test Hotel'); // Verify the hotel name
  });
  
  
  

  it('should show loading state during search', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingState = fixture.debugElement.query(By.css('.loading-state'));
    expect(loadingState).toBeTruthy();
    expect(loadingState.nativeElement.textContent).toContain('Loading search results...');
  });

  it('should not display search results if none are available', () => {
    component.searchResults = [];
    fixture.detectChanges();

    const resultsWrapper = fixture.debugElement.query(By.css('.results-wrapper'));
    expect(resultsWrapper).toBeNull();
  });

  it('should filter results to display only available rooms', () => {
    component.searchResults = [
      { hotelName: 'Hotel A', availabilityStatus: 'Available', price: 200, roomType: [] },
      { hotelName: 'Hotel B', availabilityStatus: 'Unavailable', price: 300, roomType: [] },
    ];
    fixture.detectChanges();

    const filteredResults = component.filteredResults;
    expect(filteredResults.length).toBe(1);
    expect(filteredResults[0].hotelName).toBe('Hotel A');
  });
});
