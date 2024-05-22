import { Button, Form, Input, Modal, Select, message } from "antd";
import React from "react";

const Add = ({
  categories,
  products,
  setProducts,
  isAddModalOpen,
  setIsAddModalOpen,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL +"/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarı ile eklendi");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price:Number(values.price)
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün adı giriniz" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Resmi"
          rules={[
            { required: true, message: "Ürün Resim Alanı Boş Geçilemez" },
          ]}
        >
          <Input placeholder="Ürün resmi giriniz" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez" }]}
        >
          <Input type="number" placeholder="Ürün fiyatı giriniz" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Ürün Kategorisi"
          rules={[
            { required: true, message: "Ürün Kategori Alanı Boş Geçilemez" },
          ]}
        >
          <Select
            showSearch
            placeholder="Ürün Kategorisini Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>

        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit" >
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
