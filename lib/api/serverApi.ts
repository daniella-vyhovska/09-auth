import { cookies } from "next/headers";
import { api } from "./api";

async function getAuthHeaders() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieHeader,
  };
}

export async function fetchNotes(
  page = 1,
  search = "",
  tag = ""
) {
  const headers = await getAuthHeaders();

  const res = await api.get("/notes", {
    params: {
      page,
      search,
      tag,
      perPage: 12,
    },
    headers,
  });

  return res.data;
}

export async function fetchNoteById(id: string) {
  const headers = await getAuthHeaders();

  const res = await api.get(`/notes/${id}`, {
    headers,
  });

  return res.data;
}

export async function getMe() {
  const headers = await getAuthHeaders();

  const res = await api.get("/users/me", {
    headers,
  });

  return res.data;
}

export async function checkSession() {
  const headers = await getAuthHeaders();

  const res = await api.get("/auth/session", {
    headers,
  });

  return res.data;
}