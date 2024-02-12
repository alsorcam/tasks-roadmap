import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { provideAnimations } from '@angular/platform-browser/animations';

import { LabelSelectorComponent } from '../label-selector/label-selector.component';
import { NoteStackComponent } from '../note-stack/note-stack.component';
import { WeekSelectorComponent } from '../week-selector/week-selector.component';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TimelineComponent,
        CommonModule,
        MatGridListModule,
        LabelSelectorComponent,
        WeekSelectorComponent,
        NoteStackComponent,
      ],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
