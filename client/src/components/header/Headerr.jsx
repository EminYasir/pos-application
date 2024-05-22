import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Headerr = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();//bulunduğu sayfanın pathini alır

  const logOut = () => {
    if (window.confirm("çıkış yapmak istediğinize emin misiniz ?")) {
      localStorage.removeItem("postUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div
          className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0
         md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-8 md:py-0 py-2"
        >
          <Link
            to={"/"}
            className={`menu-link ${
              pathname ==="/" && "active"
            }`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 5]}
            className="md:flex hidden"
          >
            <Link
              to={"/card"}
              className={`menu-link ${
                pathname ==="/card" && "active"
              }`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link ${
              pathname ==="/bills" && "active"
            }`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${
              pathname ==="/customers" && "active"
            }`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link ${
              pathname ==="/statics" && "active"
            }`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatislikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link">
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 5]}
          className="md:hidden flex"
        >
          <a
            href={"/card"}
            className="menu-link ${}"
          >
            <ShoppingCartOutlined className="text-2xl " />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </a>
        </Badge>
      </header>
    </div>
  );
};

export default Headerr;
