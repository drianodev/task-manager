import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, fetchTaskById } from '../../redux/actions/taskActions';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const taskToEdit = useSelector((state) => state.tasks.task);

  useEffect(() => {
    dispatch(fetchTaskById(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    form.setFieldsValue(taskToEdit);
    form.setFieldsValue({ imagem: undefined, data: undefined });
  }, [form, taskToEdit]);

  const handleEditTask = async (values) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
  
    try {
      await dispatch(updateTask(taskId, values));
      navigate(-1);
      message.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      message.error('Erro ao criar tarefa. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate(-1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      initialValues={{ status: 'PENDENTE' }}
      onFinish={handleEditTask}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      style={{ marginTop: '20px' }}
    >
      <Form.Item
        label="Título"
        name="nome"
        rules={[
          { required: true, message: 'Por favor, insira o nome da tarefa!' },
          { max: 250, message: 'O título deve ter no máximo 250 caracteres!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="descricao"
        rules={[
          { required: true, message: 'Por favor, insira a descrição da tarefa!' },
          { max: 500, message: 'A descrição deve ter no máximo 500 caracteres!' },
        ]}
      >
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Por favor, insira o status da tarefa!' }]}
      >
        <Select defaultValue="PENDENTE">
          <Option value="PENDENTE">PENDENTE</Option>
          <Option value="FINALIZADA">FINALIZADA</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
        <Button type="default" onClick={handleCancel}>
          Cancelar
        </Button>

        <Button type="primary" htmlType="submit" disabled={submitting} style={{ marginLeft: 8 }}>
          Salvar Tarefa
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTask;
