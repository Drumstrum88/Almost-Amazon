// for merged promises
import { getSingleAuthor, deleteSingleAuthor, getAuthorBooks } from './authorData';
import { getSingleBook, deleteBook } from './bookData';
// eslint-disable-next-line import/no-cycle

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => {
    console.warn(bookObject);
    console.warn(bookObject.author_id);
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { deleteAuthorBooksRelationship, getBookDetails };
export default getBookDetails;
