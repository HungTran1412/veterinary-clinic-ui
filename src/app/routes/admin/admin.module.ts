import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@/app/layout/layout.module';
import { AggridCellRenderModule } from '@/app/shared/ag-grid/ag-grid-cell-render.module';

// Ant Design Modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

// AG Grid
import { AgGridModule } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { PetTestComponent } from './pet-test/pet-test/pet-test.component';
import { PetItemComponent } from './pet-test/pet-test-item/pet-test-item.component';
import { SpecializationItemComponent } from './specializations/specialization-item/specialization-item.component';
import { SpecializationComponent } from './specializations/specialization/specialization.component';
import { ProPageModule } from '@/app/layout/pro/shared/page/page.module';

@NgModule({
  declarations: [
    PetTestComponent,
    PetItemComponent,
    SpecializationComponent,
    SpecializationItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    LayoutModule,
    ProPageModule,
    AggridCellRenderModule,

    // Ant Design
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSpinModule,
    NzSwitchModule,
    NzCardModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    NzDropDownModule,

    // AG Grid
    AgGridModule
  ]
})
export class AdminModule { }
