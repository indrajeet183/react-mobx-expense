import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import cls from './Modal.css';
import {inject} from 'mobx-react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import LineChart from '../UI/Chart/LineChart';

let counter = 0;
function createData (no, name, type, quantity, totalPrice, price) {
  counter += 1;
  return {id: counter, no, name, type, quantity, totalPrice, price};
}

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
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
})) (TableRow);

const columnData = [
  {id: 'no', numeric: false, disablePadding: false, label: 'Sr.No'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
  {id: 'type', numeric: false, disablePadding: false, label: 'Type'},
  {id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity'},
  {
    id: 'totalPrice',
    numeric: false,
    disablePadding: false,
    label: 'Total Price',
  },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort (event, property);
  };

  render () {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{padding: '0'}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map (column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                style={{padding: '0'}}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler (column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
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
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
    color: '#f7f7f7',
    backgroundColor: '#222',
  },

  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const {numSelected, classes} = props;

  return (
    <Toolbar
      className={classNames (classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0
          ? <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          : <Typography variant="title" id="tableTitle">
              Daily Expense
            </Typography>}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0
          ? <Tooltip title="Delete">
              <IconButton aria-label="Delete" style={{color: '#f7f7f7'}}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          : <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles (toolbarStyles) (EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: '#212121',
    color: '#fff',
  },
});

@inject ('expenseStore')
@observer
class EnhancedTable extends React.Component {
  @observable order = 'asc';
  @observable orderBy = 'name';
  @observable selected = [];
  @observable data = [];
  @observable page = 0;
  @observable rowsPerPage = 5;

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.orderBy === property && this.order === 'desc') {
      order = 'asc';
    }

    const data = order === 'desc'
      ? this.data.sort ((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
      : this.data.sort ((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.data = data;
    this.order = order;
    this.orderBy = orderBy;
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.selected = this.data.map (n => n.id);
      return;
    }
    this.selected = [];
  };

  handleClick = (event, id) => {
    const selectedIndex = this.selected.indexOf (id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat (this.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat (this.selected.slice (1));
    } else if (selectedIndex === this.selected.length - 1) {
      newSelected = newSelected.concat (this.selected.slice (0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat (
        this.selected.slice (0, selectedIndex),
        this.selected.slice (selectedIndex + 1)
      );
    }

    this.selected = newSelected;
  };

  handleChangePage = (event, page) => {
    this.page = page;
  };

  handleChangeRowsPerPage = event => {
    this.rowsPerPage = event.target.value;
  };

  isSelected = id => this.selected.indexOf (id) !== -1;

  render () {
    const {classes, expenseStore} = this.props;
    const data1 = expenseStore.items.map ((ele, index) => {
      return createData (
        index + 1,
        ele.name,
        ele.type,
        ele.quantity,
        ele.totalPrice,
        ele.price
      );
    });
    console.log (data1);

    return (
      <Grid container style={{paddingLeft: '2rem'}} spacing={24}>
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
                rowCount={this.data.length}
              />
              <TableBody>
                {data1
                  .slice (
                    this.page * this.rowsPerPage,
                    this.page * this.rowsPerPage + this.rowsPerPage
                  )
                  .map (n => {
                    const isSelected = this.isSelected (n.id);
                    return (
                      <TableRow
                        onClick={event => this.handleClick (event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        className={cls['table-row']}
                      >
                        <TableCell padding="checkbox" style={{padding: '0'}}>
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell style={{padding: '0'}}>
                          {n.no}
                        </TableCell>
                        <TableCell style={{padding: '0'}}>{n.name}</TableCell>
                        <TableCell style={{padding: '0'}}>{n.type}</TableCell>
                        <TableCell style={{padding: '0'}}>
                          {n.quantity}
                        </TableCell>
                        <TableCell style={{padding: '0'}}>
                          {n.totalPrice}
                          {n.quantity
                            ? <Chip
                                label={'Each ' + n.price}
                                className={classes.chip}
                              />
                            : <Chip
                                label={'All ' + n.price}
                                className={classes.chip}
                              />}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <CustomTableRow>
                  <CustomTableCell
                    colSpan={5}
                    style={{textAlign: 'center'}}
                    padding="dense"
                  >
                    {' '}
                    Total
                  </CustomTableCell>
                  <CustomTableCell padding="dense">
                    {expenseStore.totalPrice}
                  </CustomTableCell>
                </CustomTableRow>
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={this.data.length}
              rowsPerPage={this.rowsPerPage}
              page={this.page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper className={classes.root}>
            <LineChart />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (EnhancedTable);
