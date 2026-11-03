import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface NotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

async function getAuthHeaders(): Promise<{ Cookie: string }> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieHeader,
  };
}

// NOTES

export async function fetchNotes(
  page = 1,
  search = "",
  tag = ""
): Promise<Note[]> {
  const headers = await getAuthHeaders();

  const res = await api.get<Note[]>("/notes", {
    params: {
      page,
      search,
      tag,
      perPage: 12,
    } satisfies NotesParams & { perPage: number },
    headers,
  });

  return res.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const headers = await getAuthHeaders();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers,
  });

  return res.data;
}

// USER

export async function getMe(): Promise<User> {
  const headers = await getAuthHeaders();

  const res = await api.get<User>("/users/me", {
    headers,
  });

  return res.data;
}

// AUTH

export async function checkSession(): Promise<
  AxiosResponse<User | null>
> {
  const headers = await getAuthHeaders();

  const res = await api.get<User | null>(
    "/auth/session",
    {
      headers,
    }
  );

  return res;
}