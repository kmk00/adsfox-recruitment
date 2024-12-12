interface Channel {
  name: string;
  clientsCount: number;
}

interface ChannelInfo extends Channel {
  id: number;
  createdAt: string;
  updatedAt: string;
}
