import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../../services/contracts.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for [(ngModel)]

interface Contract {
  hotelName: string;
  validFrom: string;
  validTo: string;
  markupRate: number;
  roomTypeList: Array<{
    typeName: string;
    maxNoOfAdults: number;
    noOfRooms: number;
    perPersonPrice: number;
  }>;
  contractId: number;
}

@Component({
  selector: 'app-view-contracts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css'],
})
export class ViewContractsComponent implements OnInit {
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  hotelNames: string[] = [];
  selectedHotel: string = '';
  private baseUrl = 'http://localhost:8080/api/v1/contracts'; // Base URL for API

  constructor(
    private contractsService: ContractsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.contractsService.getContracts().subscribe((data: Contract[]) => {
      this.contracts = data;
      this.filteredContracts = data; // Initially display all contracts
      // Extract unique hotel names
      this.hotelNames = [...new Set(data.map((contract) => contract.hotelName))];
    });
  }

  filterContracts() {
    if (this.selectedHotel) {
      // Filter contracts for the selected hotel
      this.filteredContracts = this.contracts.filter(
        (contract) => contract.hotelName === this.selectedHotel
      );
    } else {
      // Show all contracts if no hotel is selected
      this.filteredContracts = this.contracts;
    }
  }
  

  getCardClass(validFrom: string, validTo: string): string {
    const today = new Date();
    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);

    if (today < fromDate) {
      return 'upcoming'; // Yellow
    } else if (today > toDate) {
      return 'expired'; // Red
    } else {
      return 'valid'; // Green
    }
  }

  onEdit(contractId: number) {
    this.router.navigate([`/contracts/edit/${contractId}`]); // Navigate to the edit page
  }

  onDelete(contractId: number) {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.http.delete(`${this.baseUrl}/${contractId}`).subscribe({
        next: () => {
          alert('Contract deleted successfully.');
          this.loadContracts(); // Reload the contracts list
        },
        error: (err) => {
          console.error('Error deleting contract:', err);
          alert('Failed to delete the contract. Please try again.');
        },
      });
    }
  }
}
