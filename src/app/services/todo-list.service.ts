import { Injectable } from '@angular/core';
import { TODO_LIST } from '../mock/todo-list';
import { Observable, of } from 'rxjs';
import { Priority, TodoItem } from '../interfaces/todo-list.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {

  getCards(): Observable<TodoItem[]> {
    return of(TODO_LIST);
  }

  getCardByIndex(index: number): Observable<TodoItem | undefined> {
    console.log(TODO_LIST[index]);
    return of(TODO_LIST[index]);
  }

  addCard(newCard: TodoItem) {
    TODO_LIST.push(newCard);
    return of(TODO_LIST[TODO_LIST.length - 1]);
  }

  updateCard(cardInfo: TodoItem, index: number): Observable<TodoItem | undefined> {
    TODO_LIST[index] = cardInfo;
    return of(TODO_LIST[index]);
  }

  searchCards(term: string, priority?: Priority): Observable<TodoItem[]> {
    return of(
      TODO_LIST.filter((card) => {
        const descriptionContainsTerm = card.description.toLowerCase().includes(term.toLowerCase());
        return priority ? descriptionContainsTerm && card.priority === priority : descriptionContainsTerm;
      }
      )
    );
  }

  deleteCard(index: number): Observable<TodoItem[]> {
    TODO_LIST.splice(index, 1);
    return of(TODO_LIST);
  }
}
