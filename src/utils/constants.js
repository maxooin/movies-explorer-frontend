export const nameRegex = "[а-яА-ЯёЁa-zA-Z -]+";
export const emailRegex = "[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,4}";
const shortMovie = 40;
const widthScreen = {
  medium: 1279,
  small: 767,
}
const quantityMovies = {
  lage: { cards: 12, more: 3 },
  medium: { cards: 8, more: 2 },
  small: { cards: 5, more: 2 },
}

export const searchMovies = (cards, searchString) => {
  if (searchString === undefined) {
    return cards;
  }
  return cards.filter((item) => {
    let res = false;
    if (item.nameRU.toLowerCase().includes(searchString.toLowerCase())) {
      res = true;
    } else if (item.nameEN.toLowerCase().includes(searchString.toLowerCase())) {
      res = true;
    }
    return res;
  });
}

export const shortFilter = (cards, isShort) => {
  return cards.filter((item) => {
    let res = true;
    if (item.duration > shortMovie && isShort) {
      res = false;
    }
    return res;
  })
}

export const quantityMoviesToMount = (width) => {
  if (width > widthScreen.medium) {
    return quantityMovies.lage;
  }
  if (width > widthScreen.small) {
    return quantityMovies.medium;
  }
  return quantityMovies.small;
}
