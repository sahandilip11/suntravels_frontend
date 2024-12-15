import { Component } from '@angular/core';
import { ContractsService } from '../../../services/contracts.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router'; // Import Router

interface RoomType {
  typeName: string;
  maxNoOfAdults: number;
  noOfRooms: number;
  perPersonPrice: number;
}

@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent {
  contract = {
    hotelName: '',
    validFrom: '',
    validTo: '',
    markupRate: 0,
    roomTypeList: [] as RoomType[],
  };

  today: string; // Define the `today` variable

  isPopupOpen = false; // State to control room block popup visibility
  currentRoomIndex: number | null = null; // Track the room block being edited

  constructor(
    private contractsService: ContractsService,
    private router: Router
  ) {
    // Initialize `today` to the current date in YYYY-MM-DD format
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

  // Check if the required fields are filled and valid
  isFormReady(): boolean {
    return (
      this.contract.hotelName.trim() !== '' && // Ensure hotel name is not empty
      this.contract.markupRate > 0 &&          // Ensure markup rate is valid
      this.contract.validFrom !== '' &&       // Ensure validFrom is filled
      this.contract.validTo !== '' &&         // Ensure validTo is filled
      new Date(this.contract.validTo) > new Date(this.contract.validFrom) // Ensure validTo > validFrom
    );
  }

  addRoom() {
    const newRoom: RoomType = {
      typeName: '',
      maxNoOfAdults: 0,
      noOfRooms: 0,
      perPersonPrice: 0,
    };
    this.contract.roomTypeList.push(newRoom); // Add a new room
    this.currentRoomIndex = this.contract.roomTypeList.length - 1; // Set the new room as the active one
    this.isPopupOpen = true; // Open the popup
  }

  closePopup() {
    if (this.currentRoomIndex !== null) {
      this.contract.roomTypeList.splice(this.currentRoomIndex, 1); // Remove the room if canceled
    }
    this.isPopupOpen = false; // Close the popup
    this.currentRoomIndex = null; // Reset the current room index
  }

  onSubmit() {
    // Check for room type
    if (this.contract.roomTypeList.length === 0) {
      alert('At least one room type is required.');
      return;
    }
  
    // Date validation
    const validFromDate = new Date(this.contract.validFrom);
    const validToDate = new Date(this.contract.validTo);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  
    if (validFromDate < today) {
      alert('Valid From date cannot be in the past.');
      return;
    }
  
    if (validToDate <= validFromDate) {
      alert('Valid To date must be later than Valid From date.');
      return;
    }
  
    // Submit the form if all validations pass
    this.contractsService.addContract(this.contract).subscribe({
      next: (response) => {
        console.log('Contract added:', response);
        this.router.navigate(['']); // Navigate to HomeComponent after successful submission
      },
      error: (err) => {
        console.error('Failed to add contract:', err);
      },
    });
  }
  
}
