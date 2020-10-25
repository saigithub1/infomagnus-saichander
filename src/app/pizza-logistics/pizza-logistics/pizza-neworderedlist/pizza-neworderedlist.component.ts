import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PizzaOrder} from '../model';
import {PizzaState} from '../../../shared/enums/pizza-state.enum';
import {CoreService} from '../../../core/services/core-service';

@Component({
    selector: 'app-pizza-neworderedlist',
    templateUrl: './pizza-neworderedlist.component.html'
})
export class PizzaNeworderedlistComponent implements OnChanges {
    @Input() newOrderedList$: Observable<PizzaOrder[]>;
    displayOrderedList$: Observable<PizzaOrder[]>;
    displayedColumnsforKitchen: string[] = ['id', 'toppings', 'sendToKitchenButton'];
    constructor(private coreService: CoreService) {
    }

    ngOnChanges() {
        this.reCheck();
    }

    private reCheck() {
        this.newOrderedList$.subscribe((dataforOrder: PizzaOrder[]) => {
            dataforOrder = dataforOrder.filter((item) => {
                return item.state === PizzaState.open;
            });
            this.displayOrderedList$ = of(dataforOrder);
        });
    }

        sendToKitchen(event) {
        this.newOrderedList$.subscribe((dataforOrder: PizzaOrder[]) => {
            dataforOrder.forEach((item) => {
                if (event.id === item.id) {
                    item.state = PizzaState.ready;
                }
            });
            this.newOrderedList$ = of(dataforOrder);
        });
        this.reCheck();
        this.coreService.changeMessage(this.newOrderedList$);
    }

}
