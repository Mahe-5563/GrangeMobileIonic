import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { instaJSON } from 'src/app/json/sample';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

  isModalOpen: boolean | undefined;
  lecturers: any;
  instaDetails: any;

  constructor(
    private navService: NavigationsService, 
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    // console.log("Hi there!")
    console.info(instaJSON);
    this.instaDetails = instaJSON.user;
  }

  reload() {
    document.cookie = `userType=""`;
    document.cookie = `userID=""`;

    this.navService.navigateToRoute("");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    })
    modal.present();
  }

}
