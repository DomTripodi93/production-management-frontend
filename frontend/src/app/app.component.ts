import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Production Management';
  subscription = new Subscription;
  id: number;

  public constructor(
    private auth: AuthService,
    private titleService: Title,
    private drop: DropdownDirective
  ){}

  ngOnInit(){
    this.setTitle(this.title)
    this.auth.user = localStorage.getItem('id'),
    this.auth.token = localStorage.getItem('token');
    if (this.auth.user){
      this.auth.isAuthenticated = true; 
      this.auth.checkNew(this.auth.user).subscribe();
    } else {
      this.auth.isAuthenticated = false;
    }
    this.auth.authChanged.next();
    this.subscription = this.auth.authChanged.subscribe(
      ()=>{
        this.id = +this.auth.user;
      }
    )
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  
  onActivate() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, 0)
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
