import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const claimsKeys = {
  claim: ["claims"],
};

const config = {
  headers: {
    "X-CSRF": "1",
  },
};

const fetchClaims = async () =>
  axios.get("/bff/user", config).then((res) => res.data);

function useClaims() {
  return useQuery(
    claimsKeys.claim,
    async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 550));
      return Promise.all([fetchClaims(), delay]).then(([claims]) => claims);
    },
    {
      retry: false,
    }
  );
}

function useAuthUser() {
  const { data: claims, isLoading } = useClaims();

  console.log('Claims', claims);
  
  let logoutUrl = claims?.find((claim: any) => claim.type === "bff:logout_url");
  let nameDict =
    claims?.find((claim: any) => claim.type === "name") ||
    claims?.find((claim: any) => claim.type === "sub");
  let username = nameDict?.value;

  console.log('UserName', username);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!username);
  }, [username]);

  useEffect(() => {
    console.log('USER IS LOGGED IN = ', isLoggedIn);
  }, [isLoggedIn]);

  return {
    username,
    logoutUrl,
    isLoading,
    isLoggedIn,
  };
}

export { useAuthUser };
