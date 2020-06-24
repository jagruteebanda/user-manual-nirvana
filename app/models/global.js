window.UserManualNirvana = {};

window.UserManualNirvana.basePath = 'https://az19fgwa01t.azurewebsites.net';

window.UserManualNirvana.setUserDetails = (user) => {
      window.UserManualNirvana['userDetails'] = user;
}

window.UserManualNirvana.getUserDetails = () => {
      return window.UserManualNirvana['userDetails'];
}

window.UserManualNirvana.setAuthToken = (token) => {
      window.UserManualNirvana['authToken'] = token;
}

window.UserManualNirvana.getAuthToken = () => {
      return window.UserManualNirvana['authToken'];
}

window.UserManualNirvana.setSelectedModality = (modality) => {
      window.UserManualNirvana['selectedModality'] = modality;
}

window.UserManualNirvana.getSelectedModality = () => {
      return window.UserManualNirvana['selectedModality'];
}

window.UserManualNirvana.setProductDetails = (productDetails) => {
      window.UserManualNirvana['productDetails'] = productDetails;
}

window.UserManualNirvana.getProductDetails = () => {
      return window.UserManualNirvana['productDetails'];
}

window.UserManualNirvana.setPDFDetails = (pdfDetails) => {
      window.UserManualNirvana['pdfDetails'] = pdfDetails;
}

window.UserManualNirvana.getPDFDetails = () => {
      return window.UserManualNirvana['pdfDetails'];
}

