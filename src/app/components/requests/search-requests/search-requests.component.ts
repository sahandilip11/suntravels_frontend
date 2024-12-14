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

  constructor(private requestsService: RequestsService) {}

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
  

  // Submit the search request and fetch results
  onSubmit() {
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
