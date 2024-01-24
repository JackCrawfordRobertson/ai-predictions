import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn1_Uh1CciqGF9oMxsFxAVnGz21JZYb8Y",
  authDomain: "ai-predictions-53fa1.firebaseapp.com",
  projectId: "ai-predictions-53fa1",
  storageBucket: "ai-predictions-53fa1.appspot.com",
  messagingSenderId: "193733597337",
  appId: "1:193733597337:web:cee34f9c135d644111c008",
  measurementId: "G-68D3S8LFPS"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };