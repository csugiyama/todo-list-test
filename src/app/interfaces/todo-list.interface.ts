export interface TodoItem {
  description: string;
  dueDate: string;
  priority: Priority;
}

export enum Priority {
  High = 1,
  Medium,
  Low
}