import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHabit, Habit, toggleHabit } from '../store/slice'
import { AppDispatch, RootState } from '../store/store'

export const TaskList:React.FC = () => {
    const { habits } = useSelector((state: RootState) => state.habits);
    const today=new Date().toISOString().split('T')[0]

    const dispatch=useDispatch<AppDispatch>()
    const generateStreak=(habit:Habit)=>
    {
        let streak=0
        let currDate=new Date()
        while(true)
        {
            const dateStr=currDate.toISOString().split('T')[0]
            if(habit.completedDate.includes(dateStr))
            {
                streak++
                currDate.setDate(currDate.getDate()-1)
            }else{
                break
            }
        }
        return streak

    }

  return (
  <Box sx={{display:'flex', flexDirection:'column',gap:2,mt:4}}>
    {habits.map((habit:Habit)=>{
        return(
            <Paper key={habit.id} elevation={2} sx={{p:2}}>
              <Grid container alignItems='center'>
              <Grid xs={12} sm={6}>
                <Typography variant='h6'>{habit.name}</Typography>
                <Typography variant='body2' color='text.secondary' sx={{textTransform:'capitalize'}}>{habit.frequency}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box sx={{display:'flex',justifyContent:'flex-end',gap:1}}>
                <Button variant='outlined' color={habit.completedDate.includes(today)?'success':'primary'} onClick={()=>
                    dispatch(toggleHabit({id:habit.id,date:today}))
                }>
                    {habit.completedDate.includes(today)?'compeleted':'mark completed'}
                </Button>
                <Button variant='outlined' color='error' onClick={()=>dispatch(deleteHabit({id:habit.id}))}>Delete</Button>
                </Box>
              </Grid>
              </Grid>
              <Grid sx={{mt:2}}>
                <Typography variant='body2'>
                    Current Streak : {generateStreak(habit)} days
                </Typography>
                <LinearProgress variant='determinate' value={(generateStreak(habit)/30)*100} sx={{mt:1}} />
              </Grid>
            </Paper>
        )
    })}
  </Box>
  )
}
