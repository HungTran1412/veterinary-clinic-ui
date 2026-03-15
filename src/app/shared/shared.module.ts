import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AggridCellRenderModule } from './ag-grid/ag-grid-cell-render.module';

@NgModule({
  imports: [CommonModule, AggridCellRenderModule],
  exports: [AggridCellRenderModule]
})
export class SharedModule {}
