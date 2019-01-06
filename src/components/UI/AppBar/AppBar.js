import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'

import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import { SingleDatePicker } from 'react-dates';
import { observable } from 'mobx';
import { observer,inject } from 'mobx-react';
import moment from 'moment';
import * as cls from './AppBar.css';
import { getExpense } from '../../../services/Api'



const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    background: '#212121',
    position:'fixed',  
  },
};

@inject("expenseStore")
@observer
class MenuAppBar extends React.Component {
  @observable date = moment()
  state = {
    auth: true,
    anchorEl: null,
  };

  constructor(props){
    super(props);
    props.expenseStore.changeDate(this.date.format('Y-MM-DD'))
    this.initializeData()
  }

  initializeData(){
    getExpense(this.props.expenseStore.date).
      then((res) => {
        console.log(res)
        this.props.expenseStore.replaceItemArr(res.data)
      })
  }

  handleChange = (event, checked) => {
    this.setState ({auth: checked});
  };

  handleMenu = event => {
    this.setState ({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState ({anchorEl: null});
  };


  render () {
    const {classes,expenseStore} = this.props;
    const {auth, anchorEl} = this.state;
    const open = Boolean (anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Expense Demo
            </Typography>
            <div              
              className={cls.datepicker}                   
            >
              <SingleDatePicker 
                date={this.date} // momentPropTypes.momentObj or null
                onDateChange={date => {this.date = date;console.log(this.date);expenseStore.changeDate(date.format('Y-MM-DD'));this.initializeData()}} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                numberOfMonths={1}
                isOutsideRange={() => false}                
              />
            </div>
            {auth &&
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (MenuAppBar);
