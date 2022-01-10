import React, { useState } from 'react';
import PropTypes from 'prop-types';
import app from '../realmApp';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function CreateJoinGroup({setGroup}){
  const [groupId, setGroupId] = useState();

  const createGroup = async () => {
    const res = await app.currentUser.functions.createGroup(groupId);
    console.log(res);
    await app.currentUser.refreshCustomData();
    setGroup(app.currentUser.customData.groupId);
  }

  const joinGroup = async () => {
    console.log("Joining group");
    const res = await app.currentUser.functions.joinGroup(groupId);
    console.log(res);
    await app.currentUser.refreshCustomData();
    setGroup(app.currentUser.customData.groupId);
  }


  return(
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="groupId"
              label="Group Name"
              name="groupId"
              autoFocus
              onChange={e => setGroupId(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={createGroup}
            >
              Create Group
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              id="groupId"
              label="Group Name"
              name="groupId"
              autoFocus
              onChange={e => setGroupId(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={joinGroup}
            >
              Join Group
            </Button>
        </CardContent>
      </Card>
    </div>
  )

}

CreateJoinGroup.propTypes = {
  setGroup: PropTypes.func.isRequired
}
