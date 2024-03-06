# Express Filtered Responses

This project is an Express.js application designed to filter form submissions based on provided filters.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/rabyyuson/fillout.git
```

2. Navigate to the project directory:

```bash
cd fillout
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

To start the Express server, run:

```bash
npm start
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

## Dependencies

- Express.js
- Axios

## License

This project is licensed under the [MIT License](LICENSE).
