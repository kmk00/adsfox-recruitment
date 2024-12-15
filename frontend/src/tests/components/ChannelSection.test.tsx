import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChannelsSection from "../../components/ChannelsSection";
import { handleApi } from "../../api/handleApi";

vi.mock("../../components/AddChanelForm", () => ({
  default: () => (
    <div data-testid="add-channel-form">Add Channel Form Mock</div>
  ),
}));

vi.mock("../../components/ChannelsChart", () => ({
  default: () => <div data-testid="channels-chart">Channels Chart Mock</div>,
}));

vi.mock("../../components/ChannelsList", () => ({
  default: () => <div data-testid="channels-list">Channels List Mock</div>,
}));

vi.mock("../../api/handleApi");

vi.stubEnv("VITE_API_URL", "http://test-api");

describe("SingleChannel", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChannelsSection />
      </QueryClientProvider>
    );
  };

  it("should show loading state initially", () => {
    vi.mocked(handleApi).mockImplementation(() => new Promise(() => {}));

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render components after data is fetched", async () => {
    vi.mocked(handleApi).mockResolvedValue({
      data: [
        { id: 1, name: "Channel 1", clientsCount: 10 },
        { id: 2, name: "Channel 2", clientsCount: 20 },
      ],
      message: "Success",
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("channels-chart")).toBeInTheDocument();
      expect(screen.getByTestId("channels-list")).toBeInTheDocument();
      expect(screen.queryByTestId("add-channel-form")).toBeInTheDocument();
    });
  });

  it("should render error message when data fetching fails", async () => {
    vi.mocked(handleApi).mockRejectedValue(new Error("API Error"));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/i)).toBeInTheDocument();
    });
  });
});
