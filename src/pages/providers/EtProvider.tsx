import React, { createContext, useState } from 'react'
// export const EtContext = createContext({});
export const EtContext =
    createContext<
        {
            isCoordinator: boolean;
            setIsCoordinator: React.Dispatch<React.SetStateAction<boolean>>
        }
    >(
        {
            isCoordinator: false,
            setIsCoordinator: () => { } // 初期値として空の関数を指定
        });


interface EtContextType {
    isCoordinator: boolean;
    curentEventId: string;
    setIsCoordinator: (isCoordinator: boolean) => void;
    setCurentEventId: (curentEventId: string) => void;
}
// https://www.dhiwise.com/post/a-beginner-guide-to-using-react-context-with-typescript
export const EtContext = React.createContext<EtContextType | null>(null);

const EtProvider = (props: any) => {
    const { children } = props;
    const [etcontext, setEtcontext] = useState<EtContextType>();

    return (
        <div>
            <EtContext.Provider value={{ etcontex }}>
                {children}
            </EtContext.Provider>
        </div>
    )
}

export default EtProvider