import { useEffect } from "react";

const UseTitle = (title) => {
    useEffect( () => {
        document.title = `${title} - Daily Tasks`; 
    }, [title])
}
export default UseTitle;