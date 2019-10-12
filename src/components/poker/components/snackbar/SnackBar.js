import React           from 'react';
import Snackbar        from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const PositionedSnackbar = ({
    message,
    open
}) => {

    const [state] = React.useState({
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal } = state;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}>
                <SnackbarContent style={{
                        backgroundColor: 'teal'
                    }}
                    message={<span>{message}</span>}
                />
            </Snackbar>
        </div>
    );
}

export default PositionedSnackbar;