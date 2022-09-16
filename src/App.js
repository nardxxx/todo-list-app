import { Box } from '@mui/system';
import './App.css';
import './normalize.css'
import Sidebar from './Sidebar';
import TodoList from './TodoList';

function App() {
  return (
    <Box className="App" sx={{ display: 'flex', gap: '5%' }}>
      {/* <Sidebar /> */}
      <Box sx={{ width: '100%' }}>
        <TodoList />
      </Box>
    </Box>
  );
}

export default App;
