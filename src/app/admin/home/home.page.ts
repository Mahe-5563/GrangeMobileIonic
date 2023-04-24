import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';
import { LecturersService } from 'src/app/service/lecturers/lecturers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  isModalOpen: boolean | undefined;
  lecturers: any;

  constructor(
    private navService: NavigationsService, 
    private lecService: LecturersService,
  ) { }

  ngOnInit() {
  }

  reload() {
    document.cookie = `userType=""`;
    document.cookie = `userID=""`;

    this.navService.navigateToRoute("");
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  fetchLecturers() {
    if(!this.lecturers) {
      this.lecService.getLecturers().then(res => {
        if(res.lecturers) {
          this.lecturers = res.lecturers;
          this.setOpen(true);
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
    } else {
      this.setOpen(true);
    }
  }

  selectedLecturer(lecturerID: string) {
    console.info(lecturerID);
    this.navService.navigateToRoute(`assignments/view/${lecturerID}`);
  }

}
