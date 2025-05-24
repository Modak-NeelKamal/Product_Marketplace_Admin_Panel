import { Card, CardContent } from "../ui/Card";
import { cn } from "../../utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ElementType;
  className?: string;
}

const StatCard = ({ title, value, change, icon: Icon, className }: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
            
            {change && (
              <p className={cn(
                "text-xs font-medium mt-2",
                change.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                <span>
                  {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">from last period</span>
              </p>
            )}
          </div>
          
          <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;