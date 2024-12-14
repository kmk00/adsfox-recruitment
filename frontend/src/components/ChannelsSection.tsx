import AddChanelForm from "./AddChanelForm";
import ChannelsChart from "./ChannelsChart";
import ChannelsList from "./ChannelsList";
import { useQuery } from "@tanstack/react-query";
import { handleApi } from "../api/handleApi";

const ChannelsSection = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const data: unknown = await handleApi<ChannelInfo[]>(
        `${import.meta.env.VITE_API_URL}/channels`,
        "GET"
      );

      return data as ChannelInfo[];
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
