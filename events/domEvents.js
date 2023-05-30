import { showBooks } from '../pages/books';
import {
  deleteBook, getBooks, getSingleBook,
} from '../api/bookData';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
// eslint-disable-next-line import/no-named-as-default
import getBookDetails, { deleteAuthorBooksRelationship } from '../api/mergedData';
// eslint-disable-next-line import/named
import viewBook from '../pages/viewBook';
import { getAuthors, getSingleAuthor } from '../api/authorData';
import { viewAuthorDetails } from '../pages/viewAuthor';
import { showAuthors } from '../pages/authors';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, fireBaseKey] = e.target.id.split('--');

        deleteBook(fireBaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE AUTHOR', e.target.id);
        const [, fireBaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(fireBaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }

      // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
      if (e.target.id.includes('add-author-btn')) {
        addAuthorForm();
      }
      // FIXME: add click event for viewing an author details
      if (e.target.id.includes('view-author-btn')) {
        const [, firebaseKey] = e.target.id.split('--');

        viewAuthorDetails(firebaseKey);
      }

      // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
      if (e.target.id.includes('update-author--')) {
        const [, firebaseKey] = e.target.id.split('--');

        getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
      }
    }
  });
};

export default domEvents;
