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
import Modal from '../UI/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import cls from './Modal.css'


const CustomTableCell = withStyles(theme => ({  
  body: {
    fontSize: 14,
    backgroundColor: '#222',
    color: '#fff',
    rowspan:'4'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {    
    padding: theme.spacing.unit * 2,    
    fontSize:'3.5rem',        
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonAdd: {
    margin: theme.spacing.unit,
    backgroundColor:'#f7f7f7f7',
    color:'#222',
    minWidth:'25px'
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
});

@observer class TableExampleControlled extends Component {
  @observable name = '';
  @observable price = 0;
  @observable quantity = 0;
  @observable type = '';
  @observable selected = [];

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

  handleChangeType = () => {};

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
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="dense">Sr.No                  
                  </TableCell>
                  <TableCell padding="dense">Name</TableCell>
                  <TableCell padding="dense">Type</TableCell>
                  <TableCell padding="dense">Quantity</TableCell>
                  <TableCell padding="dense">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {l.map ((ele, id) => (
                  <TableRow selected={this.isSelected (0)} key={id}>
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
                  </TableRow>
                ))}
                <TableRow>                
                  <CustomTableCell colSpan={4} style={{textAlign:'center'}}padding="dense"><Button variant="raised" className={classes.buttonAdd}>+</Button> Total</CustomTableCell>                  
                  <CustomTableCell padding="dense">{list.totalPrice}</CustomTableCell>
                </TableRow>                
              </TableBody>
            </Table>
          </Grid>
        </Grid>        
        {/* <Modal list={list} open={true}/> */}
        <Grid container justify="center" spacing={40} style={{width:'100%',paddingTop:'2%'}}  align="left">
        <Grid item lg={2} >
        <Paper elevation={2} className={cls.paper}>        
          <Icon className={cls.icon}>restaurant</Icon> 
          <span className={cls.iconText}>Food</span>
        </Paper>
        </Grid>
        <Grid item lg={2}>
        <Paper elevation={2} className={cls.paper}>          
          <Icon className={cls.icon}>local_grocery_store</Icon>
          <span className={cls.iconText}>Grocery</span>
        </Paper>
        </Grid>
        <Grid item lg={2}>
        <Paper elevation={2} className={cls.paper}>          
          <Icon className={cls.icon}>local_taxi</Icon>
          <span className={cls.iconText}>Transport</span>
        </Paper>
        </Grid>
        <Grid item lg={2}>
        <Paper elevation={2} className={cls.paper}>          
          <Icon className={cls.icon}>local_gas_station</Icon>
          <span className={cls.iconText}>Fuel</span>
        </Paper>
        </Grid>
        <Grid item lg={2}>
        <Paper elevation={2} className={cls.paper}>
          <Icon className={cls.icon}>add_box</Icon>
          <span className={cls.iconText}>Other</span>
        </Paper>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles (styles) (TableExampleControlled);