import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DataSourceColumn<TDataSource> {
  labelColumns: Record<keyof TDataSource, string>;
  displayedColumns: (keyof TDataSource)[]
} 

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent<TDataSource> {
  selectedColumns: (keyof TDataSource)[];
  selectionChange(columnChange: { columnName: string | number | symbol, checked: boolean }): void;
  selectionChange(columnChange: { columnName: keyof TDataSource, checked: boolean }) {
    if (columnChange.checked) {
      this.selectedColumns.push(columnChange.columnName as keyof TDataSource);
    } else {
      this.selectedColumns = this.selectedColumns.filter(col => col !== columnChange.columnName);
    }
    this.columnSelectionChange.emit(this.selectedColumns);
  }
  
  @Output() columnSelectionChange = new EventEmitter<(keyof TDataSource)[]>();

  isSelected(colName: string | keyof TDataSource): boolean { 
    return this.selectedColumns.includes(colName as keyof TDataSource);
  }

  constructor(@Inject(MAT_DIALOG_DATA) private columnsData: DataSourceColumn<TDataSource>) {
    this.columns = Object.entries(columnsData.labelColumns).map(entry => (
      {
        key: entry[0] as keyof TDataSource,
        label: entry[1] as string
      }
    ));
    
    this.selectedColumns = columnsData.displayedColumns;

  }

  columns: { key: keyof TDataSource, label: string }[] = [];
}
