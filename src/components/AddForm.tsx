import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addHabits } from "../store/slice"
import { AppDispatch } from "../store/store"

const AddForm = () => {
    const[name,setName]=useState<string>('') 

    const [frequency,setFrequency]=useState<'weekly'|'daily'>('daily')

    const dispatch=useDispatch<AppDispatch>()

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        if(name.trim())
        {
            dispatch(addHabits({
                name,
                frequency
            }))
            setName('')
        }
    }
 


  return (
     <form onSubmit={handleSubmit}>
      <Box sx={{display:'flex',flexDirection:'column',gap:2}}>
        <TextField label='Task Name' value={name} onChange={(e)=>setName(e.target.value)}></TextField>
        <FormControl>
            <InputLabel>Frequency</InputLabel>
            <Select value={frequency} onChange={(e)=>setFrequency(e.target.value as 'daily'|'weekly')}>
                <MenuItem value='daily'>Daily</MenuItem>
                <MenuItem value='weekly'>Weekly</MenuItem>
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="success">
          Add Task
        </Button>
      </Box>
     </form>
  )
}

export default AddForm