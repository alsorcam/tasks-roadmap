import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note, NoteLabel } from '../types/note';
import { DateUtil } from '../utils/date.util';

interface NoteDTO {
  id: number;
  title: string;
  summary?: string;
  labels: number[];
  startDate: number; // Timestamp
  endDate: number; // Timestamp
}

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  getNoteLabels(): Observable<NoteLabel[]> {
    return this.http
      .get(`${environment.apiUrl}noteLabels`)
      .pipe(map((res) => res as NoteLabel[]));
  }

  getNotes(): Observable<Note[]> {
    return this.http.get(`${environment.apiUrl}notes`).pipe(
      map((res) =>
        (res as NoteDTO[])
          .map((note) => {
            // Don't take into account weekends for end dates
            const startDate = DateUtil.getDateFromUnix(note.startDate);
            const endDate = DateUtil.getDateFromUnix(note.endDate);
            const updatedEndDate = DateUtil.endsAfterWeekend(startDate, endDate)
              ? DateUtil.setDayOfWeek(startDate, 5)
              : endDate;
            return {
              ...note,
              startDate: startDate,
              endDate: updatedEndDate,
            };
          })
          // Filter out notes that start on the weekend
          .filter((note) => !DateUtil.isWeekend(note.startDate))
      )
    );
  }

  updateNote(note: Note): Observable<Note> {
    return this.http
      .put(`${environment.apiUrl}notes/${note.id}`, {
        ...note,
        startDate: DateUtil.getUnixTime(note.startDate),
        endDate: DateUtil.getUnixTime(note.endDate),
      } as NoteDTO)
      .pipe(
        map((res) => res as Note),
        catchError(() =>
          throwError(
            () =>
              ({
                message: `Something went wrong while updating note ${note.id}. Please, try again.`,
              } as HttpErrorResponse)
          )
        )
      );
  }
}
