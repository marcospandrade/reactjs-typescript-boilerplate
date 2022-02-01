import { createContext, useContext, ReactNode, useState } from 'react';

type BackdropType = {
    openBackdrop: boolean;
    handleOpenBackdrop: () => void;
    handleCloseBackdrop: () => void;
}

type BackdropContextProviderProps = {
    children: ReactNode;
}

const BackdropContext = createContext({} as BackdropType);

export function BackdropContextProvider({ children }: BackdropContextProviderProps) {

    const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

    const handleCloseBackdrop = () => setOpenBackdrop(false);
    const handleOpenBackdrop = () => setOpenBackdrop(true);

    return (
        <BackdropContext.Provider value={{ openBackdrop, handleOpenBackdrop, handleCloseBackdrop }}>
            {children}
        </BackdropContext.Provider>
    );
}

export function useBackdrop() {
    const context = useContext(BackdropContext);
    return context;
}