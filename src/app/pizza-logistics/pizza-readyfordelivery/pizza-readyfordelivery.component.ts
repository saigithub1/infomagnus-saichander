import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Driver, PizzaOrder} from '../pizza-logistics/model';
import {CoreService} from '../../core/services/core-service';
import {PizzaState} from '../../shared/enums/pizza-state.enum';

@Component({
    selector: 'app-pizza-readyfordelivery',
    templateUrl: './pizza-readyfordelivery.component.html'
})
export class PizzaReadyfordeliveryComponent implements OnInit {
    @Input() readyForDeliveryList$: Observable<PizzaOrder[]>;
    displayOrderedList$: Observable<PizzaOrder[]>;
    displayedColumnsforDelivery: string[] = ['id', 'driver', 'assignDriver'];
    driversList$: Observable<Driver[]>;
    selectedDriver: any;
    constructor(private coreService: CoreService) {
    }
    ngOnInit() {
        this.coreService.currentMessage.subscribe((response: any) => {
            if (response) {
                response.subscribe((dataforOrder: PizzaOrder[]) => {
                    this.readyForDeliveryList$ = of(dataforOrder);
                });
                this.reCheck();
            }
        });
        this.getDrivers();
    }

    private reCheck() {
        this.readyForDeliveryList$.subscribe((dataforOrder: PizzaOrder[]) => {
            dataforOrder = dataforOrder.filter((item) => {
                return item.state === PizzaState.ready;
            });
            this.displayOrderedList$ = of(dataforOrder);
        });
    }

    readyForDeliver(event) {
        this.readyForDeliveryList$.subscribe((dataforOrder: PizzaOrder[]) => {
            this.readyForDeliveryList$ = of(dataforOrder);
        });
    }

    private getDrivers() {
        this.driversList$ = of([]);
        this.coreService.getDrivers().subscribe((response: any[]) => {
            response = response.map((item) => {
                item.fullName = item.firstName + ' ' + item.lastName;
                return item;
            });
            this.driversList$ = of(response);
        });
    }

    assign(event) {

        this.readyForDeliveryList$.subscribe((dataforOrder: PizzaOrder[]) => {
            dataforOrder.forEach((item) => {
                if (event.id === item.id) {
                    item.state = PizzaState.delivered;
                    item.driverId = this.selectedDriver.id;
                    item.driverName = this.selectedDriver.fullName;
                }
            });
            this.readyForDeliveryList$ = of(dataforOrder);
        });
        this.reCheck();
        this.coreService.changeMessage(this.readyForDeliveryList$);
    }

}
