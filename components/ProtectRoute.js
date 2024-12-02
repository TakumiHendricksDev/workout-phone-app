import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "expo-router";
import {ActivityIndicator} from "react-native";

const ProtectRoute = ({ children }) => {
    const {user, isLoading} = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        }
    }, [user]);

    if (isLoading) {
        return (<ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>);
    }

    if(!user) return null;
    return children;
};

export default ProtectRoute;