import * as consts from 'utils/constants';

export const getFirstPlayerId = (bigBlindId) => {
    return (bigBlindId + 1 >= consts.NUM_OF_PLAYERS)
            ?  bigBlindId + 1  - consts.NUM_OF_PLAYERS 
            :  bigBlindId + 1;

}
