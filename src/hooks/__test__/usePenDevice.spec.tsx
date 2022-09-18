/**
 * @jest-environment jsdom
 */

import {
  createEvent,
  fireEvent,
  renderHook,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DEFAULT_PEN_DEVICE_STATE, usePenDevice } from "../usePenDevice";

const TEST_AREA_EL_ID = "TEST_AREA_EL_ID";

const user = userEvent.setup();
describe("usePenDevice", () => {
  it("should return default state at the first render", () => {
    const { result } = renderHook(usePenDevice);
    expect(result.current).toStrictEqual(DEFAULT_PEN_DEVICE_STATE);
  });
  it("should return default state at the first render", async () => {
    const { result, rerender } = renderHook(usePenDevice, {
      wrapper: ({ children }) => (
        <div data-testid={TEST_AREA_EL_ID}>{children}</div>
      ),
    });

    const target = screen.getAllByTestId(TEST_AREA_EL_ID)[0];

    const pointerMoveEvent = createEvent["pointerMove"](target, {
      pointerType: "pen",
      pressure: 1,
    }) as PointerEvent;

    console.log("touchMoveEvent", pointerMoveEvent.pressure);
    fireEvent.touchMove(target, pointerMoveEvent);

    rerender();
    expect(result.current.pressure).toBe(1);
    expect(result.current.deviceType).toBe("pen");
  });
});
