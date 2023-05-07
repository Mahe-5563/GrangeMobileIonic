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
    createdDate: +new Date(),
    dueDate: "",
    isVisible: false,
    lecturerId: 0,
    moduleId: 0,
    name: "",
    imgUrl: ""
  }

  isModalOpen = false;
  currentLecturer: any;
  currentLecturerAssignments: any;
  isAssignmentsPresent: boolean | undefined;
  lecturerModules: any;
  assignmentAttachment: any;

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
      this.adminService.getModules().then((res: any) => {
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
      this.assignmentAttachment = ev.target.files[0];
    }

    this.assignment = {
      ...this.assignment,
      [id]: value
    }
  }

  createAssignment(ev: any) {
    this.assignment = {
      ...this.assignment,
      lecturerId: this.currentLecturer.staffNumber,
      moduleId: Number(this.assignment.moduleId),
    }
    ev.target.innerHTML = "Creating...";
    ev.target.disabled = true;
    this.adminService.createAssignment(this.assignment, this.assignmentAttachment, (success: boolean) => {
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
