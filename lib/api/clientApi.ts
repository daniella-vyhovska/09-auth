import { api } from "./api";

// AUTH
export async function login(payload: { email: string; password: string }) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function register(payload: { email: string; password: string }) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function checkSession() {
  const res = await api.get("/auth/session");
  return res.data;
}

// USER
export async function getMe() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function updateMe(payload: { username: string }) {
  const res = await api.patch("/users/me", payload);
  return res.data;
}

// NOTES
export async function fetchNotes(page = 1, search = "", tag = "") {
  const res = await api.get("/notes", {
    params: { page, search, tag, perPage: 12 },
  });
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(payload: {
  title: string;
  content: string;
  tag: string;
}) {
  const res = await api.post("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
