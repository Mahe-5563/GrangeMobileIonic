import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDelegate, IonicModule } from '@ionic/angular';

import { StudentsService } from 'src/app/service/students/students.service';
import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPage implements OnInit {

  modules: any;

  studentDetails = {
    studentID: 0,
    firstName: "",
    lastName: "",
    moduleNo1: "",
    moduleNo2: "",
    courseID: ""
  }

  constructor(
    private studentServices: StudentsService, 
    private navService: NavigationsService,
    private adminService: AdminService,
  ) {
  }

  async ngOnInit() {
    this.studentServices.getStudents()
      .then(res => {
        const lastStudent = res.students[res.students.length - 1];
        this.studentDetails.studentID = Number(lastStudent.studentID) + 1;
      })
      .catch(err => {
        
      })

    this.adminService.getModules()
      .then((res: any) => {
        this.modules = res.modules;
      })
  }

  setValue(ev: any) {
    const id = ev.target.id
    this.studentDetails = {
      ...this.studentDetails,
      [id]: ev.target.value,
    };
  }

  verifyAllDetails () {
    let allDetailsPresent = true;
    for(let values of Object.values(this.studentDetails)) {
      if(values == "") { allDetailsPresent = false; break; }
    }

    if(allDetailsPresent) {
      this.studentServices.createStudent(this.studentDetails, (res: any) => {
        console.info(res);
        this.navService.setAlert("Success!", "Student Added Successfully!", true);
      })
    } else {
      this.navService.setAlertWBtns(
        "Oops!",
        "Please make sure all the fields are filled.",
        [
          {
            text: "OK",
            role: "dismiss",
          }
        ],
        false,
      )
    }
  }

  onInput(ev: any) {
    const id = ev.target.id;
    const value = ev.target.value;
    this.studentDetails = {
      ...this.studentDetails,
      [id]: value,
    };
  }
}
