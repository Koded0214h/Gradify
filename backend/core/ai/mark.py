import google.generativeai as genai

# Configure Gemini API key
GEMINI_API_KEY = "AIzaSyCNDDxOo8Cn0RCk2axHOHi4VfK1TtR2XSQ"
genai.configure(api_key=GEMINI_API_KEY)

def grade_with_gemini(assignment_title, code, max_score):
    prompt = f"""You're a DSA lecturer. Grade the following student submission:
Assignment: {assignment_title}
Max Score: {max_score}
Code:
{code}

Give a brief feedback, and a score out of {max_score}.
Return it exactly in this format:
Score: <number>
Feedback: <your feedback>
"""

    model = genai.GenerativeModel("models/gemini-2.0-flash")
    response = model.generate_content(prompt)
    output = response.text.strip()

    try:
        lines = output.splitlines()
        score_line = next((l for l in lines if l.lower().startswith("score:")), None)
        feedback_line = next((l for l in lines if l.lower().startswith("feedback:")), None)

        score = float(score_line.split(":")[1].strip())
        feedback = feedback_line.split(":", 1)[1].strip()
        return score, feedback
    except Exception as e:
        raise ValueError(f"Gemini response parsing failed: {str(e)}\nFull response:\n{output}")
