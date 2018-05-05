import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {InputLabel} from 'material-ui/Input';
import classNames from 'classnames';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Save from '@material-ui/icons/Save';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    }),
    selectEmpty: {
        padding: '15px',
      },
  });

@observer
class Modal extends Component {   
    @observable name = '';
  @observable price = 0;
  @observable quantity = 0;
  @observable type = '';
  @observable selected = [];

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

    render() {
        const {classes, list} = this.props;
        return (
            <Grid item style={{paddingTop: 20}} sm={6}>
            <Paper className={classes.root} elevation={10}>
            <Typography variant="headline" component="h3">
              Add Expense
            </Typography>            
            <Grid style={{paddingTop: 20}}>
              <Grid item xs={12}>
                <Grid
                  container                  
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
                    <InputLabel htmlFor="age-simple">Type</InputLabel>
                    <Select
                      value={this.type}
                      onChange={e => {
                        this.type = e.target.value;
                      }}
                      inputProps={{
                        name: 'age',
                        id: 'age-simple',
                      }}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                      <MenuItem value="Grocery">Grocery</MenuItem>
                      <MenuItem value="Cloths">Cloths</MenuItem>
                      <MenuItem value="Breakfast">Breakfast</MenuItem>
                      <MenuItem value="Lunch">Lunch</MenuItem>
                      <MenuItem value="Dinner">Dinner</MenuItem>
                    </Select>
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
    
                  <Grid item sm={2} lg={2} md={2}>
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
            <Grid container>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="raised"
                  size="small"
                  onClick={this.handleAddExpense}
                >
                  <Save
                    className={classNames (classes.leftIcon, classes.iconSmall)}
                  />
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
          </Grid>
        )
    }
} 

export default withStyles(styles)(Modal);