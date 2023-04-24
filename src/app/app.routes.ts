import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./loginsignup/loginsignup.page').then( m => m.LoginsignupPage)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/tabs/tabs.routes').then( m => m.adminRoutes)
  },
  {
    path: 'modules/view/:id',
    loadComponent: () => import('./admin/timetables/view/view.page').then( m => m.ViewPage)
  },
  {
    path: 'modules/add',
    loadComponent: () => import('./admin/timetables/add/add.page').then( m => m.AddPage)
  },
  {
    path: 'lecturers/add',
    loadComponent: () => import('./admin/lecturers/add/add.page').then( m => m.AddPage)
  },
  {
    path: 'lecturers/view/:id',
    loadComponent: () => import('./admin/lecturers/view/view.page').then( m => m.ViewPage)
  },
  {
    path: 'students/view/:id',
    loadComponent: () => import('./admin/students/view/view.page').then( m => m.ViewPage)
  },
  {
    path: 'students/add',
    loadComponent: () => import('./admin/students/add/add.page').then( m => m.AddPage)
  },
  {
    path: 'assignments/view/:id',
    loadComponent: () => import('./standalonepages/assignments/view/view.page').then( m => m.ViewPage)
  },
  {
    path: 'assignments/create',
    loadComponent: () => import('./standalonepages/assignments/create/create.page').then( m => m.CreatePage)
  },
];
