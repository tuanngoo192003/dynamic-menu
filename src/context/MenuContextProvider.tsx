import React, { useState } from "react"
import { MenuModel } from "../model/menu"
import { GetMenu } from "../service/menu"
import { MenuContext } from "./MenuContext"

interface MenuContextProps {
    children: React.ReactNode
}

const MenuContextProvider: React.FC<{children: React.ReactNode}> = ({children}: MenuContextProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [menu, setMenu] = useState<MenuModel[]>([])

    const handleGetMenu = async () => {
        setLoading(true)
        try {
            const res = await GetMenu()
            setMenu(res)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MenuContext.Provider value={{loading, menu, handleGetMenu}}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider 