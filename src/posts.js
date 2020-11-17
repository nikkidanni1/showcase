import * as React from "react";
import { List, Datagrid, DatagridBody, TextField, ImageField } from 'react-admin';
import { makeStyles } from "@material-ui/core/styles";
import BasketIcon from '@material-ui/icons/ShoppingBasket';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  imgContainer: {
    '& img': {
      height: 100,
      width: 100,
      objectFit: "contain"
    }
  }
});

const MyDatagridRow = ({ record, resource, id, onToggleItem, children, selected, basePath }) => {
  const [selectedCount, setCount] = React.useState(record.selectedCount)
  console.log(record)
  return (
    <TableRow key={id}>
      {/* first column: selection checkbox */}
      <TableCell padding="none">
        <Checkbox
          disabled={record.selectable}
          checked={selected}
          onClick={() => onToggleItem(id)}
        />
      </TableCell>
      {/* data columns based on children */}
      {React.Children.map(children, field => (
        <TableCell key={`${id}-${field.props.source}`}>
          {React.cloneElement(field, {
            record,
            basePath,
            resource,
          })}
        </TableCell>
      ))}
      <TableCell padding="none">
        <BasketIcon color={selectedCount > 0 ? 'primary' : 'action'} />
        <Add onClick={() => {
          setCount(prev => record.count > prev ? prev + 1 : prev)
        }} />
        <Remove onClick={() => {
          setCount(prev => prev > 0 ? prev - 1 : prev)
        }} />
        {selectedCount}
      </TableCell>
    </TableRow>
  )
}

const MyDatagridBody = props => <DatagridBody {...props} row={<MyDatagridRow />} />;
const MyDatagrid = props => <Datagrid {...props} body={<MyDatagridBody />} />;

export const PostList = (props) => {
  const classes = useStyles();
  console.log(props)
  return (
    <List {...props}>
      <MyDatagrid>
        <ImageField className={classes.imgContainer} source="image" />
        <TextField source="title" />
        <TextField source="price" />
        <TextField source="count" />
      </MyDatagrid>
    </List>
  )
};