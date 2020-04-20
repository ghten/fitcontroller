import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { DietComponent } from './pages/diet/diet.component';
import { TrainingComponent } from './pages/training/training.component';
import { RpeComponent } from './pages/rpe/rpe.component';
import { SeeWeightComponent } from './pages/see-weight/see-weight.component';
import { WeightComponent } from './pages/weight/weight.component';

import { RoleGuard } from './guards/role.guard';
import { HomeGuard } from './guards/home.guard';
import { ActiveGuard } from './guards/active.guard';
import { AdviceComponent } from './pages/advice/advice.component';
import { WellnessComponent } from './pages/wellness/wellness.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', component: HomeComponent, canActivate: [HomeGuard], data: { role: 'user' } },
            { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
            data: { breadcrumb: 'Users' } },
            { path: 'profile', loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule),
            data: { breadcrumb: 'Profile' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'home', component: HomeComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'diet', component: DietComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'training', component: TrainingComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'rpe', component: RpeComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'see-weight', component: SeeWeightComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'add-weight', component: WeightComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'advice', component: AdviceComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
            { path: 'wellness', component: WellnessComponent, canActivate: [RoleGuard, ActiveGuard], data: { role: 'user' } },
        ]
    },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'login/forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module')
    .then(m => m.ForgotPasswordModule) },
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
    { path: 'login/restore-password', loadChildren: () => import('./pages/restore-password/restore-password.module')
    .then(m => m.RestorePasswordModule) },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
    // useHash: true
});
