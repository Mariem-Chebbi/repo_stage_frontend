import {Component,  OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {DemoUpdateComponent} from './demo-update/demo-update.component';
import {LimitsUpdateComponent} from './limits-update/limits-update.component';
import {BenifitsUpdateComponent} from './benifits-update/benifits-update.component';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {StepsUpdateComponent} from './steps/steps-update/steps-update.component';
import {StepCreateComponent} from './steps/step-create/step-create.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {NewsUpdateComponent} from './news-update/news-update.component';
import {LimitssAddComponent} from './limitss-add/limitss-add.component';
import {BenefitsAddComponent} from './benefits-add/benefits-add.component';
import {IntroUpdateComponent} from './intro-update/intro-update.component';
import {DiagramAddComponent} from './diagram-add/diagram-add.component';
import {DiagramUpdateComponent} from './diagram-update/diagram-update.component';
import {DemoModel} from '../../../core/models/poker_planning_grp2_models/DemoModel';
import {BenefitsModel} from '../../../core/models/poker_planning_grp2_models/BenefitsModel';
import {LimitsModel} from '../../../core/models/poker_planning_grp2_models/LimitsModel';
import {NewsModel} from '../../../core/models/poker_planning_grp2_models/NewsModel';
import {StepsModel} from '../../../core/models/poker_planning_grp2_models/stepsModel';
import {DiagramModel} from '../../../core/models/poker_planning_grp2_models/DiagramModel';
import {ApiService} from '../../../core/services/poker_planning_grp2_services/api-service.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './scrum-poker-g2-demo.component.html',
  styleUrls: ['./scrum-poker-g2-demo.component.scss'],
})
export class ScrumPokerG2DemoComponent implements OnInit {
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  news: NewsModel[] = [];
  steps: StepsModel[] = [];
  step: StepsModel;
  diagrams: DiagramModel[] = [];
  diagram: DiagramModel;
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;

  constructor(
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos;
    });

    this.apiService.getBenefits().subscribe((benefits: BenefitsModel[]) => {
      this.benefits = benefits;
    });

    this.apiService.getLimits().subscribe((limits: LimitsModel[]) => {
      this.limits = limits;
    });

    this.apiService.getNews().subscribe((news: NewsModel[]) => {
      this.news = news;
    });
    this.apiService.getSteps().subscribe((steps: StepsModel[]) => {
      this.steps = steps;
    });
    this.apiService.getDiagrams().subscribe((diagrams: DiagramModel[]) => {
      this.diagrams = diagrams;
    });
  }

  openBenefitsUpdate(benefit: BenefitsModel) {
    this.dialogService.open(BenifitsUpdateComponent, {
      context: {
        title: 'Update Benefit',
        benefit: {...benefit},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openBenefitsAdd() {
    this.dialogService.open(BenefitsAddComponent, {
      context: {
        title: 'Add Benefit',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openLimitsAdd() {
    this.dialogService.open(LimitssAddComponent, {
      context: {
        title: 'Add Limit',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openLimitsUpdate(limit: LimitsModel) {
    this.dialogService.open(LimitsUpdateComponent, {
      context: {
        title: 'Update Limits',
        limit: {...limit},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  open() {
    this.dialogService.open(DemoUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openIntroUpdate() {
    this.dialogService.open(IntroUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openStep(step: StepsModel) {
    this.dialogService.open(StepsUpdateComponent, {
      context: {
        title: 'Update Step',
        step: {...step},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  createStep(step: StepsModel) {
    this.dialogService.open(StepCreateComponent, {
      context: {
        title: 'Create Step',
        step: {...step},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  deleteDemo(id: string) {
    if (confirm('Are you sure you want to delete this demo?')) {
      this.apiService.deleteDemo(id).subscribe(
        () => {
          this.demos = this.demos.filter((d) => d.id !== id);
        },
        (error) => {
          console.error('Error deleting the demo:', error);
        },
      );
    }
  }

  deleteBenefit(id: string) {
    if (confirm('Are you sure you want to delete this benefit?')) {
      this.apiService.deleteBenefit(id).subscribe(
        () => {
          this.benefits = this.benefits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the benefit:', error);
        },
      );
    }
  }

  deleteLimit(id: string) {
    if (confirm('Are you sure you want to delete this limit?')) {
      this.apiService.deleteLimit(id).subscribe(
        () => {
          this.limits = this.limits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the limit:', error);
        },
      );
    }
  }

  deleteStep(id: string) {
    if (confirm('Are you sure you want to delete this step?')) {
      this.apiService.deleteStep(id).subscribe(
        () => {
          this.steps = this.steps.filter((s) => s.id !== id);
        },
        (error) => {
          console.error('Error deleting the step:', error);
        },
      );
    }
  }

  openNewsAdd() {
    this.dialogService.open(DemoFormComponent, {
      context: {
        title: 'Add Information',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openNewsUpdate(news: NewsModel) {
    this.dialogService.open(NewsUpdateComponent, {
      context: {
        title: 'Update Information',
        news: {...news},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  deleteNew(id: string) {
    if (confirm('Are you sure you want to delete this information?')) {
      this.apiService.deleteNew(id).subscribe(
        () => {
          this.news = this.news.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the information:', error);
        },
      );
    }
  }


  // diagraaam
  openDiagramAdd() {
    this.dialogService.open(DiagramAddComponent, {
      context: {
        title: 'Add Information',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openDiagram(diagram: DiagramModel) {
    this.dialogService.open(DiagramUpdateComponent, {
      context: {
        title: 'Update content',
        diagram: {...diagram},
      },
    }).onClose.subscribe(() => this.loadData());
  }

  deleteDiagram(id: string) {
    if (confirm('Are you sure you want to delete this diagram?')) {
      this.apiService.deleteDiagram(id).subscribe(
        () => {
          this.diagrams = this.diagrams.filter((s) => s.id !== id);
        },
        (error) => {
          console.error('Error deleting the step:', error);
        },
      );
    }
  }
}
