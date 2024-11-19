import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IntroductionComponent } from './introduction/introduction.component';
import { ExhaustiveTutorialComponent } from './exhaustive-tutorial/exhaustive-tutorial.component';
import { HowToImplementComponent } from './how-to-implement/how-to-implement.component';
import { SummaryComponent } from './summary/summary.component';

import { Router } from '@angular/router';
import { Introduction } from '../../../core/models/Introduction';
import { ExhaustiveTutorial } from '../../../core/models/ExhaustiveTutorial';
import { HowToImplement } from '../../../core/models/HowToImplement';
import { Summary } from '../../../core/models/Summary';
import { IntroductionService } from '../../../core/models/service/introduction.service';
import { ExhaustiveTutorialService } from '../../../core/models/service/exhaustive-tutorial.service';
import { HowToImplementService } from '../../../core/models/service/how-to-implement.service';
import { SummaryService } from '../../../core/models/service/summary.service';


@Component({
  selector: 'app-asd',
  templateUrl: './asd.component.html',
  styleUrls: ['./asd.component.css']
})
export class AsdComponent implements OnInit {
  introduction: Introduction;
  exhaustiveTutorial: ExhaustiveTutorial;
  howToImplement: HowToImplement;
  summary: Summary;

  constructor(
    private introductionService: IntroductionService,
    private exhaustiveTutorialService: ExhaustiveTutorialService,
    private howToImplementService: HowToImplementService,
    private summaryService: SummaryService,

    public dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit() {
    this.loadIntroduction();
    this.loadExhaustiveTutorial();
    this.loadHowToImplement();
    this.loadSummary();
  }

  loadIntroduction() {
    this.introductionService.getIntroductions().subscribe(data => {
      this.introduction = data[0]; // assuming there's only one introduction
      // Ensure arrays are initialized correctly
      if (!this.introduction.collaboration) {
        this.introduction.collaboration = [];
      }
      if (!this.introduction.speculations) {
        this.introduction.speculations = [];
      }
      if (!this.introduction.learning) {
        this.introduction.learning = [];
      }
    });
  }

  loadExhaustiveTutorial() {
    this.exhaustiveTutorialService.getExhaustiveTutorials().subscribe(data => {
      this.exhaustiveTutorial = data[0]; // assuming there's only one exhaustive tutorial
    });
  }

  loadHowToImplement() {
    this.howToImplementService.getHowToImplements().subscribe(data => {
      this.howToImplement = data[0]; // assuming there's only one how to implement step
    });
  }

  loadSummary() {
    this.summaryService.getSummaries().subscribe(data => {
      this.summary = data[0]; // assuming there's only one summary
    });

  }

  addIntroduction() {
    const dialogRef = this.dialog.open(IntroductionComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIntroduction();
      }
    });
  }

  editIntroduction(introduction: Introduction) {
    const dialogRef = this.dialog.open(IntroductionComponent, {
      data: introduction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIntroduction();
      }
    });
  }

  deleteIntroduction(id: string) {
    this.introductionService.deleteIntroduction(id).subscribe(() => {
      this.loadIntroduction();
    });
  }

  addExhaustiveTutorial() {
    const dialogRef = this.dialog.open(ExhaustiveTutorialComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadExhaustiveTutorial();
      }
    });
  }

  editExhaustiveTutorial(exhaustiveTutorial: ExhaustiveTutorial) {
    const dialogRef = this.dialog.open(ExhaustiveTutorialComponent, {
      data: exhaustiveTutorial
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadExhaustiveTutorial();
      }
    });
  }

  deleteExhaustiveTutorial(id: string) {
    this.exhaustiveTutorialService.deleteExhaustiveTutorial(id).subscribe(() => {
      this.loadExhaustiveTutorial();
    });
  }

  addHowToImplement() {
    const dialogRef = this.dialog.open(HowToImplementComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHowToImplement();
      }
    });
  }

  editHowToImplement(howToImplement: HowToImplement) {
    const dialogRef = this.dialog.open(HowToImplementComponent, {
      data: howToImplement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHowToImplement();
      }
    });
  }

  deleteHowToImplement(id: string) {
    this.howToImplementService.deleteHowToImplement(id).subscribe(() => {
      this.loadHowToImplement();
    });
  }

  addSummary() {
    const dialogRef = this.dialog.open(SummaryComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSummary();
      }
    });
  }

  editSummary(summary: Summary) {
    const dialogRef = this.dialog.open(SummaryComponent, {
      data: summary
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSummary();
      }
    });
  }

  deleteSummary(id: string) {
    this.summaryService.deleteSummary(id).subscribe(() => {
      this.loadSummary();
    });
  }

  useMethod() {
    this.router.navigate(['/pages/agile/dashASD']);
  }
  
}

