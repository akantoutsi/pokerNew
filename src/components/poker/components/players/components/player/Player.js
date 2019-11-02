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
import { relative } from 'path';

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
            {
                (playerId === 1 || playerId === 2 || playerId === 3 || playerId === 4) && 
                (
                    <div style={{ width: '250px' }}>
                        <div style={{ height: '260px' }}>
                            <div className='playingCards rotateHand' onClick={() => setCardsSelected(winnerCards, player.seq)}>
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

                            {
                                player.isCurrent === 1 && <Action tmpPot={tmpPot} round={round} />
                            }                          
                        </div>

                        <div className='seat pl-info'>
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

                            <div className={classes.join(' ')}>
                                {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                (playerId === 6 || playerId === 7 || playerId === 8 || playerId === 9) && 
                (
                    <div style={{ width: '250px' }}>
                        <div style={{ height: '140px' }}>
                            <div className='seat pl-info' style={{ marginBottom: '20px' }}>
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

                                <div className={classes.join(' ')}>
                                    {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                                </div>
                            </div>

                            {
                                player.isCurrent === 1 && <Action tmpPot={tmpPot} round={round} />
                            }
                        </div>
                    
                        <div className='playingCards rotateHand' onClick={() => setCardsSelected(winnerCards, player.seq)}>    
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
                )
            }

            {
                (playerId === 5) && 
                (
                    <div>
                        <div className='seat pl-info' style={{ position: 'absolute', left: '1px', top: '50px' }}>
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

                            <div className={classes.join(' ')}>
                                {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                            </div>
                        </div>

                        <div className='playingCards rotateHand' onClick={() => setCardsSelected(winnerCards, player.seq)} 
                            style={{ display: 'inline-block' }}>    
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

                        <div style={{ position: 'absolute', left: '0', bottom: '0' }}>
                            {
                                (player.isCurrent === 1 && <Action tmpPot={tmpPot} round={round} />)
                            }
                        </div>
                    </div>
                )
            }

            {
                (playerId === 10) &&
                (
                    <div>
                        <div id={`seat-${player.seq + 1}`} className='seat pl-info' style={{ display: 'inline-block', position: 'absolute', right: '1px', top: '50px' }}>
                            <strong>
                                <div className='seat-lbl' style={{ display: 'inline-block' }}>
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

                            <div className={classes.join(' ')}>
                                {`Cash: €${tmpCash} - Pot: €${tmpPot}`}
                            </div>
                        </div>

                        <div className='playingCards rotateHand' onClick={() => setCardsSelected(winnerCards, player.seq)} 
                             style={{ display: 'inline-block', position: 'relative', right: '61%' }}>    
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

                        <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
                            {
                                (player.isCurrent === 1 && <Action tmpPot={tmpPot} round={round} />)
                            }
                        </div>
                    </div>
                )
            }
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