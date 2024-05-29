import { Button, Card, Input, Popconfirm, Space, Table } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Headerr from "../components/header/Headerr";
import CreateBill from "../components/cart/CreateBill";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteCart, increase } from "../redux/cartSlice";
import Highlighter from "react-highlight-words";

const CartPage = () => {
  const cart=useSelector((state)=> state.cart)
  const dispatch=useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  
  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width:"125px",
      render:(img)=>{
        return (<img src={img} alt="" className="w-full h-20 object-cover "/>)
      }
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category")
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render:(text)=>{
          return (<span>{text.toFixed(2)} ₺</span>)
      },
      sorter: (a,b)=> a.price - b.price
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render:(item,record)=>{//item ilgili parametrenin dataIndexe göre gelen verisi record ta ilgili parametre ta kendisi
        return(<div className="flex items-center">
        <Button
          type="primary"
          size="small"
          className="w-full  flex items-center justify-center !rounded-full"
          icon={<PlusCircleOutlined />}
          onClick={() => dispatch(increase(record))}
        />
        <span className="font-bold w-6 inline-block text-center ">
          {item}
        </span>
        <Button
          type="primary"
          size="small"
          className="w-full  flex items-center justify-center !rounded-full"
          icon={<MinusCircleOutlined />}
          onClick={() => dispatch(decrease(record))}
        />
      </div>)
      }
    },
    {
      title: "Toplam Fiyatı",
      dataIndex: "total",
      key: "total",
      render:(text,record)=>{
        return(<span>{record.quantity*record.price.toFixed(2)} ₺</span>)
      }
      
    },
    {
      title: "Actions",
      render:(_,record)=>{
        return(
        <Popconfirm
        title="Silmek istiyor musunuz?"
        onConfirm={() => dispatch(deleteCart(record))}
        okText="Evet"
        cancelText="Hayır"
        >
          <Button type="link" danger >Sil</Button>
          </Popconfirm>)
      }
      
    },
  ];

  return (
    <>
      <Headerr />
      <div className=" md:px-6  px-3  md:h-[calc(100vh_-_112px)] h-[calc(100vh_-_160px)] flex flex-col justify-between" >
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1200,y:300
          }}
          key={"_id"}
        />
        <div className="cart-total flex justify-end mt-5 mb-5">
          <Card className=" md:w-72 ">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total.toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV % {cart.tax}</span>
              <span className="text-red-700">{(cart.total / 100) * cart.tax > 0
                ? ((cart.total / 100) * cart.tax).toFixed(2)
                : 0}₺</span>
            </div>
            <div className="flex justify-between ">
              <b>Toplam</b>
              <b>{(cart.total + (cart.total / 100) * cart.tax).toFixed(2)}₺</b>
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-4 w-full"
                size="large"
                type="primary"
                onClick={() => setIsModalOpen(true)}
                disabled={cart.cartItems.length === 0}
              >
                Sipariş Oluştur
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
};

export default CartPage;
