import Product from "./Product";
import { useState } from "react";
import axios from "axios";
import React from "react";


function ProductGrid({ products }: { products: Array<{ productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage: string}> }) {
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({
    productName: "",
    productCode: "",
    productWeight: "",
    productCustomerID: "",
    productExpiryDate: "",
  });

  const [addProduct, setAddProduct] = useState({
    productName: "",
    productCode: "",
    productWeight: "",
    productCustomerID: "",
    productExpiryDate: "",
  });

  const handleAddProduct = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleEditDisplay = (product: any) => {
    setIsFormVisible(!isFormVisible);
    setIsEditingUser(!isEditingUser);
    setSelectedProduct(product);
    setEditProduct({
      productName: product.productName,
      productCode: product.productCode,
      productWeight: product.productWeight,
      productCustomerID: product.productCustomerID,
      productExpiryDate: product.productExpiryDate,
    });
    console.log('Edit button clicked');

  }

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const productCode = formData.get('productCode') as string;
      const productName = formData.get('productName') as string;
      const productWeight = formData.get('productWeight') as string;
      const productCustomerID = formData.get('productCustomerID') as string;
      const productExpiryDate = formData.get('productExpiryDate') as string;
      // const ProductImage = formData.get('productImage') as File;
      // const NameImage = ProductImage.name;
      console.log('Product Code:', productCode);
      console.log('Product Name:', productName);
      console.log('Product Weight:', productWeight);
      console.log('Product Customer ID:', productCustomerID);
      console.log('Product Expiry Date:', productExpiryDate);
      // console.log('Product Image:', NameImage);

      const response = await axios.put(
        `http://localhost:4000/api/products/${productCode}`,
        {
          productName,
          productWeight,
          productCustomerID,
          productExpiryDate,
          // NameImage,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        console.log('Product updated successfully:', data);
        setIsFormVisible(false);
        window.location.reload();
      } else {
        console.error('Error updating product:', data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const productCode = formData.get('productCode') as string;
      const productName = formData.get('productName') as string;
      const productWeight = formData.get('productWeight') as string;
      const productCustomerID = formData.get('productCustomerID') as string;
      const productExpiryDate = formData.get('productExpiryDate') as string;
      const ProductImage = formData.get('productImage') as File;

      // const NameImage = ProductImage.name;
    

      // Log the form data
      console.log('Product Code:', productCode);
      console.log('Product Name:', productName);
      console.log('Product Weight:', productWeight);
      console.log('Product Customer ID:', productCustomerID);
      console.log('Product Expiry Date:', productExpiryDate);
      // console.log('Product Image:', NameImage);

      // You can now send this data to the server to add it to the database
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode,
          productName,
          productWeight,
          productCustomerID,
          productExpiryDate,
          // NameImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Product added successfully, you can handle this as needed
        console.log('Product added successfully:', data);
        setIsFormVisible(false); // Hide the form after successful submission
        // rerender the page
        window.location.reload();
      } else {
        // Error adding product, handle accordingly
        console.error('Error adding product:', data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
        {products.map((product) => {
          return (
            <div 
              className="relative transform transition-transform duration-500 hover:scale-110"
              key={product.productCode}
            >
              <Product
                key={product.productCode}
                productName={product.productName}
                productCode={product.productCode}
                productWeight={product.productWeight}
                productCustomerID={product.productCustomerID}
                productExpiryDate={product.productExpiryDate} 
                ProductImage={product.ProductImage}
                onClick={() => handleEditDisplay(product)}
              />
            </div>
          );
        })}
        <div className="flex flex-col justify-center items-center">
        {!isFormVisible && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center"
          onClick={handleAddProduct}>
          <span className="text-2xl pb-1 leading-none">+</span>
        </button>
        )}
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <form onSubmit={isEditingUser ? handleEdit : handleSubmit} className="space-y-6 bg-gray-100 shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto">
            <div className="flex flex-col">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productCode">
                Product Code:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productCode" id="productCode" required
                      value={isEditingUser ? (editProduct.productCode) : (addProduct.productCode)} onChange={(e) => isEditingUser ? setEditProduct({ ...editProduct, productCode: e.target.value }) : setAddProduct({ ...addProduct, productCode: e.target.value })} />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productName">
                Product Name:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productName" id="productName" required 
                      value={isEditingUser ? (editProduct.productName) : (addProduct.productName)} onChange={(e) => isEditingUser ? setEditProduct({ ...editProduct, productName: e.target.value }) : setAddProduct({ ...addProduct, productName: e.target.value })} />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productWeight">
                Product Weight:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productWeight" id="productWeight" required 
                    value={isEditingUser ? (editProduct.productWeight) : (addProduct.productWeight)} onChange={(e) => isEditingUser ? setEditProduct({ ...editProduct, productWeight: e.target.value }) : setAddProduct({ ...addProduct, productWeight: e.target.value })} />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productCustomerID">
                Product Customer ID:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productCustomerID" id="productCustomerID" required 
                    value={isEditingUser ? (editProduct.productCustomerID) : (addProduct.productCustomerID)} onChange={(e) => isEditingUser ? setEditProduct({ ...editProduct, productCustomerID: e.target.value }) : setAddProduct({ ...addProduct, productCustomerID: e.target.value })} />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productExpiryDate">
                Product Expiry Date:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="date" name="productExpiryDate" id="productExpiryDate" required 
                    value={isEditingUser ? (editProduct.productExpiryDate) : (addProduct.productExpiryDate)} onChange={(e) => isEditingUser ? setEditProduct({ ...editProduct, productExpiryDate: e.target.value }) : setAddProduct({ ...addProduct, productExpiryDate: e.target.value })} />
            </div>
            
            <div className="flex flex-col">
              {/* Uncomment if you need to upload an image
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="productImage">
                Product Image:
              </label>
              <input className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" type="file" name="productImage" id="productImage" accept="image/*" required />
              */}
            </div>
            
            <div className="flex justify-center space-x-4 pt-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                {isEditingUser ? 'Save' : 'Add'}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsFormVisible(false);
                  setIsEditingUser(false);
                  setAddProduct({
                    productName: "",
                    productCode: "",
                    productWeight: "",
                    productCustomerID: "",
                    productExpiryDate: "",
                  });
                  setEditProduct({
                    productName: "",
                    productCode: "",
                    productWeight: "",
                    productCustomerID: "",
                    productExpiryDate: "",
                  });
                }}
                className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50" >
                  Cancel
              </button>
            </div>
          </form>

        </div>
        )}
        </div>
      </div>
    );
}

export default ProductGrid