import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const NavbarC = ({
  handleSearchTitle,
  handleSearch,
  handleBacktoMainPage,
  history,
  log,
  setLog,
}) => {
  const [open, setOpen] = useState(false);
  return (
    
    <>
      <Navbar style={{ backgroundColor: "#3949AB", position: "relative" }} expand="lg">
        
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {open ? (
          <div className="hamburger_content">
            <ul>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
              <li>
                <Link to="/sell">Sell</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <Link to="" onClick={handleBacktoMainPage}>
          <Navbar.Brand style={{color:"white"}}>海大拍賣</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline onSubmit={handleSearch}>
            <Form.Control
              name="searchTitle"
              onChange={handleSearchTitle}
              as="select"
              style={{marginRight:"1rem"}}
            >
              <option value="price">價格</option>
              <option value="name">名稱</option>
              <option value="rating">評價</option>
              
            </Form.Control>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              name="searchValue"
              onChange={handleSearchTitle}
            />
            <Button
              variant="outline-success"
              type="button"
              onClick={handleSearch}
              style={{color:"white",borderColor:"black"}}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>

        {log ? (
          <>
            <Navbar.Brand style={{color:"white"}}>hello,  {localStorage.getItem("userName")}</Navbar.Brand>
            <Button
              type="button"
              onClick={() => {
                localStorage.removeItem("userInfo");
                localStorage.removeItem("userName");
                setLog("");
                history.push("/");
              }}
            >
              登出
            </Button>
          </>
        ) : (
          <>
          <Link to="/register" style={{marginRight:"1.5rem"}}>
            <Button type="button">註冊</Button>
          </Link>
          <Link to="/login">
            <Button type="button">登入</Button>
          </Link>
          </>
        )}
      </Navbar>
    </>
  );
};

export default withRouter(NavbarC);
