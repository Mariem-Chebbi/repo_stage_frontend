import { Component } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { Prototype } from '../../../core/models/LSS_models/Prototype';
import { NgForm } from '@angular/forms';
import { PrototypeImg } from '../../../core/models/LSS_models/PrototypeImg';
import { Feedback } from '../../../core/models/LSS_models/Feedback';

@Component({
  selector: 'ngx-prototyping',
  templateUrl: './prototyping.component.html',
  styleUrls: ['./prototyping.component.scss']
})
export class PrototypingComponent {
prototypes: Prototype[] = []; // Correct initialization
  selectedPrototype: Prototype | null = null;
  newProt: Prototype = {
    id: '',
    description: '',
    name: '',
    idproject: '',
    date_creation: undefined,
    last_modif: undefined,
    images_prot: [],
    feedbacks: []
  };
  noCharterSelectedMessage: string = '  Please select a project charter to view prototypes.';
  noprtotMessage: string = 'No prototypes found for the selected project charter.';
  hasProt: boolean = false;
  newFeedback: string = ''; // To store new feedback content
  selectedCharterId: string | null = null;
  showAddCardForm: boolean = false;
  showEditForm:boolean=false;
  newCard: Prototype = {
    id: '',
    description: '',
    name: '',
    idproject: '',
    date_creation: undefined,
    last_modif: undefined,
    images_prot: [],
    feedbacks: []
  };
  selectedFiles: File[] = []; // Array to store selected files
  editingCard: Prototype | null = null; // Track the card being edited
  showError = false;
  images: PrototypeImg[];
  currentImageIndex = 0;
  newComment: Feedback={
    id: '',
    content: '',
    date_add: undefined,
    las_modified: undefined,
    user: {
      username: '',
      id: ''
    }, // Replace with actual user info if needed
  } // Stores the new comment input
  showArchivedCards:boolean=false;
  archivedPrototypes:Prototype[];
  hasarchive: boolean = false;
  noActionsMessage: string = 'No prototypes archived found.';

  constructor(private service: DmadvserviceService) {}

  ngOnInit(): void {
    this.service.selectedCharterId$.subscribe(charterId => {
      console.log('Received charter ID:', charterId); // Check if charterId is being logged
      this.selectedCharterId = charterId;
      if (charterId) {
        this.loadPrototypes(charterId);
      } else {
        this.prototypes = [];
        this.hasProt = false;
      }
    });
  }

