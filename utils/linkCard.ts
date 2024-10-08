/**
 * Type for LinkCard component
 * @module utils/linkCard
 */

/**
 * Interface that defines property for LinkCard component
 * @property {string} title title of link
 * @property {string} description description of link
 * @property {string} link link itself
 * @property {string=} imagePath optional path to image to display with
 */
interface LinkCardProperty {
    title: string;
    description: string;
    link: string;
    imagePath?: string;
}

export type { LinkCardProperty };
