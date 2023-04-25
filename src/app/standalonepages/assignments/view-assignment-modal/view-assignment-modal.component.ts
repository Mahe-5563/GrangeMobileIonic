import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-modal',
  templateUrl: './view-assignment-modal.component.html',
  styleUrls: ['./view-assignment-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ViewAssignmentModalComponent  implements OnInit {
  @Input("currentAssignment") currentAssignment: any;
  updatedAssignment: any;

  constructor(
    private modalCtrl: ModalController,
    private adminServ: AdminService,
    private alrtCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.updatedAssignment = {
      ...this.currentAssignment
    };
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onInput(ev: any) {
    let id = ev.target.id;
    let value = ev.target.value

    if(ev.target.id == "attachment") {
      value = `${new Date().getTime()}_${value.split("\\")[2]}`
    }

    this.updatedAssignment = {
      ...this.updatedAssignment,
      [id]: value
    }
  }

  changeVisible(ev: any) {
    this.updatedAssignment.isVisible = ev.target.checked;
  }

  async setAlert (header: any, message: any) {

    const alert = await this.alrtCtrl.create({
      header,
      message,
    });

    await alert.present();
    
    setTimeout(() => {
      alert.dismiss();
      this.closeModal();
    }, 1500);
  }

  updateAssignment() {
    this.adminServ.updateAssignment(this.updatedAssignment, (success: any) => {
      if(success) {
        this.setAlert(
          "Success!",
          "Assignment updated successfully!",
        )
      } else {
        this.setAlert(
          "Oops!", 
          "Could not update assignment.",
        )
      }
    });
  }

  deleteAssignment() {
    this.adminServ.deleteAssignment(this.updatedAssignment, (success: any) => {
      if(success) {
        this.setAlert(
          "Success!", 
          "Assignment deleted successfully!",
        )
      } else {
        this.setAlert(
          "Oops!", 
          "Could not delete assignment.",
        )
      }
    })
  }
}
