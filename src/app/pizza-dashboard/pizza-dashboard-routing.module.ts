import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'logistics'
  },
  {
    path: 'logistics',
    loadChildren: () => import('../pizza-logistics/pizza-logistics.module').then(m => m.PizzaLogisticsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('../pizza-reports/pizza-reports.module').then(m => m.PizzaReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaDashboardRoutingModule { }
