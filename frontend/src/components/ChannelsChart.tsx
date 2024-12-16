import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = channelsData.reduce(
        (sum, channel) => sum + channel.clientsCount,
        0
      );
      const percentage = ((data.clientsCount / total) * 100).toFixed(1);

      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">Clients: {data.clientsCount}</p>
          <p className="text-sm">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelsChart;
