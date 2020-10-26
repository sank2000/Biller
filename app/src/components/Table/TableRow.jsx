import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

export default withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);