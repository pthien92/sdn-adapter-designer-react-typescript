import { Position, Toaster, Intent } from '@blueprintjs/core';

export const AppNotification = Toaster.create({
    className: "recipe-toaster",
    position: Position.BOTTOM_RIGHT
})
