import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, UntypedFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminService } from 'src/app/service/admin/admin.service';
import { NavigationsService } from 'src/app/service/common/navigations/navigations.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPage implements OnInit {

  moduleDetails = {
    moduleNo: 0,
    moduleName: "",
    credits: 0,
    website: "",
    dueDate: "",
    location: "",
    room: "",
    lat: "53.355327152829325",
    long: "-6.280418947008069"
  }
  // // 53.355327152829325, -6.280418947008069

  constructor(
    private adminServices: AdminService, 
    private navService: NavigationsService
  ) {
  }

  async ngOnInit() {
    this.adminServices.getModules()
      .then((res: any) => {
        const lastModule = res.modules[res.modules.length - 1];
        this.moduleDetails.moduleNo = Number(lastModule.moduleNo) + 1;
      })
      .catch(err => {
        
      })
  }

  verifyAllDetails () {
    let allDetailsPresent = true;
    for(let values of Object.values(this.moduleDetails)) {
      if(values == "") { allDetailsPresent = false; break; }
    }

    if(allDetailsPresent) {
      this.adminServices.createModule(this.moduleDetails, (res: any) => {

      })
    } else {
      this.navService.setAlertWBtns(
        "Oops!",
        "Please make sure all the fields are filled.",
        [
          {
            text: "OK",
            role: "dismiss",
            /* handler: () => {
              alert.dismiss();
            } */
          }
        ],
        false,
      )
      /* this.setAlertWBtns(
      ) */
    }
  }

  onInput(ev: any) {
    const id = ev.target.id;
    const value = ev.target.value;
    this.moduleDetails = {
      ...this.moduleDetails,
      [id]: value,
    };
  }
  
}
