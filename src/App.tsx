import { Container, Typography } from '@mui/material'
import { Provider } from 'react-redux'
import AddForm from './components/AddForm'
import { TaskList } from './components/TaskList'
import TaskStat from './components/TaskStat'
import store from './store/store'
 
function App() {

  return (
    <Provider store={store}>
     <Container maxWidth='md'>
      <Typography component='h1' variant='h2' align='center'>
       Streak Tracker
      </Typography>
      <AddForm/>
      <TaskList/>
      <TaskStat/>
     </Container>
    </Provider>
    
  )
}

export default App
