import { createContext, useContext, useState } from "react";

export const PostContext = createContext();

export default function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => {
  return useContext(PostContext);
};
