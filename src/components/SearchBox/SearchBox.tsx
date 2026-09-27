import css from './SearchBox.module.css'

export interface SearchBoxProps {
    onSearch: (query: string) =>void
}

export default function SearchBox({value, onChange}){
    return (
        <input
  className={css.input}
  type="text"
  placeholder="Search notes"
 />
    )
}