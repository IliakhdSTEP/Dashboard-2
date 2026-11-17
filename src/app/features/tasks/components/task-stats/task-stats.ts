
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.css'
})
export class TaskStats {
  total = input<number>(0);
  completed = input<number>(0);
  active = input<number>(0);
  percentage = input<number>(0 );
}
 