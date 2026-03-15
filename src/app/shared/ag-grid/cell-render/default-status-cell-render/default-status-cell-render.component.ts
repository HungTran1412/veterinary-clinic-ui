import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-default-status-cell-render',
  templateUrl: './default-status-cell-render.component.html',
  styleUrls: []
})
export class DefaultStatusCellRenderComponent implements ICellRendererAngularComp {
  constructor() {}

  params: any;

  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
  }
}
