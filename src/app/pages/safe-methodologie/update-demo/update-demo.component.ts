import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../../core/services/safe/demo.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demo } from '../../../core/models/safe/demo.model';

@Component({
  selector: 'ngx-update-demo',
  templateUrl: './update-demo.component.html',
  styleUrls: ['./update-demo.component.scss']
})
export class UpdateDemoComponent implements OnInit {
  id = '669019f2b2b147200accaa7e'; // Example ID
  demo: Demo | null = null;
  demoForm: FormGroup;

  constructor(private demoService: DemoService, private router: Router, private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      s1_FS_Title: ['', Validators.required],
      s1_FS_Description: ['', Validators.required],
      s1_SS_Introduction: ['', Validators.required],
      s2_FS_Title: [''],
      s2_SS_Benefits1: [''],
      s2_SS_Benefits2: [''],
      s2_SS_Benefits3: [''],
      s2_SS_Benefits4: [''],
      s2_SS_Title: [''],
      s2_SS_Limitations1: [''],
      s2_SS_Limitations2: [''],
      s2_SS_Limitations3: [''],
      s2_SS_Limitations4: [''],
      s3_FS_Title: [''],
      s3_FS_Subtitle: [''],
      s3_FS_Description: [''],
      s3_SS_Title: [''],
      s3_SS_Subtitle: [''],
      s3_TS_Title: [''],
      s3_TS_Ex_Text1: [''],
      s3_TS_Ex_Text2: [''],
      s3_TS_Ex_Text3: [''],
      s3_TS_Ex_Text4: [''],
      s3_FoS_Title: [''],
      s3_FoS_Subtitle: [''],
      s3_FoS_Text1: [''],
      s3_FoS_Text2: [''],
      s3_FoS_Text3: [''],
      s3_FoS_Text4: [''],
      s3_FoS_Text5: [''],
      s3_FoS_Text6: [''],
      s3_FoS_Text7: [''],
      s3_FoS_Text8: [''],
      s3_FoS_Text9: [''],
      s3_FoS_Text10: [''],
      s3_FiS_Title_center: [''],
      s3_FiS_Title1: [''],
      s3_FiS_Subtitle1: [''],
      s3_FiS_Title2: [''],
      s3_FiS_Subtitle2: [''],
      s3_FiS_Title3: [''],
      s3_FiS_Subtitle3: [''],
      s3_FiS_Title4: [''],
      s3_FiS_Subtitle4: [''],
      s3_SIS_Title_center: [''],
      s3_SIS_Title1: [''],
      s3_SIS_Subtitle1: [''],
      s3_SIS_Title2: [''],
      s3_SIS_Subtitle2: [''],
      s3_SIS_Title3: [''],
      s3_SIS_Subtitle3: [''],
      s3_SIS_Title4: [''],
      s3_SIS_Subtitle4: [''],
      s3_SIS_Title5: [''],
      s3_SIS_Subtitle5: [''],
      s3_SES_Title_center: [''],
      s3_SES_Title1: [''],
      s3_SES_Subtitle1: [''],
      s3_SES_Title2: [''],
      s3_SES_Subtitle2: [''],
      s3_SES_Title3: [''],
      s3_SES_Subtitle3: [''],
      s3_SES_Title4: [''],
      s3_SES_Subtitle4: [''],
      s4_FS_Title: [''],
      s4_FS_Subtitle: [''],
      s4_FS_Description: [''],
      s4_SS_Description: [''],
      s4_TS_Title: [''],
      s4_TS_Subtitle: [''],
      s5_FS_Title: [''],
      s5_FS_Description: [''],
      s5_SS_Title1: [''],
      s5_SS_Description1: [''],
      s5_SS_Title2: [''],
      s5_SS_Description2: [''],
      s5_SS_Title3: [''],
      s5_SS_Description3: [''],
      s5_SS_Title4: [''],
      s5_SS_Description4: [''],

      s5_SS_Title5: [''],
      s5_SS_Description5: [''],
      s5_SS_Title6: [''],
      s5_SS_Description6: [''],
      s6_Title: [''],
      s6_Subtitle: [''],
      s6_FS_Description_prob1: [''],
      s6_FS_Description6_solu1: [''],
      s6_SS_Description_prob2: [''],
      s6_SS_Description6_solu2: [''],
      s6_TS_Description_prob3: [''],
      s6_TS_Description6_solu3: [''],
      s6_FOS_Description_prob4: [''],
      s6_FOS_Description6_solu4: [''],
      footer_Desc: ['']
    });
  }

  ngOnInit(): void {
    this.fetchDemoData(this.id);
  }

  fetchDemoData(id: string): void {
    this.demoService.getDemobyID(id).subscribe(
      (data: Demo) => {
        this.demo = data;
        this.demoForm.patchValue(data); // Populate form with demo data
      },
      (error) => {
        console.error('Error fetching demo', error);
      }
    );
  }

  updateDemo() {
    if (this.demoForm.valid) {
      const payload = this.demoForm.value;
      console.log('Payload size:', JSON.stringify(payload).length); // Log payload size
      console.log('Payload content:', payload); // Log payload content
  
      this.demoService.updateDemoById(this.id, payload).subscribe(
        (response) => {
          alert("Demo updated successfully.");
          this.router.navigate(['/pages/safe/agile']);
        },
        (error) => {
          console.error("Error updating demo:", error);
          alert("An error occurred while updating the demo.");
        }
      );
    } else {
      console.error('Form is not valid');
      alert("Please fill out the form correctly.");
    }
  }
  
}
