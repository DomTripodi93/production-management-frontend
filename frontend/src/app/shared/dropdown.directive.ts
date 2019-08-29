import { Directive, HostListener, HostBinding, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  inside = true;
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    setTimeout(()=>{this.inside = false}, 50);
  } 

  @HostListener('document:click') toggleClosed() {
    if (!this.inside){
      this.isOpen = false;
      setTimeout(()=>{this.inside = true}, 50);
    }
  } 

  constructor(
  ) { }

}
