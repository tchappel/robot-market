import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

type SimpleDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

const SimpleDialog = ({ open, title, content, onClose }: SimpleDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      aria-describedby="simple-dialog-content"
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="simple-dialog-content">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
