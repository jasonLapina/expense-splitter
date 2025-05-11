import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { v4 as uuidv4 } from "uuid";
import { Expense, Person } from "../types";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  expenseToEdit: Expense | null;
  onCancelEdit: () => void;
}

const defaultExpense: Expense = {
  id: "",
  date: new Date(),
  description: "",
  amount: 0,
  paidBy: "Me",
  customSplit: false,
  splitRatio: 50,
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  expenseToEdit,
  onCancelEdit,
}) => {
  const [expense, setExpense] = useState<Expense>(defaultExpense);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // When expenseToEdit changes, update the form
  useEffect(() => {
    if (expenseToEdit) {
      setExpense(expenseToEdit);
    } else {
      setExpense(defaultExpense);
    }
  }, [expenseToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (!isNaN(numValue)) {
      setExpense((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setExpense((prev) => ({ ...prev, date }));

      // Clear error when field is edited
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: "" }));
      }
    }
  };

  const handlePaidByChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as Person;
    setExpense((prev) => ({ ...prev, paidBy: value }));
  };

  const handleCustomSplitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setExpense((prev) => ({
      ...prev,
      customSplit: checked,
      // Set default splitRatio to 50% if enabling custom split
      splitRatio: checked ? prev.splitRatio || 50 : undefined,
    }));
  };

  const handleSplitRatioChange = (
    _event: Event,
    newValue: number | number[],
  ) => {
    setExpense((prev) => ({ ...prev, splitRatio: newValue as number }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!expense.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (expense.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!expense.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submittedExpense: Expense = {
      ...expense,
      id: expense.id || uuidv4(), // Generate new ID if it's a new expense
    };

    onAddExpense(submittedExpense);

    // Reset form if it's not an edit
    if (!expenseToEdit) {
      setExpense(defaultExpense);
    } else {
      onCancelEdit();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {expenseToEdit ? "Edit Expense" : "Add New Expense"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={expense.date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={expense.amount}
              onChange={handleNumberChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="paid-by-label">Paid By</InputLabel>
              <Select
                labelId="paid-by-label"
                id="paid-by"
                value={expense.paidBy}
                label="Paid By"
                onChange={handlePaidByChange}
              >
                <MenuItem value="Me">Me</MenuItem>
                <MenuItem value="Wife">Wife</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={expense.customSplit}
                  onChange={handleCustomSplitChange}
                  name="customSplit"
                />
              }
              label="Custom Split"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={expense.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {expense.customSplit && (
            <Grid item xs={12}>
              <Typography id="split-ratio-slider" gutterBottom>
                Split Ratio (My Share: {expense.splitRatio}%, Wife's Share:{" "}
                {100 - (expense.splitRatio || 0)}%)
              </Typography>
              <Slider
                value={expense.splitRatio || 50}
                onChange={handleSplitRatioChange}
                aria-labelledby="split-ratio-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              {expenseToEdit && (
                <Button variant="outlined" onClick={onCancelEdit}>
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {expenseToEdit ? "Update" : "Add"} Expense
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ExpenseForm;
