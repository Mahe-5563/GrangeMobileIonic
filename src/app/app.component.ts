import { Component, EnvironmentInjector, NgModule, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    AngularFireStorageModule,
  ]
})

export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
}
