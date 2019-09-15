import React       from 'react';
import { connect } from 'react-redux';
import Players     from 'playersComponent/Players';
import Board       from 'boardComponent/Board';

import './poker.css';

const Poker = ({ pkr }) => {
    return (
        <div>
            <div className='window-class'>
                <div className='table-wrapper'>
                    {
                        pkr.players.map((player, index) => {
                            return (
                                <div key={index}>
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
                                </div>
                            );
                        })
                    }

                    <strong><div className='center'>{`Sum: ${pkr.tablePot}`}</div></strong>
                    
                    <div className='Table'>
                        <Players />
                        <Board />
                    </div>
                </div>
            </div> 
        </div>
    );
}

const mapStateToProps = state => {
    return {
        pkr: state.poker
    };
};

export default connect(mapStateToProps)(Poker);