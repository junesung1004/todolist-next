import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button1";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button onClick={() => {}}>Test Button</Button>);

    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
