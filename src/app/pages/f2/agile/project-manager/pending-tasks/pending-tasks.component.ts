import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../../../core/FDDG2_Services/tasks.service';
import { Tasks } from '../../../../../core/FDDG2_Models/tasks';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {
  ngOnInit(): void {
    this.tasksService.getPendingTasks().subscribe(

      (tasks) => {
        console.log(tasks);
        this.tasks = tasks.map(task => ({
          taskId: task.taskId,
          taskName: task.taskName,
          description: task.description,
          createdAt: task.createdAt,
          deadline: task.deadline,
          status: task.status,
          user: task.user,
          assignemntUrl: task.assignemntUrl,
          assignemnt: task.assignemnt
        }));
        console.log(this.tasks)
        this.source.load(this.tasks);
      });
    (error) => { console.log(error) };
  }
  constructor(private tasksService: TasksService, private router: Router) { }
  tasks: Tasks[] = [];
  fetchTasks(): void {
    this.tasksService.getPendingTasks()
      .subscribe({
        next: (task) => {
          this.tasks = task
        },
        error: (error) => {
          console.error(error)
        }
      })
  }

  source: LocalDataSource = new LocalDataSource();


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



  onRowSelect(event): void {
    const id = event.data.taskId; // Get the ID of the selected row
    this.router.navigate(['/pages/agile/PM/assignments/', id]); // Navigate to the detail page
  }

  onEditConfirm(event): void {

    const updatedTask: Tasks = event.newData;
    const oldTask = this.tasks.find(t => t.taskId === updatedTask.taskId);
    console.log("old task:" + oldTask.user)

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
