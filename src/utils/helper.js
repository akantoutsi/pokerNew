import _           from 'lodash';
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
    return cards.slice(consts.NUM_OF_PLAYERS*2, (consts.NUM_OF_PLAYERS*2)+5).map(elem => ({ ...elem, belongsTo: 'board', selected: false, isVisible: false }));
}

export const initializePlayers = (dlId, cards) => {
    let j       = 0;
    let players = [];

    for (let i=0; i<consts.NUM_OF_PLAYERS; i++) {
        let dealerId      = (dlId + 1 >= consts.NUM_OF_PLAYERS) 
                          ?  dlId + 1 -  consts.NUM_OF_PLAYERS 
                          :  dlId + 1

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
            // seq          : Math.floor((consts.NUM_OF_PLAYERS / (i + 1))), 
            isActive     : 1,
            cards        : cards.slice(i+j, i+j+2).map(elem => ({...elem, belongsTo: i, selected: false})),
            cash         : (smallBlindId === i) ? cash - consts.SMALL_BLIND_AMOUNT : 
                           (bigBlindId   === i) ? cash - consts.SMALL_BLIND_AMOUNT*2 : cash,
            pot          : pot,
            tmpPot       : pot,                           
            potChanged   : (bigBlindId  === i || smallBlindId === i) ? 1 : 0,
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

export const setNextPlayer = (arr, currentPlayer) => {
    let nextPlayerId = (arr.findIndex(elem => elem.seq > currentPlayer.seq) !== -1) 
                     ?  arr.findIndex(elem => elem.seq > currentPlayer.seq) 
                     :  0;
                    
    arr[nextPlayerId].isCurrent = 1;

    return arr[nextPlayerId];
}

export const cardsToOpen = (arr, openAllBoardCards) => {
    const cardsClosed = arr.reduce((acc, elem) => {
        acc += (elem.isVisible === false) ? 1 : 0;
        return acc;
    }, 0);

    let   howManyToOpen = 0;
    let   fromIndex     = 0;
    let   slicedArr     = [];
    let   retArr        = [];

    if (!openAllBoardCards) {
        switch (cardsClosed) {
            case arr.length:
                howManyToOpen = 3;
                fromIndex     = 0;
                break;

            case 2:
                howManyToOpen = 1;
                fromIndex     = 3;  
                break;

            case 1:
                howManyToOpen = 1;
                fromIndex     = 4;
                break;

            default:
                howManyToOpen = 0;
                break;
        }

        if (howManyToOpen > 0) {
            slicedArr = arr.slice(fromIndex, fromIndex + howManyToOpen);
            retArr    = slicedArr.map(e => ({ ...e, isVisible: true }));
        
            if (howManyToOpen === 3) {
                const [first, second, third] = retArr; 
                arr.splice(fromIndex, howManyToOpen, first, second, third);
        
            } else {
                const [first] = retArr; 
                arr.splice(fromIndex, howManyToOpen, first);
            }
        }

    } else {
        howManyToOpen = arr.length;
        fromIndex     = 0;

        slicedArr = arr.slice();
        retArr    = slicedArr.map(e => ({ ...e, isVisible: true }));

        const [first, second, third, fourth, fifth] = retArr;
        arr.splice(fromIndex, howManyToOpen, first, second, third, fourth, fifth); 
    }

    return arr;
}

export const sortArray = arr => {
    const res = arr.sort((a, b) => a.rank < b.rank ? 1 : -1);
  
    return res;
}

export const groupByProperty = (ourArray, property) => {
    return ourArray.reduce(function (accumulator, object) {
        const key = object[property];

        if (!accumulator[key]) {
            accumulator[key] = [];
        }

        accumulator[key].push(object);

        return accumulator;
    }, {});
}

const containsStraight = arr => {
    let res       = [];
    let firstElem = arr[0];

    res.push(firstElem);

    for (let i=0; i<=arr.length-1; i++) { 
        if (res.length < 5) {
            if (parseInt(firstElem.rank) === parseInt(arr[i].rank) + 1) { 
                res.push(arr[i]); 
                firstElem = arr[i];
            
            } else { 
                res       = [];               
                firstElem = arr[i];
                res.push(firstElem);
            } 
        }
    }
    return res;
}

const sameCardExistsNtimes = (arr, freq) => {
    let res = arr.find(e => e[1].freq === freq);
    return (res) ? res : [];
}

const getPlayersValidCombinations = (updatedBoardCards, activePlrs) => {
    let acceptedCombinations = [];
    let slicedBoardCards     = updatedBoardCards.slice();

    let concatBoardWithPlayerCards = activePlrs.map(elem => {
        return elem.cards.concat(slicedBoardCards.map(el => ({ ...el, belongsTo: elem.cards[0].belongsTo, isBoard: true })));
    });

    for (let elem of concatBoardWithPlayerCards) {
        let sortedComb             = sortArray(elem);
        let grpCardsBySuit         = groupByProperty(sortedComb, 'suit');
        let tmpGroupedCardsByValue = groupByProperty(sortedComb, 'rank');

        for (let el in tmpGroupedCardsByValue) { 
            tmpGroupedCardsByValue[el].freq = tmpGroupedCardsByValue[el].length; 
        }

        let grpCardsByValue = Object.entries(tmpGroupedCardsByValue);
        sortArray(grpCardsByValue, grpCardsByValue[1]);

        let pokerComb = findCombination(grpCardsBySuit, grpCardsByValue);
        
        acceptedCombinations.push(pokerComb);
    }

    return acceptedCombinations;
}

const getWinners = arr => {
    let grouped = arr.map(elem => {
        return elem.reduce((acc, el) => {
            const key = elem.typeOfCombination;
        
            if (!acc[key]) {
                acc[key] = [];
            }
    
            el.typeOfCombination = key;
            acc[key].push(el);
    
            return acc;
        }, {});
    });
      
    let groupedArr  = grouped.map(elem => Object.entries(elem));    
    let comb        = groupedArr.reduce((acc, el) => { acc[0] = (acc[0] === undefined || el[0][0] < acc[0]) ? el[0][0] : acc[0]; return acc; }, []);
    let arrFiltered = groupedArr.filter(elem => elem[0].includes(comb[0]));
    let res         = arrFiltered.map(elem => elem[0][1]);

    return res;
}

export const findWinCombinations = (updatedBoardCards, activePlrs) => {
    let acceptedCombinations = getPlayersValidCombinations(updatedBoardCards, activePlrs);
    let result               = getWinners(acceptedCombinations);

    if (result.length >= 1) {
        let bestCards = _.orderBy(result);

        let bestCombNum = bestCards[0].reduce((acc, elem) => { 
            acc = (elem.typeOfCombination > acc) ? acc : elem.typeOfCombination; 
            return acc; 
        }, bestCards[0].typeOfCombination);

        let winCombinations = bestCards.filter(elem => elem[0].typeOfCombination === bestCombNum);

        return winCombinations;
    }
}

export const findWinnerIds = (updatedBoardCards, activePlrs) => {
    let winCombinations = findWinCombinations(updatedBoardCards, activePlrs);
    let winnerIds       = getWinnerIds(winCombinations);

    return winnerIds;
}

export const findWinnerCards = (updatedBoardCards, activePlrs) => {
    let winCombinations    = findWinCombinations(updatedBoardCards, activePlrs);
    let winnerCards        = winCombinations.map(elem => elem.slice(0, elem[0].typeOfCombination));
    let updatedWinnerCards = winnerCards;

    return updatedWinnerCards;
}

const getWinnerIds = (arr) => {
    return arr.map(elem => {
        return elem.reduce((acc, el) => { 
            acc = (el.belongsTo !== 'board') ? parseInt(el.belongsTo) : 'board';  
            return acc; 
        }, -1);
    });
}     

const findCombination = (groupedCardsBySuit, groupedCardsByValue) => { 
    let winCombination    = [];
    let typeOfCombination = 0;

    // [1, 2] Royal Flush or Straight Flush - OK
    for (let elem in groupedCardsBySuit) {
        let cardToCheck = groupedCardsBySuit[elem];
        let res         = containsStraight(cardToCheck);

        if (res.length === 5) {
            if (res[0].rank === 14) {
                typeOfCombination = 1;

            } else {
                typeOfCombination = 2;
            }

            winCombination = res;
            _.set(winCombination, 'typeOfCombination', typeOfCombination);

            return winCombination;
        }
    }

    // [3] Four of a Kind - OK
    let fours = [];
    fours     = sameCardExistsNtimes(groupedCardsByValue, 4); 

    if (fours.length > 0) {
        typeOfCombination = 3;
        winCombination    = fours[1].slice(0, fours[1].freq);
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    }

    // [4] Full House - OK
    let threes = [];
    threes     = sameCardExistsNtimes(groupedCardsByValue, 3);

    if (threes.length > 0) {
        let copiedGroupedCardsByValue = _.cloneDeep(groupedCardsByValue);

        let index  = copiedGroupedCardsByValue.indexOf(threes);
        copiedGroupedCardsByValue.splice(index, 1);
        let twos = copiedGroupedCardsByValue.find(e => e[1].freq >= 2);

        if (twos) {
            typeOfCombination = 4;
            winCombination    = threes[1].slice(0, threes[1].freq).concat(twos[1].slice(0, twos[1].freq));
            _.set(winCombination, 'typeOfCombination', typeOfCombination);

            return winCombination;
        }
    };
    
    // [5] Flush - OK
    for (let elem in groupedCardsBySuit) {
        if (groupedCardsBySuit[elem].length === 5) {
            typeOfCombination = 5;
            winCombination    = groupedCardsBySuit[elem];
            _.set(winCombination, 'typeOfCombination', typeOfCombination);

            return winCombination;
        }
    }

    // [6] Straight - OK
    let newGrp = [];
    for (let elem in groupedCardsByValue) {
        newGrp.push(groupedCardsByValue[elem][1][0]);
    }

    let possibleStraight = containsStraight(newGrp);
    if (possibleStraight.length === 5) {
        typeOfCombination = 6;
        winCombination    = possibleStraight;
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    }

    if (possibleStraight.length === 4) {
        let twoExists = (possibleStraight.find(el => el.rank === 2)) ? 1 : 0;

        if (twoExists) {
            let copiedGrpCardsByValue = _.cloneDeep(newGrp);
        
            let aceExists = copiedGrpCardsByValue.reduce((acc, elem) => { 
                acc += (elem.rank === 14) ? 1 : 0; 
                return acc; 
            }, 0);

            // ean exw dio aces ti tha girisei???
            if (aceExists === 1) {
                let toCheck = copiedGrpCardsByValue.map(elem => (elem.rank === 14) ? {...elem, rank: 1} : elem);

                toCheck.splice(toCheck.length - 1, 1, toCheck.splice(0, 1)[0]);
                possibleStraight = containsStraight(toCheck);

                typeOfCombination = 6;
                winCombination    = possibleStraight;
                _.set(winCombination, 'typeOfCombination', typeOfCombination);

                return winCombination;
            }
        }
    }

    // [7] Three of a Kind - OK
    let threeOfKind = [];
    threeOfKind     = sameCardExistsNtimes(groupedCardsByValue, 3);

    if (threeOfKind.length > 0) {
        typeOfCombination = 7;
        winCombination    = threeOfKind[1].slice(0, threeOfKind.freq);
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    }

    // [8] Two Pairs - OK
    let twos = [];
    twos     = groupedCardsByValue.filter(e => e[1].freq === 2);

    if (twos.length >= 2) {
        typeOfCombination = 8;
        winCombination    = twos[0][1].concat(twos[1][1]);
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    }

    // [9] Pair - OK
    if (twos.length === 1) {
        typeOfCombination = 9;
        winCombination    = twos[0][1].slice(0, twos[0][1].freq);
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    } 

    // [10] High Card - OK
    if (winCombination) {
        typeOfCombination = 10;
        winCombination    = groupedCardsByValue[0][1].slice(0, groupedCardsByValue[0][1].freq);
        _.set(winCombination, 'typeOfCombination', typeOfCombination);

        return winCombination;
    }
}

export const getDealerId = arr => {
    let res = arr.reduce((acc, elem) => { 
        acc = elem.isDealer ? elem : acc; 
        return acc; 
        }, {});

    return res.seq;
}
 
export const getFirstPlayerId = bigBlindId => {
    return (bigBlindId + 1 >= consts.NUM_OF_PLAYERS)
            ?  bigBlindId + 1 - consts.NUM_OF_PLAYERS 
            :  bigBlindId + 1;
}
 
export const getCurrentPlayer = arr => {
    return arr.find(elem => elem.isCurrent === 1);
}
 
export const calcMaxPot = arr => {
    return arr.reduce((max, elem) => {
        max = (elem.pot > max) ? elem.pot : max;   
        return max;
    }, 0);
}
 
export const playersWithSamePot = arr => {
    const maxPot = calcMaxPot(arr);

    return arr.reduce((acc, elem) => {
        acc += (elem.tmpPot === maxPot && elem.potChanged === 1) ? 1 : 0;
        return acc;
    }, 0);
}
 
export const getSelectedCards = (winCards, playerId) => {
    return winCards.filter(elem => (elem[0].belongsTo === playerId));
}
 
export const setCardAsSelected = (selectedCards, card) => {
    return selectedCards.map(elem => elem.reduce((acc, el) => { 
        acc = (el.suit === card.suit && el.value === card.value) ? true : acc; 
        return acc; 
    }, false))[0];
}