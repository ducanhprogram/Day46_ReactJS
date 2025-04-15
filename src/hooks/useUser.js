import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

function useUser() {
    // const data = useContext(UserContext);
    // return data.user?.data;

    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export default useUser;
