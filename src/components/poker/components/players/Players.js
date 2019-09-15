import React  from 'react';
import Player from 'playerComponent/Player';

const Players = () => {
    const players = [
        {    
            cards: [
                {
                    belongsTo: 0,
                    isVisible: false,
                    rank: 9,
                    selected: false,
                    suit: 'hearts',
                    value: '9'
                },
                {
                    belongsTo: 0,
                    isVisible: false,
                    rank: 12,
                    selected: false,
                    suit: 'diams',
                    value: 'Q'
                }
            ],
            seq: 0,
            isActive: 1,
            cash: 18,
            pot: 0,
            potChanged: 0,
            hisTurn: 0,
            isDealer: true,
            isBigBlind: false,
            isSmallBlind: false
            // maxPot: 18,
            // potNotLessThan: 4,
            // previousPot: 0,
        },
        {
            cards: [
                {
                    belongsTo: 1,
                    isVisible: false,
                    rank: 14,
                    selected: false,
                    suit: 'hearts',
                    value: 'A'
                },
                {    
                    belongsTo: 1,
                    isVisible: false,
                    rank: 5,
                    selected: false,
                    suit: 'hearts',
                    value: '5'
                }
            ],
            seq: 1,
            isActive: 1,
            cash: 3,
            pot: 2,
            potChanged: 0,
            hisTurn: 0,
            isDealer: false,
            isBigBlind: false,
            isSmallBlind: true
            // maxPot: 5,
            // potNotLessThan: 4,
            // previousPot: 2,
        },
        {
            cards: [
                {
                    belongsTo: 2,
                    isVisible: false,
                    rank: 7,
                    selected: false,
                    suit: 'hearts',
                    value: '7'
                },
                {
                    belongsTo: 2,
                    isVisible: false,
                    rank: 11,
                    selected: false,
                    suit: 'diams',
                    value: 'J'
                }
            ],
            seq: 2,
            isActive: 1,
            cash: 11,
            pot: 4,
            potChanged: 0,
            hisTurn: 0,
            isDealer: false,
            isBigBlind: true,
            isSmallBlind: false
            // maxPot: 15,
            // potNotLessThan: 4,
            // previousPot: 4,
        },
        {
            cards: [
                {
                    belongsTo: 3,
                    isVisible: false,
                    rank: 2,
                    selected: false,
                    suit: 'diams',
                    value: '2'
                },
                {    
                    belongsTo: 3,
                    isVisible: false,
                    rank: 7,
                    selected: false,
                    suit: 'clubs',
                    value: '7'
                }
            ],   
            seq: 3,
            isActive: 1,
            cash: 5,
            pot: 0,
            potChanged: 0,
            hisTurn: 1,
            isDealer: false,
            isBigBlind: false,
            isSmallBlind: false
            // maxPot: 5,
            // potNotLessThan: 4,
            // previousPot: 0,
        }
    ];

    return (
        <div>
            {
                players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Players;