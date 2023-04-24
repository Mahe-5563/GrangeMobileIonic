import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  public async getStudents() {
    return ((await fetch(`${environment.mampserver}/json-data-students.php`)).json())
  }

  public async updateStudent(student: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-update-student.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(student));
  }

  public async deleteStudent (studentId: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-delete-student.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(studentId);
  }

  public async createStudent (student: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-create-students.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(student));
  }
}
