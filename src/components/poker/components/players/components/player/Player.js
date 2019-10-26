import React from 'react';

import { 
    connect 
} from 'react-redux';

import {
    Card,
    Action
} from 'components';

import { 
    setCardsSelected 
} from 'models/poker';

import {
    setCardAsSelected
} from 'utils';

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
        <div id={'player-' + playerId}>
            {/* // aftonomo component  */}

            {(playerId === 1 || playerId === 2 || playerId === 3 || playerId === 4) && (<div>
                <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                    {
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='playingCards rotateHand'>    
                                <ul className='hand'>
                                {
                                    player.cards.map((card, index) => {
                                        return (
                                            <li key={index}>
                                                <Card value={card.value} 
                                                        suit={card.suit} 
                                                        openedCards={player.isCurrent === 1 || card.isVisible} 
                                                        selected={setCardAsSelected(selectedCards, card)} 
                                                />
                                            </li>
                                        );
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                    }
                </div>

                <div id={`seat-${player.seq + 1}`} className='seat'>
                    <strong>
                        <div className='seat-lbl'>
                            {
                                player.isDealer 
                                ? `Player ${player.seq + 1} (Dealer)`
                                    : player.isSmallBlind 
                                        ? `Player ${player.seq + 1} (Small Blind)` 
                                        : player.isBigBlind ? `Player ${player.seq + 1} (Big Blind)` 
                                : `Player ${player.seq + 1}`
                            }
                        </div>
                    </strong>
                </div>

                <div className='pl-info'> 
                    <div className={classes.join(' ')}>
                        {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                    </div>
                </div>

                {
                    (player.isCurrent === 1) && <Action tmpPot={tmpPot} round={round} />
                }
            </div>)}

            {(playerId === 6 || playerId === 7 || playerId === 8 || playerId === 9) && (<div>
                <div className='pl-info'> 
                    <div className={classes.join(' ')}>
                        {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                    </div>
                </div>

                {
                    (player.isCurrent === 1) && <Action tmpPot={tmpPot} round={round} />
                }

                <div id={`seat-${player.seq + 1}`} className='seat'>
                    <strong>
                        <div className='seat-lbl'>
                            {
                                player.isDealer 
                                ? `Player ${player.seq + 1} (Dealer)`
                                    : player.isSmallBlind 
                                        ? `Player ${player.seq + 1} (Small Blind)` 
                                        : player.isBigBlind ? `Player ${player.seq + 1} (Big Blind)` 
                                : `Player ${player.seq + 1}`
                            }
                        </div>
                    </strong>
                </div>

                <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                    {
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='playingCards rotateHand'>    
                                <ul className='hand'>
                                    {
                                        player.cards.map((card, index) => {
                                            return (
                                                <li key={index}>
                                                    <Card value={card.value} 
                                                        suit={card.suit} 
                                                        openedCards={player.isCurrent === 1 || card.isVisible} 
                                                        selected={setCardAsSelected(selectedCards, card)} />
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>)}

            {(playerId === 5) && (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id={`seat-${player.seq + 1}`} className='seat'>
                        <strong>
                            <div className='seat-lbl'>
                                {
                                    player.isDealer 
                                    ? `Player ${player.seq + 1} (Dealer)`
                                        : player.isSmallBlind 
                                            ? `Player ${player.seq + 1} (Small Blind)` 
                                            : player.isBigBlind ? `Player ${player.seq + 1} (Big Blind)` 
                                    : `Player ${player.seq + 1}`
                                }
                            </div>
                        </strong>
                    </div>

                    <div className='pl-info'> 
                        <div className={classes.join(' ')}>
                            {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                        </div>
                    </div>

                    {
                        (player.isCurrent === 1) && <Action tmpPot={tmpPot} round={round} />
                    }
                </div>

                <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                    {
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='playingCards rotateHand'>    
                                <ul className='hand'>
                                    {
                                        player.cards.map((card, index) => {
                                            return (
                                                <li key={index}>
                                                    <Card value={card.value} 
                                                        suit={card.suit} 
                                                        openedCards={player.isCurrent === 1 || card.isVisible} 
                                                        selected={setCardAsSelected(selectedCards, card)} />
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
            )}
            
            {(playerId === 10) && (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                    {
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div className='playingCards rotateHand'>    
                                <ul className='hand'>
                                    {
                                        player.cards.map((card, index) => {
                                            return (
                                                <li key={index}>
                                                    <Card value={card.value} 
                                                        suit={card.suit} 
                                                        openedCards={player.isCurrent === 1 || card.isVisible} 
                                                        selected={setCardAsSelected(selectedCards, card)} />
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id={`seat-${player.seq + 1}`} className='seat'>
                        <strong>
                            <div className='seat-lbl'>
                                {
                                    player.isDealer 
                                    ? `Player ${player.seq + 1} (Dealer)`
                                        : player.isSmallBlind 
                                            ? `Player ${player.seq + 1} (Small Blind)` 
                                            : player.isBigBlind ? `Player ${player.seq + 1} (Big Blind)` 
                                    : `Player ${player.seq + 1}`
                                }
                            </div>
                        </strong>
                    </div>

                    <div className='pl-info'> 
                        <div className={classes.join(' ')}>
                            {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                        </div>
                    </div>

                    {
                        (player.isCurrent === 1) && <Action tmpPot={tmpPot} round={round} />
                    }
                </div>
            </div>
            )}

            {/* {(playerId === 10) && (<div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
            <div className='center-player-info-cards' onClick={() => setCardsSelected(winnerCards, player.seq)}>
                {
                    <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <div className='playingCards rotateHand'>    
                            <ul className='hand'>
                                {
                                    player.cards.map((card, index) => {
                                        return (
                                            <li key={index}>
                                                <Card value={card.value} 
                                                    suit={card.suit} 
                                                    openedCards={player.isCurrent === 1 || card.isVisible} 
                                                    selected={setCardAsSelected(selectedCards, card)} />
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    }
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id={`seat-${player.seq + 1}`} className='seat'>
                        <strong>
                            <div className='seat-lbl'>
                                {
                                    player.isDealer 
                                    ? `Player ${player.seq + 1} (Dealer)`
                                        : player.isSmallBlind 
                                            ? `Player ${player.seq + 1} (Small Blind)` 
                                            : player.isBigBlind ? `Player ${player.seq + 1} (Big Blind)` 
                                    : `Player ${player.seq + 1}`
                                }
                            </div>
                        </strong>
                    </div>

                    <div className='pl-info'> 
                        <div className={classes.join(' ')}>
                            {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                        </div>
                    </div>

                    {
                        (player.isCurrent === 1) && <Action tmpPot={tmpPot} round={round} />
                    }
                </div>
            </div>
            )} */}
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