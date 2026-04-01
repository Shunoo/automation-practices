import {test, expect} from "@playwright/test";
import { SecureVaultDashboard } from "../page-objects/challenge-2/SecureVaultDashboard";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/challenge-2-auth-token');
  const secureVaultDashboard = new SecureVaultDashboard(page);
  await secureVaultDashboard.login('testuser','password123');
});


test.describe('Load Challenge - 2 Auth Token Lifecycle' , () =>{

    test('Login with testuser/password123, verify dashboard',async ({page})=>{
        const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('active');
    })

    test('Make API call api/profile, verify 200 in response log',async ({page})=>{
        const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('active');
        await secureVaultDashboard.getApiProfile();

    })
    test('Make API call api/data, verify 200 in response log',async ({page})=>{
        const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('active');
        await secureVaultDashboard.getApiData();
        
    })
    test('Wait for 30s expiry, verify session-expired overlay',async ({page})=>{
        const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('expired');
    })
    test('Verify localStorage/sessionStorage cleared after expiry',async ({page})=>{
        const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('expired');
    })
    test('Re-login, verify clean state',async ({page})=>{
       const secureVaultDashboard = new SecureVaultDashboard(page);
        await secureVaultDashboard.validateLoginSuccess();
        await secureVaultDashboard.validateSessionInfo('expired'); 
        await secureVaultDashboard.signInAgain('testuser','password123')
    })


})