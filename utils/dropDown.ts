/**
 * Types for DropDown component
 * @module utils/dropDown
 */

/**
 * Enum for interaction mode of DropDown component
 * @enum {string}
 */
export const enum DropDownMode {
    onMouseHover = "mousehover",
    onClick = "click",
}

/**
 * Enum for alignment of DropDown component
 * @enum {number}
 */
export const enum DropDownAlignment {
    Left,
    Right,
}

/**
 * Interface for the entry of DropDown menu
 * @typedef {object} DropDownEntry
 * @property {string} text - Text to be displayed on the menu
 * @property {string} link - Hyperlink to the page
 */
interface DropDownEntry {
    text: string;
    link: string;
}

/**
 * Interface for the property of DropDown component
 * @typedef {object} DropDownProperty
 * @property {string} label - Label of the component
 * @property {(DropDownMode | string)} mode - Interaction mode of the component
 * @property {Array<DropDownEntry>} entries - Entries of DropDown menu
 * @property {boolean} showInMobile - Whether to show the component in mobile(<640px) environemnt
 * @property {(DropDownAlignment | number)=} alignment - Explicitly assign the alignment of the component
 */
interface DropDownProperty {
    label: string;
    mode: DropDownMode | string;
    entries: Array<DropDownEntry>;
    showInMobile: boolean;
    alignment?: DropDownAlignment | number;
}

export type { DropDownProperty, DropDownEntry };