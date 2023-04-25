import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { LecturersService } from 'src/app/service/lecturers/lecturers.service';
import { AdminService } from 'src/app/service/admin/admin.service';
import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';
import { ViewAssignmentModalComponent } from 'src/app/standalonepages/assignments/view-assignment-modal/view-assignment-modal.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewPage implements OnInit {

  assignment = {
    attachment: "",
    content: "",
    createdDate: "",
    dueDate: "",
    isVisible: false,
    lecturerId: 0,
    moduleId: 0,
    name: "",
  }

  isModalOpen = false;
  currentLecturer: any;
  currentLecturerAssignments: any;
  isAssignmentsPresent: boolean | undefined;
  lecturerModules: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private lecService: LecturersService,
    private adminService: AdminService,
    private navigationService: NavigationsService,
    private alrtCtrl: AlertController,
    private modalCtrlr: ModalController,
  ) {
  }

  ngOnInit() {
    const lecturerID = this.activatedRoute.snapshot.paramMap.get("id");
    
    this.lecService.getLecturers().then((res) => {
      this.currentLecturer = res.lecturers.filter((lec: any) => lec.staffNumber == lecturerID)[0];
      this.adminService.getModules().then(res => {
        this.lecturerModules = res.modules.filter((module: any) => module.moduleNo == this.currentLecturer.moduleNo1 || module.moduleNo == this.currentLecturer.moduleNo2);
      })
    })

    this.adminService.getAssignments().subscribe(assignments => {
      this.currentLecturerAssignments = assignments.filter((assignment: any) => assignment.lecturerId == lecturerID);
      this.isAssignmentsPresent = this.currentLecturerAssignments.length > 0
    })
  }

  setOpen(open: boolean) {
    this.isModalOpen = open;
  }

  changeVisible(ev: any) {
    this.assignment.isVisible = ev.target.checked;
  }

  onInput(ev: any) {
    let id = ev.target.id;
    let value = ev.target.value

    if(ev.target.id == "attachment") {
      value = `${new Date().getTime()}_${value.split("\\")[2]}`
    }

    this.assignment = {
      ...this.assignment,
      [id]: value
    }
  }

  createAssignment() {
    this.assignment = {
      ...this.assignment,
      lecturerId: this.currentLecturer.staffNumber,
      moduleId: Number(this.assignment.moduleId),
    }

    this.adminService.createAssignment(this.assignment, (success: boolean) => {
      if(success) {
        this.setAlert(
          "Success!", 
          "New Assignment created successfully!",
        )
      } else {
        this.setAlert(
          "Oops!", 
          "Could not create assignment.",
        )
      }
    });
    
  }

  async setAlert (header: any, message: any) {

    const alert = await this.alrtCtrl.create({
      header,
      message,
    });

    await alert.present();
    
    setTimeout(() => {
      alert.dismiss();
      this.setOpen(false);
    }, 1500);
  }

  async viewAssignmentModal(currentAssignment: any) {
    const modal = await this.modalCtrlr.create({
      component: ViewAssignmentModalComponent,
      componentProps: { currentAssignment }
    })
    modal.present();
  }
}
