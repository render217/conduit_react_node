import { format } from "date-fns";

export default function FormattedDate({ timestamp }: { timestamp: string }) {
    return <>{format(new Date(timestamp), "MMMM d, yyyy")}</>;
}
