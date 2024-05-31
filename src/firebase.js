import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// 구글 로그인
export const handleAuth = async () => {
  const user = await signInWithPopup(auth, provider);
  localStorage.setItem("userData", JSON.stringify(user));
  return user;
};

// 이메일 로그인
export const handleEmailLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃
export const handleLogOut = () => {
  return signOut(auth)
    .then(() => {
      localStorage.removeItem("userData");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

// 사용자 상태관리
export const onUserState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// 이메일 회원가입
export const handleEmailSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("justSignedUp", "true"); // 회원가입하는 경우 로컬스토리지에 데이터 추가
    return user;
  } catch (error) {
    console.error("오류발생", error);
  }
};
export default app;
