import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like NgIf


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, CommonModule] // Add CommonModule here
})
export class HeaderComponent {
  showBackButton = false;

  constructor(private router: Router) {
    // Subscribe to router events to check the current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Show the back button on all routes except the home page
        this.showBackButton = event.url !== '/'; // Adjust '/' to match your home route
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Navigate to the home page (adjust if needed)
  }
}
