// import React from "react";

// const Contact: React.FC = () => {
//   return (
//     <div className="bg-black flex flex-col items-center justify-center text-white py-12 px-4 mb-4 font-['helveticanowtext-black-demo']">
//       <div className="max-w-3xl w-full text-center space-y-8">
//         <h1 className="text-3xl lg:text-6xl font-extrabold mb-6 font-['helveticanowtext-black-demo'] ">
//           Need Help?
//         </h1>

//         <div className="space-y-4 text-left">
//           <p className="text-lg lg:text-2xl leading-tight font-['helveticanowtext-black-demo']">
//             We understand that buying or selling a digital business isn't easy.
//           </p>
//           <p className="text-xl lg:text-2xl font-['helveticanowtext-black-demo']">
//             If you have any questions or require assistance, feel free to
//             contact us anytime.
//           </p>
//         </div>

//         <div className="space-y-4 mt-12 text-left">
//           <p className="text-lg lg:text-2xl font-['helveticanowtext-black-demo']">
//             email :{" "}
//             <a
//               href="mailto:hello@nowvaluation.com"
//               className="text-white hover:text-gray-300 underline"
//             >
//               hello@nowvaluation.com
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

"use client";
import React, { useCallback, useMemo, useEffect } from "react";
import {
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
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
              "&::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
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
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
  },
});

interface FormData {
  companyName: string;
  email: string;
  businessIndividualName: string;
  currency: string;
  revenue: string;
  netIncome: string;
  industry: string;
  assets: string;
  liabilities: string;
  yearsInOperation: string;
  // monthlyCustomers: string;
  // employees: string;
  socialFollowers: string;
  revenueTrend: string;
}

interface FormErrors {
  companyName?: string;
  email?: string;
  businessIndividualName?: string;
}

