import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Priority } from '../interfaces/todo-list.interface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  @Input() description: string;
  @Input() dueDate: string;
  @Input() priority: number;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  ngOnInit(): void {}

  getFormattedDate(date: string) {
    return new Date(date + ' ').toLocaleDateString();
  }

  getPriorityText(): string {
    return (
      {
        [Priority.High]: 'High',
        [Priority.Medium]: 'Medium',
        [Priority.Low]: 'Low',
      }[this.priority] || ''
    );
  }

  getPriorityClass(): string {
    return (
      {
        [Priority.High]: 'todo-card--high',
        [Priority.Medium]: 'todo-card--medium',
        [Priority.Low]: 'todo-card--low',
      }[this.priority] || ''
    );
  }

  onDelete(): void {
    this.delete.emit();
  }

  onEdit(): void {
    this.edit.emit();
  }
}
