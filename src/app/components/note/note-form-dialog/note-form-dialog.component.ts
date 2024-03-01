import {
  Component,
  Inject,
  OnInit,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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

import { Note, NoteLabel } from '../../../types/note';
import { DateUtil } from '../../../utils/date.util';

export interface NoteForm {
  id: number;
  title: string;
  summary?: string;
  startDate: Date;
  duration: number;
  labels: number[];
}

export interface NoteFormDialogData {
  note: Note;
  labels: NoteLabel[];
}

@Component({
  selector: 'app-note-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './note-form-dialog.component.html',
  styleUrl: './note-form-dialog.component.scss',
})
export class NoteFormDialog implements OnInit {
  form?: FormGroup;
  labels: NoteLabel[] = [];
  noteId?: number;

  labelsFormGroup = computed(() => this.form?.get('labels') as FormGroup);
  private selectedLabels: WritableSignal<number[]> = signal([]);
  noteEdit = computed(() => ({
    id: this.noteId,
    title: this.form?.get('title')?.value,
    summary: this.form?.get('summary')?.value,
    startDate: this.form?.get('startDate')?.value,
    duration: this.form?.get('duration')?.value,
    labels: this.selectedLabels(),
  }));

  constructor(
    public dialogRef: MatDialogRef<NoteFormDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: NoteFormDialogData
  ) {
    this.noteId = data.note.id;
    this.labels = data.labels;
    const labelsValues: Record<string, boolean> = {};
    this.labels.forEach((label) => {
      labelsValues[label.text] = data.note.labels.includes(label.id);
    });
    this.form = this.formBuilder.group({
      title: data.note.title,
      summary: data.note.summary,
      startDate: new Date(data.note.startDate),
      duration: DateUtil.daysInRange(data.note.startDate, data.note.endDate),
      labels: this.formBuilder.group(labelsValues),
    });
  }

  ngOnInit(): void {
    this.selectedLabels.set(this.mapFormToLabels(this.labelsFormGroup().value));
    this.form?.get('labels')?.valueChanges.subscribe((changes) => {
      this.selectedLabels.set(this.mapFormToLabels(changes));
    });
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  private mapFormToLabels(values: Record<string, boolean>): number[] {
    return Object.keys(values)
      .filter((key) => values[key] === true)
      .map((key) => this.labels.find((label) => label.text === key)?.id ?? -1)
      .filter((id) => id !== -1);
  }
}
