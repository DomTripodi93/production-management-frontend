import { Component, OnInit } from '@angular/core';
import { Production } from '../production.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductionService } from '../production.service';
import { AuthService } from '../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DaysService } from '../../shared/days/days.service';
import { Machine } from '../../machine/machine.model';
import { MachineService } from 'src/app/machine/machine.service';

@Component({
  selector: 'app-production-new',
  templateUrl: './production-new.component.html',
  styleUrls: ['./production-new.component.css']
})
export class ProductionNewComponent implements OnInit {
  canInput= false;
  productionForm: FormGroup;
  machines = []
  jobs = [];
  shifts = [
    "Day",
    "Night",
    "Over-Night",
    "Found"
  ];
  
  constructor(
    private pro: ProductionService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dayServe: DaysService,
    private mach: MachineService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    if (!this.dayServe.today){
      this.dayServe.resetDate();
    }
    this.mach.fetchMachineJobs()
    .subscribe(machines => {
      machines.forEach((mach)=>{
        if (!this.jobs.includes(mach.current_job)){
          if (mach.current_job !== "None"){
            this.jobs.push(mach.current_job)
          }
        }
        this.machines.push(mach.machine)
      });
      this.machines.sort();
      this.initForm();
    });
    this.auth.hideButton(0);
  }
    
  private initForm() {
    if (+this.dayServe.today < 10 && this.dayServe.today.length <2){
      this.dayServe.today = "0"+this.dayServe.today
    };
    if (+this.dayServe.month < 10 && this.dayServe.stringMonth.length <2){
      this.dayServe.stringMonth = "0"+this.dayServe.month
    };
    let date = this.dayServe.year +"-"+this.dayServe.stringMonth+"-"+this.dayServe.today;

    this.productionForm = new FormGroup({
      'quantity': new FormControl("", Validators.required),
      'date': new FormControl(date, Validators.required),
      'shift': new FormControl(this.shifts[0], Validators.required),
      'machine': new FormControl(this.machines[0], Validators.required),
      'job': new FormControl(this.jobs[0], Validators.required)
    });
  }
  
  onSubmit(){
    this.newProduction(this.productionForm.value);
  }

  newProduction(data: Production) {
    this.pro.addProduction(data).subscribe();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onCancel(){
    window.history.back();
  }

  ngOnDestroy(){
    this.auth.showButton(0);
  }


}
