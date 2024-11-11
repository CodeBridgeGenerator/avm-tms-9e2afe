import React from "react";
import { render, screen } from "@testing-library/react";

import TicketCollectionDetailsPage from "../TicketCollectionDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ticketCollectionDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TicketCollectionDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ticketCollectionDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("ticketCollectionDetails-add-button")).toBeInTheDocument();
});
