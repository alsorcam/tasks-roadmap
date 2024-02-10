export interface Note {
  id: number;
  title: string;
  summary?: string;
  labels: number[];
  startDate: number; // Timestamp
  endDate: number; // Timestamp
}

export interface NoteLabel {
  id: number;
  text: string;
}
