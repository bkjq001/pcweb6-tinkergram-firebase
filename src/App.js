import{ BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import LoginPage from "./views/LoginPage";
import PostPageHome from "./views/PostPageHome";
import SignUpPage from "./views/SignUpPage";
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";
import PostPageRegister from "./views/PostPageRegister";
import PostPageUpdate from "./views/PostPageUpdate";
import Sitenav from "./components/Navbar";
import Account from "./views/Account";
import './index.css'
import Protected from "./components/Protected";


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
    <Sitenav />
    <Routes>
      <Route path="/" element={<PostPageHome />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post-register/:id" element={<PostPageRegister />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/add" element={<PostPageAdd />} />
      <Route path="/post/:id" element={<PostPageDetails />} />
      <Route path="/update/:id" element={<Protected><PostPageUpdate /></Protected>} />
      <Route path="/account" element={<Account />} />
    </Routes>
    </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;