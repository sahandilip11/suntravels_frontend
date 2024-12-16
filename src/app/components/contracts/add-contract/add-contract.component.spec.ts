import { TestBed } from '@angular/core/testing';
import { AddContractComponent } from './add-contract.component';
import { ContractsService } from '../../../services/contracts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AddContractComponent', () => {
  let contractsServiceSpy: jasmine.SpyObj<ContractsService>;

  beforeEach(async () => {
    contractsServiceSpy = jasmine.createSpyObj('ContractsService', ['addContract']);
    contractsServiceSpy.addContract.and.returnValue(of({})); // Mock `addContract` to return an observable

    await TestBed.configureTestingModule({
      imports: [
        AddContractComponent, // Import standalone component
        HttpClientTestingModule, // Provide HttpClient dependencies
      ],
      providers: [{ provide: ContractsService, useValue: contractsServiceSpy }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call addContract on submit', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;

    component.contract.roomTypeList.push({
      typeName: 'Deluxe',
      maxNoOfAdults: 2,
      noOfRooms: 1,
      perPersonPrice: 100,
    });
    component.onSubmit();

    expect(contractsServiceSpy.addContract).toHaveBeenCalled();
  });

  it('should add a new room to the roomTypeList', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;
  
    const initialRoomCount = component.contract.roomTypeList.length;
    component.addRoom();
    const updatedRoomCount = component.contract.roomTypeList.length;
  
    expect(updatedRoomCount).toBe(initialRoomCount + 1);
    expect(component.isPopupOpen).toBeTrue(); // Ensures the popup opens
  });

  it('should remove the last added room when closing the popup', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;
  
    component.addRoom();
    const initialRoomCount = component.contract.roomTypeList.length;
  
    component.closePopup();
    const updatedRoomCount = component.contract.roomTypeList.length;
  
    expect(updatedRoomCount).toBe(initialRoomCount - 1);
    expect(component.isPopupOpen).toBeFalse(); // Ensures the popup closes
  });
  
  it('should not submit if no room types are added', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;
  
    component.contract.roomTypeList = [];
    spyOn(window, 'alert');
  
    component.onSubmit();
  
    expect(window.alert).toHaveBeenCalledWith('At least one room type is required.');
    expect(contractsServiceSpy.addContract).not.toHaveBeenCalled();
  });

  it('should enable the submit button if form is valid', () => {
    const fixture = TestBed.createComponent(AddContractComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
  
    // Mock valid form inputs
    component.contract = {
      hotelName: 'Hotel Test',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      markupRate: 10,
      roomTypeList: [
        { typeName: 'Deluxe', maxNoOfAdults: 2, noOfRooms: 1, perPersonPrice: 100 },
      ],
    };
  
    fixture.detectChanges();
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
  
    expect(submitButton.disabled).toBeFalse(); // Submit button should be enabled
  });


  // it('should mark validFrom as invalid if in the past', async () => {
  //   const fixture = TestBed.createComponent(AddContractComponent);
  //   const component = fixture.componentInstance;
  //   const compiled = fixture.nativeElement as HTMLElement;
  
  //   // Arrange: Set a past date for validFrom
  //   const validFromInput = compiled.querySelector('input[name="validFrom"]') as HTMLInputElement;
  //   validFromInput.value = '2023-01-01'; // Past date
  //   validFromInput.dispatchEvent(new Event('input')); // Simulate user input
  //   fixture.detectChanges(); // Update DOM
  
  //   // Act: Trigger Angular's change detection
  //   await fixture.whenStable();
  
  //   // Assert: Check if the ng-invalid class is applied
  //   expect(validFromInput.classList).toContain('ng-invalid');
  
  //   // Assert: Check for the error message
  //   const errorMessage = compiled.querySelector('#valid-form .error p') as HTMLElement;
  //   expect(errorMessage.textContent).toContain('Valid From cannot be a past date.');
  // });
  
  
  // it('should mark validTo as invalid if before validFrom', () => {
  //   const fixture = TestBed.createComponent(AddContractComponent);
  //   const component = fixture.componentInstance;
  //   const compiled = fixture.nativeElement as HTMLElement;
  
  //   component.contract.validFrom = '2024-01-02'; // Valid From
  //   const validToInput = compiled.querySelector('input[name="validTo"]') as HTMLInputElement;
  //   validToInput.value = '2024-01-01'; // Invalid Valid To
  //   validToInput.dispatchEvent(new Event('input'));
  
  //   fixture.detectChanges();
  //   expect(validToInput.classList).toContain('ng-invalid');
  // });
  
});
