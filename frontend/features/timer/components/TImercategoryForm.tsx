import React from "react";

export default function TImercategoryForm() {
    return (
        <form className="md:w-[20%] w-[90%] m-auto relative md:mt-0">
            <input
                type="text"
                name="category"
                placeholder="add task"
                className="w-[85%] border-b border-gray-800 bg-transparent px-1 py-2  mt-2 outline-none focus:outline-none focus:duration-300"
            />
            <button className="hover:duration-300 hover:bg-gray-600 absolute right-0 top-[10px] bg-gray-800 p-1 w-[32px] rounded-full">
                ＋
            </button>
        </form>
    );
}
