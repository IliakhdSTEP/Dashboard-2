
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  imports: [],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter {
  filterChanged = output<'all' | 'active' | 'completed'>();

  changeFilter(value: 'all' | 'active' | 'completed') {
    this.filterChanged.emit(value);
  }
}
