import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ products,setProducts,categories,filtered,search}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  


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
  }, [setProducts]);
  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered.filter((product)=> product.title.toLowerCase().includes(search)).map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl text-white" />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={()=>navigate("/products")}
      >
        <EditOutlined className="md:text-2xl  text-white" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setProducts={setProducts}
        products={products}
      />
    </div>
  );
};

export default Products;
