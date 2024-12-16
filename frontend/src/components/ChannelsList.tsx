import SingleChannel from "./SingleChannel";

interface Props {
  channelsData: ChannelInfo[];
  refetchChannels: () => void;
}

const ChannelsList = ({ channelsData, refetchChannels }: Props) => {
  return (
    <table className="table text-center  mx-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Clients Count</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {channelsData.map((channel) => (
          <SingleChannel
            refetchChannels={refetchChannels}
            key={channel.id}
            {...channel}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ChannelsList;
