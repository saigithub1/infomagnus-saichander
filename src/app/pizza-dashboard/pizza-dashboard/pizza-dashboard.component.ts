import { Component, OnInit } from '@angular/core';
import {of, Subscription} from 'rxjs';
import { PizzaState } from '../../shared/enums/pizza-state.enum';
import { NavItem } from '../../shared/models/nav-item.model';
import {PizzaOrder} from '../../pizza-logistics/pizza-logistics/model';
import {CoreService} from '../../core/services/core-service';

@Component({
  selector: 'app-pizza-dashboard',
  templateUrl: './pizza-dashboard.component.html',
  styleUrls: ['./pizza-dashboard.component.scss']
})
export class PizzaDashboardComponent implements OnInit {
  private subscriptions = new Subscription();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public navItems: NavItem[] = [
    {
      displayName: 'Logistics',
      route: '/logistics',
    },
    {
      displayName: 'Reports',
      route: '/reports',
    }
  ];
  totalOrderCount: number;
  enRouteCount: number;
  inKitchenCount: number;
  deliveredCount: number;

  constructor(private coreService: CoreService) { }

  public ngOnInit(): void {
    this.coreService.currentMessage.subscribe((response: any) => {
      if (response) {
        response.subscribe((dataforOrder: PizzaOrder[]) => {
          this.enRouteCount = 0;
          this.inKitchenCount = 0;
          this.deliveredCount = 0;
          this.totalOrderCount = dataforOrder.length;
          dataforOrder.forEach((item) => {
            if (item.state === PizzaState.ready) {
              this.inKitchenCount++;
            }
            if (item.state === PizzaState.delivered) {
              this.deliveredCount++;
            }

          });

        });
      }
    });
  }
}
