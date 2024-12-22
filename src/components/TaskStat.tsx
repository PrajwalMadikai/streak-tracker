import { LinearProgress, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHabits, Habit } from '../store/slice'
import { AppDispatch, RootState } from '../store/store'
const HabitStat:React.FC = () => {
  
    const {habits,isLoading,error}=useSelector((state:RootState)=>state.habits)

    const dispatch=useDispatch<AppDispatch>()

    const today=new Date().toISOString().split('T')[0]

    const getCompleted=()=>{
        return habits.filter((habit)=>habit.completedDate.includes(today)).length
    }

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
      const longestStreak=()=>{
        return Math.max(...habits.map(generateStreak),0)
      }

  useEffect(()=>{
    dispatch(fetchHabits())
  },[])

   if(isLoading)
   {
    return <LinearProgress></LinearProgress>
   }
   if(error)
   {
    return <Typography color='error'>{error}</Typography>
   }

    return (
   <Paper elevation={2} sx={{p:2,mt:4}}>
    <Typography variant='h6' gutterBottom>
        Task stastics
    </Typography>
    <Typography variant='body1'>Total Task:{habits.length}</Typography>
    <Typography variant='body1'>Completed Today:{getCompleted()}</Typography>
    <Typography variant='body1'>Longest Streak:{longestStreak()}</Typography>
   </Paper> 
  )
}

export default HabitStat