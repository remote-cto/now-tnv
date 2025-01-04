"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BusinessValuationForm = () => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
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
      // Show success message about email
      setSuccess("Your valuation report has been sent to your email.");
    } catch (err) {
      setError("Failed to calculate business valuation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-4xl mx-auto p-4">
        <Card className="w-full">
          <CardContent>
            <div className="flex flex-col space-y-6">
              <FormControl fullWidth>
                <TextField
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  helperText="Enter your registered business name"
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  helperText="We'll send your valuation report to this email"
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Annual Revenue"
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange("revenue", e.target.value)}
                  helperText="Your business's total income before expenses"
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Annual Net Income"
                  type="number"
                  value={formData.netIncome}
                  onChange={(e) =>
                    handleInputChange("netIncome", e.target.value)
                  }
                  helperText="Your business's earnings after expenses"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={formData.industry}
                  label="Industry"
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Choose the category that best describes your business
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Total Assets Value"
                  type="number"
                  value={formData.assets}
                  onChange={(e) => handleInputChange("assets", e.target.value)}
                  helperText="Include inventory, equipment, property, etc."
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Total Liabilities"
                  type="number"
                  value={formData.liabilities}
                  onChange={(e) =>
                    handleInputChange("liabilities", e.target.value)
                  }
                  helperText="Include loans, debts, etc."
                />
              </FormControl>

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
                <FormHelperText>
                  How long has your business been operating?
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Monthly Customers"
                  type="number"
                  value={formData.monthlyCustomers}
                  onChange={(e) =>
                    handleInputChange("monthlyCustomers", e.target.value)
                  }
                  helperText="Number of customers served last month"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Number of Employees</InputLabel>
                <Select
                  value={formData.employees}
                  label="Number of Employees"
                  onChange={(e) =>
                    handleInputChange("employees", e.target.value)
                  }
                >
                  {employeeOptions.map((option) => (
                    <MenuItem key={option} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Include all part-time and full-time employees
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Social Media Followers"
                  type="number"
                  value={formData.socialFollowers}
                  onChange={(e) =>
                    handleInputChange("socialFollowers", e.target.value)
                  }
                  helperText="Number of followers on your most active platform"
                />
              </FormControl>

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
                <FormHelperText>
                  Your revenue trend over the last 12 months
                </FormHelperText>
              </FormControl>

              <div className="w-full mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <CircularProgress size={24} className="text-white" />
                    ) : (
                      "Calculate Business Valuation"
                    )}
                  </div>
                </button>
              </div>
              {success && (
                <Alert severity="success" className="mt-4">
                  {success}
                </Alert>
              )}

              {error && (
                <Alert severity="error" className="mt-4">
                  {error}
                </Alert>
              )}

              {result && (
                <Card className="mt-4">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">
                      Valuation Result
                    </h3>
                    <div className="whitespace-pre-wrap">{result}</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default BusinessValuationForm;
