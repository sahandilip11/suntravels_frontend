import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddContractComponent } from './components/contracts/add-contract/add-contract.component';
import { ViewContractsComponent } from './components/contracts/view-contracts/view-contracts.component';
import { SearchRequestsComponent } from './components/requests/search-requests/search-requests.component';


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'contracts/add', component: AddContractComponent }, // Add contracts route
  { path: 'contracts/view', component: ViewContractsComponent }, // View contracts route
  { path: 'requests/search', component: SearchRequestsComponent }, // Search requests route
];
