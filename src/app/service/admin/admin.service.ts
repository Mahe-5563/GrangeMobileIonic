import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";


export interface Assignments {
  attachment: string,
  content: string,
  isVisible: boolean,
  lecturerId: Number,
  moduleId: Number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor() { }

  public async getModules () {
    return (await fetch(`${environment.mampserver}/json-data-modules.php`)).json();
  }

  public async updateModule(module: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-update-module.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(module));
  }

  public async deleteModule (moduleId: any, callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-delete-module.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(moduleId);
  }

  public async createModule (module: any, callback: Function) {
    module = {
      ...module,
      credits: Number(module.credits),
    }
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${environment.mampserver}/json-create-module.php`, true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhttp.send(JSON.stringify(module));
  }
}
