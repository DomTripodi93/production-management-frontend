import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DaysService } from '../shared/days/days.service';
import { AuthService } from '../shared/auth.service';
import { Machine } from '../machine/machine.model';
import { ProductionService } from './production.service';
import { MachineService } from '../machine/machine.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent {
  @ViewChild('chooseMachine') chooseMachForm: NgForm;
  machines = [];
  fullMach: Machine[] = [];
  job = '';
  machine = '';
  defaultMach = '';

  constructor(
    private dayServ: DaysService,
    private route: ActivatedRoute,
    private router: Router,
    private mach: MachineService,
    private auth: AuthService
  ){
    this.mach.fetchMachineJobs()
    .subscribe((machines: Machine[]) => {
      this.fullMach = machines;
      machines.forEach((mach)=>{
        if (mach.current_job !== "None"){
          this.machines.push(mach.machine)
        }
      });
      this.machines.sort();
      this.defaultMach = this.machines[0];
    });
  }

  onNew(){
    this.dayServ.resetDate();
    this.router.navigate(["/production/new"])
  }

  chooseMach(){
    let job = '';
    this.fullMach.forEach((mach)=>{
      if (mach.machine == this.chooseMachForm.value.machine){
        job = mach.current_job;
      }
    })
    let machine = "&machine="+this.chooseMachForm.value.machine;
    let movement = "/production/"+job+machine;
    this.router.navigate([movement])
  }

}
