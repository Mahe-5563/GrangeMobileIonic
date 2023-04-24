import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

import { AdminService } from 'src/app/service/admin/admin.service';
import { StudentsService } from 'src/app/service/students/students.service';
import { LecturersService } from 'src/app/service/lecturers/lecturers.service';
import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    GoogleMapsModule
  ]
})
export class ViewPage implements OnInit {

  address: any;
  zoom = 12;
  maxZoom = 15;
  minZoom = 8;
  position: any;

  moduleId: any;
  module: any;
  students: any;
  lecturers: any;
  updateModule: any;

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
    this.moduleId = this.activatedRoute.snapshot.paramMap.get("id");

    if(this.moduleId) {
      await this.adminServices.getModules().then(res => {
        this.module = res.modules.filter((module: { moduleNo: any; }) => module.moduleNo == this.moduleId)[0];
        this.updateModule = res.modules.filter((module: { moduleNo: any; }) => module.moduleNo == this.moduleId)[0];
        this.position = {
          lat: Number(this.module.lat),
          lng: Number(this.module.long),
        };
        this.studentServices.getStudents().then(res => {
          this.students = res.students.filter(
            (student: { moduleNo1: any, moduleNo2: any }) => 
              (student.moduleNo1 == this.moduleId || student.moduleNo2 == this.moduleId))
        });
        this.lecturerServices.getLecturers().then(res => {
          this.lecturers = res.lecturers.filter(
            (lecturer: { moduleNo1: any, moduleNo2: any }) => 
              (lecturer.moduleNo1 == this.moduleId || lecturer.moduleNo2 == this.moduleId)
          )
        })
      });
    }
  }

  async saveModuleDetails () {
    await this.adminServices.updateModule(this.updateModule, (res: any) => {
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
          handler: () => this.deleteModule()
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

  async deleteModule () {
    this.adminServices.deleteModule(this.moduleId, (res: any) => {
      this.navService.setAlert("Success!", "Module Deleted Successfully!", true);
    });
  }

  onInput(ev: any) {
    const id = ev.target.id;
    const value = ev.target.value;
    this.updateModule[id] = value;
  }
}
