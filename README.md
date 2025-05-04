# Expense Splitter

A React application for tracking and splitting expenses between two people.

## Features

- Track expenses with details like date, description, amount, and who paid
- Split expenses 50/50 by default, with option for custom splits
- Calculate who owes whom based on expenses and splits
- View expense history in a sortable table
- Add, edit, and delete expenses
- Responsive design that works on mobile and desktop

## Tech Stack

- React with TypeScript
- Material-UI (MUI) for UI components
- date-fns for date formatting
- UUID for generating unique IDs

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding an Expense

1. Fill out the form at the top of the page with:
   - Date of the expense
   - Amount
   - Who paid (Me or Wife)
   - Description
   - Split type (50/50 by default, or custom)
   - If custom split, adjust the slider to set the split ratio
2. Click "Add Expense"

### Editing an Expense

1. Click the edit icon next to the expense in the table
2. Modify the details in the form
3. Click "Update Expense"

### Deleting an Expense

1. Click the delete icon next to the expense in the table

### Viewing the Summary

The summary section shows:
- Total expenses
- How much each person paid
- Each person's share of the expenses
- Who owes whom and how much

## Future Enhancements

- Connect to a backend database
- Add authentication
- Support for multiple users/groups
- Categories for expenses
- Charts and reports
- Export data to CSV/PDF

## License

MIT
