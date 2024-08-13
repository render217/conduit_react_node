import { formatDistanceToNow } from "date-fns";

export default function TimeAgo({ timestamp }: { timestamp: string }) {
    const timeAgo = formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
    });

    return <span>{timeAgo}</span>;
}
