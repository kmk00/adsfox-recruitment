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
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
        <p className="font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center font-bold">Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <h1 className="text-2xl text-center">No channels</h1>
        <AddChanelForm refetchChannels={refetch} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <AddChanelForm refetchChannels={refetch} />
        <ChannelsChart channelsData={data} />
      </div>
      <ChannelsList refetchChannels={refetch} channelsData={data} />
    </div>
  );
};

export default ChannelsSection;
