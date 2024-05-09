import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface EtContextType {
    isCoordinator: boolean;
    setIsCoordinator: Dispatch<SetStateAction<boolean>>;
    curentEventId: string;
    setCurentEventId: Dispatch<SetStateAction<string>>;
}
// https://zenn.dev/nenenemo/articles/1ed50829c27a0f
const EtContext = React.createContext<EtContextType>({
    isCoordinator: false,
    setIsCoordinator: () => { },
    curentEventId: "",
    setCurentEventId: () => { },
});
interface EtProviderProps {
    children: ReactNode;
}
export const EtProvider = ({ children }: EtProviderProps) => {
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [curentEventId, setCurentEventId] = useState("");

    return (
        <div>
            <EtContext.Provider value={{ isCoordinator, setIsCoordinator, curentEventId, setCurentEventId }}>
                {children}
            </EtContext.Provider>
        </div>
    )
}

// コンテキストを使用するためのカスタムフック
export const useEtContext = () => useContext(EtContext);