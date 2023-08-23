import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})

chai.use(chaiHttp);

describe('GET /books', function () {
    it('should return the book lists', function (done) {
    chai.request(api)
        .get('/books')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.deep.equal({
                data: [
                    {
                        isbn13: '9782744005084',
                        title: 'UML et C++',
                        authors: 'Richard C. Lee, William M. Tepfenhart',
                        editor: 'CampusPress',
                        langCode: 'FR',
                        price: 29.95
                    },
                    {
                        isbn13: '9782746035966',
                        title: 'Cree su primer sitio web con dreamweaver 8',
                        authors: 'B.A. GUERIN',
                        editor: 'ENI',
                        langCode: 'ES',
                        price: 10.02
                    }
                ]
            });
            done();
        })
    });
});

describe('POST /books', function () {
    it('should create a book and return it', function (done) {
        const book = {
            isbn13: '9782746035566',
            title: 'Les secrets de la blanquette de veau',
            authors: 'Marionneau Arhur',
            editor: 'Gourmand édition',
            langCode: 'FR',
            price: 22.02
        }
        chai.request(api)
            .post('/books')
            .send(book)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body).to.deep.equal({
                    data: book
                });
                done();
            })
    });
    it('should return 400 if ISBN13 is not correctly formatted', function (done) {
        const book = {
            isbn13: '12345678901', // ISBN13 incorrect
            title: 'Les mystères du boeuf bourguignon',
            authors: 'Marionneau Arhur',
            editor: 'Gourmand édition',
            langCode: 'FR',
            price: 15.02
        }
        chai.request(api)
            .post('/books')
            .send(book)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.equal({
                    message: "Invalid ISBN13 format"
                });
                done();
            })
    });
});

describe('GET /book/isbn/:isbn', function () {
    it('should return the book with the provide isbn', function (done) {
        const expectedBook = {
            isbn13: '9782746035966',
            title: 'Cree su primer sitio web con dreamweaver 8',
            authors: 'B.A. GUERIN',
            editor: 'ENI',
            langCode: 'ES',
            price: 10.02
        }
        chai.request(api)
            .get('/books/isbn/9782746035966')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: expectedBook
                });
                done();
            })
    });
    it('should return 404 if the book does not exist', function (done) {
        chai.request(api)
            .get('/books/isbn/978274484')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    message: "Book not found"
                });
                done();
            })
    });
});

describe('PUT /books/isbn/:isbn', function () {
    it('should update a book and return it', function (done) {
        const updatedBook = {
            isbn13: '9782746035966',
            title: 'Updated Title',
            authors: 'Updated Author',
            editor: 'Updated Editor',
            langCode: 'ES',
            price: 15.00
        }
        chai.request(api)
            .put('/books/isbn/9782746035966')
            .send(updatedBook)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: updatedBook
                });
                done();
            })
    });
    it('should return 404 if the book does not exist', function (done) {
        chai.request(api)
            .put('/books/isbn/978274400')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    message: "Book not found"
                });
                done();
            })
    });
});


describe('DELETE /books/isbn/:isbn', function () {
    it('should delete the book with the provided isbn', function (done) {
        chai.request(api)
            .delete('/books/isbn/9782746035966')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    message: "Book deleted successfully"
                });
                done();
            })
    });
    it('should return 404 if the book does not exist', function (done) {
        chai.request(api)
            .delete('/books/isbn/9782744084')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    message: "Book not found"
                });
                done();
            })
    });
});
