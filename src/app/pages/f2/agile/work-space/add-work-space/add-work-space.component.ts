import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Workspace } from '../../../../../core/FDDG2_Models/workspace';
import { WorkspaceService } from '../../../../../core/FDDG2_Services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { User } from '../../../../../core/FDDG2_Models/user';
import { AuthService } from '../../../../../core/FDDG2_Services/auth.service';

@Component({
  selector: 'ngx-add-work-space',
  templateUrl: './add-work-space.component.html',
  styleUrls: ['./add-work-space.component.scss']
})
export class AddWorkSpaceComponent implements OnInit {
  windowRef: NbWindowRef;
  user : User;
  WorkForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    domain: new FormControl('', [Validators.required])
  });

  workspace: Workspace = {
    codeWS: '',
    name: '',
    domain: '',
    Date: '',
    project:'',
    user:''
  };
  submitted = false;

  constructor(
    private workservice: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.workspace.codeWS = params['id'];
      console.log('Workspace ID:', this.workspace.codeWS);
    });
    this.user = this.authService.getCurrentUser();
  }

  createWork(): void {
    if (this.WorkForm.invalid) {
      return;
    }
    const userId=this.user
    const data = {
      name: this.WorkForm.get('name')!.value,
      domain: this.WorkForm.get('domain')!.value,
      user: this.user

    };
    console.log('Form Data:', data);
    this.workservice.createWorkSpace(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigateByUrl("/pages/agile/workspace/getAllWS");
      },
      error: (e) => console.error(e)
    });
  }

  newWorkSpace(): void {
    this.submitted = false;
    this.workspace = {
      codeWS: '',
      name: '',
      domain: '',
      Date: '',
      project:'',
      user:''
    };
  }
  navigateToAllWorkSpace() {
    this.router.navigate(['/pages/agile/workspace/getAllWS']);
    console.log("ok");
  }
  closeWindowForm() {
    if (this.windowRef) {
      this.windowRef.close();
      this.navigateToAllWorkSpace();
    }
  }
}
