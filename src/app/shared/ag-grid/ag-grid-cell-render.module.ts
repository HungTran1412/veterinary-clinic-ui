import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LangsModule } from '../components/langs/langs.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { BtnCellRenderComponent } from './cell-render/btn-cell-render/btn-cell-render.component';
import { CellVerticalRenderComponent } from './cell-render/cell-vertical-render/cell-vertical-render.component';
import { DateCellRenderComponent } from './cell-render/date-cell-render/date-cell-render.component';
import { DefaultStatusCellRenderComponent } from './cell-render/default-status-cell-render/default-status-cell-render.component';
import { StatusCellRenderComponent } from './cell-render/status-cell-render/status-cell-render.component';
import { WorkflowCellRenderComponent } from './cell-render/workflow-cell-render/workflow-cell-render.component';
import { CustomHeaderRenderComponent } from './header-render/custom-header-render/custom-header-render.component';

const COMPONENTS = [
  BtnCellRenderComponent,
  StatusCellRenderComponent,
  CustomHeaderRenderComponent,
  CellVerticalRenderComponent,
  DateCellRenderComponent,
  WorkflowCellRenderComponent,
  DefaultStatusCellRenderComponent
];

@NgModule({
  imports: [CommonModule, NzDropDownModule, NzIconModule, NzTagModule, NzCheckboxModule, LangsModule, NzButtonModule, NzPopoverModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AggridCellRenderModule {}
