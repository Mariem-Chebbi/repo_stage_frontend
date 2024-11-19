import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";

import Swal from "sweetalert2";
import { TaskServices } from "../../../core/services/safe/taskService/task.service";
import { UserstoryService } from "../../../core/services/safe/userstory.service";
import { Subscription, interval } from 'rxjs';

import { Task, TaskStatus } from '../../../core/models/safe/task.model';
import { UserStory } from "../../../core/models/safe/userstory.model";
import { SprintService } from "../../../core/services/safe/sprint.service";
import { Sprint } from "../../../core/models/safe/sprint.model";
import { Pi } from "../../../core/models/safe/pi.model";
import { PiService } from "../../../core/services/safe/pi.service";
import { Art } from "../../../core/models/safe/art.model";
import { ArtService } from "../../../core/services/safe/art.service";
import { Feature } from '../../../core/models/safe/feature.model';
import { FeatureService } from '../../../core/services/safe/feature.service';
import { TaskService } from '../../../core/models/service/task.service';
import { BacklogService } from '../../../@core/Services/Backlog/backlog.service';

@Component({
  selector: "ngx-safe-process",
  templateUrl: "./safe-process.component.html",
  styleUrls: ["./safe-process.component.scss"],
})
export class SafeProcessComponent implements OnInit {
  selectedSubmenu: string = 'submenu1'; // Initialize with the default selected submenu
  tasks: Task[] = [];
  showForm: boolean = false;
  programIncrements: Pi[] = []; // Array to hold all Program Increments
  countdownIntervals: { [key: string]: any } = {}; // Object to keep track of intervals
  arts: Art[] = [];
  private updateSubscription: Subscription;
 
  features: Feature[] = [];
  selectedFeature?: Feature;
  isFeatureDetailsVisible = false; // Renamed from showFeatureDetails
// Define a set to keep track of selected sprint IDs
selectedSprintIds: Set<string> = new Set<string>();

  selectedTab: number = 1; // Default tab
  selectedSubmenuTab: number = 1; // Default submenu
  isEditing: boolean = false;
  startDate: string = "";
  endDate: string = "";
  newTaskTitle = "";
  newTaskDescription = "";
  newTaskStatus = "TO_IMPROVE";
  newTaskAssignee = "Utilisateur 2";
  backlogTasks: any[] = [];
  sprint1Tasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  inTestTasks: any[] = [];
  toRedoTasks: any[] = [];
  toImproveTasks: any[] = [];
  selectedTasks: Set<string> = new Set<string>();
  selectedUserStoryTasks: Set<string> = new Set<string>();
  selectedTaskId: string | null = null;
  menuVisibility: { [key: string]: boolean } = {}; // Object to track visibility of menus
  editingTask: any = null; // Track the task being edited
  userStories: UserStory[] = [];
  selectedPi?: Pi; // Store the selected Pi for modal
  showCreatePiModal = false;
  newPi: Pi = {
    name: '',
    objectives: '',
    startDate: new Date(),
    endDate: new Date(),
    sprints: [] // Ensure this is correctly populated if needed
  };
  
  sprintIds: string = ''; // For handling the input string
  sprints: Sprint[] = [];
  showFormSprint = false;
  sprint: Sprint = {}; // Initialize with an empty object or with default values
  showDetailsPi = false;
  userStory = {
    title: '',
    description: '',
    status: TaskStatus.IN_PROGRESS, // Default value if needed
    priority: '',
  };
  selectedUserStory: UserStory | undefined;
  selectedSprint: Sprint | undefined;
  selectedUserStories: Set<UserStory> = new Set(); // Use a Set for unique user stories

  statuses = Object.values(TaskStatus);
  isModalOpen = false;
  isEditModalOpen = false;
  connectedDropLists = [
    "backlogTasks",
    "sprint1Tasks",
    "inProgressTasks",
    "doneTasks",
    "inTestTasks",
    "toRedoTasks",
    "toImproveTasks",
  ];

