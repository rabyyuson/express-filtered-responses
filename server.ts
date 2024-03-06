import express, { Request, Response } from "express";
import { ApplyFilter, Condition, Filter, FilterResponse, FormSubmissions, Question } from "./types";
import "dotenv/config";
import axios from "axios";

// Load environment variables
const { API_KEY, FORMS_API, FORM_ID, PORT, RESPONSES_LIMIT } = process.env;

// Create Express application
const app = express();

/**
 * Applies a filter to responses data.
 * @param filter The filter object containing filter criteria.
 * @param responses The responses data to filter.
 * @returns Filtered responses data.
 */
function applyFilter({ filter, responses }: ApplyFilter) {
    const { id, condition, value } = filter;
    return responses
        .map((response: any) => {
            const { questions }: { questions: Question[] } = response;
            const filteredQuestions = questions.filter(q => {
                const filterId = `${id}`.toLowerCase();
                const questionId = `${q.id}`.toLowerCase();
                if (filterId !== questionId) {
                    return false;
                }

                let filterValue: string | number = `${value}`.toLowerCase();
                let questionValue: string | number = `${q.value}`.toLowerCase();

                if (q.type === "DatePicker") {
                    // Convert date strings to milliseconds for comparison
                    filterValue = new Date(filterValue).getTime();
                    questionValue = new Date(questionValue).getTime();
                }

                switch(condition) {
                    case Condition.Equals:
                        return questionValue === filterValue;
                    case Condition.Does_Not_Equal:
                        return questionValue !== filterValue;
                    case Condition.Greater_Than:
                        return Number(questionValue) > Number(filterValue);
                    case Condition.Less_Than:
                        return Number(questionValue) < Number(filterValue);
                    default:
                        return false;
                }
            });
            return { ...response, questions: filteredQuestions };
        })
        .filter((response: any) => response.questions.length);
}

/**
 * Filters response based on provided filters.
 * @param data The form submission data.
 * @param filters The filters to apply.
 * @returns Filtered responses along with metadata.
 */
function filterResponse({ data, filters }: FilterResponse) {
    let responses: any = [];
    if (Array.isArray(filters)) {
        let draft = data.responses;

        filters.forEach((filter: Filter) => {
            if (typeof filter !== "object") {
                return;
            }

            const { id, condition, value } = filter;
            if (!id || !condition || !value) {
                return;
            }

            let filteredResponses;

            if (filters.length > 1) {
                switch(condition) {
                    // For non-equality conditions, refine results based on previous filters
                    case Condition.Does_Not_Equal:
                    case Condition.Greater_Than:
                    case Condition.Less_Than: {
                        filteredResponses = applyFilter({ filter, responses: draft });
                        draft = [ ...filteredResponses ];
                        responses = [ ...draft ];
                        return;
                    }
                }
            }

            filteredResponses = applyFilter({ filter, responses: data.responses });
            responses.push(...filteredResponses);
        })
    }

    return {
        responses: responses.length ? responses : null,
        totalResponses: responses.length,
        pageCount: Math.ceil(responses.length / Number(RESPONSES_LIMIT))
    };
}

/**
 * Fetches form submissions from the external API.
 * @param formId The ID of the form.
 * @returns Form submissions data.
 */
async function fetchFormSubmissions({ formId }: FormSubmissions) {
    try {
        if (!FORMS_API || !API_KEY) {
            throw new Error("API_ENDPOINT or API_KEY is not defined.");
        }
    
        const headers = {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        }
    
        const response = await axios.get(`${FORMS_API}/${formId || FORM_ID}/submissions`, { headers });
        return response.data;
    } catch(error) {
        throw new Error("Error fetching form submissions.");
    }
}

// Define route to fetch filtered responses
app.get("/:formId/filteredResponses", async (request: Request, response: Response) => {
    const { formId } = request.params;
    
    try {
        // Fetch form submissions data
        const data = await fetchFormSubmissions({ formId });

        if (data) {
            const { filters } = request.query;
            const filteredResponse = filterResponse({ filters, data });
            return response.send(filteredResponse);
        }
    } catch(error) {
        response.status(500).send('Error making external request');
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
