import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import "../categories/style.css";
import { useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { useEffect } from "react";

const Categories = ({ categories, setCategories,products,setFiltered }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle,setCategoryTitle]=useState("Tümü");

  useEffect(()=>{
    if (categoryTitle==="Tümü") {
      setFiltered(products)
    }else{
      setFiltered(products.filter((item)=> item.category === categoryTitle))
    }
  },[setFiltered,products,categoryTitle])

  return (
    <ul className="flex md:flex-col overflow-auto pb-2 gap-4 text-center">
      {categories.map((item) => (
        <li className={`category-item ${item.title===categoryTitle && "!bg-pink-700"}`} key={item._id} onClick={()=>setCategoryTitle(item.title)}>
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        categories={categories}
        setCategories={setCategories}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <Edit
        categories={categories}
        setCategories={setCategories}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      ></Edit>
    </ul>
  );
};

export default Categories;
