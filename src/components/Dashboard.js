import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import app from '../realmApp';
import AddDeposit from './AddDeposit';
import CreateJoinGroup from './CreateJoinGroup';
import AppDrawer from './Drawer';
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
  },
  {
    field: 'amount',
    headerName: 'Deposit Amount',
    type: 'number',
    width: 160,
  },
  {
    field: 'date',
    headerName: 'Deposit Date',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
  },
];

export default function Dashboard({ logout }){
  const [groupAmount, setGroupAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [rows, setRows] = useState([]);
  const [group, setGroup] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setGroup(app.currentUser.customData.groupId);
    getDeposits();
  }, []);

  const getDeposits = async () => {
    let db = app.currentUser.mongoClient("mongodb-atlas").db("reactVillage");
    let depositsQuery = db.collection("Deposits");
    let deps = await depositsQuery.find({group: app.currentUser.customData.groupId});
    let allDeposits = [];
    let gBalance = 0;
    let mBalance = 0;
    deps.forEach((deposit) => {
      allDeposits.push({name: deposit.name, amount: deposit.amount, date: deposit.date, id: deposit._id.toString(), status: deposit.status})
      gBalance = gBalance + deposit.amount;
      if(deposit.user === app.currentUser.id){
        mBalance = mBalance + deposit.amount;
      }
    });
    setRows([]);
    setRows(allDeposits);
    setGroupAmount(gBalance);
    setBalance(mBalance);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, mb:2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=>setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Village Banking
            </Typography>
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <AppDrawer open={open} setOpen={setOpen}/>
      <Container maxWidth="md">
      {group.length<=0? (
        <CreateJoinGroup setGroup={setGroup}/>
      ): 
      <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Your Balance
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  K {balance} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Group Balance
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  K {groupAmount} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{height:360}}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <AddDeposit getDeposits={getDeposits}/>
      </>
      }
      </Container>
    </div>
  );
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired
}
