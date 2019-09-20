import React  from 'react';
import Card   from 'cardComponent/Card';
import Action from 'actionComponent/Action';

import './player.css';

const Player = ({ 
    player, 
    round 
}) => {

    const playerId = player.seq + 1;
    let classes    = [];
    classes.push((player.isActive === 0) ? 'inactive-player' : null);
    
    return ( 
        <div id={'player-' + playerId} className='player-info'>              
            <div className='center-player-info pl-info'> 
                <div className={classes.join(' ')}>
                    {`Cash: €${player.cash} - Pot: €${player.tmpPot}`}
                </div>
            </div>

            {
                (player.isCurrent === 1) &&
                    <div className='center-player-info center-player-btns'> 
                        <Action tmpPot={player.tmpPot} round={round} />
                    </div>
            }

            <div className='center-player-info-cards'>
                {
                    player.cards.map((card, index) => {
                        return (
                            <div key={index}>
                                <div className='playingCards'>
                                    <Card value={card.value} suit={card.suit} openedCards={player.isCurrent === 1 || card.selected} selected={card.selected} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Player;