// BusinessValuationForm.tsx
"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Header from "../components/Header";
import NowValuationTool from "../components/NowValuationTool";
import ValuationQuestionAnswer from "../components/ValuationQuestionAnswer";
import ValuationPageFooter from "../components/ValuationPageFooter";

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

interface QuestionCardProps {
  number: number | string;  // Updated to accept both number and string
  question: string;
  explanation: string;
  children: React.ReactNode;
}

const BusinessValuationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiData = {
        annual_revenue: parseFloat(formData.revenue) || 0,
        net_income: formData.netIncome ? parseFloat(formData.netIncome) : null,
        industry: formData.industry || "other",
        assets: parseFloat(formData.assets) || 0,
        liabilities: parseFloat(formData.liabilities) || 0,
        years_in_operation: formData.yearsInOperation || "less than 1 year",
        customers_last_month: parseInt(formData.monthlyCustomers) || 0,
        employees: formData.employees || "none",
        social_media_followers: parseInt(formData.socialFollowers) || 0,
        revenue_trend: formData.revenueTrend || "stable",
      };

      const response = await fetch("/api/calculatevaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a business valuation expert. Calculate valuations based on the provided data using these rules:\n" +
                "1. Core Business Valuation = (Net Income × Industry Multiple) + Assets - Liabilities\n" +
                "2. Social Media Brand Value = Followers × Value Per Follower\n" +
                "3. Apply stability and growth adjustments",
            },
            {
              role: "user",
              content:
                `Please calculate a business valuation based on the following data:\n${JSON.stringify(
                  apiData,
                  null,
                  2
                )}\n\n` +
                "Use conservative assumptions for valuation multiples (1–3x net income) and follower value ($0.10 per follower by default). " +
                "If net income is missing, assume 10% of revenue. Output the valuation and a brief explanation.",
            },
          ],
          formData: {
            email: formData.email,
            companyName: formData.companyName,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate valuation");
      }

      const data = await response.json();
      setResult(data.content);
      setSuccess("Your valuation report has been sent to your email");
    } catch (err) {
      setError("Failed to calculate business valuation. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const QuestionCard: React.FC<QuestionCardProps> = ({
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
  );

  const industries = [
    "Retail",
    "Service",
    "Manufacturing",
    "Tech",
    "Food & Beverage",
    "Other",
  ];
  const yearsOptions = [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "5–10 years",
    "10+ years",
  ];
  const employeeOptions = ["None", "1–5", "6–10", "11–50", "51+"];
  const trendOptions = ["Growing", "Stable", "Declining"];

  return (
    <>
      <Header />
      <NowValuationTool />
      <ValuationQuestionAnswer />
      <div className="bg-black">
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
          {/* Basic Information */}
          <QuestionCard
            number="*"
            question="Basic Information"
            explanation="We'll use this to send you your valuation report"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Box>
          </QuestionCard>

          {/* Revenue */}
          <QuestionCard
            number={1}
            question="What is your business's annual revenue?"
            explanation="This is your business's total income before expenses. If you’re unsure, use your best estimate."
          >
            <TextField
              fullWidth
              type="number"
              label="Annual Revenue"
              value={formData.revenue}
              onChange={(e) => handleInputChange("revenue", e.target.value)}
            />
          </QuestionCard>

          {/* Net Income */}
          <QuestionCard
            number={2}
            question="What is your annual net income or profit?"
            explanation="This is how much your business earned after expenses. If you’re unsure, a typical business keeps 10–15% of revenue as profit."
          >
            <TextField
              fullWidth
              type="number"
              label="Annual Net Income"
              value={formData.netIncome}
              onChange={(e) => handleInputChange("netIncome", e.target.value)}
            />
          </QuestionCard>

          {/* Industry */}
          <QuestionCard
            number={3}
            question="What industry does your business operate in?"
            explanation="Choose the category that best describes your business. This helps us apply an appropriate valuation multiple based on typical industry performance."
          >
            <FormControl fullWidth>
              <InputLabel>Select Industry</InputLabel>
              <Select
                value={formData.industry}
                label="Select Industry"
                onChange={(e) => handleInputChange("industry", e.target.value)}
              >
                {industries.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {/* Assets */}
          <QuestionCard
            number={4}
            question="What is the total value of your business assets?"
            explanation="Include physical items like inventory, equipment, or property. If you're unsure, leave it blank."
          >
            <TextField
              fullWidth
              type="number"
              label="Total Assets Value"
              value={formData.assets}
              onChange={(e) => handleInputChange("assets", e.target.value)}
            />
          </QuestionCard>

          {/* Liabilities */}
          <QuestionCard
            number={5}
            question="What are your total liabilities?"
            explanation="This includes any loans or debts your business owes. If you're unsure, leave it blank."
          >
            <TextField
              fullWidth
              type="number"
              label="Total Liabilities"
              value={formData.liabilities}
              onChange={(e) => handleInputChange("liabilities", e.target.value)}
            />
          </QuestionCard>

          {/* Years in Operation */}
          <QuestionCard
            number={6}
            question="How many years has your business been in operation?"
            explanation="This helps us estimate business stability. Older businesses are generally more valuable."
          >
            <FormControl fullWidth>
              <InputLabel>Years in Operation</InputLabel>
              <Select
                value={formData.yearsInOperation}
                label="Years in Operation"
                onChange={(e) =>
                  handleInputChange("yearsInOperation", e.target.value)
                }
              >
                {yearsOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {/* Monthly Customers */}
          <QuestionCard
            number={7}
            question="How many customers did you serve last month?"
            explanation="If you don't track this, estimate the number of individual customers or orders you handled in the last month."
          >
            <TextField
              fullWidth
              type="number"
              label="Monthly Customers"
              value={formData.monthlyCustomers}
              onChange={(e) =>
                handleInputChange("monthlyCustomers", e.target.value)
              }
            />
          </QuestionCard>

          {/* Employees */}
          <QuestionCard
            number={8}
            question="How many employees do you have?"
            explanation="Include all part-time and full-time employees. If you're a solo business, select 'None'."
          >
            <FormControl fullWidth>
              <InputLabel>Number of Employees</InputLabel>
              <Select
                value={formData.employees}
                label="Number of Employees"
                onChange={(e) => handleInputChange("employees", e.target.value)}
              >
                {employeeOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {/* Social Media Followers */}
          <QuestionCard
            number={9}
            question="How many followers do you have on your most active social media account?"
            explanation="Enter the number of followers on the platform where your business is most active, like Instagram, Twitter, or LinkedIn."
          >
            <TextField
              fullWidth
              type="number"
              label="Social Media Followers"
              value={formData.socialFollowers}
              onChange={(e) =>
                handleInputChange("socialFollowers", e.target.value)
              }
            />
          </QuestionCard>

          {/* Revenue Trend */}
          <QuestionCard
            number={10}
            question="Is your revenue growing, stable, or declining?"
            explanation="Pick the trend that best describes your revenue over the last 12 months."
          >
            <FormControl fullWidth>
              <InputLabel>Revenue Trend</InputLabel>
              <Select
                value={formData.revenueTrend}
                label="Revenue Trend"
                onChange={(e) =>
                  handleInputChange("revenueTrend", e.target.value)
                }
              >
                {trendOptions.map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </QuestionCard>

          {/* Submit Button */}
          <Box sx={{ mt: 4 }}>
            <Box
              component="button"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                width: "100%",
                bgcolor: "white",
                color: "Black",
                py: 2,
                px: 4,
                borderRadius: 1,
                border: "none",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "White",
                },
                "&:disabled": {
                  opacity: 0.7,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Calculate Business Valuation"
              )}
            </Box>
          </Box>

          {/* Messages */}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Results */}
          {result && (
            <Paper sx={{ mt: 2, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Valuation Result
              </Typography>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>{result}</Typography>
            </Paper>
          )}
        </Box>
      </div>
      <ValuationPageFooter />
    </>
  );
};

export default BusinessValuationForm;