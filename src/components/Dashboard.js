import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import app from '../realmApp';
import { ObjectId } from 'bson';
import AddDeposit from './AddDeposit';
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
    width: 150,
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
    width: 160,
  },
];

export default function Dashboard({ logout }){
  const [group, setGroup] = useState("");
  const [groupId, setGroupId] = useState();
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    //test();
    setGroup(app.currentUser.customData.groupId);
    console.log(app.currentUser.customData)
  }, [group])

  const createGroup = async () => {
    const res = await app.currentUser.functions.createGroup(groupId);
    console.log(res);
    await app.currentUser.refreshCustomData();
    setGroup(app.currentUser.customData.groupId);
  }

  const joinGroup = async () => {
    const res = await app.currentUser.functions.joinGroup(groupId);
    console.log(res);
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
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
      {group.length<=0? (
        <div>
          <h4>No group</h4>
          <label>
            <p>Group name</p>
            <input type="text" onChange={e => setGroupId(e.target.value)}/>
          </label>
          <button onClick={createGroup}>Create Group</button>
          <label>
            <p>Group name</p>
            <input type="text" onChange={e => setGroupId(e.target.value)}/>
          </label>
          <button onClick={joinGroup}>Join Group</button>
        </div>
      ): 
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Your Balance
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  K 
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
                  K 
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
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <AddDeposit />
      </Container>
      }
    </div>
  );
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired
}
