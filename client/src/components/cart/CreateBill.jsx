import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    console.log("Received values of form: ", values);

    const newBill = {
      ...values,
      subTotal: cart.total,
      cartItems: cart.cartItems,
      tax: ((cart.total / 100) * cart.tax).toFixed(2),
      totalAmount: (cart.total + (cart.total / 100) * cart.tax).toFixed(2),
    };

    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify(newBill),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      form.resetFields();
      setIsModalOpen(false);
      if (res.status === 200) {
        message.success("Fatura başarı ile oluşturuldu");
        dispatch(reset())
        navigate("/bills")
      }
    } catch (error) {
      message.danger("Fatura oluşturulamadı!!!");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} form={form} onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[{ required: true, message: "Müşteri Adı Boş Geçilemez" }]}
          >
            <Input placeholder="Bir Müşteri Adı Giriniz" />
          </Form.Item>
          <Form.Item
            label="Tel No"
            name={"customerPhoneNumber"}
            rules={[
              { required: true, message: "Telefon Numarası Boş Geçilemez" },
            ]}
          >
            <Input placeholder="Bir Telefon Numarası Giriniz" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="Ödeme Yöntemi"
            name={"paymentMode"}
            rules={[
              { required: true, message: "Ödeme Yöntemi Boş Bırakılamaz" },
            ]}
          >
            <Select placeholder="Ödeme Yöntemi Seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <div className="cart-total flex justify-end mt-4">
            <Card className="w-full ">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>{cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between my-2">
                <span>KDV %{cart.tax}</span>
                <span className="text-red-700">
                  {(cart.total / 100) * cart.tax > 0
                    ? ((cart.total / 100) * cart.tax).toFixed(2)
                    : 0}
                  $
                </span>
              </div>
              <div className="flex justify-between ">
                <b>Toplam</b>
                <b>
                  {(cart.total + (cart.total / 100) * cart.tax).toFixed(2)}$
                </b>
              </div>
              <div className="flex justify-end">
                <Button className="mt-4 w-150" type="primary" htmlType="submit" >
                  Sipariş Oluştur
                </Button>
              </div>
            </Card>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBill;
