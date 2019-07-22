import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Chip from "@material-ui/core/Chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Save from '@material-ui/icons/Save';
import FilterListIcon from "@material-ui/icons/FilterList";
//import cls from "./Modal.css";
import { observer, inject } from "mobx-react";
import { observable, computed, toJS } from "mobx";
import LineChart from "../UI/Chart/LineChart";
// import InputPopover from "../UI/InputPopover";
// import { getExpense } from "../../services/Api";
// import Icon from "@material-ui/core/Icon";
// import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

let counter = 0;
function createData(id, name, type, quantity, totalPrice, price) {
  //counter += 1;
  return { id: id, name, type, quantity, totalPrice, price };
}

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    backgroundColor: "#222",
    color: "#fff",
    rowspan: "4"
  }
}))(TableCell);

const CustomTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: "2px",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  }
}))(TableRow);

const columnData = [
  { id: "id", numeric: false, disablePadding: false, label: "Sr.No" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "quantity", numeric: false, disablePadding: false, label: "Quantity" },
  {
    id: "totalPrice",
    numeric: false,
    disablePadding: false,
    label: "Total Price"
  },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{ padding: "0" }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ color: "rgba(66,214,235,0.8)" }}
            />
          </TableCell>
          {columnData.length?columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric?column.numeric:undefined}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
                style={{ padding: "0" }}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this):null}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: {
    color: "#f7f7f7",
    backgroundColor: "#222"
  },

  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="subtitle2" id="tableTitle">
            Daily Expense
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" style={{ color: "#f7f7f7" }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  checkbox: {
    color: "rgba(66,214,235,0.8)",
    "&$checked": {
      color: "rgba(66,214,235,0.8)"
    }
  },
  checked: {},
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: "#212121",
    color: "#fff"
  },
  editInput: {
    border: "1px solid",
    borderRadius: "3px",
    borderColor: "#777",
    width: "8rem"
  }
});

@inject("expenseStore")
@observer
class EnhancedTable extends React.Component {
  @observable order = "asc";
  @observable orderBy = "name";
  @observable selected = [];
  @observable page = 0;
  @observable data = [];
  @observable rowsPerPage = 5;
  @observable property = null;
  @observable anchorEl = null;
  @observable editedId = true;

  set squared(value) {
    //this is automatically an action, no annotation necessary
    this.length = Math.sqrt(value);
  }
  
  set d(v) {
    this.data = v
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.orderBy === property && this.order === "desc") {
      order = "asc";
    }

