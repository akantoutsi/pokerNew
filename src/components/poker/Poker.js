import React   from 'react';
import Players from 'playersComponent/Players';
import Board   from 'boardComponent/Board';

const Poker = ({ }) => {
    return (
        <div>
            <Players />
            <Board />
        </div>
    );
}

export default Poker;