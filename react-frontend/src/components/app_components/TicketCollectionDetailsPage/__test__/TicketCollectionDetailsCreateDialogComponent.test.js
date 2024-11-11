import React from "react";
import { render, screen } from "@testing-library/react";

import TicketCollectionDetailsCreateDialogComponent from "../TicketCollectionDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ticketCollectionDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TicketCollectionDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ticketCollectionDetails-create-dialog-component")).toBeInTheDocument();
});
