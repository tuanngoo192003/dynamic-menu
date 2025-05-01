import React, { JSX, useEffect, useState } from "react";
import { MenuModel } from "../model/menu";
import { useMenu } from "../mocks/useMenu";
import { Checkbox, Col, Row } from "antd";
import "../css/Menu.css"

const DynamicMenu: React.FC = () => {

    const { menu, loading, handleGetMenu } = useMenu()
    const [menuGot, setMenuGot] = useState<MenuModel[]>([])
    // const [numOfItem, setNumOfItem] = useState<number>(0)
    useEffect(() => {
        handleGetMenu()
    }, [])
    useEffect(() => {
        setMenuGot(menu)
    }, [menu])

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

        const updateNode = (nodes: MenuModel[]) => {
            for (const node of nodes) {
                if (node.id === item.id) {
                    node.isChecked = !node.isChecked;
                    updateChildNode(node.children, node.isChecked)
                    break;
                }
            }
        };

        updateNode(cloneMenu);
        setMenuGot(cloneMenu);
    };

    const renderChildren = (menuItems: MenuModel[]): JSX.Element[] => {
        return menuItems.map(item => (
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
                {item.children && item.children.length > 0 && renderChildren(item.children)}
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