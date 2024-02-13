import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';

import { NoteService } from '../../services/note.service';
import { Note, NoteLabel } from '../../types/note';
import { WeekDateRange } from '../../types/week';
import { DateUtil } from '../../utils/date.util';
import { LabelSelectorComponent } from '../label-selector/label-selector.component';
import { NoteEdit, NoteEditComponent } from '../note-edit/note-edit.component';
import { NoteStackComponent } from '../note-stack/note-stack.component';
import { WeekSelectorComponent } from '../week-selector/week-selector.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    LabelSelectorComponent,
    WeekSelectorComponent,
    NoteStackComponent,
  ],
  providers: [NoteService],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit, OnDestroy {
  labels: NoteLabel[] = [];
  notes: Note[] = [];
  weekDays: Date[] = new Array(5);
  selectedLabel = 0;
  firstNoteDate = new Date();

  private currentWeek?: WeekDateRange;
  private sub = new Subscription();
  private MAX_NOTE_STACK = 3;

  constructor(private noteService: NoteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sub.add(
      this.noteService.getNoteLabels().subscribe((res) => {
        this.labels = res;
      })
    );
    this.sub.add(
      this.noteService.getNotes().subscribe((res) => {
        this.notes = res;
        this.firstNoteDate = new Date(
          Math.min(...this.notes.map((note) => note.startDate))
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleLabelSelection(labelId: number): void {
    this.selectedLabel = labelId;
  }

  handleWeekChange(event: WeekDateRange): void {
    this.currentWeek = event;
    this.weekDays = [];
    if (this.currentWeek !== undefined) {
      let currentDate = this.currentWeek.startDate;
      while (currentDate <= this.currentWeek.endDate) {
        this.weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  getNotes(date: Date, category: number): Note[] {
    return this.notes
      .filter((note) => {
        return (
          note.labels.includes(category) &&
          DateUtil.resetHour(new Date(note.startDate)).getTime() ===
            DateUtil.resetHour(date).getTime()
        );
      })
      .slice(0, this.MAX_NOTE_STACK);
  }

  handleNoteSelected(event: Note) {
    const dialogRef = this.dialog.open(NoteEditComponent, {
      data: event,
    });

    dialogRef.afterClosed().subscribe((result: NoteEdit | number) => {
      if (typeof result === 'number') {
        // Delete note
        const noteIdx = this.notes.findIndex((note) => note.id === result);
        this.notes.splice(noteIdx, 1);
      } else if (result !== undefined) {
        // Edit note
        const updatedNote: Note = {
          id: event.id,
          startDate: result.startDate.getTime(),
          endDate: DateUtil.addDays(
            result.startDate,
            result.duration
          ).getTime(),
          labels: event.labels,
          title: result.title,
          summary: result.summary,
        };
        this.sub.add(
          this.noteService.updateNote(updatedNote).subscribe(() => {
            const noteIdx = this.notes.findIndex(
              (note) => note.id === updatedNote.id
            );
            if (noteIdx > -1) {
              this.notes.splice(noteIdx, 1, updatedNote);
            }
          })
        );
      }
    });
  }
}
