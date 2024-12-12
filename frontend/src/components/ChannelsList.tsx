import SingleChannel from "./SingleChannel";

interface Props {
  channelsData: ChannelInfo[];
}

const ChannelsList = ({ channelsData }: Props) => {
  return (
    <table className="table text-center max-w-4xl mx-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Users</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {channelsData.map((channel) => (
          <SingleChannel key={channel.id} {...channel} />
        ))}
      </tbody>
    </table>
  );
};

export default ChannelsList;
