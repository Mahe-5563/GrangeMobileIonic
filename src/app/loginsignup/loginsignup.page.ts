import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavigationsService } from '../service/common/navigations/navigations.service';
import { StudentsService } from '../service/students/students.service';
import { LecturersService } from '../service/lecturers/lecturers.service';

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.page.html',
  styleUrls: ['./loginsignup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginsignupPage implements OnInit  {

  menu: any;

  // Form details
  userId: string | undefined;
  pwd: string | undefined;
  type = "admin" // : string | undefined;
  
  // Alert message
  header: string | undefined;
  message: string | undefined;
  isAlertOpen: boolean | undefined;
  buttons = ["OK"];

  constructor(
    private navigationService: NavigationsService,
    private studentService: StudentsService,
    private lecturerService: LecturersService,
  ) { }
  
  ngOnInit(): void {
    
    let cookieObj = {
      userID: "",
      userType: "",
    };

    const cookies = document.cookie.split("; ");
    cookies.reduce((prevValue: string, currentValue: string) => {
      const cValue = currentValue.split("=");
      cookieObj = {
        ...cookieObj, 
        [cValue[0]]: cValue[1],
      }
      return "";
    }, "");
    
    const userId = cookieObj.userID;
    const userType = cookieObj.userType;

    if(userId && userType) {
      switch(userType) {
        case "admin": 
          this.navigationService.navigateToRoute("/admin/tabs/home");
          break;
        case "lecturer":
          break;
        case "student":
          break;
        default:
          break;
      }
    }
  }

  async submitValue() {

    if(!this.userId || !this.pwd || !this.type) this.setAlert("Oops!", "Missing details");
    else if (this.pwd != "123456") this.setAlert("Yikes!", "Invalid Credentials");
    else {
      
      if(this.type == "lecturer") {
        await this.lecturerService.getLecturers()
          .then(res => {
            const isLecturerPresent = res.lecturers.filter((lecturer: { staffNumber: string | undefined; }) => lecturer.staffNumber == this.userId).length > 0;

            if(isLecturerPresent) {
              console.info("Lecturer Present!");
              // Proceed with lecturer flow
              this.navigationService.navigateToRoute('/lecturer/tablinks/home');
            } else {
              this.setAlert("Yikes!", "Invalid Credentials");
            }
          })
          .catch(err => console.info("err: ", err));
          
      } else if (this.type == "studentin") {
        await this.studentService.getStudents()
          .then(res => {
            const isStudentPresent = res.students.filter((student: { studentID: string | undefined; }) => student.studentID == this.userId).length > 0;

            if(isStudentPresent) {
              console.info("Student Present!");
              // Proceed with student flow
            } else {
              this.setAlert("Yikes!", "Invalid Credentials");
            }
          })
          .catch(err => console.info("err: ", err));
      } else if (this.type == "admin") {
        if(this.userId == "123" && this.pwd == "123456") {
          // proceed with Admin flow
          this.navigationService.navigateToRoute('/admin/tabs/home');

          document.cookie = `userType=admin; expires=${new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+30)}`;
          document.cookie = `userID=${this.userId}; expires=${new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+30)}`;

          localStorage.setItem("userType", "admin");
          localStorage.setItem("userId", this.userId);
        } else {
          this.setAlert("Yikes!", "Invalid Credentials");
        }
      }
    }
    
  }

  setValue(ev: any) {
    this.type = ev.detail.value
  }

  setOpen(bool: boolean) {
    this.isAlertOpen = bool;
  }

  setAlert(header: string, message: string) {
    this.isAlertOpen= true;
    this.header = header;
    this.message = message;
  }
}
