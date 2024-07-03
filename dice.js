document.addEventListener("DOMContentLoaded", function () {

    const playerPieces = ["auto", "cane", "cappello", "nave"];

    const properties = [
        { name: "Via", owner: null, purchasable: false },
        { name: "Mariner-1", price: 140, rent: 70, owner: null, purchasable: true },
        { name: "Adobe: l'abbonamento è scaduto!!", price: 200, owner: null, purchasable: false },
        { name: "Millennium Bug", price: 160, rent: 80, owner: null, purchasable: true },
        { name: "Stazione Sud", price: 250, rent: 100, owner: null, purchasable: true },
        { name: "Amazon Music", price: 200, rent: 100, owner: null, purchasable: true },
        { name: "YouTube Music", price: 200, rent: 100, owner: null, purchasable: true },
        { name: "Neuralink", price: 350, rent: 200, owner: null, purchasable: true },
        { name: "Spotify", price: 220, rent: 110, owner: null, purchasable: true },
        { name: "Transito", owner: null, purchasable: false },
        { name: "Mozilla Firefox", price: 280, rent: 140, owner: null, purchasable: true },
        { name: "Safari", price: 280, rent: 140, owner: null, purchasable: true },
        { name: "Adobe: l'abbonamento è scaduto!!", price: 200, owner: null, purchasable: false },
        { name: "Google Chrome", price: 300, rent: 150, owner: null, purchasable: true },
        { name: "Stazione Ovest", price: 250, rent: 100, owner: null, purchasable: true },
        { name: "Unitree", price: 350, rent: 175, owner: null, purchasable: true },
        { name: "Google", price: 350, rent: 200, owner: null, purchasable: true },
        { name: "Boston Dymanics", price: 370, rent: 185, owner: null, purchasable: true },
        { name: "Parcheggio", owner: null, purchasable: false },
        { name: "Cry Engine", price: 400, rent: 200, owner: null, purchasable: true },
        { name: "Adobe: l'abbonamento è scaduto!!", price: 200, owner: null, purchasable: false },
        { name: "Unreal Engine", price: 430, rent: 215, owner: null, purchasable: true },
        { name: "Stazione Nord", price: 250, rent: 100, owner: null, purchasable: true },
        { name: "Intel", price: 450, rent: 225, owner: null, purchasable: true },
        { name: "Tesla", price: 350, rent: 200, owner: null, purchasable: true },
        { name: "AMD", price: 480, rent: 240, owner: null, purchasable: true },
        { name: "NVidia", price: 500, rent: 250, owner: null, purchasable: true },
        { name: "Prigione", owner: null, purchasable: false },
        { name: "XBOX", price: 600, rent: 300, owner: null, purchasable: true },
        { name: "Nintendo", price: 620, rent: 310, owner: null, purchasable: true },
        { name: "Chat-Gpt", price: 350, rent: 200, owner: null, purchasable: true },
        { name: "PlayStation", price: 650, rent: 325, owner: null, purchasable: true },
        { name: "Stazione Est", price: 250, rent: 100, owner: null, purchasable: true },
        { name: "Microsoft", price: 850, rent: 425, owner: null, purchasable: true },
        { name: "Adobe: l'abbonamento è scaduto!!", price: 200, owner: null, purchasable: false },
        { name: "Apple", price: 900, rent: 450, owner: null, purchasable: true },
    ];

    const boardCoordinates = [
        { x: 680, y: 680 }, { x: 612, y: 680 }, { x: 544, y: 680 }, { x: 476, y: 680 }, { x: 408, y: 680 },
        { x: 340, y: 680 }, { x: 272, y: 680 }, { x: 204, y: 680 }, { x: 136, y: 680 }, { x: 68, y: 680 },
        { x: 68, y: 612 }, { x: 68, y: 544 }, { x: 68, y: 476 }, { x: 68, y: 408 }, { x: 68, y: 340 },
        { x: 68, y: 272 }, { x: 68, y: 204 }, { x: 68, y: 136 }, { x: 68, y: 68 }, { x: 136, y: 68 },
        { x: 204, y: 68 }, { x: 272, y: 68 }, { x: 340, y: 68 }, { x: 408, y: 68 }, { x: 476, y: 68 },
        { x: 544, y: 68 }, { x: 612, y: 68 }, { x: 680, y: 68 }, { x: 748, y: 68 }, { x: 748, y: 136 },
        { x: 748, y: 204 }, { x: 748, y: 272 }, { x: 748, y: 340 }, { x: 748, y: 408 }, { x: 748, y: 476 },
        { x: 748, y: 544 }, { x: 748, y: 612 }
    ];

    const currentPlayerPosition = new Array(playerPieces.length).fill(0);

    const pullDice = document.getElementById("pullDice");
    pullDice.addEventListener("click", function () {
        playTurn();
    });

    let currentPlayerIndex = 0;
    
    function checkWinner() {
        const remainingPlayers = playerPieces.filter((_, index) => {
            const playerWallet = document.getElementById("playerWallet_" + index);
            const playerAmount = parseInt(playerWallet.textContent.slice(1));
            return playerAmount > 0;
        });
    
        if (remainingPlayers.length === 1) {
            const winnerIndex = playerPieces.findIndex((_, index) => {
                const playerWallet = document.getElementById("playerWallet_" + index);
                const playerAmount = parseInt(playerWallet.textContent.slice(1));
                return playerAmount > 0;
            });
    
            const winnerName = "Giocatore " + (winnerIndex + 1);
            if (confirm(winnerName + " ha vinto!! Vuoi iniziare una nuova partita??")) {
                resetGame();
            }
        }
    }
    
    function resetGame() {
        for (let i = 0; i < playerPieces.length; i++) {
            const playerWallet = document.getElementById("playerWallet_" + i);
            playerWallet.textContent = "€600";
        }
    
        currentPlayerPosition.fill(0);
    
        for (let i = 0; i < playerPieces.length; i++) {
            const playerPropertiesDiv = document.getElementById("playerProperties_" + i);
            playerPropertiesDiv.innerHTML = "";
        }
    
        for (let i = 0; i < properties.length; i++) {
            properties[i].owner = null;
        }
    
        for (let i = 0; i < playerPieces.length; i++) {
            movePiece(playerPieces[i], boardCoordinates[0].x, boardCoordinates[0].y);
        }
    }
    
    function playTurn() {
        if (checkPlayerCanPlay(currentPlayerIndex)) {
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            const total = dice1 + dice2;
    
            document.getElementById("diceResult").innerText = "Giocatore " + (currentPlayerIndex + 1) + " ha fatto " + total;
    
            const currentProperty = properties[currentPlayerPosition[currentPlayerIndex]];
    
            if (currentProperty.purchasable) {
                if (currentProperty.owner === null) {
                    const currentPlayerWallet = document.getElementById("playerWallet_" + currentPlayerIndex);
                    const currentWalletAmount = parseInt(currentPlayerWallet.textContent.slice(1));
                    const propertyPrice = currentProperty.price;
                    if (currentWalletAmount >= propertyPrice && propertyPrice > 0) {
                        if (confirm("Vuoi acquistare " + currentProperty.name + " per " + propertyPrice + " monete?")) {
                            currentPlayerWallet.textContent = "€" + (currentWalletAmount - propertyPrice);
                            addPropertyToPlayer(currentPlayerIndex, currentProperty.name);
                            currentProperty.owner = currentPlayerIndex;
                        }
                    } else {
                        alert("Non hai abbastanza soldi per acquistare questa proprietà!!");
                    }
                }
            }
    
            movePlayer(currentPlayerIndex, total);
            checkWinner();
            nextTurn();
        } else {
            nextTurn();
        }
    }
    
    function checkPlayerCanPlay(playerIndex) {
        const playerWallet = document.getElementById("playerWallet_" + playerIndex);
        const playerAmount = parseInt(playerWallet.textContent.slice(1));
        return playerAmount > 0;
    }

    function nextTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % playerPieces.length;
    }

    function movePlayer(playerIndex, steps) {
        let currentPosition = currentPlayerPosition[playerIndex];
        let remainingSteps = steps;
    
        while (remainingSteps > 0) {
            currentPosition = (currentPosition + 1) % properties.length;
            remainingSteps--;
        }
    
        currentPlayerPosition[playerIndex] = currentPosition;
    
        const newPosition = boardCoordinates[currentPosition];
        const newX = newPosition.x;
        const newY = newPosition.y;
    
        movePiece(playerPieces[playerIndex], newX, newY);
    
        const currentProperty = properties[currentPosition];
        if (currentProperty.owner === null && currentProperty.purchasable) {
            if (confirm("Vuoi acquistare " + currentProperty.name + " per " + currentProperty.price + " monete?")) {
                currentProperty.owner = playerIndex;
                addPropertyToPlayer(playerIndex, currentProperty.name);
            }
        } else if (currentProperty.name === "Adobe: l'abbonamento è scaduto!!") {
            const payingPlayerWallet = document.getElementById("playerWallet_" + playerIndex);
            const payingPlayerAmount = parseInt(payingPlayerWallet.textContent.slice(1));
            
            payingPlayerWallet.textContent = "€" + (payingPlayerAmount - 200);
            
            alert("Il giocatore " + (playerIndex + 1) + " perde €200.");
        } else if (currentProperty.owner !== null && currentProperty.owner !== playerIndex) {
            const propertyPrice = currentProperty.price;
            const halfPrice = Math.floor(propertyPrice / 2);
            const payingPlayerWallet = document.getElementById("playerWallet_" + playerIndex);
            const receivingPlayerWallet = document.getElementById("playerWallet_" + currentProperty.owner);
            const payingPlayerAmount = parseInt(payingPlayerWallet.textContent.slice(1));
            const receivingPlayerAmount = parseInt(receivingPlayerWallet.textContent.slice(1));
            
            payingPlayerWallet.textContent = "€" + (payingPlayerAmount - halfPrice);
            receivingPlayerWallet.textContent = "€" + (receivingPlayerAmount + halfPrice);
            
            alert("Il giocatore " + (playerIndex + 1) + " paga €" + halfPrice + " al giocatore " + (currentProperty.owner + 1) + ".");
        }
    }

    function movePiece(pieceID, newX, newY) {
        let pieceElement = document.getElementById(pieceID);
        pieceElement.style.left = newX + "px";
        pieceElement.style.top = newY + "px";
    }

    function addPropertyToPlayer(playerIndex, propertyName) {
        const currentPlayerWallet = document.getElementById("playerWallet_" + playerIndex);
        const currentWalletAmount = parseInt(currentPlayerWallet.textContent.slice(1));
        const propertyPrice = properties.find(property => property.name === propertyName).price;
    
        if (currentWalletAmount >= propertyPrice) {
            currentPlayerWallet.textContent = "€" + (currentWalletAmount - propertyPrice);
    
            const playerPropertiesDiv = document.getElementById("playerProperties_" + playerIndex);
            const propertyElement = document.createElement("div");
            propertyElement.textContent = propertyName;
            playerPropertiesDiv.appendChild(propertyElement);
        } else {
            alert("Non hai abbastanza soldi per acquistare questa proprietà!!");
        }
    }
});