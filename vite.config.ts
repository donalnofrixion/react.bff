import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    port: 4378,
    strictPort: true,

    // these are the proxy routes that will be forwarded to your **BFF**
    proxy: {
      "/bff": {
        target: "https://localhost:7106",
        secure: false,
      },
      "/signin-oidc": {
        target: "https://localhost:7106",
        secure: false,
      },
      "/signout-callback-oidc": {
        target: "https://localhost:7106",
        secure: false,
      },
      "/api": {
        target: "https://localhost:7106",
        secure: false,
      },
    },
  },
});

// https://localhost:6001/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dnofrixion.portal%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4378%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520nofrixion%2520user_access%2520offline_access%26code_challenge%3DuH65bkffxxMtPUmrRWRAFxcZKbulK_fV48iVieyg0xY%26code_challenge_method%3DS256%26nonce%3D638233924557496600.ZjlhOTIwZjUtYTFjMS00ZmY1LThjODQtNDdkZTY3MGY1NDU5ZTM0Y2Y4YjQtZWMxMi00YTE0LThkMzUtMjgwYTE3OTYyY2Y1%26state%3DCfDJ8A3dPsOZMUtPsXPCV7-aZnML87-_NGrWl2HQbB9C2O7FOck1_p_kt3UB1ImKt-58hLVfP2M9jM-xOrIVm-LJgBdn_L4e3fxmFcCvWsG4mtPxXaKY5AI3gCr5RS5255kvRQuW4sD8qhrxn9jxE29Pm9L6bVFTuk7WPUXWIU3UcD_2oVcTDYahAfNGiUJqOhW4RBW20dWjv1zS0cD17g5TD2UOmZ8Iq8SOpvR71GgagX8TIw9FV0CvPyZrfaPTlh9yleetxN1_nHVZM1DVKeDYUVR7PE6DVJTLfX7lpqVGhr5xNyaJxLJsUnpJ3AcIx_wPZDz7kfe399li_xqdO3Z2qeh9R1KypjI0Sbuum61KKUIY7XEJSSK60eZJG12Wiz10Dg%26x-client-SKU%3DID_NETSTANDARD2_0%26x-client-ver%3D6.15.1.0