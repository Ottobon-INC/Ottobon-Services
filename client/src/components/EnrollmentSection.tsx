import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  education: string;
  experience: string;
  interests: string[];
  referral: string;
  consent: boolean;
  skills: string[];
  bestMatch: string;
}

export default function EnrollmentSection() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentRole: "",
    education: "",
    experience: "",
    interests: [],
    referral: "",
    consent: false,
    skills: [],
    bestMatch: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayScore, setDisplayScore] = useState<number>(0);

  // Load assessment results on component mount
  useEffect(() => {
    const assessmentResults = localStorage.getItem("assessmentResults");
    if (assessmentResults) {
      try {
        const results = JSON.parse(assessmentResults);
        if (results.bestMatch) {
          setFormData((prev) => ({
            ...prev,
            bestMatch: results.bestMatch,
            skills: results.skills || [], // Pre-populate skills from assessment
          }));
          if (results.bestMatchScore) {
            setDisplayScore(results.bestMatchScore);
          }
        }
      } catch (error) {
        console.error("Error parsing assessment results:", error);
      }
    }
  }, []);

  // Skills collection state
  const [skillInput, setSkillInput] = useState("");
  const [activeSkillCategory, setActiveSkillCategory] =
    useState<string>("technical");

  // Define skill categories and suggestions
  interface SkillCategory {
    id: string;
    name: string;
    suggestions: string[];
  }

  const skillCategories: SkillCategory[] = [
    {
      id: "technical",
      name: "Technical Skills",
      suggestions: [
        "JavaScript",
        "Python",
        "React",
        "Node.js",
        "HTML/CSS",
        "SQL",
        "Git",
        "AWS",
        "Docker",
        "MongoDB",
        "PostgreSQL",
        "TypeScript",
        "Vue.js",
        "Angular",
        "PHP",
        "Java",
        "C++",
        "REST APIs",
        "GraphQL",
        "Redis",
        "Kubernetes",
        "Jenkins",
        "Figma",
        "Adobe Creative Suite",
        "Sketch",
        "AutoCAD",
        "Salesforce",
        "Tableau",
        "Power BI",
        "Excel",
        "JIRA",
      ],
    },
    {
      id: "soft",
      name: "Soft Skills",
      suggestions: [
        "Leadership",
        "Communication",
        "Team Management",
        "Project Management",
        "Problem Solving",
        "Critical Thinking",
        "Time Management",
        "Adaptability",
        "Negotiation",
        "Public Speaking",
        "Mentoring",
        "Conflict Resolution",
        "Strategic Planning",
        "Decision Making",
        "Creativity",
        "Collaboration",
        "Customer Service",
        "Sales",
        "Marketing",
        "Training & Development",
      ],
    },
    {
      id: "industry",
      name: "Industry Knowledge",
      suggestions: [
        "Healthcare",
        "Finance",
        "E-commerce",
        "Education",
        "Manufacturing",
        "Retail",
        "Telecommunications",
        "Real Estate",
        "Legal",
        "Government",
        "Agile/Scrum",
        "DevOps",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Digital Marketing",
        "SEO/SEM",
        "Business Analysis",
        "Quality Assurance",
        "UI/UX Design",
        "Product Management",
        "Consulting",
      ],
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    if (name === "interest") {
      setFormData((prev) => {
        const updatedInterests = checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value);

        return {
          ...prev,
          interests: updatedInterests,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  // Skills management functions
  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (
      trimmedSkill &&
      !formData.skills.includes(trimmedSkill) &&
      formData.skills.length < 15
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const nextStep = () => {
    // Basic validation for required fields before proceeding
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (
        !formData.currentRole ||
        !formData.education ||
        !formData.experience
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (formData.skills.length < 3) {
        toast({
          title: "Missing Skills",
          description: "Please add at least 3 skills to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate final step
    if (formData.interests.length === 0 || !formData.consent) {
      toast({
        title: "Missing Information",
        description:
          "Please select at least one area of interest and confirm your consent.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for n8n webhook
      const webhookData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        currentRole: formData.currentRole,
        educationLevel: formData.education,
        yearsExperience: formData.experience,
        interests: formData.interests, // Send as array
        referralSource: formData.referral || "Not specified",
        skills: formData.skills, // Send as array
        bestMatch: formData.bestMatch || "Not assessed",
        submittedAt: new Date().toISOString(),
      };

      console.log("Sending data to webhook:", webhookData);

      // Send to n8n webhook
      const response = await fetch(
        "https://n8nottobon.duckdns.org/webhook/website/enrolls",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(webhookData),
        },
      );

      console.log("Webhook response status:", response.status);

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Webhook error response:", errorText);
        throw new Error(
          `Webhook returned status ${response.status}: ${errorText}`,
        );
      }

      // Try to parse response
      let responseData;
      try {
        responseData = await response.json();
        console.log("Webhook response data:", responseData);
      } catch (parseError) {
        console.log("Response is not JSON, treating as success");
      }

      // Success message
      toast({
        title: "Application Submitted",
        description:
          "Thank you for your interest in OttoBon! Our team will contact you within 24 hours.",
      });

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentRole: "",
        education: "",
        experience: "",
        interests: [],
        referral: "",
        consent: false,
        skills: [],
        bestMatch: "",
      });
      setDisplayScore(0);
      setStep(1);
      setSkillInput("");
      setActiveSkillCategory("technical");
    } catch (error) {
      console.error("Webhook submission error:", error);

      // Show user-friendly error message
      toast({
        title: "Submission Error",
        description:
          error instanceof Error
            ? `Failed to submit: ${error.message}`
            : "There was a problem submitting your application. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-16 bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Join the Fast lane
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Complete this simple form to begin your application process, and one
          of our advisors will contact you within 24 hours.
        </p>

        <div className="max-w-2xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
          <div className="p-8">
            <div className="flex mb-8 overflow-x-auto">
              <div
                className={`flex items-center ${step >= 1 ? "text-white" : "text-gray-500"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    step >= 1
                      ? "bg-primary text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Basic Info</span>
                <div className="h-1 w-8 bg-gray-600 mx-2"></div>
              </div>
              <div
                className={`flex items-center ${step >= 2 ? "text-white" : "text-gray-500"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    step >= 2
                      ? "bg-primary text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Experience</span>
                <div className="h-1 w-8 bg-gray-600 mx-2"></div>
              </div>
              <div
                className={`flex items-center ${step >= 3 ? "text-white" : "text-gray-500"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    step >= 3
                      ? "bg-primary text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span className="text-sm font-medium">Skills</span>
                <div className="h-1 w-8 bg-gray-600 mx-2"></div>
              </div>
              <div
                className={`flex items-center ${step >= 4 ? "text-white" : "text-gray-500"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    step >= 4
                      ? "bg-primary text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  4
                </div>
                <span className="text-sm font-medium">Preferences</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
                    >
                      Continue to Experience
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="currentRole"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Current Role/Position*
                    </label>
                    <input
                      type="text"
                      id="currentRole"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="education"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Education Background*
                    </label>
                    <select
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">
                        Select your highest education level
                      </option>
                      <option value="high-school">High School</option>
                      <option value="associates">Associate's Degree</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Years of Professional Experience*
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select your experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full transition"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg"
                    >
                      Continue to Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {step === 3 && (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Review and modify your skills
                    </h3>
                    <p className="text-gray-300">
                      {formData.skills.length > 0
                        ? "We've pre-filled your skills from the assessment. Feel free to add, remove, or modify them as needed."
                        : "Add your key technical and professional skills to help us recommend the perfect courses for you."}
                    </p>
                  </div>

                  {/* Skills Input Section */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleSkillInputKeyPress}
                        placeholder="Type a skill and press Enter..."
                        className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={formData.skills.length >= 15}
                      />
                      <button
                        type="button"
                        onClick={() => addSkill(skillInput)}
                        disabled={
                          !skillInput.trim() || formData.skills.length >= 15
                        }
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Add Skill
                      </button>
                    </div>

                    <div className="flex justify-between text-sm text-gray-400">
                      <span>
                        {formData.skills.length < 3
                          ? `Add at least ${3 - formData.skills.length} more skill${3 - formData.skills.length !== 1 ? "s" : ""} to continue`
                          : `${formData.skills.length} of 15 skills added`}
                      </span>
                      <span>{15 - formData.skills.length} slots remaining</span>
                    </div>
                  </div>

                  {/* Selected Skills Display */}
                  {formData.skills.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">
                          Your Skills ({formData.skills.length})
                        </h4>
                        {localStorage.getItem("assessmentResults") && (
                          <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                            Pre-filled from assessment
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-primary/20 text-primary border border-primary/30 px-3 py-2 rounded-full text-sm flex items-center gap-2"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-primary hover:text-white font-bold"
                              title="Remove skill"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skill Categories and Suggestions */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4 text-white">
                      Browse by Category
                    </h4>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {skillCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveSkillCategory(category.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            activeSkillCategory === category.id
                              ? "bg-primary text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>

                    {/* Skill Suggestions */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {skillCategories
                        .find((cat) => cat.id === activeSkillCategory)
                        ?.suggestions.filter(
                          (suggestion) => !formData.skills.includes(suggestion),
                        )
                        .slice(0, 32)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => addSkill(suggestion)}
                            disabled={formData.skills.length >= 15}
                            className="px-3 py-2 text-sm bg-gray-700 hover:bg-primary/20 border border-gray-600 hover:border-primary/50 rounded-lg text-left transition disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-white"
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full transition"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={formData.skills.length < 3}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Preferences */}
              {step === 4 && (
                <div>
                  {/* Best Match Display */}
                  {formData.bestMatch && (
                    <div className="mb-6 p-4 bg-blue-900/30 border border-blue-400/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                          <span className="text-xl mr-2">🏆</span>
                          Your Best Match
                        </h3>
                        {displayScore > 0 && (
                          <span className="bg-blue-500/20 text-blue-400 border border-blue-400/30 font-medium px-3 py-1 rounded-full text-sm">
                            {displayScore}% Match
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm">
                        Based on your assessment:{" "}
                        <strong className="text-blue-400">
                          {formData.bestMatch}
                        </strong>
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        This recommendation is based on your assessment results
                        and cannot be modified.
                      </p>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Areas of Interest*
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interest"
                          value="ai-uiux"
                          checked={formData.interests.includes("ai-uiux")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span className="text-gray-300">
                          AI for UI/UX Designer
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interest"
                          value="ai-marketing"
                          checked={formData.interests.includes("ai-marketing")}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span className="text-gray-300">AI in Marketing</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interest"
                          value="ai-agent-development"
                          checked={formData.interests.includes(
                            "ai-agent-development",
                          )}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span className="text-gray-300">
                          AI Agent Development
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interest"
                          value="ai-data-labeling"
                          checked={formData.interests.includes(
                            "ai-data-labeling",
                          )}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span className="text-gray-300">AI Data Labeling</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="referral"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      How did you hear about us?
                    </label>
                    <select
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select an option</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend or Colleague</option>
                      <option value="alumni">Alumni Recommendation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleCheckboxChange}
                        required
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-gray-300">
                        I consent to OttoBon processing my personal data in
                        accordance with the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        *
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Need help? Contact our admissions team at{" "}
            <a
              href="mailto:admissions@ottobon.com"
              className="text-primary hover:underline"
            >
              admissions@ottobon.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
