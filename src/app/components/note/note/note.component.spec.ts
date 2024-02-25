import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent, MatCardModule, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('noteId', 1);
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('summary', undefined);
    fixture.componentRef.setInput('startDate', new Date());
    fixture.componentRef.setInput('endDate', new Date());
    fixture.componentRef.setInput('duration', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
