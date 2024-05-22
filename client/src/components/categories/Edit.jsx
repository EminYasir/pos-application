import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({
  categories,
  setCategories,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const [editingRow, setEditingRow] = useState({});
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarı ile güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.success("Bişeyler yanlış gitti");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarı ile silindi");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.success("Bişeyler yanlış gitti");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Categori title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return record.title;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)}>
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
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
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          pagination={false}
          rowKey={"_id"}
        ></Table>
      </Form>
    </Modal>
  );
};

export default Edit;
