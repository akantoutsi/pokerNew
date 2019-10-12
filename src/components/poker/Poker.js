import React from 'react';

import { 
    connect 
} from 'react-redux';

import _ from 'lodash';

import { 
    Board, 
    Players,
    SnackBar 
} from 'components';

import { 
    calcTablePot 
} 
from 'models/poker';

import './poker.css';

const Poker = ({ 
    pkr,
    tablePot
 }) => {

    return (
        <div>
            {
                pkr.winnerCards.length > 0 && (
                <SnackBar 
                    message={`The winning combination is ${_.get(pkr.winningCombinations[pkr.winnerCards[0][0].typeOfCombination - 1], 'title')}. Winner(s) are player(s): ${pkr.winnerIds.map(elem => elem + 1)}`} 
                    open={true}
                />)
            }

            <div className='window-class'>
                <div className='table-wrapper'>
                    {
                        (pkr.round >= -1) && (
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
                        }))
                    }
                    
                    <div className='Table'>
                        <strong><div>{`Sum: ${tablePot}`}</div></strong>
                        
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
        pkr: state.poker,
        tablePot: calcTablePot(state.poker.players.filter(elem => elem.isActive === 1))
    };
};

export default connect(mapStateToProps)(Poker);