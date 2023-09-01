import{ BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import LoginPage from "./views/LoginPage";
import PostPageHome from "./views/PostPageHome";
import SignUpPage from "./views/SignUpPage";
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";
import PostPageUpdate from "./views/PostPageUpdate";
import Sitenav from "./components/Navbar";
import './index.css'


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
    <Sitenav />
    <Routes>
      <Route path="/" element={<PostPageHome />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/add" element={<PostPageAdd />} />
      <Route path="/post/:id" element={<PostPageDetails />} />
      <Route path="/update/:id" element={<PostPageUpdate />} />
    </Routes>
    </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;