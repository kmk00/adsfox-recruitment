import { useState } from "react";
import AddChanelForm from "./AddChanelForm";
import ChannelsChart from "./ChannelsChart";
import ChannelsList from "./ChannelsList";

const ChannelsSection = () => {
  const [channels] = useState<ChannelInfo[]>([
    {
      id: 1,
      name: "Channel 1",
      clientsCount: 10,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Channel 2",
      clientsCount: 112,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: 3,
      name: "Channel 3",
      clientsCount: 23,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: 4,
      name: "Channel 4",
      clientsCount: 33,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: 5,
      name: "Channel 5",
      clientsCount: 143,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
  ]);

  return (
    <div>
      <ChannelsChart />
      <AddChanelForm />
      <ChannelsList channelsData={channels} />
    </div>
  );
};

export default ChannelsSection;
