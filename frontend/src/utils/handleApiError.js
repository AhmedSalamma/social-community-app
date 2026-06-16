export const handleApiError = (error, setErrors) => {
  if (error.response?.status === 500) {
    setErrors("حدث خطأ في السيرفر");
  } else if (error.response?.status === 422) {
    setErrors(Object.values(error.response?.data?.errors || {}).flat());
  } else {
    setErrors(error.response?.data?.message || "حدث خطأ");
  }
};
