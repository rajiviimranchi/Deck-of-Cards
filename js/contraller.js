(function() {
  angular.module('createCardApp', ['Stack']);  
  angular
    .module('createCardApp')
    .controller('createCardController', createCardController); 
     createCardController.$inject = ['cardFactory'];
  
  function createCardController(cardFactory) {
    var deckOfCards = this;    
    deckOfCards.setOfCards = cardFactory.createNewSetOfDeck();    
    deckOfCards.cardContainer = [];    
    deckOfCards.cardsToShuffle = deckOfCards.setOfCards.cardsToShuffle;   
    deckOfCards.clear = clear;    
    deckOfCards.removeCard = removeCard;
    deckOfCards.showAllCards = showAllCards;    
    deckOfCards.deckOfCardShuffle = deckOfCardShuffle;    
    function clear() {
      deckOfCards.cardContainer = [];     
      deckOfCards.setOfCards.clear();
    }
    
    function removeCard() {
		var moveToNextCard = deckOfCards.setOfCards.handleTopCard();	  
		if (moveToNextCard) {
			deckOfCards.cardContainer.push(moveToNextCard);
		}
			return moveToNextCard;
		}
    
    function showAllCards() {		
      while (removeCard()) {}
    }	
    
    function deckOfCardShuffle() {
      deckOfCards.clear();
      deckOfCards.cardsToShuffle();
      deckOfCards.showAllCards();
    }
  }
  
})();