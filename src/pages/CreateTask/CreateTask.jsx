import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState('');

  const handleCreateTask = async (values) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
  
    try {
      const updatedValues = { ...values, imagem: image };
      await dispatch(addTask(updatedValues));
      form.resetFields();
      navigate('/tasks');
      message.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      message.error('Erro ao criar tarefa. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const base64Image = reader.result.replace(/^data:image\/\w+;base64,/, '');
      setImage(base64Image);
    });

    reader.readAsDataURL(file);
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
      onFinish={handleCreateTask}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      style={{ marginTop: '20px' }}
    >
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Por favor, insira o nome da tarefa!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="descricao"
        rules={[{ required: true, message: 'Por favor, insira a descrição da tarefa!' }]}
      >
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>

      <Form.Item label="Data" name="data">
        <DatePicker showTime format="DD/MM/YYYY HH:mm" />
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

      <Form.Item label="Imagem" name="imagem">
        <Input type="file" onChange={handleFileChange} accept="image/*" />
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

export default CreateTask;
