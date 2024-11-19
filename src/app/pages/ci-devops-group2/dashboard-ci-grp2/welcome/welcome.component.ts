import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Tutorial } from '../../../../core/models/Cig2_models/tutorial.model';
import { TutorialService } from '../../../../core/services/cig2_services/tutorial.service';

@Component({
  selector: 'ngx-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  tutorials: Tutorial[] = [];

  constructor(private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    this.tutorialService.getAll().subscribe((data: Tutorial[]) => {
      this.tutorials = data;
      console.log(this.tutorials);
    });
  }

  deleteTutorial(id: string): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce tutoriel ?');
    if (confirmDelete) {
      this.tutorialService.delete(id).subscribe(() => {
        this.tutorials = this.tutorials.filter(tutorial => tutorial.id !== id);
      }, error => {
        console.error('Erreur lors de la suppression du tutoriel :', error);
      });
    }
  }
}
