import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
} from '@material-ui/core';

const dummyData = [
  {
    date: '2022-05-15',
    stage: 'Interview',
    jobTitle: 'Software Engineer',
    invitationFrom: 'Company A',
  },
  {
    date: '2022-04-20',
    stage: 'Application',
    jobTitle: 'Data Scientist',
    invitationFrom: 'Company B',
  },
  // ... (add more dummy data)
];

const DataTable = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dummyData.map((item, index) => index);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  return (
    <TableContainer component={Paper} colorScheme='green'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < dummyData.length}
                checked={selected.length === dummyData.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {[
              { label: 'Date', id: 'date' },
              { label: 'Stage', id: 'stage' },
              { label: 'Job Title', id: 'jobTitle' },
              { label: 'Invitation From', id: 'invitationFrom' },
            ].map((headCell) => (
              <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow key={index} hover role="checkbox" selected={isSelected(index)}>
              <TableCell>
                <Checkbox
                  onClick={(event) => handleClick(event, index)}
                  checked={isSelected(index)}
                />
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.stage}</TableCell>
              <TableCell>{row.jobTitle}</TableCell>
              <TableCell>{row.invitationFrom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
