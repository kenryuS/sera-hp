/**
 * Type for HamburgerMenu component
 * @module utils/hamburgerMenu
 */

import type { DropDownEntry } from "#imports";

/**
 * Interface for HamburgerMenu component properties
 * @property {Array<DropDownEntry>} entries Array of {@link DropDownEntry} objects representing the menu items in the hamburger menu.
 */
interface HamburgerMenuProperty {
    entries: Array<DropDownEntry>;
}

export type { HamburgerMenuProperty };