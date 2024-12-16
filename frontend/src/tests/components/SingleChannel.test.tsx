import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { errorToast, successToast } from "../../utils/toasts";
import SingleChannel from "../../components/SingleChannel";

vi.mock("../../api/handleApi", () => ({
  handleApi: vi.fn(() =>
    Promise.resolve({ message: "Channel updated successfully" })
  ),
}));
vi.mock("../../utils/toasts", () => ({
  errorToast: vi.fn(),
  successToast: vi.fn(),
}));

vi.stubEnv("VITE_API_URL", "http://test-api");

describe("SingleChannel", () => {
  const queryClient = new QueryClient();
  const mockRefetchChannels = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    // Render the part of the table to prevent the error:
    // Warning: validateDOMNesting(...): <tr> cannot appear as a child of <div>.
    // at tr
    // at SingleChannel (\frontend\src\components\SingleChannel.tsx:13:26)
    // at QueryClientProvider (/frontend/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js:20:3)
    return render(
      <QueryClientProvider client={queryClient}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Clients Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <SingleChannel
              refetchChannels={mockRefetchChannels}
              id={1}
              name="Test Channel"
              clientsCount={10}
            />
          </tbody>
        </table>
      </QueryClientProvider>
    );
  };

  it("displays channel name and clients count", () => {
    renderComponent();

    expect(screen.getByText("Test Channel")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("displays error message on edit submission when name is empty", async () => {
    renderComponent();

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue("Test Channel");

    await user.clear(nameInput);

    const submitButton = screen.getByText("Save");
    await user.click(submitButton);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).not.toHaveBeenCalled();
    });
  });

  it("displays error message on edit submission when name is too long", async () => {
    renderComponent();

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue("Test Channel");

    await user.clear(nameInput);
    await user.type(nameInput, "a".repeat(50));

    const submitButton = screen.getByText("Save");
    await user.click(submitButton);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).not.toHaveBeenCalled();
    });
  });

  it("displays error message on edit submission when clientsCount is empty", async () => {
    renderComponent();

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const clientsCountInput = screen.getByDisplayValue("10");

    await user.clear(clientsCountInput);

    const submitButton = screen.getByText("Save");
    await user.click(submitButton);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).not.toHaveBeenCalled();
    });
  });

  it("displays error message on edit submission when clientsCount is less than 0", async () => {
    renderComponent();

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const clientsCountInput = screen.getByDisplayValue("10");

    await user.clear(clientsCountInput);
    await user.type(clientsCountInput, "-1");

    const submitButton = screen.getByText("Save");
    await user.click(submitButton);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).not.toHaveBeenCalled();
    });
  });

  it("returns success message on edit submission", async () => {
    renderComponent();

    const editButton = screen.getByText("Edit");
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue("Test Channel");
    const clientsCountInput = screen.getByDisplayValue("10");

    await user.clear(nameInput);
    await user.type(nameInput, "Test Channel Updated");
    await user.clear(clientsCountInput);
    await user.type(clientsCountInput, "5");

    const submitButton = screen.getByText("Save");
    await user.click(submitButton);

    await waitFor(() => {
      expect(successToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).toHaveBeenCalledTimes(1);
    });
  });

  it("Display success message on delete", async () => {
    renderComponent();

    const deleteButton = screen.getByText("Delete");

    await user.click(deleteButton);

    await waitFor(() => {
      expect(successToast).toHaveBeenCalledTimes(1);
      expect(mockRefetchChannels).toHaveBeenCalledTimes(1);
    });
  });
});
