import Headerr from "../components/header/Headerr";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotal from "../components/cart/CartTotal";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
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
    getCategories();
  }, []);

  return (
    <>
      <Headerr setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20 ">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 ">
            <Categories
              categories={categories}
              setCategories={setCategories}
              products={products}
              setFiltered={setFiltered}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-auto pb-12 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotal />
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute top-1/3 left-1/2 h-screen" />
      )}
    </>
  );
};

export default HomePage;
