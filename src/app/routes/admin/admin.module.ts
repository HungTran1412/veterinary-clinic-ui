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

// AG Grid
import { AgGridAngular } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { PetTestComponent } from './pet-test/pet-test/pet-test.component';
import { PetItemComponent } from './pet-test/pet-test-item/pet-test-item.component';

@NgModule({
  declarations: [
    PetTestComponent,
    PetItemComponent
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

    // AG Grid
    AgGridAngular
  ]
})
export class AdminModule { }
