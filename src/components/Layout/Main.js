import React from 'react';
import { Outlet } from 'react-router-dom';
import Header1 from '../Shared/Header/Header1';

const Main = () => {
    return (
        <div>
            <Header1></Header1>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;