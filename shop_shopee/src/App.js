import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState,useEffect } from "react";
import Products from "./Products";
import Navbar from "./Navbar.js";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./RegisterScreen";
import MainPage from "./MainPage";
import ProductScreen from "./ProductScreen";
function App() {
  const [search, setSearch] = useState({ searchTitle: "price" });
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(Products);
  const [log,setLog] = useState()
  useEffect(()=>{
    function test(){
      setLog(localStorage.getItem("userInfo")  )
    }
    test()
  },[])
  const handleBacktoMainPage = () => {
    setProducts(Products);
  };
  const handleSearchTitle = (e) => {
    const { value, name } = e.target;
    setSearch((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSearch = (e) => {
    e.preventDefault()
    const value = search.searchValue;
    const key = search.searchTitle;

    let newProduct = {};

    switch (key) {
      case "name":
        newProduct = Products.filter((product) =>
          product["name"].toUpperCase().includes(value.toUpperCase())
        );
        break;
      case "price":
        newProduct = Products.filter((product) => product["price"] <= value);
        break;
      case "rating":
        newProduct = Products.filter((product) => product["rating"] >= value);
        break;
      
    }
    setProducts(newProduct);
  };
  return (
    <div className="app">
    <Router>
      <Navbar
        handleSearch={handleSearch}
        handleSearchTitle={handleSearchTitle}
        handleBacktoMainPage={handleBacktoMainPage}
        log={log}
        setLog={setLog}
      />
      <Switch>
        <Route exact path="/" render={() => <MainPage products={products}  />} />
        <Route path="/login" render={() => <Login setLog={setLog} />} />
        <Route path="/register" render={() => <Register setLog={setLog} />} />
        <Route
          path="/product/:id"
          render={() => <ProductScreen products={products} />}
        />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
