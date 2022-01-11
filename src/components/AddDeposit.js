import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import app from '../realmApp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddDeposit({getDeposits}){
  const [amount, setAmount] = useState(0.0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    console.log(amount);
    setLoading(true);
    const res = await app.currentUser.functions.addDeposit(parseFloat(amount), app.currentUser.customData.groupId);
    console.log(res);
    handleClose();
    getDeposits();
  }

  return (
    <div>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" onSubmit={handleDeposit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="amount"
              name="amount"
              autoFocus
              onChange={e => setAmount(e.target.value)}
            />
            {loading? (
            <LoadingButton loading fullWidth variant="contained">
              Submit
            </LoadingButton>
            ):(
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Deposit
            </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

AddDeposit.propTypes = {
  getDeposits: PropTypes.func.isRequired
}
