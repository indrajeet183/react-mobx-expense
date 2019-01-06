import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// import TextField from 'material-ui/TextField';
import TextField from '@material-ui/core/TextField';
import {InputLabel} from 'material-ui/Input';
import classNames from 'classnames';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Save from '@material-ui/icons/Save';
import {observer, inject} from 'mobx-react';
import {observable,toJS} from 'mobx';
import Popover from 'material-ui/Popover';
import { addExpense } from '../../services/Api'

const styles = theme => ({
  root: theme.mixins.gutters ({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  typography: {
    margin: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create (['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join (','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  popover: {
    padding:'1rem'
  }
});

@inject("expenseStore")
@observer class InputPopover extends Component {
  @observable name = '';
  @observable price = 0;
  @observable quantity = 0;
  @observable type = '';
  @observable selected = [];

  handleAddExpense = item => {
    const { expenseStore } = this.props;    
    console.log(expenseStore)
    const data = {
      name: this.name,
      price: parseInt (this.price, 10),
      quantity: parseInt (this.quantity, 10),
      type: this.props.type,
    }

    expenseStore.addItem (data)
    console.log(toJS(expenseStore))
    addExpense({...data,date:expenseStore.date}).then((res)=> console.log(res));
    this.clear ();
    console.log('Categories',expenseStore.allCategories);
    console.log('Chart Data',expenseStore.chartData);
  };

  clear = () => {
    this.name = '';
    this.price = 0;
    this.quantity = 0;
  };

  render () {
    const {classes, anchorEl, type} = this.props;
    return (
      <Popover
        open={Boolean (anchorEl)}
        anchorEl={anchorEl}
        onClose={this.props.close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{margin: '10px'}}
      >
        <Grid container style={{display:'block'}} className={classes.popover}>
          <Grid item>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.name}
              onChange={e => (this.name = e.target.value)}
              margin="normal"
              variant="outlined"
            />            
          </Grid>
          <Grid item>
            <TextField
              id="type"
              label="Type"
              className={classes.textField}
              value={type}
              margin="normal"
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="price"
              label="Price"
              className={classes.textField}
              value={this.price}
              onChange={e => (this.price = e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="quantity"
              label="Quantity"
              className={classes.textField}
              value={this.quantity}
              onChange={e => (this.quantity = e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top right,rgba(66,214,235,0.8),rgba(223,244,66,0.8))',
                color: '#f7f7f7',
                fontSize: '2rem',
                borderRadius: '3px',
              }}
              onClick={this.handleAddExpense}
            >
              <span>+</span>
            </Button>
          </Grid>
        </Grid>
      </Popover>
    );
  }
}

export default withStyles (styles) (InputPopover);
