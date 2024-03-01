import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTimelineComponent } from './loading-timeline.component';

describe('LoadingTimelineComponent', () => {
  let component: LoadingTimelineComponent;
  let fixture: ComponentFixture<LoadingTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
