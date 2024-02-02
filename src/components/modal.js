import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DenseTable from './table';
import { priceTableData, appConstants } from '../constants/constants';

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

  export default function BasicModal(props) {
  
    return (
      <div>
        <Modal
          open={props.open}
          onClose={() => props.setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <DenseTable data={props.priceBreak} columnList={priceTableData} key={appConstants.priceTableKey}/>
          </Box>
        </Modal>
      </div>
    );
  }