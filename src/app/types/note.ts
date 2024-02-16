export interface Note {
  id: number;
  title: string;
  summary?: string;
  labels: number[];
  startDate: Date;
  endDate: Date;
}

export interface NoteLabel {
  id: number;
  text: string;
}
