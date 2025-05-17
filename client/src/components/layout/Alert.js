import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../features/alert/alertSlice';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alert);

  const handleClose = (id) => {
    dispatch(removeAlert(id));
  };

  return (
    <>
      {alerts.map(alert => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(alert.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert
            onClose={() => handleClose(alert.id)}
            severity={alert.alertType}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alert; 