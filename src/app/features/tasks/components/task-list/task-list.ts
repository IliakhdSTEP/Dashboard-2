
import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks = input<Task[]>([]);
  filter = input<'all' | 'active' | 'completed'>('all');

  taskCompleted = output<number>();
  taskDeleted = output<number>();

  completeTask(id: number) {
    this.taskCompleted.emit(id);
  }

  deleteTask(id: number) {
    this.taskDeleted.emit(id);
  }
}
