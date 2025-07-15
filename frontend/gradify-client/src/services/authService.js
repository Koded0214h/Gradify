const API_URL = "https://your-backend.com/api";

export const loginUser = async ({ email, password, role }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  if (!res.ok) throw new Error("Invalid login");
  return await res.json(); // expected: { token, role }
};

export const registerUser = async (formData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Registration failed");
  return await res.json(); // expected: { token, role }
}; 