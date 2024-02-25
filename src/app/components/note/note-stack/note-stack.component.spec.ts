import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from '../note/note.component';
import { NoteStackComponent } from './note-stack.component';

describe('NoteStackComponent', () => {
  let component: NoteStackComponent;
  let fixture: ComponentFixture<NoteStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteStackComponent, NoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteStackComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notes', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
