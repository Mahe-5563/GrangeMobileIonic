import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { LecturersService } from 'src/app/service/lecturers/lecturers.service';
import { AdminService } from 'src/app/service/admin/admin.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private lecService: LecturersService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    const lecturerID = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
