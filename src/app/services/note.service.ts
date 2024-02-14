import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note, NoteLabel } from '../types/note';

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  getNoteLabels(): Observable<NoteLabel[]> {
    return this.http
      .get(`${environment.apiUrl}noteLabels`)
      .pipe(map((res) => res as NoteLabel[]));
  }

  getNotes(): Observable<Note[]> {
    return this.http
      .get(`${environment.apiUrl}notes`)
      .pipe(map((res) => res as Note[]));
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put(`${environment.apiUrl}notes/${note.id}`, note).pipe(
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
