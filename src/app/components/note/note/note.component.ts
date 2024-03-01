import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  noteId = input.required<number>();
  title = input.required<string>();
  summary = input.required<string | undefined>();
  startDate = input.required<Date>();
  endDate = input.required<Date>();
  duration = input.required<number>();
}
