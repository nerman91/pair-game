(() => {
  const arrayOfPairs = [
    {
      cardName: 'two-сlubs',
      cardAttribute: 'two-сlubs'
    },
    {
      cardName: 'two-diamonds',
      cardAttribute: 'two-diamonds'
    },
    {
      cardName: 'two-hearts',
      cardAttribute: 'two-hearts'
    },
    {
      cardName: 'two-spades',
      cardAttribute: 'two-spades'
    },
    {
      cardName: 'three-clubs',
      cardAttribute: 'three-clubs'
    },
    {
      cardName: 'three-diamonds',
      cardAttribute: 'three-diamonds'
    },
    {
      cardName: 'three-hearts',
      cardAttribute: 'three-hearts'
    },
    {
      cardName: 'three-spades',
      cardAttribute: 'three-spades'
    },
    {
      cardName: 'four-clubs',
      cardAttribute: 'four-clubs'
    },
    {
      cardName: 'four-diamonds',
      cardAttribute: 'four-diamonds'
    }
  ];
  const randomSelectedCards = [];
  const timeout = timer();

  //конец игры
  function checkGameOver() {
    const closedСardСlasses = document.querySelectorAll('.shirt-card');
    const button = document.querySelector('.button-try');
    if (!closedСardСlasses.length) {
      button.classList.add('button-try-active');
    }
  }

  //перетасовка карт
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const randPos = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randPos]] = [arr[randPos], arr[i]];
    }
  }

  function clearField() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
  }

  //получаем информацию об открытой карте
  function getCardInformation(card) {
    const targetDataId = card.dataset.cardsId;
    const targetItem = randomSelectedCards.find((item) => {
      return item.cardAttribute === targetDataId;
    });
    const targetClassName = targetItem.cardName;
    return {
      targetClassName,
      targetDataId
    };
  }

  //проверка открытых карт
  function flipCards() {
    let firstCard = null;
    let secondCard = null;

    const open = 'is-open';
    const closeCard = 'shirt-card';

    return (e) => {
      if (firstCard && secondCard) {
        if (firstCard.dataset.cardsId !== secondCard.dataset.cardsId) {
          firstCard.classList.remove(open);
          secondCard.classList.remove(open);
          firstCard = null;
          secondCard = null;
        }
      }

      if (!firstCard) {
        firstCard = e.target;
        firstCard.classList.add(open);
      } else {
        if (!secondCard) {
          secondCard = e.target;
          secondCard.classList.add(open);
        }
      }

      if (firstCard && secondCard) {
        if (firstCard.dataset.cardsId === secondCard.dataset.cardsId) {
          firstCard.classList.remove(closeCard);
          secondCard.classList.remove(closeCard);
          firstCard = null;
          secondCard = null;
          checkGameOver();
        }
      }
    };
  }

  //функция для создания поля ввода
  function createEntryField() {
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');

    input.value = '4';
    form.classList.add('form');
    label.classList.add('form__label');
    input.classList.add('form__input');
    button.classList.add('form__button');
    label.textContent = 'Количество пар';
    input.type = 'number';
    button.type = 'submit';
    button.textContent = 'Начать игру';

    form.append(label);
    form.append(input);
    form.append(button);

    return {
      form,
      input
    };
  }

  function createCard(cardAtr, handler) {
    const card = document.createElement('li');
    card.classList.add('card', 'shirt-card');
    card.dataset.cardsId = cardAtr;
    card.addEventListener('click', handler);
    return card;
  }

  //функция создания игрового поля
  function createPlayingField(value) {
    const cardsWrapper = document.createElement('ul');
    const container = document.querySelector('.container');
    const buttonTryAgain = document.createElement('button');
    const cardHandler = flipCards();

    //тасуем исходный массив с картами
    shuffleArray(arrayOfPairs);

    //очищаем массив от карт с предыдущей игры
    randomSelectedCards.length = 0;

    // добавляем необходимое количество карт в новый массив
    // (пушим объект два раза т.к нужны пары одинаковых карт)
    for (i = 0; i < value; i++) {
      randomSelectedCards.push(arrayOfPairs[i], arrayOfPairs[i]);
    }

    //тасуем новый массив
    shuffleArray(randomSelectedCards);

    //рендер карточек
    for (cardItem of randomSelectedCards) {
      cardsWrapper.append(createCard(cardItem.cardAttribute, cardHandler));
    }

    buttonTryAgain.classList.add('button-try');
    cardsWrapper.classList.add('field');
    buttonTryAgain.textContent = 'Сыграть ещё раз';
    container.append(cardsWrapper);
    container.append(buttonTryAgain);

    buttonTryAgain.addEventListener('click', () => {
      clearField();
      loadingTheInitialStateOfTheGame();
    });
  }

  function timer() {
    let timeout;
    return () => {
      const TIMER_VALUE = 30000;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        clearField();
        loadingTheInitialStateOfTheGame();
      }, TIMER_VALUE);
    };
  }

  //функция для создания первоначального состояния игры
  function loadingTheInitialStateOfTheGame() {
    const container = document.querySelector('.container');
    const entryField = createEntryField();
    const DEFAULT_VALUE = 4;

    entryField.input.value = DEFAULT_VALUE;
    container.append(entryField.form);

    //добавляем обработчик на событие submit формы
    entryField.form.addEventListener('submit', (e) => {
      const value = Number(entryField.input.value);
      e.preventDefault();
      //начало игры
      if (value % 2 === 0 && value <= 10 && value > 0) {
        entryField.form.remove();
        createPlayingField(value);
        timeout();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', loadingTheInitialStateOfTheGame);
})();
