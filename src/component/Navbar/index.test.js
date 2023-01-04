import { render, screen } from "@testing-library/react";
import Navbar from ".";

test("title navbar", () => {
  render(<Navbar />);
  const linkElement = screen.getByText("PT Galaxy");
  expect(linkElement).toBeInTheDocument();
});
