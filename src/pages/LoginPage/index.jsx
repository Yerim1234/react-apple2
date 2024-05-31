import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handleEmailLogin } from "../../firebase";
import useFormInput from "../../hooks/useFormInput";

export default function LoginPage() {
  const email = useFormInput("");
  const password = useFormInput("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // 오류를 초기화
    const user = await handleEmailLogin(email.value, password.value);
    localStorage.setItem("userData", JSON.stringify(user));
    navigate("/main");
  };
  return (
    <Container>
      <Center>
        <Logo src="/images/apple-gray-logo.svg" alt="logo" />
        <HeadingText>로그인</HeadingText>
        <Description>
          You will be signed in to Apple TV and Apple Music
        </Description>
        <Input
          {...email}
          required
          name="email"
          type="email"
          placeholder="아이디를 입력하세요."
        />
        <Input
          {...password}
          required
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <Button onClick={handleLogin}>로그인</Button>
        <LinkText as={Link} to="/signup">
          회원가입하기
        </LinkText>
        {error && <ErrorText>오류 : {error}</ErrorText>}
      </Center>
    </Container>
  );
}

const ErrorText = styled.p`
  color: #ff4f4f;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`;
const HeadingText = styled.h1`
  font-size: 1.9rem;
`;
const Description = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;
const LinkText = styled.a`
  font-size: 1.2rem;
  color: #2997ff;
  margin-top: 1.5rem;
  margin-bottom: 0;
  cursor: pointer;
`;
const Input = styled.input`
  outline: none;
  color: white;
  margin-top: 2rem;
  font-size: 18px;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-weight: 400;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
`;

const Button = styled.button`
  width: 310px;
  background-color: #2997ff;
  border: none;
  padding: 10px;
  border-radius: 12px;
  margin-top: 1.5rem;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;
