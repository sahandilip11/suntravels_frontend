import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule], // Import standalone component and RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header title', () => {
    const titleElement = fixture.debugElement.query(By.css('.header-title'))
      .nativeElement as HTMLElement;
    expect(titleElement.textContent).toContain('Suntravels Room Reservation System');
  });

  it('should render the home button with the correct image', () => {
    const homeButtonImage = fixture.debugElement.query(By.css('.btn-home img'))
      .nativeElement as HTMLImageElement;
    expect(homeButtonImage.src).toContain(
      'https://icons.veryicon.com/png/o/miscellaneous/rongyiguang/navigation-home-3.png'
    );
    expect(homeButtonImage.alt).toBe('Home Logo');
  });

  it('should render the company logo with the correct image', () => {
    const logoImage = fixture.debugElement.query(By.css('.header-logo img'))
      .nativeElement as HTMLImageElement;
    expect(logoImage.src).toContain(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73cCn6uZYqEgKutMhhlNdBBsSZiv-_7iWzA&s.jpg'
    );
    expect(logoImage.alt).toBe('Agent Logo');
  });

  it('should render the back button when showBackButton is true', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('.btn-back img'))
      ?.nativeElement as HTMLImageElement;
    expect(backButton).toBeTruthy();
    expect(backButton.alt).toBe('Back Button');
    expect(backButton.src).toContain(
      'https://cdn-icons-png.flaticon.com/512/271/271220.png'
    );
  });

  it('should hide the back button when showBackButton is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('.btn-back img'));
    expect(backButton).toBeNull();
  });

  it('should navigate to home when goBack is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goBack();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it('should call goBack() when back button is clicked', () => {
    component.showBackButton = true;
    fixture.detectChanges();

    spyOn(component, 'goBack');

    const backButton = fixture.debugElement.query(By.css('.btn-back img'))
      .nativeElement as HTMLImageElement;
    backButton.click();

    expect(component.goBack).toHaveBeenCalled();
  });
});
