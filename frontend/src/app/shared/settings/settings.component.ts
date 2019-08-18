import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  tutorialStatus = "";
  subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.checkStatus();
    this.subscriptions.push(
      this.auth.authChanged.subscribe(()=>{
        setTimeout(()=>{this.auth.checkNew(this.auth.user).subscribe(); this.checkStatus()}, 50);
      })
    );
  }

  checkStatus(){
    if (this.auth.isNew == true){
      this.tutorialStatus = "Currently not displaying tutorials."
    } else {
      this.tutorialStatus = "Currently displaying tutorials."
    }
  }


  changeTutorial() {
    if (confirm("Are you sure you want to hide these tutorials?")){
      this.auth.changeNew(this.auth.user).subscribe(()=>{
        this.auth.authChanged.next();
      })
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach((sub)=>{
      sub.unsubscribe()
    })
  }

}
