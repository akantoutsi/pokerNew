import React                            from 'react';
import { connect }                      from 'react-redux';
import Card                             from 'cardComponent/Card';
import { resetGame, setCardAsSelected } from 'models/poker';

import './board.css';

const Board = ({ 
    round,
    boardCards,
    resetGame,
    selectedCards 
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
                                : <Card value={card.value} 
                                        suit={card.suit} 
                                        openedCards={1} 
                                        selected={setCardAsSelected(selectedCards, card)} />
                            }
                        </div>
                    );
                })
            }

            <div className='playingCards all-cards' onClick={round === -1 ? resetGame : null}>
                <div className='card back'>*</div>
                <div className='clear'></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        round: state.poker.round,
        boardCards: state.poker.boardCards,
        selectedCards: state.poker.selectedCards
    };
};

const mapActionsToProps = { resetGame };

export default connect(mapStateToProps, mapActionsToProps)(Board);