  loadPrototypes(charterId: string): void {
    this.service.getPrototypeByProjectCharterId(charterId).subscribe(
      (response: any[]) => {  // Assuming response is an array of prototypes
        this.prototypes = response;
        this.hasProt = response.length > 0;
      },
      (error) => {
        console.error('Error fetching prototypes:', error);
      }
    );
  }
  loadImgs(idProtot: string): void {
    console.log(idProtot)
    this.service.getImagesByPrototypeId(idProtot).subscribe(
      (response: any[]) => {  // Assuming response is an array of prototypes
        this.images = response;
      }
    );
  }
  loadImgs2(idProtot: string): void {
    this.service.getImagesByPrototypeId(idProtot).subscribe(
      (response: PrototypeImg[]) => {
        this.selectedPrototype.images_prot = response;
        console.log('Loaded images:', this.selectedPrototype.images_prot); // Debugging line
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  
  
  
  onArchiveButtonClick(id: string): void {
    const confirmed = confirm('Are you sure you want to archive this prototype ?');
    if (confirmed) {

    this.service.archivePrototype(id).subscribe(
      (up) => {
        this.loadPrototypes(this.selectedCharterId);
      },
      (error) => {
        console.error('Error archiving prototype:', error);
      }
    );
  }}
  
  UndoButtonClick(id: string): void {

    this.service.undoPrototype(id).subscribe(
      (up) => {
        this.loadPrototypes(this.selectedCharterId);
        this.loadArchivedCards(this.selectedCharterId);
      },
      (error) => {
        console.error('Error undoing prototype:', error);
      }
    );
  }


  toggleAddCardForm() {
    this.showAddCardForm = true;
  }
  AddPrototype(addform: NgForm) {
    if (this.selectedCharterId && this.newCard.name && this.newCard.description) {
      this.newCard.id = null;
      console.log(this.newCard);
  
      // Add prototype first
      this.service.addPrototype(this.newCard, this.selectedCharterId).subscribe(
        (response: any) => {  // Adjust response type if necessary
          console.log('Prototype added successfully:', response);
          if (response && response.id) {
            // Convert files to image objects
            const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
            Promise.all(imagePromises).then(imageDocs => {
              // Now, upload images with the prototype ID
              this.uploadImages(response.id, imageDocs);
            }).catch(error => {
              console.error('Error converting files:', error);
            });
  
            // Reset form and state
            this.newCard = {
              id: '',
              description: '',
              name: '',
              idproject: '',
              date_creation: undefined,
              last_modif: undefined,
              images_prot: [],
              feedbacks: []
            };
            this.showAddCardForm = false;
            this.loadPrototypes(this.selectedCharterId);
            if (addform) {
              addform.resetForm();
            }
          }
        },
        (error) => {
          console.error('Error adding prototype:', error);
        }
      );
    }
  }
  uploadImages(prototypeId: string, images: PrototypeImg[]) {
    images.forEach(image => {
      this.service.addImageToPrototype(prototypeId, image).subscribe(
        (addedImage: PrototypeImg) => {
          console.log('Image added successfully:', addedImage);
        },
        error => {
          console.error('Error adding image to documentation:', error);
        }
      );
    });
  }
  
  
  cancelAdd() {
    this.showAddCardForm = false;
    this.selectedFiles = []; // Clear selected files when cancelling

  }
// This method handles file selection
onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  this.selectedFiles = Array.from(files);
}

convertFileToImageDocum(file: File): Promise<PrototypeImg> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      const imageDocum: PrototypeImg = {
        id: '', // Optionally generate or assign an ID
        imageUrl: base64String
      };
      resolve(imageDocum);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}updatePrototype(form: NgForm) {
  if (form.valid) {
    if (this.editingCard && this.editingCard.id && this.editingCard.name && this.editingCard.description) {
      // First, update the prototype details
      this.service.updatePrototype(this.editingCard.id, this.editingCard).subscribe(
        (response: any) => {  // Adjust response type if necessary
          console.log('Prototype updated successfully:', response);
          if (response && response.id) {
            // Convert files to image objects
            const imagePromises = this.selectedFiles.map(file => this.convertFileToImageDocum(file));
            Promise.all(imagePromises).then(imageDocs => {
              // Now, upload images with the prototype ID
              this.uploadImages(response.id, imageDocs);
            }).catch(error => {
              console.error('Error converting files:', error);
            });

            // Reset form and state
            this.editingCard = null;
            this.showEditForm = false;
            this.loadPrototypes(this.selectedCharterId);
          }
        },
        (error) => {
          console.error('Error updating prototype:', error);
        }
      );
    } else {
      this.showError = true; // Display error message if fields are missing
    }
  } else {
    this.showError = true; // Display error message if form is invalid
  }
}



editCard(prototype: Prototype) {
  this.editingCard = { ...prototype };
  this.showError = false;
  this.showEditForm = true;
  this.loadImgs(prototype.id);
  this.selectedFiles=[];

}

cancelEdit() {
  this.editingCard = null;
  this.showError = false;
  this.showEditForm=false;
  this.selectedFiles=[];

}
deleteImage(idProt:string,imageId: string) {
  const confirmed = confirm('Are you sure you want to delete this image?');
  
  if (confirmed) {
    this.service.deleteImage(idProt, imageId).subscribe(
      () => {
        console.log('Image deleted successfully');
      },
      error => {
        console.error('Error deleting image:', error);
      }
    );
  } else {
    console.log('Deletion canceled by user.');
  }
}  backToList() {
  this.selectedPrototype = null; // Reset the selected prototype
}
onPrototypeSelected(prototypeId: string): void {
  this.selectedPrototype = this.prototypes.find(prototype => prototype.id === prototypeId) || null;
  if (this.selectedPrototype) {
    this.loadImgs2(this.selectedPrototype.id);
  }
}

// Method to navigate to the next image
nextImage() {
  if (this.currentImageIndex < this.selectedPrototype?.images_prot.length - 1) {
    this.currentImageIndex++;
  }
}

// Method to navigate to the previous image
previousImage() {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
  }
}get currentImage(): string {
  // Check if selectedPrototype and images are defined and have elements
  if (this.selectedPrototype && this.selectedPrototype.images_prot && this.selectedPrototype.images_prot.length > 0) {
    return this.selectedPrototype.images_prot[this.currentImageIndex]?.imageUrl || '';
  }
  return ''; // Return an empty string if there are no images
}


selectPrototype(prototype: any) {
  this.selectedPrototype = prototype;
  this.currentImageIndex = 0; // Reset to the first image
this.loadImgs2(prototype.id);
console.log(prototype.id)
this.loadFeedbacks(prototype.id); // Load comments for the selected prototype

}
loadFeedbacks(prototypeId: string): void {
  this.service.getFeedbacksByPrototypeId(prototypeId).subscribe(
    (response: Feedback[]) => {
      if (this.selectedPrototype) {
        this.selectedPrototype.feedbacks = response || [];
      }
    },
    (error) => {
      console.error('Error fetching feedbacks:', error);
    }
  );
}
f(form: NgForm) {
  if (this.selectedPrototype && this.newComment) {
    const feedback: Feedback = {
      id: '',
      content: '',
      date_add: undefined,
      las_modified: undefined,
      user: undefined
    };

    this.service.addFeedbackToPrototype(this.selectedPrototype.id, feedback,"66b14b32be02f76dfc71c1c4").subscribe(
      (response) => {
        console.log('feedback added successfully:', response);
        this.loadFeedbacks(this.selectedPrototype.id);
        form.resetForm();
        this.newComment=null;
      },
      (error) => {
        console.error('Error adding feedback:', error);
      }
    );
  }
}

addFeedback(form: NgForm) {
  if (this.selectedPrototype && this.newComment.content) {
    const feedback: Feedback = {
      id: null,
      content: this.newComment.content,
      date_add: undefined,
      las_modified: undefined,
      user: {
        id: '66b14b32be02f76dfc71c1c4',
        username: ''
      }
    };
    this.service.addFeedbackToPrototype(this.selectedPrototype.id,this.newComment,"66b14b32be02f76dfc71c1c4").subscribe(
      (response: any) => {  // Adjust response type if necessary
        console.log('feedback added successfully:', response);
        this.loadFeedbacks(this.selectedPrototype.id);

        form.resetForm();

      },
      (error) => {
        console.error('Error adding feedback:', error);
      }
    );
  }
}


toggleArchivedCards() {
  this.showArchivedCards = !this.showArchivedCards;
  if (this.showArchivedCards) {
    this.loadArchivedCards(this.selectedCharterId); // Fetch archived cards
  }
}
loadArchivedCards(id: string | null) {
  if (id) {
    this.service.getArchivedPrototypes(id).subscribe(prot => {
      console.log('Fetched prototypes Items:', prot);
      this.archivedPrototypes = prot;
      this.hasarchive = prot.length > 0;
    });
  } else {
    console.log('No ID selected');
    this.archivedPrototypes = [];
    
  }
}
deletePrototype(id: string) {
  const confirmed = confirm('Are you sure you want to delete this prototype definetly?');
  if (confirmed) {
    this.service.deletePrototype(id).subscribe(
      () => {
        this.archivedPrototypes = this.archivedPrototypes.filter(ai => ai.id !== id);

      },
      (error) => {
        console.error('Error deleting', error);
      }
    );
  }
}
}
