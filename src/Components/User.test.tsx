import {render, screen, act, waitFor} from "@testing-library/react";
import User from "./User";

import {Provider} from "react-redux";
import {store} from "../store";

test("renders react component", async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <User />
      </Provider>
    );
  });

  await waitFor(() => {
    //Hello Will be available only if user is defined
    const divElement = screen.getByText("Hello");
    expect(divElement).toBeInTheDocument();
  });
});
