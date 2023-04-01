type Event = {
    [key: string]: any;
    event_id: string;
    creator_id: string;
    host_datetime: string;
    title: string;
    description?: string;
    location: string;
};

export default Event;
