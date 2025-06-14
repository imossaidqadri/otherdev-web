// src/lib/projects.ts
import type { Locale } from './i18n'; // Path assuming i18n.ts is in ./lib
import { getLocalizedData } from './i18n'; // Path assuming i18n.ts is in ./lib
import type { Project } from '../types';

/**
 * Sanitizes a string to be URL-friendly, suitable for slugs.
 * - Normalizes accented characters.
 * - Removes diacritical marks.
 * - Replaces ampersands with "and".
 * - Replaces spaces with dashes.
 * - Removes all characters that are not letters, numbers, or dashes.
 * - Replaces multiple consecutive dashes with a single dash.
 * - Converts the string to lowercase.
 * @param str The string to sanitize.
 * @returns The sanitized string slug.
 */
export function sanitizeTitle(str: string): string {
  if (!str) return ''; // Handle null, undefined, or empty string input

  return str
    .normalize("NFKD") // Normalize accented characters (e.g., décompose 'é' to 'e' + '´')
    .replace(/[̀-ͯ]/g, "") // Remove diacritical marks (the combining accents)
    .replace(/&/g, "and") // Replace ampersands with "and"
    .replace(/\s+/g, "-") // Replace one or more spaces with a single dash
    .replace(/[^\p{L}\p{N}-]+/gu, "") // Remove all characters that are not letters (any language), numbers, or dashes
                                     // \p{L} matches any kind of letter from any language
                                     // \p{N} matches any kind of numeric character in any script
                                     // The 'u' flag enables Unicode property escapes
    .replace(/--+/g, "-") // Replace multiple consecutive dashes with a single dash
    .toLowerCase(); // Convert to lowercase
}

// Placeholder for other project-related functions
// Note: The new function will be added below this existing content block

/**
 * Generates a list of project paths (slugs) and their corresponding project data
 * for a given locale, intended for pages that should be statically generated.
 * Projects without 'hasPage: true' will be filtered out.
 *
 * @param locale The locale for which to generate project paths.
 * @returns A promise that resolves to an array of objects, each containing a 'slug' and 'project' data.
 *          Returns an empty array if no projects are found or if data fetching fails.
 */
export async function generateProjectPaths(
  locale: Locale
): Promise<Array<{ slug: string; project: Project }>> {
  try {
    const projects = await getLocalizedData(locale, 'projects');

    if (!projects || projects.length === 0) {
      console.warn(`No project data found for locale: ${locale} in generateProjectPaths.`);
      return [];
    }

    const paths = projects
      .filter(project => project.hasPage === true)
      .map(project => ({
        slug: sanitizeTitle(project.title), // sanitizeTitle is from the same file
        project: project,
      }));

    return paths;
  } catch (error) {
    console.error(`Error in generateProjectPaths for locale ${locale}:`, error);
    return []; // Return empty array on error
  }
}

/**
 * Fetches a single project by its slug and locale.
 * Only projects with 'hasPage: true' are considered.
 *
 * @param slug The URL-friendly slug of the project.
 * @param locale The locale for which to find the project.
 * @returns A promise that resolves to the Project object if found, or null otherwise.
 */
export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<Project | null> {
  if (!slug) {
    console.warn("getProjectBySlug: slug parameter is empty or null.");
    return null;
  }

  try {
    const projects = await getLocalizedData(locale, 'projects');

    if (!projects || projects.length === 0) {
      console.warn(`No project data found for locale: ${locale} in getProjectBySlug.`);
      return null;
    }

    for (const project of projects) {
      if (project.hasPage === true) {
        const currentSlug = sanitizeTitle(project.title); // sanitizeTitle is from the same file
        if (currentSlug === slug) {
          return project;
        }
      }
    }

    console.warn(`Project with slug '${slug}' not found for locale '${locale}'.`);
    return null; // No matching project found
  } catch (error) {
    console.error(`Error in getProjectBySlug for slug '${slug}', locale ${locale}:`, error);
    return null; // Return null on error
  }
}
