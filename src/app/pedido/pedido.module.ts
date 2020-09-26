import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PedidoComponent } from './pedido.component';
import { PedidoService} from './pedido.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [PedidoComponent],
  exports: [PedidoComponent]
})
export class PedidoModule {



}