  constructor(
    private http: HttpClient,
    private _backlog_service: BacklogService,
    private _task_service: TaskService, // Inject TaskService
    private taskservice: TaskServices ,// Inject TaskService
    private userstoryService :UserstoryService,
    private sprintService :SprintService,
    private piService: PiService,
    private artService: ArtService,
    private cdr: ChangeDetectorRef,
    private featureService: FeatureService


  ) {
    this.artService.getAllArts().subscribe(data => this.arts = data);

  }

  ngOnInit() {
    this.loadTasks();
    this.getalltasks(); // Ensure this is called
    this.loadUserStories();
    this.loadSprints();
    this.loadAllProgramIncrements(); // Replace 'some-id' with the actual ID
    this.loadAllArts();
    this.loadFeatures();



  }
  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  
  openCreatePiModal(): void {
    this.showCreatePiModal = true;
  }

  closeCreatePiModal(): void {
    this.showCreatePiModal = false;
    this.resetNewPi();
  }
  createProgramIncrement(): void {
    // Fetch full Sprint objects based on selected IDs
    const selectedSprints = this.sprints.filter(sprint => this.selectedSprintIds.has(sprint.id));
  
    // Assign the fetched Sprint objects to the new PI
    this.newPi.sprints = selectedSprints;
  
    // Log to verify `newPi` content
    console.log('Creating Program Increment:', this.newPi);
  
    // Make API call to create a new Program Increment
    this.piService.createProgramIncrement(this.newPi).subscribe(
      (response: Pi) => {
        console.log('Program Increment created successfully', response);
  
        // Add new Program Increment to the list
        this.programIncrements.push(response);
  
        // Close the modal
        this.closeCreatePiModal();
      },
      error => {
        console.error('Error creating Program Increment', error);
      }
    );
  }
  
  
  onSprintChangePi(sprint: Sprint): void {
    const sprintId = sprint.id;
    if (this.selectedSprintIds.has(sprintId)) {
      // Remove from selection if already selected
      this.selectedSprintIds.delete(sprintId);
    } else {
      // Add to selection
      this.selectedSprintIds.add(sprintId);
    }
  }
  

  private resetNewPi(): void {
    this.newPi = {
      id: '',
      name: '',
      objectives: '',
      startDate: new Date(),
      endDate: new Date(),
      sprints: []
    };
    this.selectedSprintIds.clear(); // Clear selected sprint IDs
  }



  editPi(pi: Pi): void {
    // Existing implementation
  }

  archivePi(pi: Pi): void {
    // Existing implementation
  }













  loadFeatures(): void {
    this.featureService.getAllFeatures().subscribe(
      (data: Feature[]) => {
        this.features = data;
      },
      error => {
        console.error('Error fetching features', error);
      }
    );
  }

  showFeatureDetails(featureId: string): void {
    this.featureService.getFeatureById(featureId).subscribe(
      (data: Feature) => {
        this.selectedFeature = data;
        this.isFeatureDetailsVisible = true;
      },
      error => {
        console.error('Error fetching feature details', error);
      }
    );
  }

  closeFeatureDetails(): void {
    this.isFeatureDetailsVisible = false;
    this.selectedFeature = undefined;
  }



