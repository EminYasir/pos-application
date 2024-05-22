import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/products/get-all");
        const data = await res.json();
        //console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  useEffect(() => {
    form.setFieldsValue(editingItem);
  }, [editingItem, form]);
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL +"/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarı ile güncellendi");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return { ...values };
          }
          return item;
        })
      );
      setIsEditModalOpen(false);
    } catch (error) {
      message.success("Bişeyler yanlış gitti");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL +"/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Product başarı ile silindi");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.success("Bişeyler yanlış gitti");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return record.title;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-contain" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Ürün Kategorisi",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      width: "8%",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        pagination={false}
        rowKey={"_id"}
        scroll={{ x: 1000, y: 600 }}
      ></Table>
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Geçilemez" },
            ]}
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
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Geçilemez" },
            ]}
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
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
