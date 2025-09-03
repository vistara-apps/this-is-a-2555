import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const generateBusinessIdea = async (userInput, interests = []) => {
  try {
    const prompt = `Generate a startup idea for a student based on the following:
    Input: ${userInput}
    Interests: ${interests.join(', ')}
    
    Please provide:
    1. A clear business idea title
    2. A brief description (2-3 sentences)
    3. Target market
    4. Key features (3-4 points)
    5. Potential challenges
    6. Next steps for validation
    
    Format as JSON with keys: title, description, targetMarket, features, challenges, nextSteps`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are an expert startup advisor helping students develop AI-powered business ideas. Provide practical, actionable advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    
    // Try to parse as JSON, fallback to structured text
    try {
      return JSON.parse(response);
    } catch {
      return {
        title: "AI-Powered Startup Idea",
        description: response,
        targetMarket: "Students and young professionals",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        challenges: "Market validation and user acquisition",
        nextSteps: "Conduct user interviews and build MVP"
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Return demo response for development
    return {
      title: "AI Study Buddy Platform",
      description: "An AI-powered platform that creates personalized study plans and connects students with similar academic goals for collaborative learning.",
      targetMarket: "University students struggling with time management and study efficiency",
      features: [
        "AI-generated personalized study schedules",
        "Peer matching for study groups",
        "Progress tracking and analytics",
        "Integration with academic calendars"
      ],
      challenges: "User adoption and ensuring AI recommendations are truly helpful",
      nextSteps: "Survey students about current study habits and pain points"
    };
  }
};

export const findCollaborators = async (ideaDescription, skillsNeeded = []) => {
  try {
    const prompt = `Based on this startup idea: "${ideaDescription}"
    Skills needed: ${skillsNeeded.join(', ')}
    
    Suggest 3-4 types of collaborators this project needs, including:
    1. Role title
    2. Key skills required
    3. Responsibilities
    4. Why they're important for this project
    
    Format as JSON array with keys: role, skills, responsibilities, importance`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a startup advisor helping students find the right team members for their projects."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.6,
    });

    const response = completion.choices[0].message.content;
    
    try {
      return JSON.parse(response);
    } catch {
      return [
        {
          role: "Technical Co-founder",
          skills: ["Full-stack development", "AI/ML"],
          responsibilities: "Build and maintain the platform",
          importance: "Essential for bringing the technical vision to life"
        },
        {
          role: "Marketing Lead",
          skills: ["Digital marketing", "Content creation"],
          responsibilities: "User acquisition and brand building",
          importance: "Critical for reaching target audience"
        }
      ];
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return [
      {
        role: "Technical Co-founder",
        skills: ["Full-stack development", "AI/ML"],
        responsibilities: "Build and maintain the platform",
        importance: "Essential for bringing the technical vision to life"
      },
      {
        role: "Marketing Lead",
        skills: ["Digital marketing", "Content creation"],
        responsibilities: "User acquisition and brand building",
        importance: "Critical for reaching target audience"
      }
    ];
  }
};