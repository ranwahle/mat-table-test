import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DataSourceColumn<TDataSource> {
  labelColumns: Record<keyof TDataSource, string>;
  displayedColumns: (keyof TDataSource)[]
} 

@Component({
  selector: 'app-change-column-order',
  templateUrl: './change-column-order.component.html',
  styleUrls: ['./change-column-order.component.scss']
})
export class ChangeColumnOrderComponent<TDataSource> {

  @Output() orderChange = new EventEmitter<(keyof TDataSource)[]>();

  moveUp(column: { key: keyof TDataSource; label: string; }) {
    const foundColumnIndex = this.columns.findIndex(col => col.key === column.key);
    if (foundColumnIndex > 0) {
      this.columns.splice(foundColumnIndex - 1, 0, this.columns.splice(foundColumnIndex, 1)[0]);
      this.orderChange.emit(this.columns.map(col => col.key));
    }
  }
  
  columns: { key: keyof TDataSource; label: string; }[];
  selectedColumns: (keyof TDataSource)[];
  constructor(@Inject(MAT_DIALOG_DATA) private columnsData: DataSourceColumn<TDataSource>) {
    this.columns = columnsData.displayedColumns.map(col => ({
      key: col,
      label: columnsData.labelColumns[col]
    }));
    this.selectedColumns = columnsData.displayedColumns;
  }

}
