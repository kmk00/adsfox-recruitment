import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddChannelForm from "../../components/AddChanelForm";
import userEvent from "@testing-library/user-event";
import { successToast } from "../../utils/toasts";

// Mock the dependencies
vi.mock("../../api/handleApi", () => ({
  handleApi: vi.fn(() =>
    Promise.resolve({ message: "Channel added successfully" })
  ),
}));
vi.mock("../../utils/toasts", () => ({
  errorToast: vi.fn(),
  successToast: vi.fn(),
}));

// Mock environment variable
vi.stubEnv("VITE_API_URL", "http://test-api");

describe("AddChannelForm", () => {
  const queryClient = new QueryClient();
  const mockRefetchChannels = vi.fn();
  const user = userEvent.setup();

  // Setup component wrapper with necessary providers
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AddChannelForm refetchChannels={mockRefetchChannels} />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("e.g. Channel 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. 5")).toBeInTheDocument();
    expect(screen.getByText("Add New Channel")).toBeInTheDocument();
  });

  it("displays error message on form submission when required fields are empty", async () => {
    renderComponent();

    const submitButton = screen.getByText("Add New Channel");

    await user.click(submitButton);

    expect(screen.getByText("Name field is required")).toBeInTheDocument();
    expect(
      screen.getByText("Clients count field is required")
    ).toBeInTheDocument();
    expect(mockRefetchChannels).not.toHaveBeenCalled();
  });

  it("displays error message on form submission when name is too long", async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText("e.g. Channel 1");
    const clientsCountInput = screen.getByPlaceholderText("e.g. 5");

    await user.type(nameInput, "a".repeat(31));
    await user.type(clientsCountInput, "5");

    const submitButton = screen.getByText("Add New Channel");

    await user.click(submitButton);

    expect(
      screen.getByText("Name field must be less than 30 characters")
    ).toBeInTheDocument();
    expect(mockRefetchChannels).not.toHaveBeenCalled();
  });

  it("displays error message on form submission when clientsCount is less than 0", async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText("e.g. Channel 1");
    const clientsCountInput = screen.getByPlaceholderText("e.g. 5");

    await user.type(nameInput, "Channel 1");
    await user.type(clientsCountInput, "-1");

    const submitButton = screen.getByText("Add New Channel");

    await user.click(submitButton);

    expect(
      screen.getByText("Clients count field must be greater or equal 0")
    ).toBeInTheDocument();
    expect(mockRefetchChannels).not.toHaveBeenCalled();
  });

  it("returns success message on form submission", async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText("e.g. Channel 1");
    const clientsCountInput = screen.getByPlaceholderText("e.g. 5");

    await user.type(nameInput, "Channel 1");
    await user.type(clientsCountInput, "5");

    const submitButton = screen.getByText("Add New Channel");
    await user.click(submitButton);

    await waitFor(() => {
      expect(successToast).toHaveBeenCalledWith("Channel added successfully");
    });
  });

  it("calls refetchChannels function", async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText("e.g. Channel 1");
    const clientsCountInput = screen.getByPlaceholderText("e.g. 5");

    await user.type(nameInput, "Channel 1");
    await user.type(clientsCountInput, "5");

    const submitButton = screen.getByText("Add New Channel");
    user.click(submitButton);

    await waitFor(() => {
      expect(mockRefetchChannels).toHaveBeenCalledTimes(1);
    });
  });

  it("resets form fields after successful submission", async () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText("e.g. Channel 1");
    const clientsCountInput = screen.getByPlaceholderText("e.g. 5");

    await user.type(nameInput, "Channel 1");
    await user.type(clientsCountInput, "5");

    const submitButton = screen.getByText("Add New Channel");
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).not.toHaveValue("Channel 1");
      expect(clientsCountInput).not.toHaveValue("5");
    });
  });
});
