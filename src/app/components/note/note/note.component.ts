import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DateUtil } from '../../../utils/date.util';

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

  startDateFormatted = computed(() => new Date(this.startDate));
  get noteDuration(): number {
    return DateUtil.daysInRange(this.startDate, this.endDate);
  }
}