  loadAllProgramIncrements(): void {
    this.piService.getAllProgramIncrements().subscribe(
      (data: Pi[]) => {
        this.programIncrements = data;
        this.updateCountdown(); // Initial update
      },
      (error) => console.error('Error fetching Program Increments', error)
    );
  }
  startCountdown(): void {
    // Update countdown every second
    this.updateSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  updateCountdown(): void {
    const now = new Date();
    this.programIncrements.forEach(pi => {
      const endDate = new Date(pi.endDate);
      const timeRemaining = this.calculateTimeRemaining(now, endDate);

      if (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        pi['timeRemaining'] = { expired: true };
      } else {
        pi['timeRemaining'] = timeRemaining;
      }
    });
  }

  calculateTimeRemaining(startDate: Date, endDate: Date): any {
    const totalSeconds = Math.max((endDate.getTime() - startDate.getTime()) / 1000, 0);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { days, hours, minutes, seconds };
  }

  
  loadAllArts(): void {
    this.artService.getAllArts().subscribe(
      (data: Art[]) => {
        this.arts = data;
      },
      (error) => console.error('Error fetching ARTs', error)
    );
  }



 
  getArtsInvolved(piId: string): Art[] {
    return this.arts.filter(art => 
      art.programIncrements && // Ensure programIncrements is not null or undefined
      art.programIncrements.some(pi => pi.id === piId)
    );
  }
  

  // Method to update the countdown timer for a specific Program Increment
  updateProgramIncrement(piId: string, timeRemaining: { days: number, hours: number, minutes: number, seconds: number }): void {
    const pi = this.programIncrements.find(p => p.id === piId);
    if (pi) {
      pi['timeRemaining'] = timeRemaining;
    }
  }

   // Handle sprint deletion
   deleteSprint(sprintId: string) {
    if (confirm('Are you sure you want to delete this sprint?')) {
      this.sprintService.deleteSprint(sprintId).subscribe(response => {
        // Remove the deleted sprint from the local list
        this.sprints = this.sprints.filter(sprint => sprint.id !== sprintId);
        console.log('Sprint deleted successfully', response);
      }, error => {
        console.error('Error deleting sprint', error);
      });
    }
  }
  openDetailsPi() {
    this.showDetailsPi = true;
  }
  showPiDetails(id: string): void {
    this.piService.getProgramIncrementById(id).subscribe(
      (pi: Pi) => {
        this.selectedPi = pi;
        this.showDetailsPi = true;
      },
      (error) => console.error('Error fetching Pi details', error)
    );
  }

  closeDetailsPi(): void {
    this.showDetailsPi = false;
    this.selectedPi = undefined;
  }
  openFormSprint() {
    this.showFormSprint = true;
  }

  // Close the modal
  closeFormSprint() {
    this.showFormSprint = false;
  }

  createSprint() {
    this.sprintService.createSprint(this.sprint).subscribe(response => {
      console.log('Sprint added successfully', response);
      this.sprints.push(response); // Add new sprint to the list
      this.closeFormSprint(); // Close the modal after successful submission
    }, error => {
      console.error('Error adding sprint', error);
    });
  }
    // Check if a user story is selected
    isUsSelected(userStory: UserStory): boolean {
      return this.sprint.userStory.some(us => us.id === userStory.id);
    }
  
    // Handle checkbox change
    onUsChange(userStory: UserStory) {
      if (this.isUsSelected(userStory)) {
        // Remove the user story if it was previously selected
        this.sprint.userStory = this.sprint.userStory.filter(us => us.id !== userStory.id);
      } else {
        // Add the user story if it was not previously selected
        this.sprint.userStory.push(userStory);
      }
    }
    updateSprint(): void {
      if (this.selectedSprint.id) {
        this.selectedSprint.userStory = Array.from(this.selectedUserStories); // Convert Set to Array
        this.sprintService.updateSprint(this.selectedSprint.id, this.selectedSprint).subscribe(
          (updatedSprint: Sprint) => {
            // Update the local list of sprints
            const index = this.sprints.findIndex(sprint => sprint.id === updatedSprint.id);
            if (index !== -1) {
              this.sprints[index] = updatedSprint;
            }
  
            console.log('Sprint updated successfully:', updatedSprint);
            this.closeEditModal();
          },
          (error) => {
            console.error('Error updating sprint:', error);
          }
        );
      } else {
        console.error('Selected sprint does not have an id.');
      }
    }
  
    isSprintSelected(userStory: UserStory): boolean {
      return this.selectedUserStories.has(userStory);
  

    }
  
    onSprintChange(userStory: UserStory): void {
      if (this.selectedUserStories.has(userStory)) {
        this.selectedUserStories.delete(userStory);
      } else {
        this.selectedUserStories.add(userStory);
      }
    }



  onSubmit() {
    console.log('User Story Submitted:', this.userStory);
    // Here you would typically handle form submission, e.g., send data to a server
    this.showForm = false; // Close the modal after submission
  }


  loadSprints(): void {
    this.sprintService.getAllSprints().subscribe(
      (data: Sprint[]) => this.sprints = data,
      (error) => console.error('Error fetching sprints', error)
    );}




  showDetails(userStory: UserStory) {
    this.selectedUserStory = userStory;
    this.isModalOpen = true;
  }

 sprintDetails (sprint: Sprint) {
    this.selectedSprint = sprint;
    this.isModalOpen = true;
  }


    // Call this method whenever a new user story is selected or updated
   
  
    

  closeModal() {
    this.isModalOpen = false;
  }
  createUserStory() {
    // Create a new UserStory object
    const newUserStory: UserStory = {
      ...this.userStory,
      status: this.userStory.status as TaskStatus,
  
    };

    this.userstoryService.createUserStory(newUserStory).subscribe(
      (response) => {
        console.log('User story created successfully:', response);
        this.resetForm();
        this.showForm = false;
      },
      (error) => {
        console.error('Error creating user story:', error);
      }
    );
  }



  // Method to handle the delete action
  deleteUserStory(id: string) {
    if (confirm('Are you sure you want to delete this user story?')) {
      this.userstoryService.deleteUserStory(id).subscribe(
        () => {
          // Remove the deleted user story from the array
          this.userStories = this.userStories.filter(story => story.id !== id);
          console.log('User story deleted successfully');
        },
        (error) => console.error('Error deleting user story:', error)
      );
    }
  }
  editUserStory(id: string) {
    this.userstoryService.getUserStoryById(id).subscribe(
      (story) => {
        this.selectedUserStory = story;
        this.isEditModalOpen = true;
      },
      (error) => console.error('Error fetching user story:', error)
    );
  }

  editSprint(id: string) {
    this.sprintService.getSprintById(id).subscribe(
      (Sprint) => {
        this.selectedSprint = Sprint;
        this.isEditModalOpen = true;
      },
      (error) => console.error('Error fetching user story:', error)
    );
  }


/*   editSprint(sprintId: number, event: MouseEvent) {
    event.stopPropagation();
    this.isEditing = !this.isEditing;
  } */





  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedUserStory = null; // Clear selected user story
  }

