describe('Unit Testing Deck Of Cards module', function() {
  beforeEach(module('Stack')); 
  var $service;
  var setOfCards;
  var totalNumberOfCardOnDeck = 52;

  beforeEach(inject(function(_cardFactory_) {
     $service = _cardFactory_;
  }));

  describe('cardFactory.createNewSetOfDeck', function() {
    it('Checking Deck constructor', function() {
      expect($service.createNewSetOfDeck).toBeDefined();
      expect(typeof $service.createNewSetOfDeck).toBe('function');
    });
    
    describe('Checking Deck instance', function() {
      beforeEach(function() {
        setOfCards = $service.createNewSetOfDeck();
      });
      
      it('Checking set of Cards with 52 cards', function() {
        expect(setOfCards.cards).toBeDefined();
        expect(setOfCards.cards.length).toBe(totalNumberOfCardOnDeck);
      });
      
      it('Checking methods for cardsToShuffle and handleTopCard', function() {
        expect(typeof setOfCards.cardsToShuffle).toBe('function');
        expect(typeof setOfCards.handleTopCard).toBe('function');
      });
      
      it('Checking card is removed from deck', function() {
        var card = setOfCards.handleTopCard();
        expect(card).toBeDefined();
        expect(card.typeOfCards).toBeDefined();
        expect(card.word).toBeDefined();
        expect(card.nameOfcard).toBeDefined();
        expect(setOfCards.cards.length).toBe(totalNumberOfCardOnDeck - 1);
      });
      
      it('Show all cards', function() {
        for (var i = 0; i < totalNumberOfCardOnDeck; i++) {
          expect(setOfCards.handleTopCard()).toBeTruthy();
        }
        expect(setOfCards.handleTopCard()).toBeFalsy();
      });
	  
      
      it('Checking card for Shuffle', function() {
        var comparesCards = [];
        comparesCards.push(angular.copy(setOfCards.cards));       
        
        for (var noOfShuffle = 0; noOfShuffle < 5; noOfShuffle++) {
          setOfCards.cardsToShuffle();
          comparesCards.push(angular.copy(setOfCards.cards));
        }
        
        for (var i = 0; i < comparesCards.length - 1; i++) {
          var leftCompare = comparesCards[i];
          for (var j = i + 1; j < comparesCards.length; j++) {
            var rightCompare = comparesCards[j];
            expect(angular.equals(leftCompare, rightCompare)).toBe(false);
          }
        }
      });
     
    });
  });
});