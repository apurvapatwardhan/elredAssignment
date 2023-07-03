import { createContext, useEffect, useState } from "react";
import { CAT_URL, PROD_URL, SUB_CAT_URL } from "../constants";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [product, setProduct] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);

  async function fetchCategories() {
    try {
      const resp = await fetch(CAT_URL);
      const output = await resp.json();

      console.log(output, "cat");
      setCategories(output.result);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchSubCategories(categoryId) {
    try {
      const resp = await fetch(SUB_CAT_URL.replace("<categoryId>", categoryId));
      const output = await resp.json();
      setSubCategories(output.result)
      console.log(output, "subcat");
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProducts(subCategoryId) {
    try {
      const resp = await fetch(
        PROD_URL.replace("<subCategoryId>", subCategoryId)
      );
      const output = await resp.json();
      setProducts(output.result)
    } catch (err) {
      console.error(err);
    }
  }

  const value = {
    categories,
    category,
    subCategories,
    subCategory,
    product,
    products,
    fetchCategories,
    fetchProducts,
    fetchSubCategories,
    showProductModal,
    setShowProductModal,
    setCategory,
    setProduct
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
