
import MenuContextProvider from "../../context/MenuContextProvider";
import { composeProviders } from "./composeProviders";


const providers = [
    MenuContextProvider
];

export const AppContextProvider = composeProviders(providers);
