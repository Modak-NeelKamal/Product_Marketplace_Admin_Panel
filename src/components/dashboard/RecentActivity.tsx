import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDistanceToNow } from '../../utils/dates';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <img
                src={activity.user.avatar}
                alt={activity.user.name}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  <span>{activity.action}</span>
                  {' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;