export interface Note {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  id: string;
  createdAt: string;
  updatedAt: string;
}
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
export interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  tag: string;
}
