import { Component } from '@angular/core';
import { log } from '@delon/util';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-cell-render',
  templateUrl: './workflow-cell-render.component.html',
  styleUrls: []
})
export class WorkflowCellRenderComponent implements ICellRendererAngularComp {
  constructor() {}

  params: any;

  refresh(params: any): boolean {
    // Update params and return true to indicate refresh was successful
    this.params = params;
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    // Optional method - can be left empty if not needed
  }

  agInit(params: any): void {
    this.params = params;
  }

  onProccessWorkflowClick(command: any): any {
    log('WorkflowCellRenderComponent', 'onProccessWorkflowClick', command, this.params.data);
    this.params.proccessWorkflowClicked(this.params.data, command);
  }
}
