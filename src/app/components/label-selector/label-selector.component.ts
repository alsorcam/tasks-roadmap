import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoteLabel } from '../../types/note';

@Component({
  selector: 'app-label-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './label-selector.component.html',
  styleUrl: './label-selector.component.scss',
})
export class LabelSelectorComponent {
  @Input() labels: NoteLabel[] = [];
  @Output() labelSelection = new EventEmitter<number>();

  readonly defaultItem: NoteLabel = { id: 0, text: 'All' };
  selected = this.defaultItem.id;

  handleLabelChange(): void {
    this.labelSelection.emit(this.selected);
  }
}
