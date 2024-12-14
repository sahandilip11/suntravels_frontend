import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], // Import RouterOutlet for navigation and HeaderComponent for the fixed header
  templateUrl: './app.component.html', // Points to the HTML template
  styleUrls: ['./app.component.css'], // Includes the CSS file for styling
})
export class AppComponent {
  // No additional logic is needed for a fixed header or gradient background
}
