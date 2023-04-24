import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const adminRoutes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'timetables',
        loadComponent: () =>
          import('../timetables/timetables.page').then((m) => m.TimetablesPage),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('../students/students.page').then((m) => m.StudentsPage),
      },
      {
        path: 'lecturers',
        loadComponent: () =>
          import('../lecturers/lecturers.page').then((m) => m.LecturersPage),
      },
      {
        path: '',
        redirectTo: 'admin/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'admin/tabs/home',
    pathMatch: 'full',
  },
];
