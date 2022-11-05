import { useState } from 'react'

function usePagination (data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage) // redondea

  function currentData () {
    const begin = (currentPage - 1) * itemsPerPage // inicio de la paginacion
    const end = begin + itemsPerPage // fin de la paginacion
    return data.slice(begin, end) // crea un array sin modificar el original
  }

  function next () {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage)) // devolver
  }

  function prev () {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1)) // adelantar
  }

  function jump (page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage)) // salto
  }

  return {
    next,
    prev,
    jump,
    currentData
  }
}

export default usePagination
