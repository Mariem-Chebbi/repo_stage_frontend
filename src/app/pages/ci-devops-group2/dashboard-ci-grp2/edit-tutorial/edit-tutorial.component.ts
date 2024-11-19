import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../../../core/models/Cig2_models/tutorial.model';
import { TutorialService } from '../../../../core/services/cig2_services/tutorial.service';


// Pas besoin d'importer Delta

@Component({
  selector: 'ngx-edit-tutorial',
  templateUrl: './edit-tutorial.component.html',
  styleUrls: ['./edit-tutorial.component.scss']
})
export class EditTutorialComponent implements OnInit {
  tutorial: Tutorial | undefined;

  constructor(private route: ActivatedRoute, private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tutorialService.getById(id).subscribe((data: Tutorial) => {
        this.tutorial = data;
      }, error => {
        console.error('Error fetching tutorial:', error);
      });
    } else {
      console.error('ID is undefined. Cannot fetch tutorial.');
    }
  }

  // Méthode pour soumettre le formulaire d'édition
 updateTutorial() {
    if (this.tutorial) {
      this.tutorialService.update(this.tutorial.id, this.tutorial).subscribe(() => {
            // Redirection après 2 secondes
            setTimeout(() => {
              this.router.navigate(['/pages/agile/ci-devops-group2']);
            }, 2000);
      }, error => {
        console.error('Error updating tutorial:', error);
      });
    }
  }

}
