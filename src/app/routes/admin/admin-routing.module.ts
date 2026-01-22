import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@/app/shared-ui/core/start-page.guard';
import { PetTestComponent } from './pet-test/pet-test/pet-test.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'pet', pathMatch: 'full' },
      {
        path: 'pet',
        component: PetTestComponent,
        // Tạm thời bỏ startPageGuard để test
        // canActivate: [startPageGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
