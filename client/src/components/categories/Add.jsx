import { Button, Form, Input, Modal, message } from 'antd'
import React from 'react'

const Add = ({categories ,setCategories,isAddModalOpen, setIsAddModalOpen}) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        try {
          fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/add-category", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
          message.success("Kategori başarı ile eklendi");
          form.resetFields();
          setCategories([...categories,{
            _id:Math.random(),
            title:values.title
          }])
        } catch (error) {
          console.log(error);
        }
      };
    

  return (
    <Modal
        title="Basic Modal"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default Add