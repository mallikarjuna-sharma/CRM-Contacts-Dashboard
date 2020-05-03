import React from 'react';
import { Grid, Paper, Typography, Button, Checkbox, Card, CardContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import withWidth from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import {
    setRegister, getselectedContacts,
    isLoggedIn, getContactDB, getAvailableContacts
} from './actions/index.jsx';
import RemoveIcon from '@material-ui/icons/Remove';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';


function DisplayContacts(props) {

    const [value, setvalue] = React.useState([]);
    const [allSelected, setallSelected] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const classes = useStyles();
    const { tableContacts } = props;


    React.useEffect(() => {
        if (allSelected)
            allSelection();
        else {
            setvalue([]);
            props.getselectedContacts([])
        }
    }, [allSelected])

    React.useEffect(() => {
        if (props.selectedContacts && props.selectedContacts.length === 0) {
            setvalue([])
        }

    }, [props.selectedContacts])

    React.useEffect(() => {

        let tablerow = [];

        props.getAvailableContacts([]);

        if (props.contactDataBase && props.contactDataBase.length)
            props.contactDataBase.map((e, index) => {
                if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                    && e[props.loggedin[0].phone].name) {
                    // const tablerow = props.tableContacts.slice();
                    tablerow.push(e[props.loggedin[0].phone]);
                    // props.getAvailableContacts(tablerow);
                }
            })

        props.getAvailableContacts(tablerow);

    }, [props.contactDataBase])

    const allSelection = () => {
        let join = [];
        let contactTemp = [];

        props.getselectedContacts([])

        props.contactDataBase && props.contactDataBase.length &&
            props.contactDataBase.map((e, index) => {
                if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                    && e[props.loggedin[0].phone].phone) {
                    join.push(index);
                    contactTemp.push(e);
                }
            })
        setvalue(join);
        props.getselectedContacts(contactTemp)
    }

    const selectedContacts = (contact, index) => {

        if (value.indexOf(index) === -1) {
            const val = value.slice();
            val.push(index);
            setvalue(val);

            const contactTemp = props.selectedContacts.slice();

            console.log(contact.phone, 'contact');

            props.contactDataBase && props.contactDataBase.length &&
                props.contactDataBase.map((e, index) => {

                    console.log(e, 'contact');

                    if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
                        && e[props.loggedin[0].phone].phone 
                        && (e[props.loggedin[0].phone].phone === contact.phone)
                        && (e[props.loggedin[0].phone].name === contact.name)) {
                        contactTemp.push(e);
                        return;
                    }
                })
            props.getselectedContacts(contactTemp)
        }
        else {
            const where = value.indexOf(index);
            const val = value.slice();
            val.splice(where, 1);
            setvalue(val);

            const contactTemp = props.selectedContacts.slice();
            contactTemp.splice(where, 1)
            props.getselectedContacts(contactTemp)
        }
    }


    const getRow = (e, index) => {
        if (props.loggedin && props.loggedin[0] && props.loggedin[0].phone && e[props.loggedin[0].phone]
            && e[props.loggedin[0].phone].name) {


            return <Grid container key={index}
                spacing={10} justify="flex-start" alignItems="center" direction="row">

                <Grid item md={1} sm={1} xs={1} lg={1} >
                    <Checkbox
                        checked={value.indexOf(index) > -1 ? true : false}
                        onChange={() => selectedContacts(e, index)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                <Grid item md={7} sm={4} xs={6} lg={7} >
                    <Grid container justify="flex-end" alignItems="center" direction="row">
                        <Grid item  >
                            <Paper variant="contained" color="primary" style={{ borderRadius: "50%", width: "45px", height: "45px", backgroundColor: "#abc" }}>
                                <Typography style={{ padding: "25%" }}> {e[props.loggedin[0].phone].name ? e[props.loggedin[0].phone].name.substring(0, 2) : "AA"}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item  >
                            <Grid container direction="column">
                                <Grid item   >
                                    <Typography >
                                        {e[props.loggedin[0].phone].name}
                                    </Typography>
                                </Grid>
                                <Grid item   >
                                    <Typography >
                                        {e[props.loggedin[0].phone].gmail}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={4} sm={3} xs={3} lg={3}>
                    <Typography  >  {e[props.loggedin[0].phone].company} </Typography>
                </Grid>

            </Grid>
        }
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = tableContacts.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const getRandomColor = () => {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <React.Fragment>

            {props.tableContacts && props.tableContacts.length &&
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        {(value && value.length) ? <EnhancedTableToolbar numSelected={value.length} /> : null}
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    setallSelected={e => setallSelected(e)}
                                    classes={classes}
                                    allSelected={allSelected}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={tableContacts.length}
                                />
                                <TableBody>
                                    {stableSort(tableContacts, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={() => selectedContacts(row, index)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell align="left" padding="checkbox" style={{ borderBottom: "none" }} >
                                                        <Checkbox
                                                            checked={value.indexOf(index) > -1 ? true : false}
                                                            onChange={() => selectedContacts(row, index)}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right" id={labelId} scope="row" padding="none" style={{ borderBottom: "none" }} >
                                                        <Grid container justify="flex-start" alignItems="center" direction="row" style={{ paddingLeft: "25%" }} >
                                                            <Grid container  >
                                                                <Paper variant="contained" color="primary" style={{ borderRadius: "50%", width: "45px", height: "45px", backgroundColor: getRandomColor() }}>
                                                                    <Typography style={{ textAlign: "center", paddingTop: "25%" }}> {row.name ? row.name.substring(0, 2) : "AA"}</Typography>
                                                                </Paper>

                                                                <Grid item  >
                                                                    <Grid container direction="column" justify="flex-start">
                                                                        <Grid item   >
                                                                            <Typography >
                                                                                {row.name}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item   >
                                                                            <Typography >
                                                                                {row.gmail}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>

                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="center" style={{ borderBottom: "none" }} >{row.company}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            }
        </React.Fragment>
    )
}







function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'basicinfo', numeric: false, disablePadding: true, label: 'Basic Info' },
    { id: 'company', numeric: false, disablePadding: true, label: 'Company' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, allSelected, setallSelected } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead style={{ backgroundColor: "#CBD0D0" }}>
            <TableRow>
                <TableCell padding="checkbox">
                    <ListItem>
                        <ListItemIcon button="true">
                            {!allSelected ? <AddIcon onClick={e => setallSelected(true)} />
                                : <RemoveIcon onClick={e => { setallSelected(false); }} />}
                        </ListItemIcon>
                    </ListItem>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 && (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        borderBottom: "none",
        overflowX: "auto"
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor: "transparent"
    },
    table: {
        minWidth: "10%",
        borderCollapse: "separate",
        borderSpacing: "0 1em",
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function mapStateToProps(state) {
    console.log('state in display contacts', state)
    return {
        loggedin: state.loggedin,
        registered: state.registered,
        contactDataBase: state.contactDataBase,
        selectedContacts: state.selectedContacts,
        tableContacts: state.tableContacts
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setRegister, getselectedContacts,
        isLoggedIn, getContactDB, getAvailableContacts
    }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withWidth())(DisplayContacts);
