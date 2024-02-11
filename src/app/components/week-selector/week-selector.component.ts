import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeekDateRange } from '../../types/week';
import { DateUtil } from '../../utils/date.util';

@Component({
  selector: 'app-week-selector',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './week-selector.component.html',
  styleUrl: './week-selector.component.scss',
})
export class WeekSelectorComponent implements OnChanges {
  @Input() startDate = new Date();
  @Output() weekChange = new EventEmitter<WeekDateRange>();

  private weekRange = DateUtil.getWeekDateRange(this.startDate);
  get currentWeek(): number {
    return DateUtil.getWeekNumber(this.weekRange.startDate);
  }

  ngOnChanges(): void {
    this.setWeek(this.startDate);
  }

  handleNext(): void {
    const nextMonday = new Date(
      this.weekRange.startDate.setDate(this.weekRange.startDate.getDate() + 7)
    );
    this.setWeek(nextMonday);
  }

  handlePrevious(): void {
    const previousMonday = new Date(
      this.weekRange.startDate.setDate(this.weekRange.startDate.getDate() - 7)
    );
    this.setWeek(previousMonday);
  }

  private setWeek(monday: Date): void {
    this.weekRange = DateUtil.getWeekDateRange(monday);
    this.weekChange.emit(this.weekRange);
  }
}
