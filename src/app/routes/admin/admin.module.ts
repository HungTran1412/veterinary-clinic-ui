import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Ant Design Modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

// AG Grid
import { AgGridAngular } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { PetTestComponent } from './pet-test/pet-test/pet-test.component';
import { PetItemComponent } from './pet-test/pet-test-item/pet-test-item.component';
import { SpecializationItemComponent } from './specializations/specialization-item/specialization-item.component';
import { SpecializationComponent } from './specializations/specialization/specialization.component';
import { ProPageModule } from '@/app/layout/pro/shared/page/page.module';
import { I18nPipe } from '@/app/layout/pro/i18n.pipe';
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

    // Ant Design
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzMessageModule,
    NzPaginationModule,
    NzCardModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzSwitchModule,

    // AG Grid
    AgGridAngular,

    // Pro
    ProPageModule,
    I18nPipe
  ]
})
export class AdminModule { }
