import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class StudentsPage implements OnInit {

  students: any;
  constructor(private navigationService: NavigationsService) { }

  async ngOnInit() {
    (await fetch("http://localhost:8888/php/json-data-students.php"))
      .json()
      .then(res => {
        this.students = res?.students;
      })
      .catch(err => {
        console.info(err);
      })
  }

  currentStudent (studentId: string) {
    this.navigationService.navigateToRoute(`students/view/${studentId}`)
  }
}
