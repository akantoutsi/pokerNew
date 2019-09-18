import React                                    from 'react';
import { connect }                              from 'react-redux';
import { incrementPot, decrementPot, nextMove } from 'models/poker';

import './action.css';

const Action = ({ 
    tmpPot, 
    incrementPot, 
    decrementPot, 
    nextMove
 }) => {
    
    return (
        <div className='pot-btns'>
            <button className='update-pot-btn' onClick={incrementPot}>+</button> 

            <div style={{margin: '18px'}}>{tmpPot}</div>

            <button className='update-pot-btn' onClick={decrementPot}>-</button>
            
            <button className='exit-btn'>
                <i className='fa fa-close'></i>
            </button> 

            <button className='next-btn' onClick={nextMove}>                                                         
                <strong>{`Next`}</strong>
            </button> 
        </div>
    );
}

const mapActionsToProps = { incrementPot, decrementPot, nextMove };

export default connect(null, mapActionsToProps)(Action);