import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialTableWrapperComponent } from './material-table-wrapper/material-table-wrapper.component';
import {MatMenuModule} from '@angular/material/menu';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChangeColumnOrderComponent } from './material-table-wrapper/change-column-order/change-column-order.component';
@NgModule({
  declarations: [
    AppComponent,
    MaterialTableWrapperComponent,
    TableFilterComponent,
    ChangeColumnOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
