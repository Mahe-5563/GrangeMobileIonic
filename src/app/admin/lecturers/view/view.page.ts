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

  lecturerId: any;
  modules: any;
  students: any;
  lecturer: any;
  updateLecturer: any;

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
    this.lecturerId = this.activatedRoute.snapshot.paramMap.get("id");

    if(this.lecturerId) {
      await this.lecturerServices.getLecturers().then(res => {
        this.lecturer = res.lecturers.filter((lecturer: { staffNumber: any; }) => lecturer.staffNumber == this.lecturerId)[0];
        
        this.updateLecturer = res.lecturers.filter((lecturer: { staffNumber: any; }) => lecturer.staffNumber == this.lecturerId)[0];

        const lecturerModules = [
          this.lecturer.moduleNo1,
          this.lecturer.moduleNo2
        ]
        
        this.adminServices.getModules().then(res => {
          this.modules = res.modules.filter(
            (module: { moduleNo: any }) => 
              (module.moduleNo == lecturerModules[0] || (module.moduleNo == lecturerModules[1]))
          )
        })

        this.studentServices.getStudents().then(res => {
          this.students = res.students.filter(
            (student: { moduleNo1: any, moduleNo2: any }) => 
              (student.moduleNo1 == lecturerModules[0] || student.moduleNo2 == lecturerModules[0] || student.moduleNo1 == lecturerModules[1] || student.moduleNo2 == lecturerModules[1]))
        });
      });
    }
  }

  async saveLecturerDetails () {
    await this.lecturerServices.updateLecturer(this.updateLecturer, (res: any) => {
      const response = JSON.parse(res); 
      if(response.success == 1) {
        this.navService.setAlert("Success", "Modules Details saved successfully!", true);
      }
    });
  }

  deletionConfirmation() {
    this.navService.setAlertWBtns(
      "Warning!",
      "Are you sure you want to Delete? You will not be able to retrieve the module",
      [
        {
          text: "Delete",
          role: "confirm",
          handler: () => this.deleteLecturer()
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

  async deleteLecturer () {
    this.lecturerServices.deleteLecturer(this.lecturerId, (res: any) => {
      this.navService.setAlert("Success!", "Module Deleted Successfully!", true);
    });
  }

  onInput(ev: any) {
    const id = ev.target.id;
    const value = ev.target.value;
    this.updateLecturer[id] = value;
  }

}
