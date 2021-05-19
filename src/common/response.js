// Response format function
export const Response = (data, messageSuccess, MessageError, status) => {
  const response = {
    data: data,
    message: status ? messageSuccess : MessageError,
    success: status,
  };
  return response;
};
