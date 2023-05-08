import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from, switchMap } from "rxjs";
import { 
  Firestore, 
  collection, 
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  doc
} from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";

export interface Assignment {
  attachment: string,
  content: string,
  createdDate: Date,
  dueDate: Date,
  isVisible: boolean,
  lecturerId: Number,
  moduleId: Number,
  name: string,
  imgUrl: string,
}

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  assignment: Assignment = {
    attachment: "",
    content: "",
    createdDate: new Date(),
    dueDate: new Date(),
    isVisible: false,
    lecturerId: 0,
    moduleId: 0,
    name: "",
    imgUrl: "",
  };

  constructor(
    private firestore: Firestore, 
    private firestorage: AngularFireStorage
  ) { }

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

  getAssignments(): Observable<Assignment[]> {
    const ref = collection(this.firestore, 'assignments');
    return collectionData(ref, {idField: 'id'}) as Observable<Assignment[]>;
  }

  createAssignment(assignment: any, attachment: any, response: Function) {
    const ref = collection(this.firestore, "assignments")
    if(attachment) {
      const storageRef = this.firestorage.storage.ref('assignments/attachments/' + assignment.attachment)
      storageRef
        .put(attachment)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            assignment.imgUrl = url;
            addDocument();
          })
        })
    } else {
      addDocument();
    }

    function addDocument () {
      addDoc(ref, assignment)
        .then(() => {
          response(true)
        })
        .catch(() => {
          response(false)
        });
    }
  }

  updateAssignment(updateAssignment: any, response: Function) {
    const docRef = doc(this.firestore, "assignments", updateAssignment.id)
    updateDoc(docRef, updateAssignment)
      .then(() => {
        response(true)
      })
      .catch(() => {
        response(false)
      })
  }

  deleteAssignment(assignment: any, response: Function) {
    const docRef = doc(this.firestore, "assignments", assignment.id);
    deleteDoc(docRef)
      .then(() => {
        response(true)
      })
      .catch(() => {
        response(false)
      })
  }

  getTwitterUsersTweets(callback: Function) {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET", 
      `https://twitter154.p.rapidapi.com/user/tweets?username=WeAreTUDublin&limit=10&user_id=95665759&include_replies=false&include_pinned=false`, 
      true);
    xhttp.setRequestHeader('X-RapidAPI-Key', '576cc2024bmsh96cbb76b62dbbbap1ac639jsn45a706953d88')
    xhttp.setRequestHeader('X-RapidAPI-Host', 'twitter154.p.rapidapi.com')
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.info(JSON.parse(this.responseText));
        callback(JSON.parse(this.responseText));
      }
    }
    xhttp.send();
  }
}
