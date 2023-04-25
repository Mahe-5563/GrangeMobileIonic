import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AdminService } from 'src/app/service/admin/admin.service';
import { StudentsService } from 'src/app/service/students/students.service';
import { LecturersService } from 'src/app/service/lecturers/lecturers.service';
import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewPage implements OnInit {

  studentId: any;
  allModules: any;
  modules: any;
  student: any;
  lecturers: any;
  updateStudent: any;

  // Alert message
  alertHeader: any;
  alertMessage: any;
  alertOpen: any;
  alertWBtnsHeader: any;
  alertWBtnsMessage: any;
  alertWBtnsOpen: any;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private adminServices: AdminService,
    private studentServices: StudentsService,
    private lecturerServices: LecturersService,
    private navService: NavigationsService,
  ) { }

  async ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get("id");

    if(this.studentId) {

      await this.studentServices.getStudents().then(res => {
        this.student = res.students.filter(
          (student: { studentID: any }) => 
            (student.studentID == this.studentId ))[0]
        this.updateStudent = {
          ...this.student
        }

        const studentModules = [
          this.student.moduleNo1,
          this.student.moduleNo2
        ]

        this.adminServices.getModules().then(res => {
          this.modules = res.modules.filter(
            (module: { moduleNo: any }) => 
              (module.moduleNo == studentModules[0] || (module.moduleNo == studentModules[1]))
          )
          this.allModules = res.modules;
        });
        this.lecturerServices.getLecturers().then(res => {
          this.lecturers = res.lecturers.filter(
            (lecturer: { moduleNo1: any, moduleNo2: any }) => 
              (lecturer.moduleNo1 == studentModules[0] || lecturer.moduleNo2 == studentModules[0] || lecturer.moduleNo1 == studentModules[1] || lecturer.moduleNo2 == studentModules[1]))
        });

      });
    }
  }

  async saveStudentDetails () {
    await this.studentServices.updateStudent(this.updateStudent, (res: any) => {
      const response = JSON.parse(res); 
      if(response.success == 1) {
        this.navService.setAlert("Success", "Modules Details saved successfully!", true);
      }
    });
  }

  deletionConfirmation() {
    this.navService.setAlertWBtns(
      "Warning!",
      "Are you sure you want to Delete? You will not be able to retrieve the student",
      [
        {
          text: "Delete",
          role: "confirm",
          handler: () => this.deleteStudent()
        },
        {
          text: "Cancel",
          role: "cancel",
          /* handler: () => {
            alert.dismiss();
          } */
        }
      ],
      false,
    )
  }

  async deleteStudent () {
    this.studentServices.deleteStudent(this.studentId, (res: any) => {
      this.navService.setAlert("Success!", "Student Deleted Successfully!", true);
    });
  }

  onInput(ev: any) {
    const id = ev.target.id;
    const value = ev.target.value;
    this.updateStudent[id] = value;
  }
}
