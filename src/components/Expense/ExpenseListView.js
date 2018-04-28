import React, {Component} from 'react';

import Chip from 'material-ui/Chip';
import {
  default as Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Save from '@material-ui/icons/Save';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
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
});

@observer class TableExampleControlled extends Component {
  @observable name='';
  @observable price=0;
  @observable quantity=0;

  state = {
    selected: [],
  };

  isSelected = index => {
    return this.state.selected.indexOf (index) !== -1;
  };

  handleRowSelection = selectedRows => {
    this.setState ({
      selected: selectedRows,
    });
  };

  handleAddExpense = item => {
    this.props.list.addItem ({
      name: this.name,
      price: parseInt(this.price,10),
      quantity: parseInt(this.quantity,10),
    });    
    this.clear()
  };

  clear = () => {
    this.name = ''
    this.price = 0
    this.quantity = 0
  }  

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
                  <TableCell padding="dense">Sr.No</TableCell>
                  <TableCell padding="dense">Name</TableCell>
                  <TableCell padding="dense">Quantity</TableCell>
                  <TableCell padding="dense">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {l.map ((ele, id) => (
                  <TableRow selected={this.isSelected (0)} key={id}>
                    <TableCell padding="dense">{id}</TableCell>
                    <TableCell padding="dense">{ele.name}</TableCell>
                    <TableCell padding="dense">{ele.quantity}</TableCell>
                    <TableCell padding="dense">
                      {ele.totalPrice}
                      <Chip
                        label={'Each ' + ele.price}
                        className={classes.chip}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={40}
            >
              <Grid item>
                <TextField
                  id="number"
                  label="Enter Name"
                  value={this.name}
                  onChange={e => {
                    this.name = e.target.value;
                  }}
                  type="text"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="number1"
                  label="Enter Cost"
                  value={this.price}
                  onChange={e => {
                    this.price = e.target.value;
                  }}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item sm={2}>
                <TextField
                  id="numbe1r"
                  label="Quantity"
                  value={this.quantity}
                  onChange={e => (this.quantity = e.target.value)}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Button 
              className={classes.button}
              variant="raised" size="small"
              onClick={this.handleAddExpense}
            >
              <Save
                className={classNames (classes.leftIcon, classes.iconSmall)}
              />
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles (styles) (TableExampleControlled);
