import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import type { Note, NotesResponse } from "@/types/note";
import type { AxiosResponse } from "axios";
import type { CheckSessionResponse } from "@/types/user";

const getHeaders = async (): Promise<{ Cookie: string }> => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const getUserFromServer = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me", {
    headers: await getHeaders(),
  });
  return data;
};

export const checkServerSession = async (): Promise<
  AxiosResponse<CheckSessionResponse>
> => {
  return api.get("/auth/session", {
    headers: await getHeaders(),
  });
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: await getHeaders(),
  });
  return data;
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: await getHeaders(),
  });
  return data;
};
