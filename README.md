# Express Filtered Responses

This project is an Express.js application designed to filter form submissions based on provided filters.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/rabyyuson/express-filtered-responses.git
```

2. Navigate to the project directory:

```bash
cd express-filtered-responses
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory of the project and define the following variables:

```bash
API_KEY=<your-api-key>
FORMS_API=<forms-api-url>
FORM_ID=<form-id>
PORT=<port-number>
RESPONSES_LIMIT=<responses-limit>
```

Replace `<your-api-key>`, `<forms-api-url>`, `<form-id>`, `<port-number>`, and `<responses-limit>` with your actual API key, forms API URL, form ID, port number, and responses limit, respectively.

## Usage

To start the Express server locally, run:

```bash
npm dev
```

This will start the server at the specified port, and the application will be ready to accept requests to filter form submissions.

## Features

- Applies filters to form submission responses.
- Filters responses based on provided criteria.
- Fetches form submissions from an external API.
- Supports various filter conditions such as equals, does not equal, greater than, and less than.

## Endpoints

### GET /:formId/filteredResponses

Fetches filtered responses for a specified form ID.

#### Parameters

- `formId`: The ID of the form for which filtered responses are requested.

#### Query Parameters

- `filters`: An array of filters to apply to the form submissions.

#### Sample Request

```bash
http://localhost:{PORT}/{FORM_ID}/filteredResponses?filters[0][id]={question.id}&filters[0][condition]={filter.condition}&filters[0][value]={question.value}
```

and with variables replaced (note that these are only dummy values taken from Fillout's [response](https://www.fillout.com/help/fillout-rest-api#69c06593963c45ca9e7d682f4f2a4ccc)):

```bash
http://localhost:3000/vso9PzRfHQus/filteredResponses?filters[0][id]=5AtgG35AAZVcrSVfRubvp1&filters[0][condition]=equals&filters[0][value]=Email
```

## Dependencies

- Express.js
- Axios

## License

This project is licensed under the [MIT License](LICENSE).
