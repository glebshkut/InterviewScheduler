import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  const { getAllByText, getAllByTestId, getByAltText, getAllByAltText, getByPlaceholderText, getByText } = render(<Application />);

  await waitForElement(() => getAllByText("Archie Cohen"));

  const appointments = getAllByTestId("appointment");
  const appointment = appointments[0];

  fireEvent.click(getAllByAltText("Add")[0]);

  fireEvent.change(getByPlaceholderText(/enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText("Sylvia Palmer"));

  fireEvent.click(getByText("Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  console.log(prettyDOM(appointment));
});