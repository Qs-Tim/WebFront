import { Form, Input, InputNumber, Button } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Demo = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['book', 'name']} label="书名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['book', 'count']} label="书数" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['book', 'price']} label="价格" rules={[{ type: 'number' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['book', 'introduction']} label="简介">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;