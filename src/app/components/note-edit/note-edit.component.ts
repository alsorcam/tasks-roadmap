import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Note } from '../../types/note';
import { DateUtil } from '../../utils/date.util';

export interface NoteEdit {
  id: number;
  title: string;
  summary?: string;
  startDate: Date;
  duration: number;
}

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss',
})
export class NoteEditComponent {
  note?: NoteEdit;

  constructor(
    public dialogRef: MatDialogRef<NoteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {
    this.note = {
      id: data.id,
      title: data.title,
      summary: data.summary,
      startDate: new Date(data.startDate),
      duration: DateUtil.daysInRange(data.startDate, data.endDate),
    };
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}
