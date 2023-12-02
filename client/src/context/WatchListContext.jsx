import { createContext, useState } from "react";

export const WatchListContext = createContext({});

export function WatchListContextProvider({children}) {
  const [WatchList, setWatchList] = useState([])

  return (
    <WatchListContext.Provider value={{WatchList,setWatchList}}>
      {children}
    </WatchListContext.Provider>
  );
}