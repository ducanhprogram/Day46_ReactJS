import { useLoading } from "@/hooks/useLoading";
import clsx from "clsx";
import styles from "./Loading.module.scss";

const Loading = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className={clsx(styles.loadingOverlay)}>
            <div className={clsx(styles.spinner)}></div>
            <p className={clsx(styles.loadingText)}>Đang tải...</p>
        </div>
    );
};

export default Loading;
