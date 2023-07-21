import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const claimsKeys = {
  claim: ["recipes"],
};

const config = {
  headers: {
    "X-CSRF": "1",
  },
};

const fetchMerchants = async () =>
  axios.get("/api/merchants", config).then((res) => res.data);

export const useMerchants = (isLoggedIn: boolean) => {

  // if (!isLoggedIn) {
  //   return {data: undefined};
  // }

  return useQuery(claimsKeys.claim, async () => fetchMerchants(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

// export { useMerchants as default };

/**
 * export const useAccounts = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken, onUnauthorized }: ApiProps,
) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!authToken || !merchantId) {
          return
        }

        setIsLoading(true)

        const client = new AccountsClient({ apiUrl, authToken, onUnauthorized })
        const response = await client.getAccounts({ merchantId: merchantId })

        if (response.status === 'success') {
          setAccounts(response.data)
        } else {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchAccounts()
  }, [authToken, merchantId, onUnauthorized, apiUrl])

  return { accounts, isLoading, apiError }
}

 */
