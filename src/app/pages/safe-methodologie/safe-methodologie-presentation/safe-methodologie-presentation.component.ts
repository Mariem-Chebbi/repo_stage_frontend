import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../../core/services/safe/demo.service';
import { Router } from '@angular/router';
import { Demo } from '../../../core/models/safe/demo.model';

@Component({
  selector: 'ngx-safe-methodologie-presentation',
  templateUrl: './safe-methodologie-presentation.component.html',
  styleUrls: ['./safe-methodologie-presentation.component.scss']
})
export class SafeMethodologiePresentationComponent implements OnInit {
  
  id = "669019f2b2b147200accaa7e";
  demo: any | null = null;

  constructor(private demoService: DemoService,private router: Router) { }
 

  onEditClick() {
    this.router.navigate(['/pages/safe/update']);
  }

  ngOnInit(): void {
    this.getDemoById(this.id);
  }

  getDemoById(id: string): void {
    this.demoService.getDemobyID(id).subscribe(
      (data: Demo) => {
        this.demo = data;
        console.log(this.demo); // Check if S1_SS_Introduction is present in the logged data
      },
      (error) => {
        console.error('Error fetching demo', error);
      }
    );
  }
  goToSafeProcess() {
    this.router.navigate(['/pages/safe/safe-process']);
  }
}


/*   getDemoById(id : string){
    this.demoS.getById(id).subscribe(
      (data)=>{
        this.demo = data;
        console.log(this.demo)
      },
      (error)=>{
        console.error("error fetching");
      }
    );
  } */



