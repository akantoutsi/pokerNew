import * as consts from 'utils/constants';

export const initializeWinningCombs = () => {
    return [
        { code: 1,  title: 'Royal Flush'     },
        { code: 2,  title: 'Straight Flush'  },
        { code: 3,  title: 'Four of a Kind'  },
        { code: 4,  title: 'Full House'      },
        { code: 5,  title: 'Flush'           },
        { code: 6,  title: 'Straight'        },
        { code: 7,  title: 'Three of a Kind' },
        { code: 8,  title: 'Two Pairs'       },
        { code: 9,  title: 'Pair'            },
        { code: 10, title: 'High Card'       }
    ]
}

const createCards = () => {
    let suits     = ['hearts', 'clubs', 'spades', 'diams'];
    let values    = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    let tmpSuits  = [...suits];
    let tmpValues = [...values];

    var res = tmpSuits.reduce((acc, s) =>
        acc.concat(tmpValues.map(v => ({ 'suit': s, 'value': v }))), 
        []
    );

    return res;
}

const getRank = (obj, property) => {
    let rank = 0;
    
    if (obj[property] === 'J') {
        rank = 11;  
    } else if (obj[property] === 'Q') {
        rank = 12;  
    } else if (obj[property] === 'K') {
        rank = 13;  
    } else if (obj[property] === 'A') {
        rank = 14;  
    } else {
        rank = parseInt(obj[property]);
    }
    
    return rank;
};

const shuffle = arr => {
    for (let i = 0; i < arr.length; i++) {
      const rnd = Math.random() * i | 0;
      const tmp = arr[i];
      arr[i]    = arr[rnd];
      arr[rnd]  = tmp;
    }
    return arr;
};

export const initializeCards = () => {
    let cards = createCards();

    cards.map(elem => elem.rank = getRank(elem, 'value'));
    cards.map(elem => elem.isVisible = false);

    return shuffle(cards);
}

export const initializeBoardCards = cards => {
    return cards.slice(consts.NUM_OF_PLAYERS*2, (consts.NUM_OF_PLAYERS*2)+5).map(elem => ({...elem, belongsTo: 'board', selected: false}));
}

export const initializePlayers = cards => {
    let j       = 0;
    let players = [];

    for (let i=0; i<consts.NUM_OF_PLAYERS; i++) {
        let dealerId      = (-1 + 1 >= consts.NUM_OF_PLAYERS) 
                          ?  -1 + 1 -  consts.NUM_OF_PLAYERS 
                          :  -1 + 1

        let smallBlindId  = (dealerId + 1 >= consts.NUM_OF_PLAYERS) 
                          ?  dealerId + 1 -  consts.NUM_OF_PLAYERS     
                          :  dealerId + 1;

        let bigBlindId    = (dealerId + 2 >= consts.NUM_OF_PLAYERS) 
                          ?  dealerId + 2 -  consts.NUM_OF_PLAYERS 
                          :  dealerId + 2;

        let nextPlayerId  = (bigBlindId + 1 >= consts.NUM_OF_PLAYERS) 
                          ?  bigBlindId + 1 -  consts.NUM_OF_PLAYERS
                          :  bigBlindId + 1

        let cash = Math.floor(Math.random() * (20 - consts.SMALL_BLIND_AMOUNT*2)) + (consts.SMALL_BLIND_AMOUNT*2);  
        let pot  = (bigBlindId   === i) ? consts.SMALL_BLIND_AMOUNT * 2 : 
                   (smallBlindId === i) ? consts.SMALL_BLIND_AMOUNT : 0
        
        players.push({
            seq          : i,
            isActive     : 1,
            cards        : cards.slice(i+j, i+j+2).map(elem => ({...elem, belongsTo: i, selected: false})),
            cash         : (smallBlindId === i) ? cash - consts.SMALL_BLIND_AMOUNT : 
                           (bigBlindId   === i) ? cash - consts.SMALL_BLIND_AMOUNT*2 : cash,
            pot          : pot,
            tmpPot       : pot,                           
            potChanged   : 0,
            isDealer     : dealerId     === i,
            isSmallBlind : smallBlindId === i,
            isBigBlind   : bigBlindId   === i,
            isCurrent    : (i === nextPlayerId) ? 1 : 0
        });

        j += 1;
    }

    return players;
}

export const updateObjectInArray = (array, obj) => {
    return array.map((item, index) => {
        if (index !== obj.index) {
            return item;
        }
    
        return {
            ...item,
            ...obj.item
        }
    })
}
