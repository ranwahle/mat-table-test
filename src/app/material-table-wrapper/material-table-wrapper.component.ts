import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { ChangeColumnOrderComponent } from './change-column-order/change-column-order.component';


@Component({
  selector: 'app-material-table-wrapper',
  templateUrl: './material-table-wrapper.component.html',
  styleUrls: ['./material-table-wrapper.component.scss']
})
export class MaterialTableWrapperComponent<TDataSource> implements OnInit {
  @Input() dataSource: TDataSource[] = [];

  openOrderDialog() {

    const dialogRef = this.matDialog.open(ChangeColumnOrderComponent, {
      data: {
        labelColumns: this.labelColumns, displayedColumns: this.sortedColumns,

      }
    });
    dialogRef.updatePosition({ top: '50px', left: '50px' });
    dialogRef.componentInstance.orderChange.subscribe((columns: (keyof TDataSource)[]) => {
      this.columnOrder = columns.reduce((acc, col, index) => ({ ...acc, [col]: index }), {});
      this.changeDetectorRef.detectChanges();
    });

  }

  getLabel(column: string| number | symbol): string; // This overload is to satisfy template type checking.
  getLabel(column: keyof TDataSource): string {
    return this.labelColumns[column] || column.toLocaleString();
  }

  columnsToDisplay: (keyof TDataSource)[] = [];
  constructor(private matDialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  
  }
  ngOnInit(): void {   
    this.columnsToDisplay = Object.keys(this.labelColumns) as (keyof TDataSource)[];
    this.columnOrder = this.columnsToDisplay.reduce((acc, col, index) => ({ ...acc, [col]: index }), {});
  }

  openFilterDialog() {
    const dialogRef = this.matDialog.open(TableFilterComponent, {
      data: { labelColumns: this.labelColumns, displayedColumns: this.columnsToDisplay }
    });
    dialogRef.updatePosition({ top: '50px', left: '50px' });

    dialogRef.componentInstance.columnSelectionChange.subscribe((columns: (keyof TDataSource)[]) => {
      this.columnsToDisplay = columns;
      this.changeDetectorRef.detectChanges();

    });
  }


  @Input() labelColumns: Partial<Record<keyof TDataSource, string>> = {};
  

  get sortedColumns(): (keyof TDataSource)[] {
    return this.columnsToDisplay.sort((a, b) => this.columnOrder![a]! - this.columnOrder![b]!);
  }



  columnOrder: Partial<Record<keyof TDataSource, number>> = {};
  
}
