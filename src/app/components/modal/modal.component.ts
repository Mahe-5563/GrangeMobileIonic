import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';
import { LecturersService } from 'src/app/service/lecturers/lecturers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ModalComponent  implements OnInit {

  isModalOpen: boolean | undefined;
  lecturers: any;

  constructor(
    private navService: NavigationsService, 
    private lecService: LecturersService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    if(!this.lecturers) {
      this.fetchLecturers();
    }
  }

  fetchLecturers() {
    this.lecService.getLecturers().then(res => {
      if(res.lecturers) {
        this.lecturers = res.lecturers;
      } else {
        this.navService.setAlertWBtns(
          "Oops!", 
          "Looks like we cannot fetch the list of lecturers and their assignments. Please try again later", 
          [
            {
              text: "OK",
              role: "dismiss",
            }
          ], 
          false
        )
      }
    })
  }

  closeModal() {
    this.modalController.dismiss(null, "");
  }

  selectedLecturer(lecId: string) {
    console.info(lecId);
    this.navService.navigateToRoute(`assignments/view/${lecId}`);
    setTimeout(() => {
      this.closeModal()
    }, 500);
  }
}
