import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManageEventsPage from "@/app/components/admin/Events";

// Mock next/navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/app/components/admin/Sidebar", () => {
  const MockSidebar = () => <div data-testid="sidebar" />;
  MockSidebar.displayName = "MockSidebar";
  return MockSidebar;
});

jest.mock("@/app/components/admin/modals/event/DeleteModelEvent", () => {
  const MockDeleteModalEvent = () => <button data-testid="delete-btn" />;
  MockDeleteModalEvent.displayName = "MockDeleteModalEvent";
  return MockDeleteModalEvent;
});
global.fetch = jest.fn();

const mockCategories = [
  { id: "cat-1", name: "Music" },
  { id: "cat-2", name: "Sports" },
];

const mockEvent = {
  id: "event-1",
  title: "Rock Concert",
  image: "/img.jpg",
  price: "50",
  eventDate: new Date("2026-06-15T20:00:00").toISOString(),
  city: { name: "Casablanca" },
  category: { name: "Music" },
};

const mockPagination = {
  currentPage: 1,
  totalPage: 2,
  totalItems: 8,
  offset: 0,
  hasPrevPage: false,
  hasNextPage: true,
};

const setupFetch = (events = [mockEvent], pagination = mockPagination) => {
  (fetch as jest.Mock)
    .mockResolvedValueOnce({ json: async () => mockCategories }) // categories
    .mockResolvedValueOnce({
      json: async () => ({ data: events, Pagination: pagination }),
    }); // events
};

describe("ManageEventsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page title and create button", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    expect(screen.getByText("Manage Events")).toBeInTheDocument();
    expect(screen.getByText("Create New Event")).toBeInTheDocument();
  });

  it("renders category filter options after fetch", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      const select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Music");
      expect(select).toHaveTextContent("Sports");
    });
  });

  it("shows skeleton rows while loading", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // never resolves
    render(<ManageEventsPage />);

    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(5);
  });

  it("renders event row with correct data after fetch", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Rock Concert")).toBeInTheDocument();
      expect(screen.getByText("Casablanca")).toBeInTheDocument();
      expect(screen.getByText("$50")).toBeInTheDocument();
    });
  });

  it('shows "No events found" when events list is empty', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => mockCategories })
      .mockResolvedValueOnce({
        json: async () => ({
          data: [],
          Pagination: { ...mockPagination, totalPage: 0, totalItems: 0 },
        }),
      });

    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("No events found")).toBeInTheDocument();
      expect(
        screen.getByText("You haven't created any events yet."),
      ).toBeInTheDocument();
    });
  });

  it('shows "Create your first event" button when no events and no search', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => [] })
      .mockResolvedValueOnce({
        json: async () => ({ data: [], Pagination: mockPagination }),
      });

    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Create your first event")).toBeInTheDocument();
    });
  });

  it("renders table headers correctly", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    expect(screen.getByText("Event Details")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Date & Time")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("updates search param and calls router.push on input change", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() =>
      screen.getByPlaceholderText("Search events by title..."),
    );

    fireEvent.change(screen.getByPlaceholderText("Search events by title..."), {
      target: { value: "Jazz" },
    });

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("search=Jazz"),
    );
  });

  it("updates category param and calls router.push on select change", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "cat-1" },
    });

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("categoryId=cat-1"),
    );
  });

  it("renders pagination buttons when totalPage > 1", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  });

  it("Previous button is disabled on first page", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeDisabled();
    });
  });

  it("Next button is enabled when hasNextPage is true", async () => {
    setupFetch();
    render(<ManageEventsPage />);

    await waitFor(() => {
      expect(screen.getByText("Next")).not.toBeDisabled();
    });
  });
});
