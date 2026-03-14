import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@/app/shared-ui/core/start-page.guard';
import { PetTestComponent } from './pet-test/pet-test/pet-test.component';
import { SpecializationComponent } from './specializations/specialization/specialization.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'specializations',
    component: SpecializationComponent
  },
  {
    path: 'pet',
    component: PetTestComponent
  },
  {
    path: 'sys',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
