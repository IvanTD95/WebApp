import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { retry, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Producto } from '@app/modelos/producto.model';
import { Pedido } from '@app/modelos/pedido.model';


// declare const _apiURL: any;

@Injectable({ providedIn: 'root' })
export class PedidoService {
    // Define API
    public apiUrlProducto : string;
    public apiUrlPedido : string;

    constructor(private http: HttpClient) { 
        this.apiUrlProducto = 'https://localhost:44367';
        this.apiUrlPedido ='https://localhost:44386';
    }


    addPedido( lstPedido : Pedido[]) {
        return this.http.post<boolean>(`${this.apiUrlPedido}/api/Pedido`, lstPedido).pipe(retry(1), catchError(this.handleError));
    } 


  Productos() {
    return this.http.get<Producto[]>(`${this.apiUrlProducto}/api/Producto`).pipe(retry(1), catchError(this.handleError));
  }

  
  handleError(error : any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.debug(errorMessage);
        return throwError(errorMessage);
    }
}