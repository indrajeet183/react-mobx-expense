import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import InputPopover from '../UI/InputPopover';
import ExpenseTypeBtn from './ExpenseTypeBtn';
import ExpenseTable  from '../Expense/ExpenseTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding:'1rem',    
    paddingTop:'4rem'
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
    const {classes} = this.props;
    return (
      <div className={classes.root}>      
      <ExpenseTypeBtn clicked={this.handleClick}/>        
        <ExpenseTable />         
          <InputPopover 
            anchorEl={this.anchorEl}
            close={this.handleClose} 
            type={this.type} 
            />
      </div>
    );
  }
}

export default withStyles (styles) (TableExampleControlled);
