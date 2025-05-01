import React, { JSX, useEffect, useState } from "react";
import { MenuModel } from "../model/menu";
import { useMenu } from "../mocks/useMenu";
import { Checkbox, Col, Row } from "antd";
import "../css/Menu.css"

const DynamicMenu: React.FC = () => {

    const { menu, loading, handleGetMenu } = useMenu()
    const [menuGot, setMenuGot] = useState<MenuModel[]>([])
    let totalItem = 0
    // const [numOfItem, setNumOfItem] = useState<number>(0)
    useEffect(() => {
        handleGetMenu()
    }, [])
    useEffect(() => {
        setMenuGot(menu)
    }, [menu])

    const countTotalItem = (menu: MenuModel[]) => {
        menu.forEach(item => {
            totalItem++
            if (item.children?.length > 0) {
                countTotalItem(item.children)
            }
        })
    }

    const flattenMenu = (menu: MenuModel[], totalItem: number): MenuModel[] => {
        let row = 0
        let col = 0
        const numRows = Math.ceil(totalItem/3)
        const matrix: MenuModel[][] = [[], [], []]

        const traverse = (menu: MenuModel[]) => {
            for(const item of menu) {
                matrix[col][row] = item 
                row++
                if(row == numRows) {
                    col++
                    row = 0
                }
                if (item.children && item.children.length > 0) {
                    traverse(item.children)
                }
            }
        }
        traverse(menu)

        const computedMenu: MenuModel[] = []
        for (let row = 0; row < matrix[0].length; row++) {
            for (let col = 0; col < matrix.length; col++) {
              const item = matrix[col][row];
              if (item) {
                computedMenu.push(item);
              }
            }
          }
        return computedMenu
    }

    const checkChildren = (item: MenuModel) => {
        const cloneMenu = structuredClone(menuGot);
    
        const updateChildNode = (node: MenuModel[], isChecked: boolean) => {
            node.forEach(child => {
                child.isChecked = isChecked;
                if (child.children.length > 0) {
                    updateChildNode(child.children, isChecked);
                }
            });
        }
    
        const updateNode = (nodes: MenuModel[]): boolean => {
            for (const node of nodes) {
                if (node.id === item.id) {
                    node.isChecked = !node.isChecked;
                    updateChildNode(node.children, node.isChecked);
                    return true; // stop traversal once found
                }
                if (node.children.length > 0) {
                    if (updateNode(node.children)) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        updateNode(cloneMenu);
        setMenuGot(cloneMenu);
    };

    const renderChildren = (menuItems: MenuModel[]): JSX.Element[] => {
        totalItem = 0
        countTotalItem(menuItems)
        const computedMenuItems = flattenMenu(menuItems, totalItem)
        console.log(computedMenuItems)
        return computedMenuItems.map(item => (
            <React.Fragment key={item.id}>
                <Col span={1} className={"box-border"}>
                    <Checkbox checked={item.isChecked} onChange={() => checkChildren(item)} />
                </Col>
                <Col className={"content"} span={7} key={item.id}
                    style={{
                        paddingLeft: item.level * 10,
                        background: item.level === 0
                            ? "#1610d6"
                            : `rgba(204, 199, 199, ${0.3 + item.level * 0.1})`
                    }}>
                    {item.name}
                </Col>
            </React.Fragment>
        ))
    }

    if (loading || menuGot.length === 0) {
        return <p>hahaha chờ tí đi</p>;
    }

    return (
        <>
            {
                <Row gutter={[0, 0]} justify="space-between" style={{ width: "100%" }}>
                    {
                        renderChildren(menuGot)
                    }
                </Row>
            }
        </>
    )
}

export default DynamicMenu