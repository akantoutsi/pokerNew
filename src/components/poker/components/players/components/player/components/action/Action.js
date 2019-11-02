import React from 'react';

import { 
    connect 
} from 'react-redux';

import { 
    incrementPot, 
    decrementPot, 
    nextMove, 
    fold 
} from 'models/poker';

import './action.css';

const Action = ({ 
    tmpPot, 
    round,
    incrementPot, 
    decrementPot, 
    nextMove,
    fold
 }) => {

    return (
        round < 5 && (
            <div style={{ display: 'inline-block' }}>
                <div className='pot-btns'>
                    <button className='update-pot-btn' onClick={incrementPot}>+</button> 
                    <div style={{ margin: '8px 18px', display: 'inline-block' }}>{tmpPot}</div>
                    <button className='update-pot-btn' onClick={decrementPot}>-</button>
                </div>
                
                <button className='exit-btn' onClick={fold}>
                    <i className='fa fa-close'></i>
                </button> 

                <button className='next-btn' onClick={nextMove}>                                                         
                    <strong>{`Next`}</strong>
                </button> 
            </div>
        )
    );
}

const mapActionsToProps = { incrementPot, decrementPot, nextMove, fold };

export default connect(null, mapActionsToProps)(Action);