let controller = {
    userGuess: [],
    numGuesses: 0,
    numMatches: 0,
    passUserGuess: function() {
         if (this.userGuess.length === 2) { 
            model.checkUserGuess()
         }

    },
    init: function() {
        model.generateCardLocs();
        view.addCardsToTable();
        view.initialShowAllCards();
        /*let cards = document.getElementsByTagName("img");
        for (let i = 0; i < (model.numCardPairs * 2); i++) {
            cards[i].onclick = view.showCard;       
        };*/
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
        view.hideCard();
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
        //for (let i = 0; i < model.numCardPairs; i++) {            
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).src=card.image));
            /*for (let j in model.cards[i].matchPair)
            {
                let cardNum = "card" + String(model.cards[i].matchPair[j]).padStart(2,"0");
                let pic = document.getElementById(cardNum);
                pic.src = cardPic;
            };*/
            //cards[i].src = cardPic;  
             
        //};  
        setTimeout(this.flipAllBack, '3000');

    },
    flipAllBack: function(){
        //for (let i = 0; i < model.numCardPairs; i++) {
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).src=model.cardBackImage));
            model.cards.forEach(card => card.matchPair.forEach(id => document.getElementById("card" + String(id).padStart(2,"0")).onclick = view.showCard));
            /*for (let j in model.cards[i].matchPair)
            {
                let cardNum = "card" + String(model.cards[i].matchPair[j]).padStart(2,"0");
                let pic = document.getElementById(cardNum);
                pic.src = model.cardBackImage;
            };*/
            //cards[i].src = cardPic;  
     
    }

};

let model = {
    numCardPairs: 12, 
    score: 0,
    cardBackImage: "MemoryCardBack.png",
    cards: [
     // Copy this section for each card   
    {
        type: "a1",
        image: "A1.png",
    },
    // End copied section
    {
        type: "s1",
        image: "S1.png",
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