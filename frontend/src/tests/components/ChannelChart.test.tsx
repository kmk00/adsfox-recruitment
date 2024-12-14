import { render, screen, waitFor } from "@testing-library/react";
import { getRandomColor } from "../../utils/getRandomColor";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChannelsChart from "../../components/ChannelsChart";

// Mock utility function
vi.mock("../../utils/getRandomColor", () => ({
  getRandomColor: vi.fn(() => "#000000"),
}));

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const mockData = [
  {
    id: 1,
    name: "Facebook",
    clientsCount: 50,
    createdAt: "2011-12-03T10:15:30",
    updatedAt: "2011-12-03T10:15:30",
  },
  {
    id: 2,
    name: "Twitter",
    clientsCount: 30,
    createdAt: "2011-12-03T10:15:30",
    updatedAt: "2011-12-03T10:15:30",
  },
  {
    id: 3,
    name: "Instagram",
    clientsCount: 20,
    createdAt: "2011-12-03T10:15:30",
    updatedAt: "2011-12-03T10:15:30",
  },
];

describe("ChannelsChart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a message when no channels data is provided", () => {
    render(<ChannelsChart channelsData={[]} />);

    const message = screen.getByText(/add channels to see the chart/i);
    expect(message).toBeInTheDocument();
  });

  it("renders a PieChart when channels data is provided", () => {
    render(<ChannelsChart channelsData={mockData} />);

    const pieChart = screen.getByTestId("pie-chart");
    expect(pieChart).toBeInTheDocument();
  });

  it("calls getRandomColor for each channel", () => {
    render(<ChannelsChart channelsData={mockData} />);

    expect(getRandomColor).toHaveBeenCalledTimes(mockData.length);
  });
});
