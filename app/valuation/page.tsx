//app/valuation/page.tsx
"use client";
import React, { useCallback, useMemo } from "react";
import {
  CircularProgress,
  Alert,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
  IconButton,
  ThemeProvider,
  createTheme,
  SelectChangeEvent,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Header from "../components/Header";
import NowValuationTool from "../components/NowValuationTool";
import ValuationQuestionAnswer from "../components/ValuationQuestionAnswer";
import ValuationPageFooter from "../components/ValuationPageFooter";
import SubmitButton from "../components/SubmitButton";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
              '&::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '&::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            },

          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
  },
});

interface FormData {
  companyName: string;
  email: string;
  revenue: string;
  netIncome: string;
  industry: string;
  assets: string;
  liabilities: string;
  yearsInOperation: string;
  monthlyCustomers: string;
  employees: string;
  socialFollowers: string;
  revenueTrend: string;
}

interface FormErrors {
  companyName?: string;
  email?: string;
}

interface QuestionCardProps {
  number: number | string;
  question: string;
  explanation: string;
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(({
  number,
  question,
  explanation,
  children,
}) => (
  <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography variant="h6" sx={{ mr: 1 }}>
        {number}. {question}
      </Typography>
      <Tooltip title={explanation} placement="right" arrow>
        <IconButton size="small">
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
    <Box sx={{ mt: 2 }}>{children}</Box>
  </Paper>
));

const BusinessValuationForm: React.FC = () => {
  const [formState, setFormState] = React.useState({
    data: {
      companyName: "",
      email: "",
      revenue: "",
      netIncome: "",
      industry: "",
      assets: "",
      liabilities: "",
      yearsInOperation: "",
      monthlyCustomers: "",
      employees: "",
      socialFollowers: "",
      revenueTrend: "",
    } as FormData,
    errors: {} as FormErrors,
    loading: false,
    result: null as string | null,
    error: null as string | null,
    success: null as string | null,
  });

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    const { companyName, email } = formState.data;

    if (!companyName.trim()) {
      errors.companyName = "Company name is required";
    }
    if (!email.trim()) {
      errors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [formState.data, validateEmail]);

  const handleTextFieldChange = useCallback(
    (field: keyof FormData) => 
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>): void => {
        const value = e.target.value; // Works for both React.ChangeEvent and SelectChangeEvent
        setFormState((prev) => ({
          ...prev,
          data: { ...prev.data, [field]: value },
          errors: { ...prev.errors, [field]: undefined },
        }));
      },
    []
  );

  const handleSelectChange = useCallback(
    (field: keyof FormData) => 
      (e: SelectChangeEvent<string>): void => {
        const value = e.target.value;
        setFormState((prev) => ({
          ...prev,
          data: { ...prev.data, [field]: value },
          errors: { ...prev.errors, [field]: undefined },
        }));
      },
    []
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateForm()) return;

