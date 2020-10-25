import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PizzaOrder} from '../pizza-logistics/model';
import {CoreService} from '../../core/services/core-service';
import {PizzaState} from '../../shared/enums/pizza-state.enum';

@Component({
    selector: 'app-pizza-delivered',
    templateUrl: './pizza-delivered.component.html'
})
export class PizzaDeliveredComponent implements OnInit {
    @Input() deliveredList$: Observable<PizzaOrder[]>;
    displayOrderedList$: Observable<PizzaOrder[]>;
    displayedColumnsforKitchen: string[] = ['id', 'toppings', 'driverName'];
    constructor(private coreService: CoreService) {
    }
    ngOnInit() {
        this.coreService.currentMessage.subscribe((response: any) => {
            if (response) {
                response.subscribe((dataforOrder: PizzaOrder[]) => {
                    this.deliveredList$ = of(dataforOrder);
                });
                this.reCheck();
            }
        });
    }

    private reCheck() {
        this.deliveredList$.subscribe((dataforOrder: PizzaOrder[]) => {
            dataforOrder = dataforOrder.filter((item) => {
                return item.state === PizzaState.delivered;
            });
            this.displayOrderedList$ = of(dataforOrder);
        });
    }

}