    this.order = order;
    this.orderBy = orderBy;
  };

  handleEditClick = () => {    
    this.editedId=false
    this.data = this.getStoreData()
  }

  handleExpenseUpdate = (id,index) => {
    console.log('asdad')
    const item = this.props.expenseStore.getItem(id)    
    item[0].updateItem(this.data[index])    
    this.editedId=!this.editedId
  }

  getStoreData = () => {    
    counter = 0;
    let data = this.props.expenseStore.items.map((ele, index) => {
      return createData(
        ele._id,
        ele.name,
        ele.type,
        ele.quantity,
        ele.totalPrice,
        ele.price
      );
    });

    this.order === "desc"
      ? (data = data.sort((a, b) =>
          b[this.orderBy] < a[this.orderBy] ? -1 : 1
        ))
      : (data = data.sort((a, b) =>
          a[this.orderBy] < b[this.orderBy] ? -1 : 1
        ));    
    return data;
  };

  handleSelectAllClick = (event, checked) => {
    //console.log("asda");
    if (checked) {
      // console.log (this.data);
      this.selected = this.getStoreData().map(n => n.id);
      //console.log(toJS(this.selected));
      return;
    }
    this.selected = [];
  };

  handleClose = () => {
    this.anchorEl = null;
  };

  handleClick = (event, id) => {
    const selectedIndex = this.selected.indexOf(id);
    //console.log(selectedIndex);
    let newSelected = [];
    let oldSelected = [...this.selected];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(oldSelected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(oldSelected.slice(1));
    } else if (selectedIndex === oldSelected.length - 1) {
      newSelected = newSelected.concat(oldSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        oldSelected.slice(0, selectedIndex),
        oldSelected.slice(selectedIndex + 1)
      );
    }
    //console.log(newSelected);
    this.selected = newSelected;
  };

  handleChangePage = (event, page) => {
    this.page = page;
  };

  handleChangeRowsPerPage = event => {
    this.rowsPerPage = event.target.value;
  };

  isSelected = id => this.selected.indexOf(id) !== -1;

  render() {
    const { classes, expenseStore } = this.props;

    return (
      <Grid container style={{ paddingLeft: "2rem" }} spacing={10}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={this.selected.length} />

            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={this.selected.length}
                order={this.order}
                orderBy={this.orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.getStoreData().length}
              />
              <TableBody>
                {this.getStoreData()
                  .slice(
                    this.page * this.rowsPerPage,
                    this.page * this.rowsPerPage + this.rowsPerPage
                  )
                  .map((n,_i) => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        //className={cls["table-row"]}
                      >
                        <TableCell padding="checkbox" style={{ padding: "0" }}>
                          <Checkbox
                            onChange={event => this.handleClick(event, n.id)}
                            checked={isSelected}
                            classes={{
                              root: classes.checkbox,
                              checked: classes.checked
                            }}
                          />
                        </TableCell>
                        <TableCell style={{ padding: "0" }}>{_i+1}</TableCell>
                        <TableCell style={{ padding: "0" }}>
                        <span style={{display:!this.editedId?'none':''}}>{n.name}</span>
                          <InputBase
                            className={classes.editInput}
                            value={this.data.length && this.data[_i]?this.data[_i].name:''}
                            onChange={e => {this.data[_i].name = e.target.value}}
                            disabled={this.editedId}
                            style={{display:this.editedId?'none':''}}
                          />
                        </TableCell>
                        <TableCell style={{ padding: "0" }}>
                        <span style={{display:!this.editedId?'none':''}}>{n.type}</span>
                          <InputBase
                            className={classes.editInput}
                            value={this.data.length && this.data[_i]?this.data[_i].type:''}
                            onChange={e => {this.data[_i].type = e.target.value}}
                            disabled={this.editedId}
                            style={{display:this.editedId?'none':''}}
                          />
                        </TableCell>
                        <TableCell style={{ padding: "0" }}>
                        <span style={{display:!this.editedId?'none':''}}>{n.quantity}</span>
                          <InputBase
                            className={classes.editInput}
                            value={this.data.length && this.data[_i]?this.data[_i].quantity:''}
                            onChange={e => {this.data[_i].quantity = e.target.value}}
                            disabled={this.editedId}
                            style={{display:this.editedId?'none':'',width:'2.5rem'}}
                          />
                        </TableCell>
                        <TableCell style={{ padding: "0" }}>
                          {n.totalPrice}
                          {n.quantity ? (
                            <Chip
                              label={"Each " + n.price}
                              className={classes.chip}
                            />
                          ) : (
                            <Chip
                              label={"All " + n.price}
                              className={classes.chip}
                            />
                          )}
                        </TableCell>
                        {!this.editedId?
                        <TableCell style={{ padding: "0" }}>
                          <IconButton
                            onClick={()=> { this.handleExpenseUpdate(n.id,_i)}}
                          >
                            <Save/>                           
                          </IconButton>                          
                        </TableCell>:
                        <TableCell style={{ padding: "0" }}>
                          <IconButton
                            onClick={() => { this.handleEditClick() }}
                          >
                            <EditIcon/>                            
                          </IconButton>                          
                        </TableCell>}
                      </TableRow>
                    );
                  })}
                <CustomTableRow>
                  <CustomTableCell
                    colSpan={5}
                    style={{ textAlign: "center" }}
                    //padding="dense"
                  >
                    {" "}
                    Total
                  </CustomTableCell>
                  {/* <CustomTableCell padding="dense"> */}
                  <CustomTableCell>
                    {expenseStore.totalPrice}
                  </CustomTableCell>
                </CustomTableRow>
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={this.getStoreData.length}
              rowsPerPage={this.rowsPerPage}
              page={this.page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper className={classes.root}>
            <LineChart
              labels={expenseStore.allCategories}
              chartData={expenseStore.chartData}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
