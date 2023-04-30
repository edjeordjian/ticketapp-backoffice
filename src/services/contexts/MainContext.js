import React from 'react'

const MainContext = React.createContext(undefined);

export {
    MainContext
};

export function useMainContext() {
    const context = React.useContext(MainContext);

    if (! context){
        throw new Error("El contexto debe estar dentro del proveedor.");
    }

    return context;
}
