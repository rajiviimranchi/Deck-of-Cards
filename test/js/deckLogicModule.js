(function() {
  angular.module('Stack', []);  
  angular
    .module('Stack')
    .factory('cardFactory', cardFactory);  
	cardFactory.$inject = ['$sce'];
  
  function cardFactory ($sce) {
    var typeOfCards = [{
      nameOfcard: 'Clubs',
      colorOfCard: 'black',
      cardIcon: $sce.trustAsHtml('&#x2663;')
    }, {
      nameOfcard: 'Spades',
      colorOfCard: 'black',
      cardIcon: $sce.trustAsHtml('&#x2660;')
    }, {
      nameOfcard: 'Hearts',
      colorOfCard: 'red',
      cardIcon: $sce.trustAsHtml('&#x2665;')
    }, {
      nameOfcard: 'Diamonds',
      colorOfCard: 'red',
      cardIcon: $sce.trustAsHtml('&#x2666;')
    }];
    
    
    function createCard(typeOfCards, word, nameOfcard) {
      return {
        typeOfCards: typeOfCards,
        word: word,
        nameOfcard: nameOfcard || word,
        displayName: (nameOfcard || word) + ' of ' + typeOfCards.nameOfcard
      };
    }
    
    
    function deckCreate() {      
      var setOfCards = {};      
      setOfCards.cards = [];
      setOfCards.cardsToShuffle = cardsToShuffle;
      setOfCards.handleTopCard = handleTopCard;
      setOfCards.cutdeckOfCard = cutdeckOfCard;
      setOfCards.cutsCardsPutsBttomOnTop = cutsCardsPutsBttomOnTop;
      setOfCards.clear = clear;
      setOfCards.clear();      
      
      function randomizeCard(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
      }      
      
      function cutdeckOfCard(cards) {
        if (!cards || !cards.length) {
          return {
            top: [],
            bottom: []
          };
        } else if (cards.length === 1) {
          return {
            top: [cards[0]],
            bottom: []
          };
        } else {          
          var middle = Math.floor(cards.length / 2);
          var variance = randomizeCard(0, 12) - 6;
          middle += variance;
          middle = Math.max(middle, 1);
          return {
            top: cards.slice(0, middle),
            bottom: cards.slice(middle)
          };
        }
      }
      
    function cutsCardsPutsBttomOnTop(pile) {
        var halves = cutdeckOfCard(pile);
        return halves.bottom.concat(halves.top);
      }      
     
      function cardsToShuffle() {        
        for (var i = 0; i < 15; i++) {
          var halves = cutdeckOfCard(setOfCards.cards);          
          var pile = [];
          while (halves.top.length > 0 || halves.bottom.length > 0) {           
            var take = randomizeCard(1, 5);            
            pile = pile.concat(halves.top.splice(0, take));           
            take = randomizeCard(1, 5);
            pile = pile.concat(halves.bottom.splice(0, take));
          }          
          setOfCards.cards = cutsCardsPutsBttomOnTop(pile);
        }
      }     
      
      function handleTopCard() {
        return setOfCards.cards.shift();
      }      
     
      function clear() {
        setOfCards.cards = [];
        typeOfCards.forEach(function(typeOfCards) {
          setOfCards.cards.push(createCard(typeOfCards, 'A', 'Ace'));
          for (var i = 2; i <= 10; i++) {
            setOfCards.cards.push(createCard(typeOfCards, i+''));
          }
          setOfCards.cards.push(createCard(typeOfCards, 'J', 'Jack'));
          setOfCards.cards.push(createCard(typeOfCards, 'Q', 'Queen'));
          setOfCards.cards.push(createCard(typeOfCards, 'K', 'King'));
        });
      }
      return setOfCards;
    }

    return {
      createNewSetOfDeck: deckCreate
    };
  }
  
})();