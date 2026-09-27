import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'

export interface PaginationProps {
    page: number;
    pageCount: number;
    onChange: (page: number) => void
}

export default function Pagination ({page, pageCount, onChange}: PaginationProps) {
    return(
        <ReactPaginate
        forcePage={page -1}
        pageCount={pageCount}
        onPageChange={(e) => onChange(e.selected +1)}
        containerClassName={css.pagination}
        activeClassName={css.active}
        />
)}