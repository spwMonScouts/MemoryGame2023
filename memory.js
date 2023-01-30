let controller = {
    userGuess: [],
    numGuesses: 0,
    numMatches: 0,
    previewCardArrangement: 0, // if you set this to 1 you get a preview of all the cards for a few seconds before starting the game. useful when lots of cards?
    passUserGuess: function() {
         if (this.userGuess.length === 2) { 
            model.checkUserGuess();
         }

    },
    init: function() {
        model.generateCardLocs();
        view.addCardsToTable();
        if (this.previewCardArrangement === 1)
        {
            // if we have option set to preview the deck, set all cards face up and then
            // turn them to backs and enable clicks after 3000 milliseconds
            view.initialShowAllCards();
            setTimeout(view.flipAllBack, '3000');
        }
        else
        {
            // Sets all cards to show backs and adds a click handler
            view.flipAllBack();
        }
        view.showNumGuesses();
        view.showScore();
        }
    };

let view = {
    showCard: function(eventObj) {
        let card = eventObj.target;
        let cardNum = Number(card.id.slice(4)); 
        if (controller.userGuess.length < 2 && !controller.userGuess.includes(cardNum)) 
        {
            for (let i = 0; i < model.numCardPairs; i++) {
                if (model.cards[i].matchPair.includes(cardNum)) {
                    let cardPic = model.cards[i].image;
                    card.src = cardPic;
                }
        }
        controller.userGuess.push(cardNum);
        controller.passUserGuess();
    } else {
        setTimeout(view.hideCard, 1000);
        }
    },
    hideCard: function() {
        for (let i = 0; i < controller.userGuess.length; i++) {
            let cardNum = "card" + String(controller.userGuess[i]).padStart(2,"0");
            let pic = document.getElementById(cardNum);
            pic.src = model.cardBackImage;
        }
        controller.userGuess = [];
    },
    showNumGuesses: function() {
        let guessDisplay = document.getElementById("guesses");
        guessDisplay.innerHTML = controller.numGuesses;
    },
    showScore: function(score) {
        let scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = model.score;
    },
    showWinModal: function() {
        let modal = document.getElementById("win");
        let closeButton = document.getElementsByClassName("closeButton")[0];
        let numCardPairs = document.getElementById("numCardPairs");
        numCardPairs.innerHTML = model.numCardPairs;
        let numGuesses = document.getElementById("numGuesses");
        numGuesses.innerHTML = controller.numGuesses;
        console.log(numGuesses);
        console.log(numCardPairs);
        modal.style.display = "block";
        closeButton.addEventListener("click", function() { document.getElementById("win").style.display = "none";});
    },
    addCardsToTable: function() {
        let table = document.getElementById("table");
        for (let i = 0; i < model.numCardPairs*2; i++)
        {
            var img = document.createElement("img");
            var str = "0" + i;
            img.src = "MemoryCardBack.png";
            img.id = "card" + str.slice(-2);
            table.appendChild(img)
        }
    },
    initialShowAllCards: function(){
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).src=card.image));
    },
    flipAllBack: function(){
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).src=model.cardBackImage));
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).onclick = view.showCard));    
    }

};

let model = {
    numCardPairs: 12, // This will be updated later based on length of model.cards so no need to change this manually
    score: 0,
    cardBackImage: "MemoryCardBack.png",
    cards: [
    // Copy this section for each card   
    {
        type: "BV1",
        image: "BV1.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV2",
        image: "BV2.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV3",
        image: "BV3.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV4",
        image: "BV4.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV5",
        image: "BV5.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV6",
        image: "BV6.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV7",
        image: "BV7.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV8",
        image: "BV8.png",
    },
    // End section to copy
        // Copy this section for each card   
    {
        type: "BV9",
        image: "BV9.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV10",
        image: "BV10.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV11",
        image: "BV11.png",
    },
    // End section to copy
    // Copy this section for each card   
    {
        type: "BV12",
        image: "BV12.png",
    },
    // End section to copy
    {
        type: "BV13",
        image: "BV13.png",
    }
    // No comma on last entry!
    ],
    checkUserGuess: function(userGuess) {
        let isUserGuessMatch= false;
        for (let i = 0; i < this.numCardPairs; i++) {
            if (this.cards[i].matchPair.includes(controller.userGuess[0]) && this.cards[i].matchPair.includes(controller.userGuess[1])) {
                isUserGuessMatch = true;
                }
            }; 
        this.nextCardActions(isUserGuessMatch);
     },

     checkWhetherGameIsWon: function() {
        if (this.score === this.numCardPairs) {
            view.showWinModal();
     }
    },
    nextCardActions: function(isUserGuessMatch) {
        if (isUserGuessMatch) { 
            this.score = this.score + 1;
            controller.numGuesses = controller.numGuesses + 1;
            controller.userGuess = [];
            view.showScore();
            view.showNumGuesses();
            this.checkWhetherGameIsWon();
        }
        else {
            setTimeout(view.hideCard, 500);
            controller.numGuesses = controller.numGuesses + 1;
            view.showNumGuesses();
        }
    },
    generateCardLocs: function() {
        let locArray = [];
        while (locArray.length < (model.numCardPairs * 2)) {
            let loc = Math.floor(Math.random() * model.numCardPairs * 2);
            if (!locArray.includes(loc)) {
                locArray.push(loc);
            };
        };
        let locArrayPairs = [];
        for (let i = 0; i < this.numCardPairs*2; i += 2) {
            let pair = []
            pair.push(locArray[i]);
            pair.push(locArray[i+1]);
            locArrayPairs.push(pair);
        };
        for (let i = 0; i < this.numCardPairs; i++) {
            this.cards[i].matchPair = locArrayPairs[i];
        }
    },
};

model.numCardPairs = model.cards.length;

window.onload = controller.init;