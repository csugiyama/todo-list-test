import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority, TodoItem } from '../interfaces/todo-list.interface';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  switchMap,
} from 'rxjs';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards$: Observable<TodoItem[]>;
  private searchTerm = new BehaviorSubject<string>('');
  private selectedPriority: Priority;

  constructor(private router: Router, private todoService: TodoListService) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }

  prioritySearch(priority: number): void {
    this.selectedPriority = priority;
    this.searchTerm.next(this.searchTerm.getValue());
  }

  goToAddItem(): void {
    console.log('aqui');
    this.router.navigateByUrl('/add-card');
  }

  onEditItem(index: number): void {
    this.router.navigateByUrl(`/edit-card/${index + 1}`);
  }

  onDeleteCard(index: number): void {
    this.todoService.deleteCard(index).subscribe(() => this.fetchCards());
  }

  private fetchCards(): void {
    this.cards$ = this.searchTerm.pipe(
      debounceTime(300),
      switchMap((term) => this.todoService.searchCards(term, this.selectedPriority))
    );
  }
}
