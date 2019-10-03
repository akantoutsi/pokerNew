import React                                   from 'react';
import { connect }                             from 'react-redux';
import Card                                    from 'cardComponent/Card';
import Action                                  from 'actionComponent/Action';
import { setCardsSelected, setCardAsSelected } from 'models/poker';

import './player.css';

const Player = ({ 
    player, 
    tmpPot,
    tmpCash,
    round,
    winnerCards,
    setCardsSelected,
    selectedCards 
}) => {

    const playerId = player.seq + 1;
    let classes    = [];
    classes.push((player.isActive === 0) ? 'inactive-player' : null);

    return ( 
        <div id={'player-' + playerId} className='player-info'>              
            <div className='center-player-info pl-info'> 
                <div className={classes.join(' ')}>
                    
                    {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                </div>
            </div>

            {
                (player.isCurrent === 1) &&
                    <div className='center-player-info center-player-btns'> 
                        <Action tmpPot={tmpPot} round={round} />
                    </div>
            }

            <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                {
                    player.cards.map((card, index) => {
                        return (
                            <div key={index}>
                                <div className='playingCards'>                                    
                                    <Card value={card.value} 
                                          suit={card.suit} 
                                          openedCards={player.isCurrent === 1 || card.isVisible} 
                                          selected={setCardAsSelected(selectedCards, card)} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        winnerCards: state.poker.winnerCards,
        selectedCards: state.poker.selectedCards
    };
};

const mapActionsToProps = { setCardsSelected };

export default connect(mapStateToProps, mapActionsToProps)(Player);