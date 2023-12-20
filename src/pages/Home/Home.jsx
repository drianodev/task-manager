import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask, deleteTask } from '../../redux/actions/taskActions';
import { Typography, Space } from 'antd';
import TaskTable from '../../components/TaskTable/TaskTable';

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const deleteSuccess = useSelector((state) => state.tasks.deleteSuccess);
  console.log('tasks');
  console.log(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, deleteSuccess]);

  const filteredTasks = tasks.filter(task => task.data && task.status === 'PENDENTE');

  const handleEditTask = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleMarkAsCompleted = (taskId) => {
    console.log(taskId);
    dispatch(updateTask(taskId, { status: 'FINALIZADA' }));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Olá, você tem {filteredTasks.length} tarefa(s) próxima(s) de expirar.</Title>

        <TaskTable
          tasks={filteredTasks}
          handleEditTask={handleEditTask}
          handleMarkAsCompleted={handleMarkAsCompleted}
          onDelete={handleDelete}
        />
      </Space>
    </div>
  );
};

export default Home;
