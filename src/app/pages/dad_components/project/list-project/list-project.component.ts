import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/services/dad_services/project.service';

@Component({
  selector: 'ngx-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  listProject: any[]

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  confirmDelete(project: any) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      this.onDelete(project);
    }
  }

  onDelete(id: string) {
    this.projectService.delete(id).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      }
    )
  }

  getAll() {
    this.projectService.getAll().subscribe(
      (data) => {
        this.listProject = data
      })
  }
}



