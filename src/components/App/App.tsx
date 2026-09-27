import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import NoteList from '../NoteList/NoteList'
import css from './App.module.css'
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { createNote, deleteNote, fetchNotes } from "../../services/note";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";




export default function App(){

  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const queryClient = useQueryClient()
  const {data, isLoading, isError} = useQuery({
    queryKey: ["notes", page, search], 
    queryFn: ()=> fetchNotes({page, perPage:12, search})
  })
  const notes = data?.items ?? [];
  const debouncedSearch = useDebouncedCallback((value) =>{
    setSearch(value);
    setPage(1)
  }, 300)

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      

      {data?.pageCount && data.pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={data.pageCount}
          onChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(values) => {
              mutation.mutate(values);
              setIsModalOpen(false);
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    {notes.length > 0 && ( 
      <NoteList
        notes={notes}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    )}

      <SearchBox
  value={inputValue}
  onSearch={(value) => {
    setInputValue(value)
    debouncedSearch(value) 
  }}
/>


      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
    </div>
  );
}