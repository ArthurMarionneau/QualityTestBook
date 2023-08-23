
export default (Book) => {
    const books = [
        new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95),
        new Book('9782746035966', 'Cree su primer sitio web con dreamweaver 8', 'B.A. GUERIN', 'ENI', 'ES', 10.02)
    ];

    const listBooks = () => {
        return books;
    }

    const createBook = (bookData) => {
        books.push(new Book(
            bookData.isbn13,
            bookData.title,
            bookData.authors,
            bookData.editor,
            bookData.langCode,
            bookData.price
        ));
        return bookData;
    }

    const findBook = (isbnToFind) => {
        return books.find((book) => book.isbn13 === isbnToFind);
    }

    const updateBook = (isbnToUpdate, updatedData) => {
        const bookIndex = books.findIndex((book) => book.isbn13 === isbnToUpdate);
        if (bookIndex === -1) return null;
        books[bookIndex] = { ...books[bookIndex], ...updatedData };
        return books[bookIndex];
    }

    const deleteBook = (isbnToDelete) => {
        const bookIndex = books.findIndex((book) => book.isbn13 === isbnToDelete);
        if (bookIndex === -1) return null;
        books.splice(bookIndex, 1);
    }


    return {
        listBooks,
        createBook,
        findBook,
        updateBook,
        deleteBook
    };
}