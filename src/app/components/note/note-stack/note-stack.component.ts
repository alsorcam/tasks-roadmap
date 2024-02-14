import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../../types/note';
import { DateUtil } from '../../../utils/date.util';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-note-stack',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './note-stack.component.html',
  styleUrl: './note-stack.component.scss',
})
export class NoteStackComponent {
  @Input() notes: Note[] = [];
  @Output() noteSelected = new EventEmitter<Note>();

  handleSelection(note: Note): void {
    this.noteSelected.emit(note);
  }

  getNoteWidth(note: Note): number {
    const duration = DateUtil.daysInRange(note.startDate, note.endDate);
    return duration <= 1 ? 85 : 100 * (duration - 1) + 85;
  }
}
