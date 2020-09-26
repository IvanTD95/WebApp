import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PedidoService} from './pedido.service';
import { Producto } from '../modelos/producto.model';
import { Pedido } from '../modelos/pedido.model';

@Component({
    selector: 'app-pedido',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.css']
  })

  export class PedidoComponent implements OnInit {
    public total : number;
    public cantidad : number;
    public nombre : string;
    lstProductos : Producto[];
    productoSeleccionado : Producto;
    lstProductosSeleccionados : Producto[];
    pedidoService: PedidoService;
    ngOnInit(): void {
        this.lstProductos = new Array();
       this.productoSeleccionado = new Producto();
        this.lstProductosSeleccionados = new Array();
        this.total = 0;

    }

    constructor (pedidoService : PedidoService){

    this.pedidoService = pedidoService;


    // Implementa servicio llenado de catalogo.
    this.pedidoService.Productos().subscribe(
        (data: Producto[]) => this.CargaCatalgo(data))
    }

    public CargaCatalgo(data : Producto[]){ 
        this.lstProductos = data;
    }

    // 
    public AgregarProducto(){    
        // se obtiene dato de cantidad bindeado del html
        this.productoSeleccionado.cantidad = this.cantidad;
        // se agrega producto a lista temporal de productos seleccionados
        this.lstProductosSeleccionados.push(this.productoSeleccionado);
        // se reinicia el total a 0 y se realiza la suma de la cantidad por el precio
        this.total = 0;
        this.lstProductosSeleccionados.forEach(x => { 
           this.total += ( x.cantidad * x.precio ) 
         });


    }

    // Evento realizado cuando se elige un producto del combo  
    public changeProduct(sku : string){
       let objProducto = this.lstProductos.filter(x => x.sku == sku)[0];

    this.productoSeleccionado = objProducto;
    }

// Evento empleado para agregar el pedido
    public AgregarPedido(){
        let lstPedido  : Pedido[]; 
        lstPedido = new Array();
        let pedido : Pedido;

        this.lstProductosSeleccionados.forEach( x=> {
        pedido = new Pedido();
            pedido.sku = x.sku;
            pedido.cantidad = x.cantidad;
            pedido.nombreUsuario = this.nombre;

            lstPedido.push(pedido);

        });

        this.pedidoService.addPedido(lstPedido).subscribe((data: boolean) => this.success(data));
    }

private success(data : boolean){
if(data){
  window.alert('Datos ingresados con éxito.');  
}
}

}

