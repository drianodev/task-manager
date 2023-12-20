import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './pages/Home/Home';
import Tasks from './pages/Tasks/Tasks';
import CreateTask from './pages/CreateTask/CreateTask';
import EditTask from './pages/EditTask/EditTask';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const { Content } = Layout;

function App() {

  return (
    <Layout>
      <Navbar />
      <Content>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
