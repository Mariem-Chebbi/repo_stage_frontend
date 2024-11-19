 import { Component, OnInit } from '@angular/core';
import { DocumentationServiceService } from '../../../core/services/LSS_services/documentation-service.service';
import { Documentation } from '../../../core/models/LSS_models/Documentation'; // Adjust path as needed
import { ImageDocum } from '../../../core/models/LSS_models/ImageDocum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';

@Component({
  selector: 'ngx-lean-six-sigma-component',
  templateUrl: './lean-six-sigma-component.component.html',
  styleUrls: ['./lean-six-sigma-component.component.scss']
})
export class LeanSixSigmaComponentComponent implements OnInit {
  whyDocumentation: Documentation;
  whatDocumentation: Documentation;
  howDocumentation: Documentation;
  whatifDocumentation: Documentation;
  editingWhat: boolean = false;
  editingWhy: boolean = false;
  editingHow:boolean=false;
  editingWhatif:boolean=false;
  selectedFiles: File[] = [];
  images: ImageDocum[];
  whyImages: ImageDocum[]; 
  whatImages: ImageDocum[];
  HowImages: ImageDocum[];
  whatIfImages: ImageDocum[];
  whyForm: FormGroup;
  WhatForm: FormGroup;
  HowForm: FormGroup;
  WhatifForm: FormGroup;
  charters: any[] = [];
  selectedCharterIdDMADV: string | null = null;


  constructor(private documentationService: DocumentationServiceService,private dmadvservice:DmadvserviceService,private sipocservice:SIPOCserviceService , private fb: FormBuilder,private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.loadWhyDocumentation(); 
    this.loadWhatDocumentation();
    this.loadHowDocumentation();
    this.loadWhatifDocumentation();
    this.initForms();
    this.loadCharters();


  }
  initForms() {
    this.whyForm = this.fb.group({
      title1: ['', Validators.required],
      contentdocu: ['', Validators.required],
      title2: ['',Validators.required],
      content1: ['',Validators.required],
      title3: ['',Validators.required],
      content2: ['',Validators.required],
      title4: ['',Validators.required],
      content3: ['',Validators.required],
      content4: ['',Validators.required]
    });
    this.WhatForm=this.fb.group({
      title1: ['', Validators.required],
      contentdocu: ['', Validators.required],
      title2: ['',Validators.required],
      content1: ['',Validators.required],
      title3: ['',Validators.required],
      content2: ['',Validators.required],
      title4: ['',Validators.required],
      content3: ['',Validators.required],
      content4: ['',Validators.required],
      content5: ['',Validators.required]

    });
    this.HowForm=this.fb.group({
      title1: ['', Validators.required],
      contentdocu: ['', Validators.required],
      title2: ['',Validators.required],
      content1: ['',Validators.required],
      title3: ['',Validators.required],
      content2: ['',Validators.required],
      title4: ['',Validators.required],
      content3: ['',Validators.required],
      content4: ['',Validators.required],
      content5: ['',Validators.required],
      content6: [''],
      content8: ['']



    });
    this.WhatifForm=this.fb.group({
      title1: ['', Validators.required],
      contentdocu: ['', Validators.required],
      title2: ['',Validators.required],
      content1: ['',Validators.required],
      title3: ['',Validators.required],
      content2: ['',Validators.required],
      title4: [''],
      content3: ['',Validators.required],
      content4: ['',Validators.required],
      title5: [''],
      content5: ['',Validators.required],
      title6: [''],
      content6: ['',Validators.required],
      title7: [''],
      content7: ['',Validators.required],
      content8: ['',Validators.required],
     

    });
  }




  loadCharters() {
    this.documentationService.getAllProjects().subscribe(data => {
      this.charters = data;
    }, error => {
      console.error('Error fetching project charters', error);
    });
  }
  onCharterChange(charterId: string) {
    this.sipocservice.setSelectedCharterId(charterId);
  }
  onCharterChangeDMADV(charterId: string) {
    this.dmadvservice.setSelectedCharterId(charterId);
    this.selectedCharterIdDMADV = charterId;
  }


