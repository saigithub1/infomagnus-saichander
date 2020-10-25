import {NgModule} from '@angular/core';
import {PizzaReportsComponent} from './pizza-reports.component';
import {RouterModule, Routes} from '@angular/router';
import {PizzaLogisticsComponent} from '../pizza-logistics/pizza-logistics/pizza-logistics.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reports'
    },
    {
        path: 'reports',
        component: PizzaReportsComponent
    }
];

@NgModule({
    declarations: [
        PizzaReportsComponent
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PizzaReportsModule { }
