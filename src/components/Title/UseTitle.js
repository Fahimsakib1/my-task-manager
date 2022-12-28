import { useEffect } from "react";

const UseTitle = (title) => {
    useEffect( () => {
        document.title = `${title} - My Task Manager`;
    }, [title])
}
export default UseTitle;