import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.page.html',
  styleUrls: ['./lecturers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LecturersPage implements OnInit {

  lecturers: any;
  constructor(private navigationService: NavigationsService) { }

  async ngOnInit() {
    (await fetch("http://localhost:8888/php/json-data-lecturers.php"))
      .json()
      .then(res => {
        console.info(res?.lecturers);
        this.lecturers = res?.lecturers;
      })
      .catch(err => {
        console.info(err);
      })
  }

  currentLecturer (lecturerId: string) {
    console.info(lecturerId);
    this.navigationService.navigateToRoute(`lecturers/view/${lecturerId}`)
  }

}
