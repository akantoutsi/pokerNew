import React                from 'react';
import { connect }          from 'react-redux'; 
import { getFirstPlayerId } from 'models/poker';
import Player               from 'playerComponent/Player';

import './players.css';

const Players = ({ 
    round, 
    players 
}) => {
// console.log(players)
    return (
        <div>
            {
                players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
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