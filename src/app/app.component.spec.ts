import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Import standalone AppComponent
        HeaderComponent, // Import standalone HeaderComponent
        RouterTestingModule, // Provide routing dependencies
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have header followed by router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
  
    const headerElement = compiled.querySelector('app-header');
    const routerOutletElement = compiled.querySelector('router-outlet');
  
    expect(headerElement).toBeTruthy(); // Header is present
    expect(routerOutletElement).toBeTruthy(); // Router Outlet is present
    expect(headerElement?.nextElementSibling).toBe(routerOutletElement); // Header is directly followed by RouterOutlet
  });
  
  it('should render correctly on window resize', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  
    // Mock window resize event
    window.dispatchEvent(new Event('resize'));
  
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  
});
