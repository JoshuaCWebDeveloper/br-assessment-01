import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { CruiseDetails } from './cruise-details';
import { CruiseViewer } from './cruise-viewer';

const StyledApp = styled.div`
    height: 100%;

    // Your style here
    .cruise-viewer {
        display: flex;
        height: 100%;

        .cruise-list {
            .table {
                height: 100%;
            }

            .table-body {
                height: calc(100% - 64px);
            }
        }

        .details-container {
            flex: 1;
        }

        .cruise-details {
            padding: 5px;
            text-align: center;

            h2 {
                text-align: center;
                margin: 10px;
            }

            .info {
                display: flex;
                text-align: left;
            }

            .info > div {
                border: 1px #ccc solid;
                flex: 1;
                margin: 10px;
                padding: 5px;
            }
        }
    }
`;

export function App() {
    return (
        <StyledApp>
            <Routes>
                <Route path="/cruises" element={<CruiseViewer />}>
                    <Route path=":id" element={<CruiseDetails />} />
                </Route>
                <Route path="/" element={<Navigate to="/cruises" replace />} />
            </Routes>
        </StyledApp>
    );
}

export default App;
