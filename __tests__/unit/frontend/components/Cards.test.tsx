import { render, screen, waitFor } from "@testing-library/react";
import Cards from "@/app/components/admin/Cards";

global.fetch = jest.fn();

const mockFetch = (eventData: unknown[], ticketData: unknown[]) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => ({ eventData, ticketData }),
  });
};

describe("Cards Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all 4 metric card titles", async () => {
    mockFetch([], []);

    render(<Cards />);

    await waitFor(() => {
      expect(screen.getByText("Total Revenue")).toBeInTheDocument();
      expect(screen.getByText("Tickets Sold")).toBeInTheDocument();
      expect(screen.getByText("Avg. Order Value")).toBeInTheDocument();
      expect(screen.getByText("Events Active")).toBeInTheDocument();
    });
  });

  it("shows correct total revenue", async () => {
    mockFetch(
      [],
      [
        { totalPrice: 100, quantity: 1 },
        { totalPrice: 200, quantity: 2 },
      ],
    );

    render(<Cards />);

    await waitFor(() => {
      expect(screen.getByText("$300.00")).toBeInTheDocument();
    });
  });

  it("shows correct total tickets sold", async () => {
    mockFetch(
      [],
      [
        { totalPrice: 50, quantity: 3 },
        { totalPrice: 50, quantity: 2 },
      ],
    );

    render(<Cards />);

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("shows correct active events count", async () => {
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    const pastDate = new Date(Date.now() - 86400000).toISOString();

    mockFetch(
      [
        { price: "50", eventDate: futureDate }, // active
        { price: "50", eventDate: futureDate }, // active
        { price: "50", eventDate: pastDate }, // not active
      ],
      [],
    );

    render(<Cards />);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("shows correct avg order value", async () => {
    mockFetch(
      [
        { price: "50", eventDate: new Date().toISOString() },
        { price: "100", eventDate: new Date().toISOString() },
      ],
      [],
    );

    render(<Cards />);

    // avg = (50 + 100) / 2 = 75
    await waitFor(() => {
      expect(screen.getByText("$75.00")).toBeInTheDocument();
    });
  });

  it("shows $0.00 when no tickets", async () => {
    mockFetch([], []);

    render(<Cards />);

    await waitFor(() => {
      // Total Revenue and Avg. Order Value both show $0.00
      const elements = screen.getAllByText("$0.00");
      expect(elements).toHaveLength(2);
    });
  });

  it("shows 0 active events when all events are in the past", async () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();

    mockFetch(
      [
        { price: "50", eventDate: pastDate },
        { price: "50", eventDate: pastDate },
      ],
      [],
    );

    render(<Cards />);

    await waitFor(() => {
      // find the Events Active card specifically by its label
      const label = screen.getByText("Events Active");
      const card = label.closest("div.bg-white");
      expect(card).toHaveTextContent("0");
    });
  });
});