interface QuestionCardProps {
  number: number | string;
  question: string;
  explanation: string;
  arabicExplanation: string;
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(
  ({ number, question, explanation, arabicExplanation, children }) => (
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
        {/* Additional Tooltip for Arabic explanation */}
        <Tooltip title={arabicExplanation} placement="right" arrow>
          <IconButton size="small" sx={{ ml: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontFamily: "Arial", fontWeight: "bold" }}
            >
              ع
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Paper>
  )
);

const Contact: React.FC = () => {
  const initialFormData: FormData = {
    companyName: "",
    email: "",
    businessIndividualName: "",
    currency: "usd",
    revenue: "",
    netIncome: "",
    industry: "",
    assets: "",
    liabilities: "",
    yearsInOperation: "",
    // monthlyCustomers: "",
    // employees: "",
    socialFollowers: "",
    revenueTrend: "",
  };

  const [formState, setFormState] = React.useState({
    data: initialFormData,
    errors: {} as FormErrors,
    loading: false,
    result: null as string | null,
    error: null as string | null,
    success: null as string | null,
  });

  useEffect(() => {
    if (formState.success) {
      const successTimer = setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          success: null,
        }));
      }, 5000);

      setFormState((prev) => ({
        ...prev,
        data: initialFormData,
      }));

      return () => clearTimeout(successTimer);
    }
  }, [formState.success]);

  const handleNumericInput = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        if (value === "" || /^\d*\.?\d*$/.test(value)) {
          setFormState((prev) => ({
            ...prev,
            data: { ...prev.data, [field]: value },
            errors: { ...prev.errors, [field]: undefined },
          }));
        }
      },
    []
  );

  const handleTextFieldChange = useCallback(
    (field: keyof FormData) =>
      (
        e:
          | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          | SelectChangeEvent<string>
      ): void => {
        const value = e.target.value;

        setFormState((prev) => ({
          ...prev,
          data: { ...prev.data, [field]: value },
          errors: { ...prev.errors, [field]: undefined },
        }));
      },
    []
  );

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    const { companyName, email, businessIndividualName } = formState.data;

    if (!companyName.trim()) {
      errors.companyName = "Company name is required";
    }
    if (!businessIndividualName.trim()) {
      errors.businessIndividualName = "Business individual name is required";
    }
    if (!email.trim()) {
      errors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [formState.data, validateEmail]);

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
      const response = await fetch("/api/calculatevaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: formState.data }),
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
      currencies: [
        { value: "usd", label: "US Dollar ($)" },
        { value: "kwd", label: "Kuwaiti Dinar (KD)" },
        { value: "eur", label: "Euro (€)" },
        { value: "gbp", label: "British Pound (£)" },
        { value: "inr", label: "Indian Rupee (₹)" },
      ],
      industries: [
        "Retail",
        "Service",
        "Manufacturing",
        "Tech",
        "Food & Beverage",
        "Other",
      ],
      yearsOptions: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
      // employeeOptions: ["None", "1–5", "6–10", "11–50", "51+"],
      trendOptions: ["Growing", "Stable", "Declining"],
    }),
    []
  );

  return (
    <>
      {/* <Header />
      <NowValuationTool /> */}
      {/* <ValuationQuestionAnswer /> */}
      <section id="contact-section" className="...">
        <ThemeProvider theme={theme}>
          <div className="bg-black font-['helveticanowtext-black-demo']">
            <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
              <div className="text-lg md:text-4xl text-white text-center mt-6 animate-fade-in font-['helveticanowtext-black-demo'] mb-2 lg:mb-6 underline">
                START WITH SOME KEY DETAILS
              </div>
              <QuestionCard
                number="*"
                question="Basic Information"
                explanation="We'll use this to send you your valuation report"
                arabicExplanation="بنستخدم هذا عشان نرسل لك تقرير التقييم"
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
                  <TextField
                    required
                    fullWidth
                    label="Business Individual Name"
                    value={formState.data.businessIndividualName}
                    onChange={handleTextFieldChange("businessIndividualName")}
                    error={!!formState.errors.businessIndividualName}
                    helperText={formState.errors.businessIndividualName}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Select Currency</InputLabel>
                    <Select
                      value={formState.data.currency || "usd"} // Ensure there's always a value
                      label="Select Currency"
                      onChange={handleTextFieldChange("currency")}
                    >
                      {staticData.currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </QuestionCard>

              {[
                {
                  number: 1,
                  question: "What is your business's annual revenue?",
                  explanation:
                    "This is your business's total income before expenses. If you're unsure, use your best estimate.",
                  arabicExplanation:"هذا إجمالي دخل نشاطك التجاري قبل المصاريف. إذا مو متأكد، استخدم أفضل تقدير عندك.",
                  field: "revenue",
                  type: "number",
                  label: "Annual Revenue",
                },
                {
                  number: 2,
                  question: "What is your annual net income or profit?",
                  explanation:
                    "This is how much your business earned after expenses. If you're unsure, a typical business keeps 10–15% of revenue as profit.",
                    arabicExplanation:"هذا الربح الصافي لنشاطك التجاري بعد المصاريف. إذا مو متأكد، عادةً الشركات تحتفظ بـ 10-15% من الإيرادات كربح.",

                  field: "netIncome",
                  type: "number",
                  label: "Annual Net Income",
                },
              ].map(({ number, question, explanation,arabicExplanation, field, label }) => (
                <QuestionCard
                  key={number}
                  number={number}
                  question={question}
                  explanation={explanation}
                  arabicExplanation= {arabicExplanation}
                >
                  <TextField
                    fullWidth
                    type="text"
                    inputMode="decimal"
                    label={label}
                    value={formState.data[field as keyof FormData]}
                    onChange={handleNumericInput(field as keyof FormData)}
                    inputProps={{
                      pattern: "\\d*\\.?\\d*",
                    }}
                  />
                </QuestionCard>
              ))}

              <QuestionCard
                number={3}
                question="What industry does your business operate in?"
                explanation="Choose the category that best describes your business. This helps us apply an appropriate valuation multiple based on typical industry performance."
                arabicExplanation="اختَر الفئة اللي توصف نشاطك التجاري بأفضل شكل. هذا يساعدنا ان نستخدم معامل التقييم المناسب بناءً على أداء القطاع المعتاد."
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
                    arabicExplanation:"يشمل أصول مادية مثل المخزون، المعدات، النقد أو العقارات. إذا مو متأكد، خله فاضي.",

                  field: "assets",
                  label: "Total Assets Value",
                },
                {
                  number: 5,
                  question: "What are your total liabilities?",
                  explanation:
                    "This includes any loans or debts your business owes. If you're unsure, leave it blank.",
                    arabicExplanation:"يشمل أي قروض أو ديون على نشاطك التجاري. إذا مو متأكد، خله فاضي.",

                  field: "liabilities",
                  label: "Total Liabilities",
                },
              ].map(({ number, question, explanation,arabicExplanation, field, label }) => (
                <QuestionCard
                  key={number}
                  number={number}
                  question={question}
                  explanation={explanation}
                  arabicExplanation= {arabicExplanation}
                >
                  <TextField
                    fullWidth
                    type="text"
                    inputMode="decimal"
                    label={label}
                    value={formState.data[field as keyof FormData]}
                    onChange={handleNumericInput(field as keyof FormData)}
                    inputProps={{
                      pattern: "\\d*\\.?\\d*",
                    }}
                  />
                </QuestionCard>
              ))}

              <QuestionCard
                number={6}
                question="How many years has your business been in operation?"
                explanation="This helps us estimate business stability. Older businesses are generally more valuable."
                arabicExplanation="هذا يساعدنا ان نقدر استقرار النشاط التجاري. الشركات الأقدم تكون عادةً أكثر قيمة."
              >
                <FormControl fullWidth>
                  <InputLabel>Years in Operation</InputLabel>
                  <Select
                    value={formState.data.yearsInOperation}
                    label="Years in Operation"
                    onChange={(e) =>
                      handleTextFieldChange("yearsInOperation")(e)
                    }
                  >
                    {staticData.yearsOptions.map((option) => (
                      <MenuItem key={option} value={option.toLowerCase()}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </QuestionCard>

              {/* <QuestionCard
              number={7}
              question="How many customers did you serve last month?"
              explanation="If you don't track this, estimate the number of individual customers or orders you handled in the last month."
            >
              <TextField
                fullWidth
                type="text"
                inputMode="numeric"
                label="Monthly Customers"
                value={formState.data.monthlyCustomers}
                onChange={handleNumericInput("monthlyCustomers")}
                inputProps={{
                  pattern: "\\d*",
                }}
              />
            </QuestionCard> */}

              {/* <QuestionCard
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
            </QuestionCard> */}

              <QuestionCard
                number={7}
                question="How many followers do you have on your most active social media account?"
                explanation="Enter the number of followers on the platform where your business is most active, like Instagram, Twitter, or LinkedIn."
                arabicExplanation="ادخل عدد المتابعين على المنصة اللي نشاطك التجاري أكثر نشاط فيها، مثل إنستغرام، تيك توك، أو سناب شات."
              >
                <TextField
                  fullWidth
                  type="text"
                  inputMode="numeric"
                  label="Social Media Followers"
                  value={formState.data.socialFollowers}
                  onChange={handleNumericInput("socialFollowers")}
                  inputProps={{
                    pattern: "\\d*",
                  }}
                />
              </QuestionCard>

              <QuestionCard
                number={8}
                question="Is your revenue growing, stable, or declining?"
                explanation="Pick the trend that best describes your revenue over the last 12 months."
                arabicExplanation="اختر الخيار اللي يوصف إيراداتك خلال آخر 12 شهر أو أكثر بأفضل شكل."
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
        {/* <ValuationPageFooter /> */}
      </section>
    </>
  );
};

export default Contact;
