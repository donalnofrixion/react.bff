import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthUser } from "./apis/auth";
import { useMerchants } from "./apis/getMerchants";
import {
  usePaymentRequests,
  useBanks,
  useAccounts,
} from "@nofrixion/moneymoov";
import { useCallback } from "react";
import { defaultContext} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

function Main() {
  const { isLoggedIn, username, logoutUrl, isLoading } = useAuthUser();
  const { data: merchants } = useMerchants(isLoggedIn ? true : false);

  // let merchantId = merchants?.[0].id;

  const {data: banks, isLoading: isBanksLoading} = useBanks( {merchantId: merchants?.[0].id} , { apiUrl: "/api" });

  const {
    accounts,
    isLoading: isAccountsLoading,
    apiError,
  } = useAccounts({ merchantId: merchants?.[0].id }, { apiUrl: "/api" });

  // console.log("apiError", apiError);
  console.log("bankresponse", banks);
  // if (bankresponse && bankresponse.status === "error") {
  //   console.log("bankresponse error", bankresponse.error);
  // }
  // else if (bankresponse){
  //   console.log("bankresponse success", bankresponse.data);
  // }

  // // if (!isAccountsLoading && accounts) {
  // console.log("accounts", accounts);
  // }

  if (isLoading)
    return (
      <div className="h-screen w-screen bg-slate-100 transition-all flex items-center justify-center">
        <svg
          className="animate-spin h-6 w-6 text-slate-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );

  return (
    <div className="p-20">
      {!isLoggedIn ? (
        <a
          href="/bff/login?returnUrl=/"
          className="inline-block px-4 py-2 text-base font-medium text-center text-white bg-blue-500 border border-transparent rounded-md hover:bg-opacity-75"
        >
          Login
        </a>
      ) : (
        <div className="flex-shrink-0 block">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="block text-base font-medium text-blue-500 md:text-sm">{`Hi, ${username}!`}</p>
              <a
                href={logoutUrl?.value}
                className="block mt-1 text-sm font-medium text-blue-200 hover:text-blue-500 md:text-xs"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
      {
        <>
          <ul className="py-10 space-y-2">
            {merchants &&
              merchants.map((merchant: any) => (
                <li className="text-medium px-4 py-3 rounded-md border border-gray-20 shadow">
                  {merchant.name}
                </li>
              ))}
          </ul>
          <ul className="py-10 space-y-2">
            {accounts &&
              accounts.map((account) => (
                <li className="text-medium px-4 py-3 rounded-md border border-gray-20 shadow">
                  {account.accountName}
                </li>
              ))}
          </ul>
          <ul className="py-10 space-y-2">
            {!isBanksLoading && banks && banks?.status == 'success' &&
              banks?.data?.payByBankSettings.map((bank) => (
                <li className="text-medium px-4 py-3 rounded-md border border-gray-20 shadow">
                  {bank.bankName}
                </li>
              ))}
          </ul>
        </>
      }
    </div>
  );
}

export default App;
