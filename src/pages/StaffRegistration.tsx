import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Form, Typography, DatePicker, Select, Spin, message } from 'antd';
import { UserOutlined, IdcardOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Password from 'antd/es/input/Password';
import { getDepartments } from '../DB/getDepartments';
import { createUser } from '../DB/createUser';

const { Title } = Typography;
const { Option } = Select;

const StaffRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);
  const [tempData, setTempData] = useState<any>(null);
  const [deptType, setDeptType] = useState<string>();
  const deptTypeList = ["UG Aided", "UG Self Financed", "PG Aided", "PG Self Financed"];
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // Replace with your actual API endpoint to fetch departments from your database
    const fetchDepartments = async () => {
      const data = await getDepartments();
      setTempData(data);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (tempData) {
      Object.entries(tempData).forEach(([key, value]) => {
        if (deptType?.startsWith(key)) {
          if (value) {
            Object.entries(value).forEach(([key, value]) => {
              if (deptType?.endsWith(key)) {
                setDepartments(value!);
              }
            });
          }
        }
      });
    }
  }, [deptType]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const formattedData = {
      ...values,
      dob: values.dob ? values.dob.valueOf() : null // Convert date to a timestamp
    };
    await createUser(formattedData,messageApi);
    setLoading(false);
    form.resetFields();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1E1E2C] p-5">
      
      {contextHolder}
      <Card className="w-full max-w-md p-6 rounded-xl shadow-xl bg-white">
        <Title level={2} className="text-center mb-6 text-indigo-600">Staff Registration</Title>

        <Form
          name="staff_registration"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          requiredMark={false}
        >
          <Form.Item
            name="staffId"
            rules={[{ required: true, message: 'Please enter your staff ID!' }]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="Staff ID" 
              size="large" 
              onChange={(e) => {
                form.setFieldsValue({ staffId: e.target.value.toUpperCase() });
              }}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large" 
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input 
                onChange={(e) => {
                  form.setFieldsValue({ name: e.target.value.toUpperCase() });
                }}
              prefix={<UserOutlined />} 
              placeholder="Full Name" 
              size="large" 
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="departmentType"
            rules={[{ required: true, message: 'Please select your department type!' }]}
          >
            <Select 
              placeholder="Select Department Type" 
              size="large" 
              onChange={(value) => setDeptType(value)}
              disabled={loading}
            >
              {deptTypeList.map((dept, index) => (
                <Option key={index} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="department"
            rules={[{ required: true, message: 'Please select your department!' }]}
          >
            <Select 
              placeholder="Select Department" 
              size="large" 
              disabled={loading}
            >
              {departments.map((dept, index) => (
                <Option key={index} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large" 
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker 
              className="w-full" 
              placeholder="Date of Birth" 
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select 
              placeholder="Select Gender" 
              size="large" 
              disabled={loading}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              loading={loading} 
              block
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
              disabled={loading}
            >
              {loading ? <Spin /> : 'Register'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StaffRegistration;
