import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from 'react-router-dom';

const DynamicMenu = lazy(() => import("../component/DynamicMenu"))
const App = lazy(() => import("../App"))

const suspenseWithLoading = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
    return (
        <Suspense>
            <Component />
        </Suspense>
    )
}

const appRouter = createBrowserRouter([
    {
        path: '/home',
        element: suspenseWithLoading(App), // layout is lazy loaded
        children: [
        ],
    },
    {
        path: '/menu',
        element: suspenseWithLoading(DynamicMenu), // layout is lazy loaded
    },
])

export default appRouter