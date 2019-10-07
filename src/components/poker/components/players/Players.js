import React                from 'react';
import { connect }          from 'react-redux'; 
import { getFirstPlayerId } from 'utils';
import Player               from 'components/poker/components/players/components/player';

import './players.css';

const Players = ({ 
    round, 
    players
}) => {

    return (
        <div>
            {(round >= -1) &&
                players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    tmpPot={player.tmpPot}
                                    tmpCash={player.cash}
                                    isCurrent={getFirstPlayerId(player.isBigBlind ? player.seq : -1) !== null
                                             ? getFirstPlayerId(player.isBigBlind ? player.seq : -1)
                                             : ( (player.isCurrent === 1) ? player.seq : null )}
                                    round={round}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        round: state.poker.round,
        players: state.poker.players
    };
};

export default connect(mapStateToProps)(Players);