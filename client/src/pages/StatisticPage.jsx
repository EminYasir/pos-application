import React from "react";
import { useEffect, useState } from "react";
import Headerr from "../components/header/Headerr";
import { Area, Pie } from "@ant-design/plots";
import StatisticCard from "../components/statistics/StatisticCard";
import { Spin } from "antd";

const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user=JSON.parse(localStorage.getItem("postUser"))

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL +"/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const pieConfig = {
    data,
    angleField: 'subTotal',
    colorField: 'customerName',
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };
  return (
    <>
      <Headerr />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
      {data ? (<div className="px-6 md:pb-0 pb-20">
        
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">{user.username}</span>
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4 ">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
          <div className="md:flex hidden justify-between gap-10 lg:flex-row flex-col items-center ml-10  ">
            <div className="lg:w-1/2 lg:h-full h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-full h-72">
              <Pie {...pieConfig} />
            </div>
          </div>
        </div>
      </div>) : ( <Spin size="large" className="absolute top-1/3 left-1/2 h-screen"/>)}
    </>
  );
};

export default StatisticPage;
