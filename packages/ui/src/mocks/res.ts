import { response, context, ResponseTransformer, MockedResponse } from 'msw';

const delay = process.env.NODE_ENV === 'development' ? 2000 : undefined;

export function res(...transformers: ResponseTransformer[]): MockedResponse {
    return response(...transformers, context.delay(delay));
}
