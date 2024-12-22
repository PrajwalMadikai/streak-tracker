import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit{
    id:string,
    name:string,
    frequency:'daily'|'weekly',
    completedDate:string[],
    createdAt:string
}
interface HabitState{
    habits:Habit[],
    isLoading:boolean,
    error:string|null    
}
const initialState:HabitState={
    habits:[],
    isLoading:false,
    error:null
}

export const fetchHabits=createAsyncThunk('habit/fetchHabits',async()=>{
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const mockHabits:Habit[]=[
        {
            id:'1',
            name:'Read',
            frequency:'daily',
            completedDate:[],
            createdAt:new Date().toString()
        },
        {
            id:'2',
            name:'Write',
            frequency:'weekly',
            completedDate:[],
            createdAt:new Date().toString()
        }
    ]
    return mockHabits
})

const habitSlice=createSlice({
    name:'habit',
    initialState,
    reducers:{
        addHabits:(state,action:PayloadAction<{name:string,frequency:'daily'|'weekly'}>)=>{
           const newHabit:Habit={
            id:Date.now().toString(),
            name:action.payload.name,
            frequency:action.payload.frequency,
            completedDate:[],
            createdAt:new Date().toISOString()
           }

           state.habits.push(newHabit)
        },
        toggleHabit:(state,action:PayloadAction<{id:string,date:string}>)=>{
             const habits=state.habits.find((h)=>h.id==action.payload.id)
             if(habits){
                const index=habits.completedDate.indexOf(action.payload.date)
                if(index>-1)
                {
                    habits.completedDate.splice(index,1)
                }else{
                    habits.completedDate.push(action.payload.date)
                }
             }
        },
        deleteHabit:(state,action:PayloadAction<{id:string}>)=>{
          state.habits=state.habits.filter((habit)=>habit.id!=action.payload.id) 
        } 
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchHabits.pending,(state)=>{
           state.isLoading=true
        })
        .addCase(fetchHabits.fulfilled,(state,action)=>{
            state.isLoading=false
            state.habits=action.payload
        })
        .addCase(fetchHabits.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.error.message ||'Failed to Fetch'
        })
    }
})

export const {addHabits,toggleHabit,deleteHabit}=habitSlice.actions

export default habitSlice.reducer
