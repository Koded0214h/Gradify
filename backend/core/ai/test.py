import google.generativeai as genai

genai.configure(api_key="AIzaSyCNDDxOo8Cn0RCk2axHOHi4VfK1TtR2XSQ")

model = genai.GenerativeModel("models/gemini-2.0-flash")
response = model.generate_content("Give me a DSA assignment idea.")
print(response.text)
