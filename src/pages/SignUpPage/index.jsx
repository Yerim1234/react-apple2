import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handleEmailSignup } from "../../firebase";
import useFormInput from "../../hooks/useFormInput";

export default function SignUpPage() {
  const email = useFormInput("");
  const password = useFormInput("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/i.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 오류 초기화

    if (!validateEmail(email.value)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    if (!validatePassword(password.value)) {
      setError(
        "비밀번호는 최소 6자 이상이며, 영소문자와 숫자를 포함해야 합니다."
      );
      return;
    }
    try {
      await handleEmailSignup(email.value, password.value);
      alert(`회원가입이 성공적으로 완료되었습니다.`);
      navigate("/");
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다: " + error.message);
    }
  };

  return (
    <Container>
      <Center>
        <Logo src="/images/apple-gray-logo.svg" alt="logo" />
        <HeadingText>Apple TV 회원가입</HeadingText>
        <Description>
          회원가입을 진행하신 후에 Apple TV 서비스를 이용하실 수 있습니다.
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
        <Button onClick={handleSubmit}>회원가입 하기</Button>
        {error && <ErrorText>{error}</ErrorText>}
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
