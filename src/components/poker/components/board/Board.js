import React         from 'react';
import { connect }   from 'react-redux';
import Card          from 'cardComponent/Card';
import { resetGame } from 'models/poker';

import './board.css';

const Board = ({ 
    round,
    boardCards,
    resetGame 
}) => {

    return ( 
        <div className='Board'> 
            {
                boardCards.map((card, index) => {
                    return (
                        <div className='playingCards' key={index}>
                            {   
                                (!card.isVisible)
                                ? <div className='card back'>*</div>
                                : <Card value={card.value} suit={card.suit} openedCards={1} selected={card.selected} />
                            }
                        </div>
                    );
                })
            }

            <div className='playingCards all-cards' onClick={round === 0 ? resetGame : null} 
                // onClick={() => tbl.round === 0 ? (
                //                                   setDealer(dealerId),
                //                                   setFirstPlayer(firstPlayerId),
                                                  >
                <div className='card back'>*</div>
                <div className='clear'></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        round: state.poker.round,
        boardCards: state.poker.boardCards
    };
};

const mapActionsToProps = { resetGame };

export default connect(mapStateToProps, mapActionsToProps)(Board);