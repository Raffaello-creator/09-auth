import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import type { Note, NotesResponse } from "@/types/note";
import type { AxiosResponse } from "axios";
import type { CheckSessionResponse } from "@/types/user";

const getHeaders = (): { Cookie: string } => {
  const cookieStore = cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const getUserFromServer = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me", {
    headers: getHeaders(),
  });
  return data;
};

export const checkServerSession = async (): Promise<
  AxiosResponse<CheckSessionResponse>
> => {
  return nextServer.get("/auth/session", {
    headers: getHeaders(),
  });
};

export const fetchNoteByIdServer = async (id: number): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: getHeaders(),
  });
  return data;
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: getHeaders(),
  });
  return data;
};
