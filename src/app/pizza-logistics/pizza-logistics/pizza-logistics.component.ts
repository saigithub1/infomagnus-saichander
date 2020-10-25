import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import { DriverState } from '../../shared/enums/driver-state.enum';
import { PizzaState } from '../../shared/enums/pizza-state.enum';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {CoreService} from '../../core/services/core-service';
import {PizzaTopping, PizzaSize, PizzaOrder, Driver} from './model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-pizza-logistics',
  templateUrl: './pizza-logistics.component.html',
  styleUrls: ['./pizza-logistics.component.scss']
})
export class PizzaLogisticsComponent implements OnInit {

  customerName: string;
  toppings: number[];
  selectedPizzaSize: number;
  pizzaSize: PizzaSize[] = [{id: 1, name: 'Small'}, {id: 2, name: 'Medium'}, {id: 2, name: 'Large'} ];
  toppingList$: Observable<PizzaTopping[]>;
  ordersList$: Observable<PizzaOrder[]>;

  constructor(private coreService: CoreService, private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.getToppings();
    this.getOrdersJson();
    }

  private getToppings() {
    this.toppingList$ = of([]);
    this.coreService.getToppingsJson().subscribe((response: PizzaTopping[]) => {
      this.toppingList$ = of(response);
      this.getOrdersJson();
    });
  }

  private getOrdersJson() {
    this.ordersList$ = of([]);
    this.coreService.getOrdersJson().pipe(first()).subscribe((response: PizzaOrder[]) => {
       this.ordersList$ = of(response);
       this.setToppingstring();
    });
  }

  private setToppingstring() {
    this.ordersList$.subscribe((data: PizzaOrder[]) => {
      this.toppingList$.subscribe((dataforTopping: PizzaTopping[]) => {
        data = data.map((orderList) => {
          orderList.toppingsName = [];
          orderList.toppings.map((itemToppings: any, index) => {
            orderList.toppingsName[index] = dataforTopping[itemToppings.id] ? dataforTopping[itemToppings.id].name : '';
          });
          return orderList;
        });
        this.ordersList$ = of(data);
        this.coreService.changeMessage(this.ordersList$);
      });
    });
  }

  onSubmit() {
    const setToppingId = [];
    this.toppings.forEach((item) =>{
      setToppingId.push({id: item});
    });
    this.ordersList$.subscribe((data: PizzaOrder[]) => {
      const newOrder: PizzaOrder = {customerName: this.customerName,  size: this.selectedPizzaSize, state: PizzaState.open,
        toppings: setToppingId, driverId: 0, id: data.length + 1};
      data.push(newOrder);
      this.ordersList$ = of(data);
    });
    this.setToppingstring();
    this.resetValues();
  }

  private resetValues() {
    this.customerName = '';
    this.toppings = [];
    this.selectedPizzaSize = null;
  }

}