  updateUserStory() {
    if (this.selectedUserStory) {
      this.userstoryService.updateUserStory(this.selectedUserStory.id, this.selectedUserStory).subscribe(
        (updatedStory) => {
          const index = this.userStories.findIndex(story => story.id === updatedStory.id);
          if (index !== -1) {
            this.userStories[index] = updatedStory;
          }
          this.closeEditModal();
          console.log('User story updated successfully');
        },
        (error) => console.error('Error updating user story:', error)
      );
    }
  }


   // Method to handle form submission for editing
   openEditModal(userStory: UserStory) {
    this.selectedUserStory = { ...userStory }; // Clone the user story to avoid direct modification
    
    this.isEditModalOpen = true;
  }



  resetFormus() {
    this.userStory = {
      title: '',
      description: '',
      status: TaskStatus.IN_PROGRESS,
      priority: '',
    };
  }
  getCardClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TO_DO:
        return 'to-do-card';
      case TaskStatus.IN_PROGRESS:
        return 'in-progress-card';
      case TaskStatus.DONE:
        return 'done-card';
      case TaskStatus.IN_TEST:
        return 'in-test-card';
      case TaskStatus.TO_IMPROVE:
        return 'to-improve-card';
      case TaskStatus.TO_REDO:
        return 'to-redo-card';
      default:
        return '';
    }
  }

  toggleMenu(taskId: string) {
    this.menuVisibility[taskId] = !this.menuVisibility[taskId];
  }
  toggleTask(task: Task): void {
    if (this.isTaskSelected(task)) {
      this.selectedTasks.delete(task._id);
    } else {
      this.selectedTasks.add(task._id);
    }
  }
  selectSubmenuTab(submenuTabIndex: number) {
    this.selectedSubmenuTab = submenuTabIndex;
  }
  selectSubmenu(submenu: string) {
    this.selectedSubmenu = submenu;
  }

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
    // Reset the submenu tab if the main tab changes
    if (tabIndex !== 2) {
      this.selectedSubmenuTab = 1;
    }
  }

/*   // Handle task selection change
  onTaskChange(task: Task): void {
    if (this.isTaskSelected(task)) {
      this.selectedTaskId = null; // Deselect if already selected
    } else {
      this.selectedTaskId = task._id; // Select the new task
    }
  } */
  onUserStorySelectionChanged(): void {
    this.updateSelectedTask();
  }

