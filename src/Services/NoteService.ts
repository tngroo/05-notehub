import { api } from "../Api/Note";
import { Note } from "../types/note";

interface FetchNotesParams{
page?: number;
search?: string;
perPage?: number;
}

interface FetchNotesResponse {
    items: Note[];
    total: number;
    page: number;
    perPage: number;
    pageCount: number;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
    const {page = 1, search, perPage = 12} = params;
    const queryParams: Record<string, string | number> = { page, perPage };

  if (search && search.trim() !== "") {
    queryParams.search = search;
  }
    const {data} = await api.get<FetchNotesResponse>("/notes", {
        params: queryParams,
    })
    

    return data;
    
}

interface CreateNoteParams {
    title: string;
    content: string;
}

export async function createNote(params: CreateNoteParams): Promise<Note>{
    const {data} = await api.post<Note>("/notes", params)
    return data
}

interface DeleteNoteResponse{
id: string;
deleted: boolean;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
    const {data} = await api.delete<DeleteNoteResponse>(`/notes/${id}`)
    return data
}