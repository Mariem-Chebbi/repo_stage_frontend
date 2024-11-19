
const organization = 'hydatispp-esprit';
const azureDevopsConfig = {
  scopes: ['https://app.vssps.visualstudio.com/vso.project', 'https://app.vssps.visualstudio.com/vso.work'],
  organization: organization,
  apiEndpoint : 'https://dev.azure.com/' + organization,
  apiVersion: '?api-version=7.1',
  clientId: 'be79c1a8-60a7-4aa7-ab9f-98eee9875995',
  tenantId: 'f8d35d76-6892-4eb7-9339-abb7c48d0133',
  redirectUrl: 'http://localhost:4200/hydatis/sessions/projects/1/sessions',
};

export default azureDevopsConfig;
