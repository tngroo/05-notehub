import { api } from "../Api/Note";
import { Note } from "../types/note";

interface FetchNotesParams{
query: string;
page: number;
}

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}


export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { query, page } = params;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
      sortBy: "created"
    },
  });

  console.log("STATUS:", response.status);
  console.log("DATA:", response.data);

  return response.data;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: string
}

export async function createNote(params: CreateNoteParams): Promise<Note>{
    const {data} = await api.post<Note>("/notes", params)
    return data
}

export async function deleteNote(id: string): Promise<Note> {
    const {data} = await api.delete<Note>(`/notes/${id}`)
    return data
}