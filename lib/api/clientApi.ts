import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface AuthRequest {
  email: string;
  password: string;
}

interface UpdateUserRequest {
  username: string;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: Note["tag"];
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

// AUTH

export async function login(
  payload: AuthRequest
): Promise<User> {
  const res = await api.post<User>("/auth/login", payload);
  return res.data;
}

export async function register(
  payload: AuthRequest
): Promise<User> {
  const res = await api.post<User>("/auth/register", payload);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get<User | null>("/auth/session");
  return res.data;
}

// USER

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}

export async function updateMe(
  payload: UpdateUserRequest
): Promise<User> {
  const res = await api.patch<User>("/users/me", payload);
  return res.data;
}

// NOTES

export async function fetchNotes(
  page = 1,
  search = "",
  tag = ""
): Promise<NotesResponse>{
  const res = await api.get<NotesResponse>(
  "/notes",
  {
    params: {
      page,
      search,
      tag,
      perPage: 12,
    },
  }
);

  return res.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(
  payload: CreateNoteRequest
): Promise<Note> {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
}

export async function deleteNote(
  id: string
): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}