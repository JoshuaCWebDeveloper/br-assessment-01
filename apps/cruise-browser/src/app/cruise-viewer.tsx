import { Outlet } from 'react-router-dom';
import { CruiseList } from './cruise-list';

export const CruiseViewer = () => {
    return (
        <div className="cruise-viewer">
            <CruiseList />

            <div className="details-container">
                <Outlet />

                {/*
                  I wasn't able to get this working:

                <CruisesMap />
                
                */}
            </div>
        </div>
    );
};
