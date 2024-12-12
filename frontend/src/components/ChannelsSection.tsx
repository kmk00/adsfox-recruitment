import AddChanelForm from "./AddChanelForm";
import ChannelsChart from "./ChannelsChart";
import ChannelsList from "./ChannelsList";
import { useQuery } from "@tanstack/react-query";

const ChannelsSection = () => {
  const { data, isLoading, error, refetch } = useQuery<ChannelInfo[]>({
    queryKey: ["channels"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/channels");
      const data: ChannelInfo[] = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch channels");
      }
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <div>
        <h1>No channels</h1>
        <AddChanelForm refetchChannels={refetch} />
      </div>
    );
  }

  return (
    <div>
      <ChannelsChart channelsData={data} />
      <AddChanelForm refetchChannels={refetch} />
      <ChannelsList refetchChannels={refetch} channelsData={data} />
    </div>
  );
};

export default ChannelsSection;
