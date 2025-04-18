import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ThemeProvider } from "./ThemeContext/ThemeContext.jsx";
import GlobalStyles from "./components/GlobalStyles/index.js";

//Phải bọc UserProvider ngoài App thì tất cả component con mới dùng được dữ liệu từ Context.

// createContext() chỉ tạo ra 1 cái "kênh truyền dữ liệu" thôi.
// Nhưng muốn component con lấy được dữ liệu từ context đó thì phải có Provider bao bên ngoài để cung cấp data.
createRoot(document.getElementById("root")).render(
    <GlobalStyles>
        <ThemeProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    </GlobalStyles>
);
