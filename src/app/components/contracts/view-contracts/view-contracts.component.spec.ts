import { TestBed } from '@angular/core/testing';
import { ViewContractsComponent } from './view-contracts.component';
import { ContractsService } from '../../../services/contracts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewContractsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContractsComponent, HttpClientTestingModule], // Import standalone component and HttpClientTestingModule
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the hotel selection dropdown', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const compiled = fixture.nativeElement as HTMLElement;
  
    const dropdown = compiled.querySelector('#hotelSelect');
    expect(dropdown).toBeTruthy(); // Check that the dropdown is rendered
    expect(dropdown?.tagName).toBe('SELECT'); // Ensure it's a SELECT element
  });

  it('should filter contracts when a hotel is selected', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
  
    component.hotelNames = ['Hotel A', 'Hotel B'];
    component.contracts = [
      { contractId: 1, hotelName: 'Hotel A', validFrom: '2024-01-01', validTo: '2024-12-31', markupRate: 10, roomTypeList: [] },
      { contractId: 2, hotelName: 'Hotel B', validFrom: '2024-02-01', validTo: '2024-11-30', markupRate: 15, roomTypeList: [] },
    ];
    component.selectedHotel = 'Hotel A';
    component.filterContracts();
  
    expect(component.filteredContracts.length).toBe(1);
    expect(component.filteredContracts[0].hotelName).toBe('Hotel A');
  });

  it('should render contract cards', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
  
    component.filteredContracts = [
      { contractId: 1, hotelName: 'Hotel A', validFrom: '2024-01-01', validTo: '2024-12-31', markupRate: 10, roomTypeList: [] },
    ];
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const cardHeaders = compiled.querySelectorAll('.contract-card .hotel-name');
    expect(cardHeaders.length).toBe(1);
    expect(cardHeaders[0].textContent).toContain('Hotel A');
  });
  
  it('should display no contracts message when no contracts are found', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
  
    component.filteredContracts = [];
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const noContractsMessage = compiled.querySelector('.no-contracts-message');
    expect(noContractsMessage).toBeTruthy();
    expect(noContractsMessage?.textContent).toContain('No contracts found for the selected hotel.');
  });

  it('should render Edit and Delete buttons for each contract', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
  
    component.filteredContracts = [
      { contractId: 1, hotelName: 'Hotel A', validFrom: '2024-01-01', validTo: '2024-12-31', markupRate: 10, roomTypeList: [] },
    ];
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('.edit-button');
    const deleteButton = compiled.querySelector('.delete-button');
  
    expect(editButton).toBeTruthy();
    expect(editButton?.textContent).toContain('Edit');
    expect(deleteButton).toBeTruthy();
    expect(deleteButton?.textContent).toContain('Delete');
  });
  
  it('should render the room type table for each contract', () => {
    const fixture = TestBed.createComponent(ViewContractsComponent);
    const component = fixture.componentInstance;
  
    component.filteredContracts = [
      {
        contractId: 1,
        hotelName: 'Hotel A',
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        markupRate: 10,
        roomTypeList: [
          { typeName: 'Deluxe', maxNoOfAdults: 2, noOfRooms: 1, perPersonPrice: 100 },
        ],
      },
    ];
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('.room-types-table tbody tr');
    expect(tableRows.length).toBe(1);
    expect(tableRows[0].textContent).toContain('Deluxe');
    expect(tableRows[0].textContent).toContain('2');
    expect(tableRows[0].textContent).toContain('1');
    expect(tableRows[0].textContent).toContain('$100');
  });
  
  

});
