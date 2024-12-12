import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  channelsData: ChannelInfo[];
}

const ChannelsChart = ({ channelsData }: Props) => {
  const randomColor = () => {
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(Math.random() * 128);
      color += value.toString(16).padStart(2, "0");
    }
    return color;
  };

  const renderCustomLabel = (entry: any) => {
    const total = channelsData.reduce(
      (sum, channel) => sum + channel.clientsCount,
      0
    );
    const percentage = ((entry.clientsCount / total) * 100).toFixed(1);
    return `(${percentage}%) ${entry.name}`;
  };

  if (channelsData.length === 0) {
    return <div>No channels</div>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={channelsData}
            dataKey="clientsCount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, clientsCount, percent }) =>
              renderCustomLabel({ name, clientsCount, percent })
            }
          >
            {channelsData.map((channel) => (
              <Cell key={`cell-${channel.id}`} fill={randomColor()} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelsChart;
