import { api } from "./api";
import { cookies } from "next/headers";

function withAuth() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieHeader,
    },
  };
}

// NOTES
export async function fetchNotes(page = 1, search = "", tag = "") {
  const res = await api.get("/notes", {
    params: { page, search, tag, perPage: 12 },
    ...withAuth(),
  });
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get(`/notes/${id}`, {
    ...withAuth(),
  });
  return res.data;
}

// USER
export async function getMe() {
  const res = await api.get("/users/me", {
    ...withAuth(),
  });
  return res.data;
}

export async function checkSession() {
  const res = await api.get("/auth/session", {
    ...withAuth(),
  });
  return res.data;
}
