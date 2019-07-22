import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import cls from "./Modal.module.css";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class ExpenseTypeBtn extends Component {
  @observable types = [
    { name: "Food", icon: "restaurant" },
    { name: "Grocery", icon: "local_grocery_store" },
    { name: "Transport", icon: "local_taxi" },
    { name: "Fuel", icon: "local_gas_station" },
    { name: "Other", icon: "add_box" }
  ];

  render() {
    return (
      <Grid
        container
        justify="center"
        spacing={10}
        style={{ width: "100%", paddingTop: "2%", marginTop: "2rem" }}
        align="left"
      >
        {this.types.map((ele, index) => {
          return (
            <Grid item lg={2} key={ele.name + index}>
              <Paper
                elevation={2}
                className={cls.paper}
                onClick={e => {
                  this.props.clicked(e, ele.name);
                }}
              >
                <Icon className={cls.icon}>{ele.icon}</Icon>
                <span className={cls.iconText}>{ele.name}</span>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default ExpenseTypeBtn;
