import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getRandomColor } from "../utils/getRandomColor";

interface Props {
  channelsData: ChannelInfo[];
}

type LabelProps = {
  name: string;
  clientsCount: number;
  percent: number;
};

const ChannelsChart = ({ channelsData }: Props) => {
  const renderCustomLabel = (entry: LabelProps) => {
    const total = channelsData.reduce(
      (sum, channel) => sum + channel.clientsCount,
      0
    );
    const percentage = ((entry.clientsCount / total) * 100).toFixed(1);
    return `(${percentage}%) ${entry.name}`;
  };

  if (channelsData.length === 0) {
    return (
      <div className="grid place-items-center text-balance">
        Add channels to see the chart
      </div>
    );
  }

  return (
    <div data-testid="pie-chart">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={channelsData}
            dataKey="clientsCount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, clientsCount, percent }: LabelProps) =>
              renderCustomLabel({ name, clientsCount, percent })
            }
          >
            {channelsData.map((channel) => (
              <Cell key={`cell-${channel.id}`} fill={getRandomColor()} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelsChart;
