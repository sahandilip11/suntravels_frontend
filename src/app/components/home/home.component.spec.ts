import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule], // Import HomeComponent and RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render three navigation cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(3);
  });

  it('should render the Add Contract card with correct text', () => {
    const addContractCard = fixture.debugElement.queryAll(By.css('.card'))[0];
    const header = addContractCard.query(By.css('h3')).nativeElement.textContent;
    const description = addContractCard.query(By.css('p')).nativeElement.textContent;

    expect(header).toContain('Add Contract');
    expect(description).toContain('Add new contract to the System');
  });

  it('should render the Search Request card with correct text', () => {
    const searchRequestCard = fixture.debugElement.queryAll(By.css('.card'))[1];
    const header = searchRequestCard.query(By.css('h3')).nativeElement.textContent;
    const description = searchRequestCard.query(By.css('p')).nativeElement.textContent;

    expect(header).toContain('Search Request');
    expect(description).toContain('Search for a incoming request');
  });

  it('should render the View Contracts card with correct text', () => {
    const viewContractsCard = fixture.debugElement.queryAll(By.css('.card'))[2];
    const header = viewContractsCard.query(By.css('h3')).nativeElement.textContent;
    const description = viewContractsCard.query(By.css('p')).nativeElement.textContent;

    expect(header).toContain('View Contracts');
    expect(description).toContain('View all existing contracts');
  });

  it('should navigate to Add Contract route when the Add Contract card is clicked', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const addContractCard = fixture.debugElement.queryAll(By.css('.card'))[0].nativeElement;

    addContractCard.click();

    expect(routerSpy).toHaveBeenCalledWith(['/contracts/add']);
  });

  it('should navigate to Search Request route when the Search Request card is clicked', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const searchRequestCard = fixture.debugElement.queryAll(By.css('.card'))[1].nativeElement;

    searchRequestCard.click();

    expect(routerSpy).toHaveBeenCalledWith(['/requests/search']);
  });

  it('should navigate to View Contracts route when the View Contracts card is clicked', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const viewContractsCard = fixture.debugElement.queryAll(By.css('.card'))[2].nativeElement;

    viewContractsCard.click();

    expect(routerSpy).toHaveBeenCalledWith(['/contracts/view']);
  });
});
