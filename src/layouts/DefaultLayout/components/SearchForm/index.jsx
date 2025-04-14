import clsx from "clsx";
import styles from "./SearchForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function SearchForm() {
    return (
        <div className={clsx(styles.search)}>
            <form className={clsx(styles.search_Form)}>
                <input
                    type="text"
                    placeholder="Bạn cần tìm gì..."
                    className={clsx(styles.search_Input)}
                />
                <button type="submit" className={clsx(styles.search_Button)}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={clsx(styles.svg)}
                    />
                </button>
            </form>
        </div>
    );
}
export default SearchForm;
