import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit  {

  tasks: any = [];
  task: any = {};

  constructor(
    private _taskService: TaskService
  ) { 

  }

  ngOnInit(): void {
    this._taskService.getTasks()
    .subscribe( tasks => {
        this.tasks = tasks;
    });
  }

  deleteTask( id: any, item: any ) {

    this._taskService.deleteTask( id )
      .subscribe(data => {
        if ( data ) {
          this.tasks = data;
        } else {
          console.error(data);
        }
      });
  }

  saveTask(){
    
    let txt = this.task.txt;
        txt = txt.split(":");
    
    this.task.item = txt[0];
    this.task.description = txt[1];

    this._taskService.saveTask(this.task)
      .subscribe( data => {
   
         this.tasks = data;
      },
      error => console.error(error));
  }

}
