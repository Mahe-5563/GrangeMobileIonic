import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { sampleJSON } from 'src/app/json/sample';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.page.html',
  styleUrls: ['./tweets.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TweetsPage implements OnInit {

  tweets: any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    /* this.adminService.getTwitterUsersTweets((tweets: any) => {
      this.tweets = tweets.results;
    }) */
  }

  getDate(date: any) {
    return new Date(date).toLocaleString();
  }

}
