import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class CoreService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    private messageSource = new BehaviorSubject<any>('');
    currentMessage = this.messageSource.asObservable();

    constructor(private http: HttpClient) {
    }

    changeMessage(message: any) {
        this.messageSource.next(message);
    }

    getToppingsJson() {
        return this.http.get(`http://localhost:4300/toppings`)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError<any>('toppings'))
            );

    }

    getOrdersJson() {
            return this.http.get(`http://localhost:4300/orders`)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError<any>('orders'))
            );

    }

    getDrivers() {
        return this.http.get(`http://localhost:4300/drivers`)
            .pipe(
                map((res: any) => res),
                catchError(this.handleError<any>('drivers'))
            );

    }

    private handleError<T>(operation = 'operation', result?: any[]) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as unknown as T);
        };
    }

}
