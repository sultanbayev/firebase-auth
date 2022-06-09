import React from "react";
import Appbar from "../Appbar";
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
    return (
        <div className="d-flex flex-column">
            <Appbar />
            <main className="my-5"><Outlet /></main>
        </div>
    );
}

export default React.memo(BasicLayout);