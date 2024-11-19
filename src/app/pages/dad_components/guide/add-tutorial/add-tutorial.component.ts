import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorialService } from '../../../../core/services/dad_services/tutorial.service';

@Component({
  selector: 'ngx-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {
  text: string;
  addForm!: FormGroup;
  tutorial: any = {}

  constructor(
    private tutorialService: TutorialService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({

      title: new FormControl(this.tutorial.title, Validators.required),
      content: new FormControl(this.tutorial.content, Validators.required),
    })
  }

  get title() {
    return this.addForm.get('title')
  }
  get content() {
    return this.addForm.get('content')
  }

  submit() {
    this.tutorial = this.addForm.value
    this.tutorialService.add(this.tutorial).subscribe(
      (data) => {
        console.log("success");
        this.router.navigate(['/pages/agile/dad']);
      }
    )
    console.log(this.tutorial);
  }
}