updateSelectedTask(): void {
 /*  if (this.selectedUserStory) {
    // Assert that tasks is of type Task[]
    const tasks = this.selectedUserStory.tasks as Task[];
    this.selectedTaskId = tasks.length > 0 ? tasks[0]._id : null;
  } */
}

/* isTaskSelected(task: Task): boolean {
  return this.selectedUserStory?.tasks?.some(userStoryTask => 
    userStoryTask.title === task.title && userStoryTask.description === task.description
  ) ?? false;
} */
  // Check if a task is selected in the current user story
  isTaskSelected(task: Task): boolean {
    console.log('Checking if task is selected:', task);
    return this.selectedUserStory?.tasks?.some(userStoryTask => userStoryTask._id === task._id) ?? false;
  }

  // Handle task selection changes
  onTaskChange(task: Task): void {
    console.log('Task change event:', task);
    if (this.selectedUserStory) {
      const isSelected = this.isTaskSelected(task);
      console.log('Task isSelected:', isSelected);

      if (isSelected) {
        // Task is currently selected, so remove it
        this.selectedUserStory.tasks = this.selectedUserStory.tasks.filter(userStoryTask => userStoryTask._id !== task._id);
        console.log('Removed task:', task);
      } else {
        // Task is not selected, so add it
        this.selectedUserStory.tasks.push(task);
        console.log('Added task:', task);
      }
    }
  }


  getalltasks(): void {
    this.taskservice.getAllTasks().subscribe(
      (task: Task[]) => {
        this.tasks = task;
        this.processTasks();
      },
      error => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  processTasks(): void {
    // Process tasks to fit into Gantt chart format
    // Example: Transform tasks data as needed for rendering
  }
  editTask(task: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to edit this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Populate form with the task details for editing
        this.editingTask = task;
        this.newTaskTitle = task.title;
        this.newTaskDescription = task.description;
        this.startDate = task.start_date;
        this.endDate = task.end_date;
        this.newTaskAssignee = task.assignee;
        this.isEditing = true;
      }
    });
  }
  




  saveTask() {
    if (this.isEditing && this.editingTask) {
      // Update existing task
      const updatedTask = {
        ...this.editingTask,
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        start_date: this.startDate,
        end_date: this.endDate,
        assignee: this.newTaskAssignee
      };

      this._task_service.updateTask(this.editingTask._id, updatedTask).subscribe(
        (response: any) => {
          Swal.fire({
            icon: "success",
            title: "Task Updated",
            text: "The task was successfully updated.",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadTasks();
          this.resetForm();
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while updating the task.",
            footer: "Please try again"
          });
        }
      );
    } else {
      // Add new task
      if (this.newTaskTitle && this.newTaskDescription && this.startDate && this.endDate) {
        const newTask = {
          title: this.newTaskTitle,
          description: this.newTaskDescription,
          status: this.newTaskStatus,
          start_date: this.startDate,
          end_date: this.endDate,
          assignee: this.newTaskAssignee,
        };

        this._backlog_service.AjouterBacklog(newTask).subscribe(
          (response: any) => {
            const createdTask = {
              ...newTask,
              _id: response._id, // Use the ID from the backend response
            };
            this.backlogTasks.push(createdTask);
            this.saveTasks();
            Swal.fire({
              icon: "success",
              title: "Task Created",
              text: "The task was successfully created.",
              showConfirmButton: false,
              timer: 1500
            });
            this.resetForm();
          },
          (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while creating the task.",
              footer: "Please try again"
            });
          }
        );
      }
    }
  }

  deleteTask(task: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const taskId = task._id;
        if (!taskId) {
          console.error("Task ID is missing");
          return;
        }
        this._task_service.deleteTask(taskId).subscribe(
          () => {
            Swal.fire({
              icon: "success",
              title: "Task Deleted",
              text: "The task was successfully deleted.",
              showConfirmButton: false,
              timer: 1500
            });
            this.removeTaskFromLocalList(taskId);
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while deleting the task.",
              footer: "Please try again"
            });
          }
        );
      }
    });
  }
  
  removeTaskFromLocalList(taskId: string) {
    this.backlogTasks = this.backlogTasks.filter(task => task._id !== taskId);
    this.sprint1Tasks = this.sprint1Tasks.filter(task => task._id !== taskId);
    this.inProgressTasks = this.inProgressTasks.filter(task => task._id !== taskId);
    this.doneTasks = this.doneTasks.filter(task => task._id !== taskId);
    this.inTestTasks = this.inTestTasks.filter(task => task._id !== taskId);
    this.toRedoTasks = this.toRedoTasks.filter(task => task._id !== taskId);
    this.toImproveTasks = this.toImproveTasks.filter(task => task._id !== taskId);
    this.saveTasks();
  }

  drop(event: CdkDragDrop<any[]>) {
    const previousContainerData = this.getTasks(event.previousContainer.id);
    const currentContainerData = this.getTasks(event.container.id);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        currentContainerData,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        previousContainerData,
        currentContainerData,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem("backlogTasks", JSON.stringify(this.backlogTasks));
    localStorage.setItem("sprint1Tasks", JSON.stringify(this.sprint1Tasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(this.inProgressTasks));
    localStorage.setItem("doneTasks", JSON.stringify(this.doneTasks));
    localStorage.setItem("inTestTasks", JSON.stringify(this.inTestTasks));
    localStorage.setItem("toRedoTasks", JSON.stringify(this.toRedoTasks));
    localStorage.setItem("toImproveTasks", JSON.stringify(this.toImproveTasks));
  }

  
  loadTasks() {
    this.backlogTasks = JSON.parse(localStorage.getItem("backlogTasks")) || [];
    this.sprint1Tasks = JSON.parse(localStorage.getItem("sprint1Tasks")) || [];
    this.inProgressTasks = JSON.parse(localStorage.getItem("inProgressTasks")) || [];
    this.doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    this.inTestTasks = JSON.parse(localStorage.getItem("inTestTasks")) || [];
    this.toRedoTasks = JSON.parse(localStorage.getItem("toRedoTasks")) || [];
    this.toImproveTasks = JSON.parse(localStorage.getItem("toImproveTasks")) || [];
  }

  sendTasksToApi() {
    const payload = { tasks: this.backlogTasks };
    this._backlog_service.AjouterBacklog(payload).subscribe(
      (response: any) => {
        Swal.fire({
          icon: "success",
          title: "Operation réussie",
          text: "Vous pouvez voir la liste des articles",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue lors de l'ajout de l'article",
          footer: "Veuillez réessayer",
        });
      }
    );
  }

/*   selectTab(tab: number) {
    this.selectedTab = tab;
  }
 */



  getTasks(listId: string) {
    switch (listId) {
      case "backlogTasks":
        return this.backlogTasks;
      case "sprint1Tasks":
        return this.sprint1Tasks;
      case "inProgressTasks":
        return this.inProgressTasks;
      case "doneTasks":
        return this.doneTasks;
      case "inTestTasks":
        return this.inTestTasks;
      case "toRedoTasks":
        return this.toRedoTasks;
      case "toImproveTasks":
        return this.toImproveTasks;
      default:
        return [];
    }
  }

  resetForm(isTaskForm: boolean = true) {
    if (isTaskForm) {
      this.newTaskTitle = "";
      this.newTaskDescription = "";
      this.startDate = "";
      this.endDate = "";
      this.newTaskAssignee = "Utilisateur 2";
      this.isEditing = false;
      this.editingTask = null;
    } else {
      this.userStory = {
        title: '',
        description: '',
        status: TaskStatus.IN_PROGRESS,
        priority: '',
      };
    }
  }
  

  getUserStory(){
    this.userstoryService.getUserStories().subscribe(stories => {
      this.userStories = stories;
      // Select the first user story as an example
      if (this.userStories.length > 0) {
        this.selectedUserStory = this.userStories[0];
      }
    });
  }
  loadUserStories(): void {
    this.userstoryService.getUserStories().subscribe(
      (stories: UserStory[]) => {
        this.userStories = stories;
      },
      error => {
        console.error('Error fetching user stories', error);
      }
    );
  
}

}
