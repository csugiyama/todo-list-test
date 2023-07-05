import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.scss'],
})
export class AddEditCardComponent implements OnInit {
  cardForm: FormGroup;
  oneBasedIndex: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.nonNullable.group({
      description: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      priority: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(3),
      ]),
    });

    this.oneBasedIndex = Number(this.route.snapshot.paramMap.get('index'));
    if (this.oneBasedIndex) {
      this.todoService
        .getCardByIndex(this.oneBasedIndex - 1)
        .subscribe((card) =>
          this.cardForm.setValue({
            description: card?.description,
            dueDate: card?.dueDate,
            priority: card?.priority,
          })
        );
    }
  }

  isSaveDisabled(): boolean {
    return this.cardForm.invalid;
  }

  onSubmit(): void {
    if (this.oneBasedIndex) {
      this.todoService
        .updateCard(this.cardForm.value, this.oneBasedIndex - 1)
        .subscribe(() => this.router.navigateByUrl(''));
    } else {
      this.todoService
        .addCard({ ...this.cardForm.value })
        .subscribe(() => this.router.navigateByUrl(''));
    }
  }
}
