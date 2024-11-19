import { AnimationBuilder, animate, style } from '@angular/animations';
import { AfterViewInit, Component, Directive, ElementRef, HostListener, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbIconLibraries } from '@nebular/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialService } from '../../../../core/services/dad_services/tutorial.service';



@Component({
  selector: 'ngx-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})

export class GuideComponent implements AfterViewInit {
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
  fourthForm: UntypedFormGroup;
  events1: any[];
  events2: any[];
  overlayVisible: boolean = false;
  @ViewChild('animatedElement') animatedElement: ElementRef;
  listTutorial: any[] = [];
  @ViewChildren('tutoList') tutoLists!: QueryList<ElementRef>;
  selectedTutorial: any = {};
  dialogRef: NbDialogRef<any>;

  @ViewChild('editDialog') editDialog: TemplateRef<any>;
  safeContent: SafeHtml;
  text1: string = 'aaaaaaaaaaaaa';

  constructor(
    private fb: UntypedFormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private tutorialService: TutorialService,
    private iconLibraries: NbIconLibraries,
    private dialogService: NbDialogService,
    private sanitizer: DomSanitizer
  ) {
    this.iconLibraries.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.iconLibraries.registerFontPack('nebular', { iconClassPrefix: 'nb' });
  }

  ngOnInit() {
    this.getTutorials();
  }


  private resizeImages() {
    this.tutoLists.forEach(tutoList => {
      const images = tutoList.nativeElement.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        this.renderer.setStyle(img, 'max-width', '100%');
        this.renderer.setStyle(img, 'height', 'auto');
      });
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }


  toggle() {
    this.overlayVisible = !this.overlayVisible;
  }

  ngAfterViewInit() {
    this.tutoLists.changes.subscribe(() => {
      this.resizeImages();
    });
    this.resizeImages();


    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'show');
        } else {
          this.renderer.removeClass(entry.target, 'show');
        }
      });
    });

    observer.observe(this.animatedElement.nativeElement);
  }

  onTryMethod() {
    this.router.navigate(['/pages/agile/dad/project/list']);

  }

  goToAddTutorial() {
    this.router.navigate(['/pages/agile/dad/add-tutorial']);
  }

  getTutorials() {
    this.tutorialService.gettutorial().subscribe(
      (data) => {
        this.listTutorial = data.filter(obj => obj.isArchived === false);
      }
    )
  }

  confirmDelete(tutorial: any) {
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      this.onDelete(tutorial);
    }
  }


  onDelete(id: string) {
    this.tutorialService.archive(id).subscribe(
      (res) => {
        console.log(res)
        window.location.reload();
      }
    )
  }

  confirmEdit() {
    if (window.confirm('Are you sure you want to edit this tutorial?')) {
      this.saveTutorial();
    }
  }


  openEditDialog(tutorial: any) {
    this.selectedTutorial = { ...tutorial };
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.selectedTutorial.content);
    this.dialogRef = this.dialogService.open(this.editDialog);
  }

  saveTutorial() {
    console.log(this.selectedTutorial)
    this.tutorialService.edit(this.selectedTutorial).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      }
    )
  }

  dismissEditDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }




}
