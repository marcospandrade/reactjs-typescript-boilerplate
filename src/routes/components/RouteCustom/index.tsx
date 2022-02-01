import React from 'react';
import {
    Route,
    RouteProps
} from 'react-router-dom';

interface RoutePropsCustom extends RouteProps {
    component: React.ComponentType;
    layout: any;
}

export function RouteCustom({
    component: Component,
    layout: LayoutComponent,
    ...rest
}: RoutePropsCustom) {
    return (
        <Route
            {...rest}
            render={() => {
                return (
                    <LayoutComponent>
                        <Component />
                    </LayoutComponent>
                )
            }}
        />
    );
}