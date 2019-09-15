import React                from 'react';
import { connect }          from 'react-redux'; 
import { getFirstPlayerId } from 'models/poker';
import Player               from 'playerComponent/Player';

import './players.css';

const Players = ({ 
    pkr,
    incrementPot,
    decrementPot
 }) => {

    return (
        <div>
            {
                pkr.players.map((player, index) => {
                    return (
                        <div key={index}>
                            <Player player={player} 
                                    isNext      ={getFirstPlayerId() !== null
                                                ? getFirstPlayerId()
                                                : ( (player.isNext === 1) ? player.seq : null )}
                                    incrementPot={incrementPot} 
                                    decrementPot={decrementPot} 
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