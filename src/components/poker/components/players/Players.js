import React                from 'react';
import { connect }          from 'react-redux'; 
import { getFirstPlayerId } from 'models/poker';
import Player               from 'playerComponent/Player';

import './players.css';

const Players = ({ pkr }) => {
    
    return (
        <div>
            {
                pkr.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    isCurrent={getFirstPlayerId(player.isBigBlind ? player.seq : -1) !== null
                                             ? getFirstPlayerId(player.isBigBlind ? player.seq : -1)
                                             : ( (player.isCurrent === 1) ? player.seq : null )}
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
        pkr: state.poker
    };
};

export default connect(mapStateToProps)(Players);