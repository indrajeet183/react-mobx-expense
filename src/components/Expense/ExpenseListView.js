import React, {Component} from 'react';

import Chip from 'material-ui/Chip';
import {
  default as Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import cls from './Modal.css';
import InputPopover from '../UI/InputPopover';
import Popover from 'material-ui/Popover';
import ExpenseTypeBtn from './ExpenseTypeBtn';

const CustomTableCell = withStyles (theme => ({
  body: {
    fontSize: 14,
    backgroundColor: '#222',
    color: '#fff',
    rowspan: '4',
  },
})) (TableCell);

const CustomTableRow = withStyles (theme => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
})) (TableRow);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    fontSize: '3.5rem',
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonAdd: {
    margin: theme.spacing.unit,
    backgroundColor: '#f7f7f7f7',
    color: '#222',
    minWidth: '25px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: '#212121',
    color: '#fff',
  },
  selectEmpty: {
    padding: '15px',
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

@observer class TableExampleControlled extends Component {
  @observable name = '';
  @observable price = 0;
  @observable quantity = 0;
  @observable type = '';
  @observable selected = [];
  @observable anchorEl = null;

  isSelected = index => {
    return this.selected.indexOf (index) !== -1;
  };

  handleRowSelection = selectedRows => {
    this.setState ({
      selected: selectedRows,
    });
  };

  handleAddExpense = item => {
    this.props.list.addItem ({
      name: this.name,
      price: parseInt (this.price, 10),
      quantity: parseInt (this.quantity, 10),
      type: this.type,
    });
    this.clear ();
  };

  handleClick = (event,type) => {
    this.type = type;
    this.anchorEl = event.currentTarget;
  };

  handleClose = () => {
    this.anchorEl = null;
  };

  clear = () => {
    this.name = '';
    this.price = 0;
    this.quantity = 0;
  };

  render () {
    const {classes, list} = this.props;
    const l = [...list.items];
    return (
      <div className={classes.root}>      
        <Grid container justify='center' style={{paddingTop:'2rem'}}>
          <Grid item xs={12} sm={6}>          
          <Paper>
            <Table>
              <TableHead>
                <CustomTableRow>
                  <CustomTableCell padding="dense">
                    Sr.No{' '}
                  </CustomTableCell>
                  <TableCell padding="dense">Name</TableCell>
                  <TableCell padding="dense">Type</TableCell>
                  <TableCell padding="dense">Quantity</TableCell>
                  <TableCell padding="dense">Total Price</TableCell>
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {l.map ((ele, id) => (
                  <CustomTableRow selected={this.isSelected (0)} key={id} className={cls['table-row']}>
                    <TableCell padding="dense">{id + 1}</TableCell>
                    <TableCell padding="dense">{ele.name}</TableCell>
                    <TableCell padding="dense">{ele.type}</TableCell>
                    <TableCell padding="dense">
                      {ele.quantity ? ele.quantity : 'All'}
                    </TableCell>
                    {ele.quantity
                      ? <TableCell padding="dense">
                          {ele.totalPrice}
                          <Chip
                            label={'Each ' + ele.price}
                            className={classes.chip}
                          />
                        </TableCell>
                      : <TableCell padding="dense">
                          {ele.totalPrice}
                          <Chip
                            label={'All ' + ele.price}
                            className={classes.chip}
                          />
                        </TableCell>}
                  </CustomTableRow>
                ))}
                <CustomTableRow>
                  <CustomTableCell
                    colSpan={4}
                    style={{textAlign: 'center'}}
                    padding="dense"
                  >                    
                    {' '}
                    Total
                  </CustomTableCell>
                  <CustomTableCell padding="dense">
                    {list.totalPrice}
                  </CustomTableCell>
                </CustomTableRow>
              </TableBody>            
            </Table>
            </Paper>
          </Grid>
        </Grid>
        <div>
          <InputPopover 
            anchorEl={this.anchorEl}
            close={this.handleClose} 
            type={this.type} 
            list={list}
            />
        </div>
        <ExpenseTypeBtn clicked={this.handleClick}/>        
      </div>
    );
  }
}

export default withStyles (styles) (TableExampleControlled);
