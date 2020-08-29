import { rest } from 'msw';
import {
    BoundFunctions,
    getQueriesForElement,
    screen,
    Queries,
} from '@testing-library/react';

import { server } from 'mocks/server';

/**
 * Query element by it's title
 */
export function getNextToTitle(titleText: string): BoundFunctions<Queries> {
    const title = screen.getByText(titleText);
    return getQueriesForElement(title.nextElementSibling as HTMLElement);
}

/**
 * Query list by its title
 */
export function getListByTitle(titleText: string): BoundFunctions<Queries> {
    const title = screen.getByText(titleText);
    const list = title.nextElementSibling as HTMLElement;
    expect(list.tagName).toMatch(/dl/i);

    return getQueriesForElement(list);
}

/**
 * Set mock API to return error (HTTP 500) for given URL
 */
export function mockApiError(...urls: string[]): void {
    server.use(
        ...urls.map(url =>
            rest.get(url, (req, res, ctx) => {
                return res.once(ctx.status(500));
            })
        )
    );
}
