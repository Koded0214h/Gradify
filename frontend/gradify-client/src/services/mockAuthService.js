export const loginUser = async ({ email, password, role }) => {
  await new Promise((res) => setTimeout(res, 300));
  return { token: "mock-token", role };
};

export const registerUser = async (formData) => {
  await new Promise((res) => setTimeout(res, 300));
  return { token: "mock-token", role: formData.role };
}; 