import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { provideAnimations } from '@angular/platform-browser/animations';
import { Note, NoteLabel } from '../../../types/note';
import { NoteEditComponent } from './note-edit.component';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;

  const labels: NoteLabel[] = [
    { id: 1, text: 'Label 1' },
    { id: 2, text: 'Label 2' },
  ];
  const note: Note = {
    id: 1,
    title: 'Note title',
    startDate: new Date(),
    endDate: new Date(),
    labels: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoteEditComponent,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
      ],
      providers: [
        provideNativeDateAdapter(),
        provideAnimations(),
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { note, labels },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