  loadWhyDocumentation() {
    const section = 'WHY';
    this.documentationService.getDocumentationWithImages(section).subscribe(
      (response: any) => {
        console.log('Fetched Why documentation:', response);
        this.whyDocumentation = response;
        this.whyImages = response.images; // Assign images to the Why section
        console.log('Why Documentation Images:', this.whyImages);
        this.populateFormWhy(this.whyForm, this.whyDocumentation);
      },
      error => {
        console.error('Error fetching Why documentation:', error);
        // Handle error as needed
      }
    );
  }

  populateFormWhy(form: FormGroup, data: any) {
    form.patchValue({
      title1: data.title1,
      contentdocu: data.contentdocu,
      title2: data.title2,
      content1: data.content1,
      title3: data.title3,
      content2: data.content2,
      title4: data.title4,
      content3: data.content3,
      content4: data.content4
    });
  }
  populateFormWhat(form: FormGroup, data: any) {
    form.patchValue({
      title1: data.title1,
      contentdocu: data.contentdocu,
      title2: data.title2,
      content1: data.content1,
      title3: data.title3,
      content2: data.content2,
      title4: data.title4,
      content3: data.content3, 
      content4: data.content4,
      content5: data.content5
    });
  }
  populateFormHow(form: FormGroup, data: any) {
    form.patchValue({
      title1: data.title1,
      contentdocu: data.contentdocu,
      title2: data.title2,
      content1: data.content1,
      title3: data.title3,
      content2: data.content2,
      title4: data.title4,
      content3: data.content3,
      content4: data.content4,
      content5: data.content5,
      content6: data.content6,
      content8: data.content8
    });
  } populateFormWhatif(form: FormGroup, data: any) {
    form.patchValue({
      title1: data.title1,
      contentdocu: data.contentdocu,
      title2: data.title2,
      content1: data.content1,
      title3: data.title3,
      content2: data.content2,
      title4: data.title4,
      content3: data.content3,
      content4: data.content4,
      title5: data.title5,
      content5: data.content5,
      title6: data.title6,
      content6: data.content6,
      title7: data.title7,
      content7: data.content7,
      content8: data.content8

    });
  }

  loadWhatDocumentation() {
    const section = 'WHAT';
    this.documentationService.getDocumentationWithImageswhat(section).subscribe(
      (response: any) => {
        console.log('Fetched What documentation:', response);
        this.whatDocumentation = response;
        this.whatImages = response.images; // Assign images to the What section
        console.log('What Documentation Images:', this.whatImages);
        this.populateFormWhat(this.WhatForm, this.whatDocumentation);

      },
      error => {
        console.error('Error fetching What documentation:', error);
        // Handle error as needed
      }
    );
  }
  loadHowDocumentation() {
    const section = 'HOW';
    this.documentationService.getDocumentationWithImageshow(section).subscribe(
      (response: any) => {
        console.log('Fetched What documentation:', response);
        this.howDocumentation = response;
        this.HowImages = response.images; 

        console.log('How Documentation Images:', this.HowImages);
        this.populateFormHow(this.HowForm, this.howDocumentation);

      },
      error => {
        console.error('Error fetching HOW documentation:', error);
        // Handle error as needed
      }
    );
  }
  loadWhatifDocumentation() {
    const section = 'WHATIF';
    this.documentationService.getDocumentationWithImageswhatif(section).subscribe(
      (response: any) => {
        console.log('Fetched whatif documentation:', response);
        this.whatifDocumentation = response;
        this.whatIfImages = response.images; 
        console.log('whatif Documentation Images:', this.whatIfImages);
        this.populateFormWhatif(this.WhatifForm, this.whatifDocumentation);

      },
      error => {
        console.error('Error fetching whatif documentation:', error);
        // Handle error as needed
      }
    );
  }

  editWhy() {
    this.editingWhy = true;
  }

  
  editWhat() {
    this.editingWhat = true;
  }
   
