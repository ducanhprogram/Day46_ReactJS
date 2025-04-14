import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

function useUser() {
    const data = useContext(UserContext);

    return data.user?.data;
}

export default useUser;
