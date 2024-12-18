import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestsService, SearchResult } from '../../../services/requests.service';

@Component({
  selector: 'app-search-requests',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './search-requests.component.html',
  styleUrls: ['./search-requests.component.css'],
})
export class SearchRequestsComponent {
  searchRequest = {
    checkInDate: '',
    numberOfNights: 0,
    roomRequests: [] as { numberOfAdults: number; numberOfRooms: number }[],
  };

  searchResults: SearchResult[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  today: string; // Variable for today's date in YYYY-MM-DD format

  constructor(private requestsService: RequestsService) {
     // Initialize today's date
     const currentDate = new Date();
     this.today = currentDate.toISOString().split('T')[0];

     
  }

   // Helper method to validate that both check-in date and number of nights are filled
   isRoomRequestValid(): boolean {
    return (
      this.searchRequest.checkInDate.trim() !== '' &&
      this.searchRequest.numberOfNights > 0
    );
  }

  isRoomSearchValid(): boolean {
    return (
      this.searchRequest.checkInDate.trim() !== '' &&
      this.searchRequest.numberOfNights > 0 &&
      this.searchRequest.roomRequests.length > 0 &&
      this.searchRequest.roomRequests.every(
        (room) => room.numberOfAdults > 0 && room.numberOfRooms > 0
      )
    );
  }
  


  

  // Add a new room request
  addRoomRequest() {
    this.searchRequest.roomRequests.push({
      numberOfAdults: 0,
      numberOfRooms: 0,
    });
  }

  

  // Remove a specific room request
  removeRoomRequest(index: number) {
    if (index >= 0 && index < this.searchRequest.roomRequests.length) {
      this.searchRequest.roomRequests.splice(index, 1); // Remove the room request at the given index
    }
  }

  get filteredResults() {
    return this.searchResults.filter(result => result.availabilityStatus === 'Available');
  }
  

  onSubmit() {
    // Validate main form fields
    const { checkInDate, numberOfNights, roomRequests } = this.searchRequest;
  
    if (!checkInDate.trim() || numberOfNights <= 0) {
      alert('Please fill in all required fields: Check-in Date and Number of Nights.');
      return;
    }

    if( this.searchRequest.checkInDate < this.today ){
      alert('Add upcoming Date as Checking Date')
      return
    }
   
    // Validate roomRequests
    for (let i = 0; i < roomRequests.length; i++) {
      const room = roomRequests[i];
      if (room.numberOfAdults <= 0 || room.numberOfRooms <= 0) {
        alert(`Requested data for Room ${i + 1} cannot be zero`);
        return;
      }
    }
  
    // Proceed with submission if validation passes
    this.isLoading = true;
    this.errorMessage = null;
  
    this.requestsService.searchRequests(this.searchRequest).subscribe({
      next: (response: SearchResult[]) => {
        this.searchResults = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this.errorMessage = 'Failed to fetch search results. Please try again.';
        this.isLoading = false;
      },
    });
  }
  
}
