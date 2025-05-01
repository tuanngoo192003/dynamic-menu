export interface MenuModel {
    id: number  
    name: string 
    level: number 
    children: MenuModel[]
    isChecked: boolean 
}