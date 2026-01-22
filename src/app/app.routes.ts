import { Routes } from '@angular/router';
import { AuthGuard } from './shared-ui/core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule),
    // Tạm thời bỏ AuthGuard để test trang Pet
    // canActivate: [AuthGuard]
  },
  // Tạm thời comment route passport vì chưa có module này
  // {
  //   path: 'passport',
  //   loadChildren: () => import('./routes/passport/passport.module').then(m => m.PassportModule)
  // },
  // Fallback route
  { path: '**', redirectTo: 'dashboard' }
];
