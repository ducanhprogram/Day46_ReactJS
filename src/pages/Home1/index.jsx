import Button from "@/components/Button";
import { useState } from "react";

const Home1 = () => {
    // let [count, setCount] = useState(0);
    // const inputRef = useRef(null);
    // useEffect(() => {
    //     console.log("inputReft 2", inputRef.current);
    //     return () => {
    //         console.log("Clean up");
    //         console.log("inputRef 3", inputRef.current);
    //     };
    // }, [count]);
    // console.log("inputRef 1", inputRef.current);
    // return (
    //     <div>
    //         <input ref={inputRef} type="text"></input>
    //         <button
    //             onClick={() => {
    //                 setCount((prevState) => {
    //                     console.log("prevState", prevState);
    //                     return prevState + 1;
    //                 });
    //                 // inputRef.current.focus();
    //             }}
    //         >
    //             Count is {count}
    //         </button>
    //     </div>
    // );

    let [count, setCount] = useState(0);
    let [count2, setCount2] = useState(0);

    return (
        <div>
            <Button
                name="Button 1"
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Count is {count}
            </Button>
            <Button
                name="Button 2"
                onClick={() => {
                    setCount2(count2 + 1);
                }}
            >
                Count is {count2}
            </Button>
        </div>
    );
};

export default Home1;
