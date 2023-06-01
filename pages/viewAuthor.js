import clearDom from '../utils/clearDom';
import renderToDom from '../utils/renderToDom';
import { getSingleAuthor, getAuthorBooks } from '../api/authorData';

const renderAuthorDetails = (obj) => {
  clearDom();
  const domString = `
    <div class="mt-5 d-flex flex-wrap" id="author-details-container">
      <div class="mt-5 d-flex flex-wrap">
            <i id="edit-author-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-author--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>
        <div class="text-white ms-5 details">
          <h5>${obj.first_name}</h5>
          Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
          <h4>Favorite Books:</h4>
          <ul>
            ${obj.favoriteBooks ? obj.favoriteBooks.map((book) => `<li>${book}</li>`).join('') : ''}
          </ul>
          <hr>
        </div>
      </div>
    </div>
  `;
  renderToDom('#author-details-container', domString);
};

const viewAuthorDetails = (firebaseKey) => {
  getSingleAuthor(firebaseKey)
    .then((author) => getAuthorBooks(firebaseKey).then((books) => {
      // eslint-disable-next-line no-param-reassign
      author.favoriteBooks = books.map((book) => book.title);
      renderAuthorDetails(author);
    }))
    .catch((err) => console.warn(err));
};

export { viewAuthorDetails, renderAuthorDetails };
