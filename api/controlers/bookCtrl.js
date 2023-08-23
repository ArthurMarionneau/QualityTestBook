import bookRepo from "../repository/bookRepo.js";

export default (bookRepo) => {

    const isValidIsbn13 = (isbn) => /^[0-9]{13}$/.test(isbn);
    const listBooks = (_, res) => {
        res.send({
            data : bookRepo.listBooks()
        });
    }

    const createBook = (req, res) => {
        if (!isValidIsbn13(req.body.isbn13)) {
            return res.status(400).send({
                message: "Invalid ISBN13 format"
            });
        }
        res.status(201).send({
            data : bookRepo.createBook(req.body)
        });
    }

    const getBook = (req, res) => {
        const wantedIsbn = req.params.isbn;
        const book = bookRepo.findBook(wantedIsbn);
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }
        res.status(200).send({
            data : book
        })
    }

    const updateBook = (req, res) => {
        const wantedIsbn = req.params.isbn;
        const book = bookRepo.findBook(wantedIsbn);
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }
        if (!isValidIsbn13(req.body.isbn13)) {
            return res.status(400).send({
                message: "Invalid ISBN13 format"
            });
        }
        const updatedBook = bookRepo.updateBook(req.params.isbn, req.body);
        res.status(200).send({
            data: updatedBook
        });
    }

    const deleteBook = (req, res) => {
        const wantedIsbn = req.params.isbn;
        const book = bookRepo.findBook(wantedIsbn);
        if (!book) {
            return res.status(404).send({
                message: "Book not found"
            });
        }
        bookRepo.deleteBook(req.params.isbn);
        res.status(200).send({
            message: "Book deleted successfully"
        });
    }

    return {
        listBooks,
        createBook,
        getBook,
        updateBook,
        deleteBook
    };
}
