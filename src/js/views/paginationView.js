import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, an there are other pages
    if (currPage === 1 && numPages > 1)
      return `
          ${this._generateMarkupButton('next', currPage + 1)}
    `;
    // Last page
    if (currPage === numPages && numPages > 1)
      return `
      ${this._generateMarkupButton('prev', currPage - 1)}
    `;

    // Other Page
    if (currPage < numPages)
      return `
      ${this._generateMarkupButton('next', currPage + 1)}
      ${this._generateMarkupButton('prev', currPage - 1)}
    `;

    // Page 1, an there are NO other pages
    return '';
  }

  _generateMarkupButton(state, pageNum) {
    return `
      <button data-goto="${pageNum}" class="btn--inline pagination__btn--${state}">
        <span>Page ${pageNum}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
