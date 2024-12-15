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

  isPopupOpen = false; // State to control room block popup visibility
  currentRoomIndex: number | null = null; // Track the room block being edited

  constructor(private contractsService: ContractsService, private router: Router) {} // Inject Router

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
    if (this.contract.roomTypeList.length === 0) {
      alert('At least one room type is required.');
      return;
    }

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
