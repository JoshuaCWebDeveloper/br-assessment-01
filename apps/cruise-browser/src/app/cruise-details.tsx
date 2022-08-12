import { Card, Heading, Pane, Strong, Paragraph } from 'evergreen-ui';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../redux/hooks';

import { useGetCruisesQuery } from '../redux/modules/api/gmrt.api';

// eslint-disable-next-line @typescript-eslint/ban-types
type CruiseDetailsProps = {};

// eslint-disable-next-line no-empty-pattern
export const CruiseDetails = ({}: CruiseDetailsProps) => {
    const { logic } = useAppContext();
    const { data } = useGetCruisesQuery();
    const { id } = useParams() as { id: string };
    const cruise = data?.[id];
    if (!cruise) {
        throw new Error('No cruise found for id: ' + id);
    }
    const name = logic.cruiseList.getCruiseName(cruise);
    return (
        <Pane className="cruise-details">
            <Heading size={700}>Cruise {name}</Heading>

            <Paragraph>
                <Strong>URL: </Strong>
                <a href={cruise.url} target="_blank" rel="noreferrer">
                    {cruise.url}
                </a>
            </Paragraph>

            <div className="info">
                <Card>
                    <Heading>Personnel</Heading>
                    <Paragraph>
                        <Strong>Chief: </Strong> {cruise.chief}
                    </Paragraph>
                </Card>

                <Card>
                    <Heading>Device Info</Heading>
                    <Paragraph>
                        <Strong>Make: </Strong> {cruise.device_make}
                    </Paragraph>
                    <Paragraph>
                        <Strong>Model: </Strong> {cruise.device_model}
                    </Paragraph>
                    <Paragraph>
                        <Strong>Platform: </Strong> {cruise.platform_id}
                    </Paragraph>
                </Card>

                <Card>
                    <Heading>Survey Info</Heading>
                    <Paragraph>
                        <Strong>Coordinates: </Strong> {cruise.center_x},{' '}
                        {cruise.center_y}
                    </Paragraph>
                    <Paragraph>
                        <Strong>Track Length: </Strong> {cruise.track_length}
                    </Paragraph>
                    <Paragraph>
                        <Strong>Total Area: </Strong> {cruise.total_area}
                    </Paragraph>
                </Card>
            </div>
        </Pane>
    );
};
