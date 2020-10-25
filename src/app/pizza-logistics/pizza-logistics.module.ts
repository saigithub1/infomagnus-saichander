import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PizzaLogisticsRoutingModule } from './pizza-logistics-routing.module';
import { PizzaLogisticsComponent } from './pizza-logistics/pizza-logistics.component';
import {MatTableModule, MatToolbarModule} from '@angular/material';
import {PizzaReadyfordeliveryComponent} from './pizza-readyfordelivery/pizza-readyfordelivery.component';
import {PizzaDeliveredComponent} from './pizza-delivered/pizza-delivered.component';
import {PizzaNeworderedlistComponent} from './pizza-logistics/pizza-neworderedlist/pizza-neworderedlist.component';

@NgModule({
  declarations: [
    PizzaLogisticsComponent,
      PizzaReadyfordeliveryComponent,
      PizzaDeliveredComponent,
      PizzaNeworderedlistComponent
  ],
    imports: [
        CommonModule,
        PizzaLogisticsRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatToolbarModule,
        MatTableModule,
    ],
})
export class PizzaLogisticsModule { }
