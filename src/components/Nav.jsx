import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { handleAuth, handleLogOut, onUserState } from "../firebase";

const initialData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Nav = () => {
  const [show, setShow] = useState("false");
  const [userData, setUserData] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // 로그인 & 비로그인 유저별 페이지 라우팅

  useEffect(() => {
    onUserState(setUserData);
  }, []);

  useEffect(() => {
    if (userData) {
      if (localStorage.getItem("justSignedUp") === "true") {
        localStorage.removeItem("justSignedUp");
        navigate("/"); // 회원가입 후 이동할 페이지
      } else {
        navigate("/main");
      }
    } else {
      localStorage.removeItem("userData");
      if (!localStorage.getItem("justSignedUp")) {
        navigate("/");
      }
    }
  }, [userData]);

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const listener = () => {
    if (window.scrollY > 50) {
      setShow("true");
    } else {
      setShow("false");
    }
  };

  // 검색어 저장
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  // 로고 클릭시 이벤트 함수
  const handleLogoClick = () => {
    if (localStorage.getItem("userData")) {
      navigate("/main");
      setSearchValue("");
    } else {
      navigate("/");
    }
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={handleLogoClick}
        />
      </Logo>
      {localStorage.getItem("userData") && (
        <Input
          type="text"
          className="nav__input"
          value={searchValue}
          onChange={handleChange}
          placeholder="영화를 검색해주세요."
        />
      )}
      {!localStorage.getItem("userData") && (
        <Login onClick={handleAuth}>구글 로그인</Login>
      )}

      {localStorage.getItem("userData") && (
        <SignOut>
          {!userData.photoURL && userData && (
            <UserImg src="/images/original-icon.svg" alt="user" />
          )}

          {userData.photoURL && (
            <UserImg src={userData.photoURL} alt={userData.displayName} />
          )}
          <DropDown>{<span onClick={handleLogOut}>로그아웃</span>}</DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 9px;
  border: 1px solid lightgray;
  width: 300px;
  height: 30px;
  outline: none;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.show === "true" ? "#000000" : "#000000"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

export default Nav;
