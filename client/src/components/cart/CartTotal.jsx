import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteCart, increase, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  //console.log(cart.cartItems);
  return (
    <div className="cart h-full max-h-[calc(100vh_-_80px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li
                className="cart-items flex justify-between items-center"
                key={item._id}
              >
                <div className=" flex items-center">
                  <img
                    src={item.img}
                    className="w-16 h-16 object-cover hover:cursor-pointer"
                    alt=""
                    onClick={() => {
                      if (window.confirm("Emin misiniz?")) {
                        dispatch(deleteCart(item))
                        message.success("Ürün başarı ile silindi");
                      }}

                      }
                      
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}$ X {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center ">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (window.confirm("Emin misiniz?")) {
                        dispatch(decrease(item));
                        message.success("Ürün sepetten silindi");
                      }
                    }}
                  />
                </div>
              </li>
            )).reverse()
          : "Sepetinizde hiç ürün yok..."}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total.toFixed(2)}£</span>
          </div>
          <div className="flex justify-between  p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              +
              {(cart.total / 100) * cart.tax > 0
                ? ((cart.total / 100) * cart.tax).toFixed(2)
                : 0}
              £
            </span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {(cart.total + (cart.total / 100) * cart.tax).toFixed(2)}£
            </span>
          </div>
        </div>
        <div className="flex flex-col py-4 px-2 gap-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={()=>navigate("/card")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            danger
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm("Sepet temizlenicek. Emin misiniz?")) {
                dispatch(reset());
                message.success("Sepet başarı ile temizlendi");
              }
            }}
            disabled={cart.cartItems.length === 0}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
