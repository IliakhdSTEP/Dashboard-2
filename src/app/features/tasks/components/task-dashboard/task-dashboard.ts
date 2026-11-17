
import { Component, signal, computed, effect } from '@angular/core';
import { Task } from '../../models/task';
import { TaskList } from '../task-list/task-list';
import { TaskStats } from '../task-stats/task-stats';
import { TaskFilter } from '../task-filter/task-filter';

@Component({
  selector: 'app-task-dashboard',
  imports: [TaskList, TaskStats, TaskFilter],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.css'
})

export class TaskDashboard {
  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'active'   | 'completed'>('all');
  searchTerm = signal('');

  filteredTasks = computed(() => {
    return this.tasks().filter(task => {
      const matchesFilter =
        this.filter() === 'all' ||
        (this.filter() === 'active' && !task.completed) ||
        (this.filter() === 'completed' && task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  });

  completedCount = computed(() =>
    this.tasks().filter(task => task.completed).length
  );

  activeCount = computed(() =>
    this.tasks().filter(task => !task.completed).length
  );

  completionPercentage = computed(() => {
    if (this.tasks().length === 0) return 0;

    return Math.round(
      (this.completedCount() / this.tasks().length) * 100
    );
  });

  constructor() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks.set(JSON.parse(savedTasks));
    }

    effect(() => {
      console.log('Tasks count:', this.tasks().length);
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    });
  }

  addTask(title: string) {
    if (!title.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };

    this.tasks.update(tasks => [...tasks, task]);
  }

  completeTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id )
    ); 
  }

  changeFilter(value: 'all' | 'active' | 'completed')  
   {
    this.filter.set(value);

  }

  changeSearch(value: string) {
    this.searchTerm.set(value);


  }

  clearTasks() {
    this.tasks.set([]);
  }
}
