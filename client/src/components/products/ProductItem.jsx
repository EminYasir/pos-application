import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item }) => {
  //const cart=useSelector((state)=>state.cart)//slice taki parametrelere erişim

  const dispatch = useDispatch();

  const handleClick = () => {//fonksiyon kullanma
    dispatch(addProduct({...item,quantity:1}));
    message.success("Ürün sepete başarı ile eklendi")
  };

  return (
    <div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
        onClick={handleClick}
      >
        <div className="product-img">
          <img
            src={item.img}
            alt=""
            className="h-28 object-cover w-full border-b"
          />
          <div className="product-info flex flex-col p-3">
            <span>{item.title}</span>
            <span>{item.price} $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
