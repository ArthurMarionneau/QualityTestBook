
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.createBook);
  app.get('/books/isbn/:isbn', controlers.bookCtrl.getBook);
  app.put('/books/isbn/:isbn', controlers.bookCtrl.updateBook);
  app.delete('/books/isbn/:isbn', controlers.bookCtrl.deleteBook);
}
