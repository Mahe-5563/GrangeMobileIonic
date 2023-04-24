import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.page.html',
  styleUrls: ['./timetables.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class TimetablesPage implements OnInit {

  modules: any;

  constructor(private navigationService: NavigationsService) { }

  async ngOnInit() {
    (await fetch("http://localhost:8888/php/json-data-modules.php"))
      .json()
      .then(res => {
        console.info(res?.modules);
        this.modules = res?.modules;
      })
      .catch(err => {
        console.info(err);
      })
  }

  currentModule (currentModule: string) {
    console.info(currentModule);
    this.navigationService.navigateToRoute(`modules/view/${currentModule}`)
  }
}
