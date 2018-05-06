import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import cls from './Modal.css';
import { observable } from 'mobx';
import {observer} from 'mobx-react';

@observer
class ExpenseTypeBtn extends Component {

    @observable types = [
        {name:'Food',icon:'restaurant'},
        {name:'Grocery',icon:'local_grocery_store'},
        {name:'Transport',icon:'local_taxi'},
        {name:'Fuel',icon:'local_gas_station'},
        {name:'Other',icon:'add_box'}
    ];

    render() {
        return (
            <Grid
          container
          justify="center"
          spacing={40}
          style={{width: '100%', paddingTop: '2%'}}
          align="left"
        >{this.types.forEach((type) => {
            
        }}
          <Grid item lg={2}>
            <Paper
              elevation={2}
              className={cls.paper}
              onClick={(e) => {this.props.clicked(e,'food')}}
            >
              <Icon className={cls.icon}>restaurant</Icon>
              <span className={cls.iconText}>Food</span>
            </Paper>
          </Grid>
          <Grid item lg={2}>
            <Paper
              elevation={2}
              className={cls.paper}
              onClick={this.handleClick}
            >
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
        )
    }
}

export default ExpenseTypeBtn;