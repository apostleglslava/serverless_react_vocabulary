import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import {textVocabulary} from "./textVocabulary";

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    // We use asynchronous import here so we can better catch server-side errors during development
    const render = (await import("./src/server/render")).default;

    if (event.body) {
      const body = event.body;

      const incomingData = JSON.parse(body).data?.split(' ');

      const vocabulary = JSON.parse(textVocabulary);
      const vocabularyKeys: string[] = Object.keys(vocabulary);
      const newVocabulary = {};

      for (let keyOne of vocabularyKeys) {
        for (let item of vocabulary[keyOne]) {
          newVocabulary[item] = keyOne;
        }
      }

      const result = vocabularyKeys.reduce((acc,curr)=> (acc[curr]=0, acc),{});

      for (let item of incomingData) {
        if (newVocabulary[item]) {
          const key: string = newVocabulary[item];
          result[key]++;
        }
      }

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: await render(event),
    };
  } catch (error) {
    // Custom error handling for server-side errors
    // TODO: Prettify the output, include the callstack, e.g. by using `youch` to generate beautiful error pages
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `<html><body>${error.toString()}</body></html>`,
    };
  }
};