  editHow() {
    this.editingHow = true;
  }
  editWhatif() {
    this.editingWhatif = true;
  }
  
  
  saveWhyChanges() {
    if (this.whyForm.invalid) {
      return;
    }

    const confirmed = confirm('Are you sure you want to save changes?');
    if (!confirmed) {
      return;
    }

    const updatedDoc: Documentation = {
      ...this.whyDocumentation,
      ...this.whyForm.value,
      imagesdocu: [] // Initialize as an empty array
      
    };

    const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
    Promise.all(imagePromises).then(imageDocums => {
      updatedDoc.imagesdocu = imageDocums;
      this.documentationService.updateDocumentation(updatedDoc.iddocu, updatedDoc).subscribe(
        (response: Documentation) => {
          this.whyDocumentation = response;
          this.editingWhy = false;
          this.loadWhyDocumentation();
        },
        error => {
          console.error('Error saving Why changes:', error);
        }
      );

      imageDocums.forEach(image => {
        this.documentationService.addImageToDocumentation(updatedDoc.iddocu, image).subscribe(
          (addedImage: ImageDocum) => {
            console.log('Image added successfully:', addedImage);
          },
          error => {
            console.error('Error adding image to documentation:', error);
          }
        );
      });
    });
  }

  saveWhatChanges() {
    if (this.WhatForm.invalid) {
      return;
    }
    const confirmed = confirm('Are you sure you want to save changes?');
    if (!confirmed) {
      return;
    }
  
    // Prepare a new Documentation object with updated content and images
    const updatedDoc: Documentation = {
      ...this.whatDocumentation,
      ...this.WhatForm.value,

      imagesdocu: [] // Initialize as an empty array
    };
  
    // Convert each selected file to ImageDocum and add to updatedDoc
    const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
    Promise.all(imagePromises).then(imageDocums => {
      updatedDoc.imagesdocu = imageDocums; // Assign the array of ImageDocum
  
      // Update the main documentation content including text areas
      updatedDoc.title1 = this.whatDocumentation.title1;
      updatedDoc.title2 = this.whatDocumentation.title2;
      updatedDoc.title3 = this.whatDocumentation.title3;
      updatedDoc.title4 = this.whatDocumentation.title4;
      updatedDoc.content1 = this.whatDocumentation.content1;
      updatedDoc.content2 = this.whatDocumentation.content2;
      updatedDoc.content3 = this.whatDocumentation.content3;
      updatedDoc.content4 = this.whatDocumentation.content4;
      updatedDoc.content5 = this.whatDocumentation.content5;
      updatedDoc.content6 = this.whatDocumentation.content6;
      updatedDoc.content8 = this.whatDocumentation.content8;
      updatedDoc.contentdocu = this.whatDocumentation.contentdocu; // Update main content
  
      // Update the documentation in the backend
      this.documentationService.updateDocumentation(updatedDoc.iddocu, updatedDoc).subscribe(
        (response: Documentation) => {
          this.whatDocumentation = response; // Update the local copy with response
          this.editingWhat = false; // Exit edit mode
          this.loadWhatDocumentation();
        },
        error => {
          console.error('Error saving What changes:', error);
          // Handle error as needed
        }
      );
  
      // Add each image to the documentation
      imageDocums.forEach(image => {
        this.documentationService.addImageToDocumentation(updatedDoc.iddocu, image).subscribe(
          (addedImage: ImageDocum) => {
            console.log('Image added successfully:', addedImage);
          },
          error => {
            console.error('Error adding image to documentation:', error);
            // Handle error as needed
          }
        );
      });
    });
  }
  saveHowChanges() {
    if (this.HowForm.invalid) {
      return;
    }
    const confirmed = confirm('Are you sure you want to save changes?');
    if (!confirmed) {
      return;
    }
  
    const updatedDoc: Documentation = {
      ...this.howDocumentation,
      ...this.HowForm.value,

      imagesdocu: [] // Initialize as an empty array
    };
  
    const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
    Promise.all(imagePromises).then(imageDocums => {
      updatedDoc.imagesdocu = imageDocums; 
  
      updatedDoc.title1 = this.howDocumentation.title1;
      updatedDoc.title2 = this.howDocumentation.title2;
      updatedDoc.title3 = this.howDocumentation.title3;
      updatedDoc.title4 = this.howDocumentation.title4;
      updatedDoc.content1 = this.howDocumentation.content1;
      updatedDoc.content2 = this.howDocumentation.content2;
      updatedDoc.content3 = this.howDocumentation.content3;
      updatedDoc.content4 = this.howDocumentation.content4;
      updatedDoc.content5 = this.howDocumentation.content5;
      updatedDoc.contentdocu = this.howDocumentation.contentdocu;
  
      this.documentationService.updateDocumentation(updatedDoc.iddocu, updatedDoc).subscribe(
        (response: Documentation) => {
          this.howDocumentation = response; 
          this.editingHow = false; 
          this.loadHowDocumentation();

        },
        error => {
          console.error('Error saving HOW changes:', error);
        }
      );
  
      imageDocums.forEach(image => {
        this.documentationService.addImageToDocumentation(updatedDoc.iddocu, image).subscribe(
          (addedImage: ImageDocum) => {
            console.log('Image added successfully:', addedImage);
          },
          error => {
            console.error('Error adding image to documentation:', error);
          }
        );
      });
    });
  }
  saveWhatifChanges() {
    if (this.WhatifForm.invalid) {
      return;
    }
    const confirmed = confirm('Are you sure you want to save changes?');
    if (!confirmed) {
      return;
    }
  
    const updatedDoc: Documentation = {
      ...this.whatifDocumentation,
      ...this.WhatifForm.value,

      imagesdocu: [] // Initialize as an empty array
    };
  
    const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
    Promise.all(imagePromises).then(imageDocums => {
      updatedDoc.imagesdocu = imageDocums; 
  
      updatedDoc.title1 = this.whatifDocumentation.title1;
      updatedDoc.title2 = this.whatifDocumentation.title2;
      updatedDoc.title3 = this.whatifDocumentation.title3;
      updatedDoc.title4 = this.whatifDocumentation.title4;
      updatedDoc.title5 = this.whatifDocumentation.title5;
      updatedDoc.title6 = this.whatifDocumentation.title6;
      updatedDoc.title7 = this.whatifDocumentation.title7;
      updatedDoc.content1 = this.whatifDocumentation.content1;
      updatedDoc.content2 = this.whatifDocumentation.content2;
      updatedDoc.content3 = this.whatifDocumentation.content3;
      updatedDoc.content4 = this.whatifDocumentation.content4;
      updatedDoc.content5 = this.whatifDocumentation.content5;
      updatedDoc.content6 = this.whatifDocumentation.content6;
      updatedDoc.content7 = this.whatifDocumentation.content7;
      updatedDoc.content8 = this.whatifDocumentation.content8;

      updatedDoc.contentdocu = this.whatifDocumentation.contentdocu;
  
      this.documentationService.updateDocumentation(updatedDoc.iddocu, updatedDoc).subscribe(
        (response: Documentation) => {
          this.whatifDocumentation = response; 
          this.editingWhatif = false; 
          this.loadWhatifDocumentation();
        },
        error => {
          console.error('Error saving whatif changes:', error);
        }
      );
  
      imageDocums.forEach(image => {
        this.documentationService.addImageToDocumentation(updatedDoc.iddocu, image).subscribe(
          (addedImage: ImageDocum) => {
            console.log('Image added successfully:', addedImage);
          },
          error => {
            console.error('Error adding image to documentation:', error);
          }
        );
      });
    });
  }
  
  convertFileToImageDocum(file: File): Promise<ImageDocum> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        const imageDocum: ImageDocum = {
          id: '', // Optionally generate or assign an ID
          url: base64String
        };
        resolve(imageDocum);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  cancelEditWhy() {
    this.editingWhy = false;
    this.loadWhyDocumentation();
  }
  cancelEditWhat() {
    this.editingWhat = false;
    this.loadWhatDocumentation();
  }
  cancelEditHow() {
    this.editingHow = false;
    this.loadHowDocumentation();
  }
  cancelEditWhatif() {
    this.editingWhatif = false;
    this.loadWhatifDocumentation();
  }

  onImageChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  deleteImage(imageId: string) {
    const docId = this.whyDocumentation.iddocu; // Assuming whyDocumentation contains the documentation ID
    const confirmed = confirm('Are you sure you want to delete this image?');
    
    if (confirmed) {
      this.documentationService.deleteImage(docId, imageId).subscribe(
        () => {
          console.log('Image deleted successfully');
          // Optionally, refresh data or handle UI updates after deletion
        },
        error => {
          console.error('Error deleting image:', error);
          // Handle error as needed
        }
      );
    } else {
      console.log('Deletion canceled by user.');
      // Handle cancellation as needed
    }
  }
  
}
