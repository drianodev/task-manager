import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask, deleteTask } from '../../redux/actions/taskActions';
import { Button, Space } from 'antd';
import TaskTable from '../../components/TaskTable/TaskTable';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const deleteSuccess = useSelector((state) => state.tasks.deleteSuccess);
  const navigate = useNavigate();
  console.log('tasks');
  console.log(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, deleteSuccess]);

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
        <Button type="primary" onClick={() => navigate('/create-task')}>
          Criar Tarefa
        </Button>
        <TaskTable
          tasks={tasks}
          handleEditTask={handleEditTask}
          handleMarkAsCompleted={handleMarkAsCompleted}
          onDelete={handleDelete}
        />
      </Space>
    </div>
  );
};

export default Tasks;
