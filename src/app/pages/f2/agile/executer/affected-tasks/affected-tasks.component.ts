import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/FDDG2_Services/auth.service';
import { TasksService } from '../../../../../core/FDDG2_Services/tasks.service';
import { Tasks } from '../../../../../core/FDDG2_Models/tasks';
import { User } from '../../../../../core/FDDG2_Models/user';
import { error } from 'console';

@Component({
  selector: 'ngx-affected-tasks',
  templateUrl: './affected-tasks.component.html',
  styleUrls: ['./affected-tasks.component.scss']
})
export class AffectedTasksComponent implements OnInit {
  tasks: Tasks[] = [];
  source: LocalDataSource = new LocalDataSource();
  users: User;

  settings = {
    actions: {
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    columns: {
      taskId: {
        title: 'ID',
        type: 'number',
        editable: false, // Disable editing for this field
      },
      taskName: {
        title: 'Task Name',
        type: 'string',
        editable: false, // Enable editing for this field
      },
      description: {
        title: 'Description',
        type: 'string',
        editable: true, // Enable editing for this field
      },
      createdAt: {
        title: 'Creation Date',
        type: 'date',
        editable: false, // Disable editing for this field
      },
      deadline: {
        title: 'Deadline',
        type: 'date',
        editable: false, // Disable editing for this field
      },
      status: {
        title: 'Status',
        type: 'string',
        editable: true, // Enable editing for this field
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'ToDo', title: 'To do' },
              { value: 'InProgress', title: 'In Progress' },
              { value: 'Pending', title: 'Pending' },
            ],
          },
        },
      },
    },
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log(user.id);
    if (user) {
      this.tasksService.getTasksForExecutor(user.id).subscribe(
        (tasks) => {

          this.tasks = tasks.map(task => ({
            taskId: task.taskId,
            taskName: task.taskName,
            description: task.description,
            createdAt: task.createdAt,
            deadline: task.deadline,
            status: task.status,
            user: task.user,
            assignemntUrl:task.assignemntUrl,
            assignemnt:task.assignemnt
          }));
          console.log(this.tasks)
          this.source.load(this.tasks);
        });
      (error) => { console.log(error) };
    }

  }



  onRowSelect(event): void {
    
    const id = event.data.taskId; // Get the ID of the selected row
    if(event.data.status!="Completed"&&event.data.status!="NotCompleted"){
      console.log(event.data.status)
      this.router.navigate(['/pages/agile/executer/assignment/', id]);
    }
     // Navigate to the detail page
  }

  onEditConfirm(event): void {
    const user = this.authService.getCurrentUser();
    const updatedTask: Tasks = event.newData;
    const oldTask = this.tasks.find(t => t.taskId === updatedTask.taskId);
    console.log("old task:" + oldTask.user)
    if (oldTask) {
      // Preserve the old user value if not provided in the update
      if (!updatedTask.user) {
        updatedTask.user = user;
      }
    }
    this.tasksService.editTask(updatedTask.taskId, updatedTask).subscribe(
      (task) => {
        event.confirm.resolve(task);
        console.log('Task updated:', task);
      },
      (error) => {
        console.error('Error updating task:', error);
        event.confirm.reject();
      }
    );
  }
}
