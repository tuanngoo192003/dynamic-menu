import { createContext } from "react"
import { MenuModel } from "../model/menu"

export interface MenuContextType {
    loading: boolean 
    menu: MenuModel[]
    handleGetMenu: () => Promise<void>
}

export const MenuContext = createContext<MenuContextType>({
    loading: false,
    menu: [],
    handleGetMenu: async () => {}
})

