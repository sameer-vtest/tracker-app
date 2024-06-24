import { APIRequestContext, Page, expect, Route, Request, Response } from "@playwright/test";

export class ApiFunctionPage {

    readonly requestContext: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.requestContext = request;
    }

    public async POSTAPICall(endPointUrl: string, data: any) {
        const response = await this.requestContext.post(endPointUrl, {
            data: data
        });
        const jsonResponse = await response.json();
        expect(response.status()).toEqual(200);
        return jsonResponse;
    }

    public async GETAPICall(endPointUrl: string, headers: any) {
        const response = await this.requestContext.get(endPointUrl, {
            headers: headers
        });
        const jsonResponse = await response.json();
        expect(response.status()).toEqual(200);
        return jsonResponse;
    }

    public async captureAPIResponse(page: Page, endPointUrl: string, method: string): Promise<any[]> {
        // To store all matching responses
        const responses: any[] = [];

        // Intercept network requests
        await page.route('**/*', async (route: Route, request: Request) => {
            if (request.url().includes(endPointUrl) && request.method() === method) {
                console.log('Intercepted API Request:', request.url());

                // Capture the request payload
                const postData = request.postData();
                route.continue();

                // Listen for the response
                page.on('response', async (response: Response) => {
                    if (response.url().includes(endPointUrl) && response.request().method() === method) {
                        const responseBody = await response.text();
                        const responseStatus = response.status();

                        // Store the payload, status, and response body
                        responses.push({
                            payload: postData || '',
                            status: responseStatus,
                            body: responseBody,
                        });
                    }
                });
            } else {
                route.continue();
            }
        });

        // Return the responses array
        return responses;
    }
}