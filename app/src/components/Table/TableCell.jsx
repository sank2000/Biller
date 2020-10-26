import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

export default withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);