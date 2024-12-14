import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '../../../services/requests.service';

@Component({
  selector: 'app-search-requests',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-requests.component.html',
  styleUrls: ['./search-requests.component.css'],
})
export class SearchRequestsComponent {
  searchRequest = {
    checkInDate: '',
    numberOfNights: 0,
    roomRequests: [] as { numberOfAdults: number; numberOfRooms: number }[],
  };

  searchResults: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private requestsService: RequestsService) {}

  addRoomRequest() {
    this.searchRequest.roomRequests.push({
      numberOfAdults: 0,
      numberOfRooms: 0,
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = null;

    this.requestsService.searchRequests(this.searchRequest).subscribe({
      next: (response) => {
        this.searchResults = response; // Store results to display on the page
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
