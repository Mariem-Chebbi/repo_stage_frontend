import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Demonstration } from '../../../../../core/FDDG2_Models/demonstration';
import { DemonstrationService } from '../../../../../core/FDDG2_Services/demonstration.service';
import { title } from 'process';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { disableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'ngx-add-demo',
  templateUrl: './add-demo.component.html',
  styleUrls: ['./add-demo.component.scss']
})
export class AddDemoComponent implements OnInit {

firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
  BasicsForm: FormGroup;
  KolbForm: FormGroup;
  otherForm: FormGroup;
  files: { [key: string]: File } = {};
  submitted = false;
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|', 'undo', 'redo', 'imageUpload', '|', 'fontColor', 'backgroundColor'],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    ckfinder: {
      uploadUrl: 'http://localhost:8085/demo/upload',
      withCredentials: true,
      headers: {
        Authorization: '' // Add any headers needed for authentication
      }
    },
    fontColor: {
      colors: [
        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ]
    },
    fontBackgroundColor: {
      colors: [
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' }
        // More colors.
        // ...
      ]
    },
  };

  constructor(private demoService: DemonstrationService, private router: Router, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.BasicsForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      introduction: new FormControl(''),
      objectives: new FormControl(''),
    });

    this.KolbForm = new FormGroup({
      what: new FormControl(''),
      how: new FormControl(''),
      why: new FormControl(''),
      whatIf: new FormControl(''),
    });

    this.otherForm = new FormGroup({
      advantages: new FormControl(''),
      disadvantages: new FormControl(''),
      roles: new FormControl(''),
      lifeCycle: new FormControl('')
    });
  }

  onFileChange(event: any, attribute: string) {
    const file = event.target.files[0];
    if (file) {
      this.files[attribute] = file;
    }
  }

  createDemo(): void {
    if (this.BasicsForm.invalid) {
      return;
    }

    const formData = new FormData();
    const basics = this.BasicsForm.value;
    const kolb = this.KolbForm.value;
    const other = this.otherForm.value;

    // Append form data
    for (const key in basics) {
      formData.append(key, basics[key]);
    }
    for (const key in kolb) {
      formData.append(key, kolb[key]);
    }
    for (const key in other) {
      formData.append(key, other[key]);
    }

    // Append files
    for (const key in this.files) {
      formData.append(key, this.files[key]);
    }

    this.demoService.createDemo(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigateByUrl("/pages/agile/demo/alldemos");
        console.log(res);
        this.BasicsForm.markAsDirty();
      },
      error: (e) => console.error(e)
    });
  }

  navigateToAll(): void {
    this.router.navigate(['/pages/agile/demo/alldemos/']);
  }

  onFirstSubmit() {
    this.BasicsForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
