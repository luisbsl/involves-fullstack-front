import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import PropTypes from 'prop-types'

const ErroDialog = (props) => {
  const { open, onClose } = props
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Problemas de conexão com API
            </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

ErroDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ErroDialog