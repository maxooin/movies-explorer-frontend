class MoviesApi {
  constructor({ url, serverUrl }) {
    this._url = url;
    this._serverUrl = serverUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${ res.status }`);
  }

  getMoviesCards() {
    return fetch(`${ this._url }`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._checkResponse)
  }

  filterCards(cards) {
    return cards.map((item) => {
      const {
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN
      } = item
      const fullCard = {
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN
      }
      fullCard.image = `${ this._serverUrl }${ item.image.url }`;
      fullCard.thumbnail = `${ this._serverUrl }${ item.formats.thumbnail.url }`;
      fullCard.movieId = item.id;
      return fullCard;
    })
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  serverUrl: 'https://api.nomoreparties.co/'
})
export default moviesApi;
