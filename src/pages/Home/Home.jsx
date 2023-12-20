import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../../redux/actions/taskActions';
import { Table, Modal, Typography, Button } from 'antd';
import {
  FileImageOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const deleteSuccess = useSelector((state) => state.tasks.deleteSuccess);
  console.log('tasks');
  console.log(tasks);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, deleteSuccess]);

  const filteredTasks = tasks.filter(task => task.data && task.status === 'PENDENTE');

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { 
      title: 'Data', 
      dataIndex: 'data', 
      key: 'data',
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm') 
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <>
          {record.imagem && (
            <FileImageOutlined
              style={{ fontSize: '24px', marginRight: '16px' }}
              onClick={() => {
                setSelectedImage(record.imagem);
                setShowImageModal(true);
              }}
              alt="abrir imagem"
            />
          )}
          <EyeOutlined
            style={{ fontSize: '24px', marginRight: '16px' }}
            onClick={() => {
              setSelectedTaskDetails(record);
              setShowDetailsModal(true);
            }}
          />
          <DeleteOutlined
            style={{ fontSize: '24px', marginRight: '16px' }}
            onClick={() => {
              setTaskToDeleteId(record.id);
              setShowDeleteConfirmationModal(true);
            }}
          />
          <EditOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
          <CheckOutlined
            style={{ fontSize: '24px' }}
            onClick={() => handleMarkAsCompleted(record.id)}
          />
        </>
      ),
    },
  ];

  const DetailsModal = () => (
    <Modal
      visible={showDetailsModal}
      onCancel={() => setShowDetailsModal(false)}
      footer={[
        <Button key="close" onClick={() => setShowDetailsModal(false)}>
          Fechar
        </Button>,
      ]}
    >
      {selectedTaskDetails && (
        <div>
          <h2>Detalhes da Tarefa</h2>
          <p>Nome: {selectedTaskDetails.nome}</p>
          <p>Descrição: {selectedTaskDetails.descricao}</p>
          <p>Status: {selectedTaskDetails.status}</p>
          {selectedTaskDetails.data && (
            <p>Data: {moment(selectedTaskDetails.data).format('DD/MM/YYYY HH:mm')}</p>
          )}        </div>
      )}
    </Modal>
  );

  const handleDeleteConfirmation = () => {
    dispatch(deleteTask(taskToDeleteId));
    setShowDeleteConfirmationModal(false);
  };

  const handleMarkAsCompleted = (taskId) => {
    console.log(taskId);
    dispatch(updateTask(taskId, { status: 'FINALIZADA' }));
  };

  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>Olá, você tem {filteredTasks.length} tarefa(s) próxima(s) de expirar.</Title>
      <Table dataSource={filteredTasks} columns={columns} />

      <Modal
        visible={showImageModal}
        onCancel={() => setShowImageModal(false)}
        footer={null}
        width="50%"  
      >
        {selectedImage && <img src={`data:image/png;base64, ${selectedImage}`} alt="Imagem" style={{ width: '100%', maxWidth: '100%', marginTop: '24px' }} />}
      </Modal>

      <DetailsModal />

      <Modal
        visible={showDeleteConfirmationModal}
        onCancel={() => setShowDeleteConfirmationModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowDeleteConfirmationModal(false)}>
            Cancelar
          </Button>,
          <Button key="delete" type="primary" onClick={handleDeleteConfirmation}>
            Excluir
          </Button>,
        ]}
      >
        <p>Deseja realmente excluir esta tarefa?</p>
      </Modal>
    </>
  );
};

export default Home;
