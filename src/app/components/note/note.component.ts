import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, MatCardModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() noteId: number = 0;
  @Input() title: string = '';
  @Input() summary?: string;
  @Input() startDate: number = new Date().getTime();
  @Input() endDate: number = new Date().getTime();
  @Input() labels: number[] = [];

  startDateFormatted = new Date(this.startDate);
  get noteDuration(): number {
    return Math.abs(this.endDate - this.startDate) / 86400000;
  }
}