    setFormState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      result: null,
    }));

    try {
      const apiData = {
        annual_revenue: parseFloat(formState.data.revenue) || 0,
        net_income: formState.data.netIncome
          ? parseFloat(formState.data.netIncome)
          : null,
        industry: formState.data.industry || "other",
        assets: parseFloat(formState.data.assets) || 0,
        liabilities: parseFloat(formState.data.liabilities) || 0,
        years_in_operation: formState.data.yearsInOperation || "less than 1 year",
        customers_last_month: parseInt(formState.data.monthlyCustomers) || 0,
        employees: formState.data.employees || "none",
        social_media_followers: parseInt(formState.data.socialFollowers) || 0,
        revenue_trend: formState.data.revenueTrend || "stable",
      };

      const response = await fetch("/api/calculatevaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a business valuation expert. Calculate valuations based on the provided data using these rules:\n1. Core Business Valuation = (Net Income × Industry Multiple) + Assets - Liabilities\n2. Social Media Brand Value = Followers × Value Per Follower\n3. Apply stability and growth adjustments",
            },
            {
              role: "user",
              content: `Please calculate a business valuation based on the following data:\n${JSON.stringify(apiData, null, 2)}\n\nUse conservative assumptions for valuation multiples (1–3x net income) and follower value ($0.10 per follower by default). If net income is missing, assume 10% of revenue. Output the valuation and a brief explanation.`,
            },
          ],
          formData: {
            email: formState.data.email,
            companyName: formState.data.companyName,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to calculate valuation");

      const data = await response.json();
      setFormState((prev) => ({
        ...prev,
        result: data.content,
        success: "Your valuation report has been sent to your email",
        loading: false,
      }));
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "Failed to calculate business valuation. Please try again",
        loading: false,
      }));
    }
  }, [formState.data, validateForm]);

  const staticData = useMemo(
    () => ({
      industries: ["Retail", "Service", "Manufacturing", "Tech", "Food & Beverage", "Other"],
      yearsOptions: ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"],
      employeeOptions: ["None", "1–5", "6–10", "11–50", "51+"],
      trendOptions: ["Growing", "Stable", "Declining"],
    }),
    []
  );


  return (
    <>
      <Header />
      <NowValuationTool />
      <ValuationQuestionAnswer />
      <ThemeProvider theme={theme}>
      <div className="bg-black">
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
          <QuestionCard
            number="*"
            question="Basic Information"
            explanation="We'll use this to send you your valuation report"
          >
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Company Name"
                  value={formState.data.companyName}
                  onChange={handleTextFieldChange("companyName")}
                  error={!!formState.errors.companyName}
                  helperText={formState.errors.companyName}
                />
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formState.data.email}
                  onChange={handleTextFieldChange("email")}
                  error={!!formState.errors.email}
                  helperText={formState.errors.email}
                />
            </Box>
          </QuestionCard>

          {[
            {
              number: 1,
              question: "What is your business's annual revenue?",
              explanation:
                "This is your business's total income before expenses. If you're unsure, use your best estimate.",
              field: "revenue",
              type: "number",
              label: "Annual Revenue",
            },
            {
              number: 2,
              question: "What is your annual net income or profit?",
              explanation:
                "This is how much your business earned after expenses. If you're unsure, a typical business keeps 10–15% of revenue as profit.",
              field: "netIncome",
              type: "number",
              label: "Annual Net Income",
            },
          ].map(({ number, question, explanation, field, type, label }) => (
            <QuestionCard
              key={number}
              number={number}
              question={question}
              explanation={explanation}
            >
              <TextField
                fullWidth
                type={type}
                label={label}
                value={formState.data[field as keyof FormData]}
                onChange={handleTextFieldChange(field as keyof FormData)}
              />
            </QuestionCard>
          ))}

          <QuestionCard
            number={3}
            question="What industry does your business operate in?"
            explanation="Choose the category that best describes your business. This helps us apply an appropriate valuation multiple based on typical industry performance."
          >
            <FormControl fullWidth>
              <InputLabel>Select Industry</InputLabel>
              <Select
                value={formState.data.industry}
                label="Select Industry"
                onChange={handleTextFieldChange("industry")}
              >
                {staticData.industries.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {[
            {
              number: 4,
              question: "What is the total value of your business assets?",
              explanation:
                "Include physical items like inventory, equipment, or property. If you're unsure, leave it blank.",
              field: "assets",
              label: "Total Assets Value",
            },
            {
              number: 5,
              question: "What are your total liabilities?",
              explanation:
                "This includes any loans or debts your business owes. If you're unsure, leave it blank.",
              field: "liabilities",
              label: "Total Liabilities",
            },
          ].map(({ number, question, explanation, field, label }) => (
            <QuestionCard
              key={number}
              number={number}
              question={question}
              explanation={explanation}
            >
              <TextField
                fullWidth
                type="number"
                label={label}
                value={formState.data[field as keyof FormData]}
                onChange={handleTextFieldChange(field as keyof FormData)}
              />
            </QuestionCard>
          ))}

          <QuestionCard
            number={6}
            question="How many years has your business been in operation?"
            explanation="This helps us estimate business stability. Older businesses are generally more valuable."
          >
            <FormControl fullWidth>
              <InputLabel>Years in Operation</InputLabel>
              <Select
                value={formState.data.yearsInOperation}
                label="Years in Operation"
                onChange={(e) => handleTextFieldChange("yearsInOperation")(e)}
              >
                {staticData.yearsOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          <QuestionCard
            number={7}
            question="How many customers did you serve last month?"
            explanation="If you don't track this, estimate the number of individual customers or orders you handled in the last month."
          >
            <TextField
              fullWidth
              type="number"
              label="Monthly Customers"
              value={formState.data.monthlyCustomers}
              onChange={handleTextFieldChange("monthlyCustomers")}
            />
          </QuestionCard>

          <QuestionCard
            number={8}
            question="How many employees do you have?"
            explanation="Include all part-time and full-time employees. If you're a solo business, select 'None'."
          >
            <FormControl fullWidth>
              <InputLabel>Number of Employees</InputLabel>
              <Select
                value={formState.data.employees}
                label="Number of Employees"
                onChange={(e) => handleTextFieldChange("employees")(e)}
              >
                {staticData.employeeOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          <QuestionCard
            number={9}
            question="How many followers do you have on your most active social media account?"
            explanation="Enter the number of followers on the platform where your business is most active, like Instagram, Twitter, or LinkedIn."
          >
            <TextField
              fullWidth
              type="number"
              label="Social Media Followers"
              value={formState.data.socialFollowers}
              onChange={handleTextFieldChange("socialFollowers")}
            />
          </QuestionCard>

          <QuestionCard
            number={10}
            question="Is your revenue growing, stable, or declining?"
            explanation="Pick the trend that best describes your revenue over the last 12 months."
          >
            <FormControl fullWidth>
              <InputLabel>Revenue Trend</InputLabel>
              <Select
                value={formState.data.revenueTrend}
                label="Revenue Trend"
                onChange={(e) => handleTextFieldChange("revenueTrend")(e)}
              >
                {staticData.trendOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {formState.success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {formState.success}
            </Alert>
          )}

          {formState.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formState.error}
            </Alert>
          )}

          {/* {formState.result && (
            <Paper sx={{ mt: 2, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Valuation Result
              </Typography>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {formState.result}
              </Typography>
            </Paper>
          )} */}
        </Box>
      </div>
      </ThemeProvider>
      <SubmitButton loading={formState.loading} onClick={handleSubmit} />
      <ValuationPageFooter />
    </>
  );
};

export default BusinessValuationForm;
