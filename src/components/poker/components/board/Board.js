import React       from 'react';
import { connect } from 'react-redux';
import Card        from 'cardComponent/Card';

import './board.css';

const Board = ({ 
    boardCards 
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

            <div className='playingCards all-cards' 
                // onClick={() => tbl.round === 0 ? (resetBoardCards(),
                //                                   resetPlayers(),
                //                                   setDealer(dealerId),
                //                                   storeBoardCards(boardCards), 
                //                                   startGame(), 
                //                                   updatePotsNumber(),
                //                                   storePlayersCards(player),
                //                                   setFirstPlayer(firstPlayerId),
                //                                   updateCurrentPot(),
                //                                   resetTablePot(),
                //                                   setTablePot()) : null}
                                                  >
                <div className='card back'>*</div>
                <div className='clear'></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        boardCards: state.poker.boardCards
    };
};

export default connect(mapStateToProps)(Board);