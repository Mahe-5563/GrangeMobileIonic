import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  constructor() { }

  public async getLecturers() {
    return ((await fetch(`${environment.mampserver}/json-data-lecturers.php`)).json())
  }

  public async updateLecturer(lecturer: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-update-lecturer.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(lecturer));
  }

  public async deleteLecturer (lecturerId: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-delete-lecturer.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(lecturerId);
  }

  public async createLecturer (lecturer: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-create-lecturer.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(lecturer));
  }
}
