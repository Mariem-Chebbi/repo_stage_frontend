import { Component, OnInit, ViewChild } from '@angular/core';
import { DemonstrationService } from '../../../../../core/FDDG2_Services/demonstration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Demonstration } from '../../../../../core/FDDG2_Models/demonstration';
import { error } from 'console';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Type: string;
  Adaptation: string;
}
@Component({
  selector: 'ngx-show-demo',
  templateUrl: './show-demo.component.html',
  styleUrls: ['./show-demo.component.scss']
})
export class ShowDemoComponent implements OnInit {
  @ViewChild('item', { static: true }) accordion;
  toggle() {
    this.accordion.toggle();
  }
  ngOnInit(): void {
    this.getDemonstration();
  }

  public Editor = ClassicEditor;
  public editorConfig = {

    toolbar: [
      'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
      'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
      'undo', 'redo', 'imageUpload', '|', 'fontColor', 'backgroundColor'
    ],
    image: {
      toolbar: [
        'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
      ]
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
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red'
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange'
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow'
        },
        {
          color: 'hsl(90, 75%, 60%)',
          label: 'Light green'
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green'
        },
        // More colors.
        // ...
      ]
    },
  };
  
  oldContent: any={};
  demonstration: Demonstration | undefined;
  constructor(private demonstrationService: DemonstrationService, private router: Router, private route: ActivatedRoute, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private windowService: NbWindowService) {

  }
  getDemonstration(): void {
    const demoCode = this.route.snapshot.paramMap.get('id');
    if (demoCode) {
      this.demonstrationService.getOneDemo(demoCode).subscribe(
        (demo) => {
          this.demonstration = demo;
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }

  SaveChanges():void{
    if (this.demonstration) {
    const demoCode = this.route.snapshot.paramMap.get('id');
    if (demoCode) {
      this.demonstrationService.editDemo(demoCode, this.demonstration).subscribe(
        (updatedDemo) => {
          this.demonstration = updatedDemo;
          this.toggleEditMode();
          alert('Changes saved successfully!');
        },
        (error) => {
          console.error(error);
          alert('An error occurred while saving changes.');
        }
      );
    }
  }
   
  }

  currentIndex: number = 1;
  totalSlides: number = 10; // Adjust this number based on the number of pages
  isEditMode =false;
  navigateToPage(index: number): void {
    const currentElement = document.getElementById(`leftandin${this.currentIndex}`);
    const targetElement = document.getElementById(`leftandin${index}`);

    if (currentElement) {
      currentElement.classList.add('delay-06s', 'fadeout', 'displaynone');
    }

    if (targetElement) {
      targetElement.classList.remove('displaynone');
      targetElement.classList.add('animated', 'fadeIn');
    }

    this.currentIndex = index;
  }

  toggleNext(): void {
    const nextIndex = this.getNextIndex();
    this.navigateToPage(nextIndex);
  }

  togglePrevious(): void {
    const prevIndex = this.getPreviousIndex();
    this.navigateToPage(prevIndex);
  }

  getNextIndex(): number {
    return (this.currentIndex % this.totalSlides) + 1;
  }

  getPreviousIndex(): number {
    return (this.currentIndex - 2 + this.totalSlides) % this.totalSlides + 1;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }


  customColumn = 'Type';
  defaultColumns = ['Adaptation'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }


  navigateToAll(): void {
    this.router.navigate(['/pages/agile/demo/alldemos/']);
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

navigateToSignIn(){
  this.router.navigate(['/auth/signin']);
}
  getBlogPhotoUrl(photoName: any): string {
    return this.demonstrationService.getPhoto(photoName);
  }


}
