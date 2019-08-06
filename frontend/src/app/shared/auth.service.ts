import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../register/user.model';
import { Signin } from '../register/signin/signin.model';
import { Change } from './change.model';

@Injectable({providedIn:'root'})
export class AuthService {
    buttonHidden = [false, false];
    token = '';
    user = '';
    name = '';
    isAuthenticated = false;
    apiUrl = 'http://ec2-3-17-73-216.us-east-2.compute.amazonaws.com/';
    public authChanged = new Subject();

    constructor(
        private http: HttpClient
    ){}
    
    logout(){
        this.user = '';
        this.token = '';
        this.name = '';
        this.isAuthenticated = false;
        localStorage.setItem('token', '');
        localStorage.setItem('id', '');
        this.authChanged.next();
    }

    registerUser(data: User){
      return this.http.post(
        this.apiUrl + '/register/',
        data
      )
    }

    signinUser(data: Signin){
        return this.http.post(
          this.apiUrl + '/login/',
          data,
          {
            observe: 'response'
          }
        )
    }

    logChanges(values, model, type, id){
      let data = {
        'old_values': " "+values,
        'change_type': type,
        'changed_id': id,
        'changed_model': model
      }
      return this.http.post(
        this.apiUrl + '/changelog/', data
      );
    }

    splitJoin(machine: string){
        let machineHold1: string;
        let machineHold2 = machine.split(" ");
        machineHold1 = machineHold2.join("-")
        machine = machineHold1
          return machine;
    }

    rejoin(machine){
        let machineHold1 = machine;
        let machineHold2 = machineHold1.split("-");
        machineHold1 = machineHold2.join(" ")
        machine = machineHold1
          return machine;
    }

    hideButton(i){
        setTimeout(()=>{
          this.buttonHidden[i] = true;
        })
    }
  
    showButton(i){
        setTimeout(()=>{
          this.buttonHidden[i] = false;
        })
    }
}