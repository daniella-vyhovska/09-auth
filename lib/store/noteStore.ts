import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "@/types/note";

interface NoteDraft {
  title: string;
  content: string;
  tag: Note["tag"];
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft, // зберігаємо попередні значення
            ...note,        // оновлюємо лише змінене поле
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),

    {
      name: "note-draft", // ключ у localStorage

      // зберігаємо лише draft, без методів
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
