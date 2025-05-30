"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
  loading: boolean;
}

const defaultContextValue: TokenContextType = {
  token: null,
  loading: true,
};

export const TokenContext =
  createContext<TokenContextType>(defaultContextValue);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = localStorage.getItem("token");
  //     const storedExpiry = localStorage.getItem("tokenExpiry");

  //     const isTokenValid =
  //       storedToken && storedExpiry && Date.now() < parseInt(storedExpiry);

  //     if (isTokenValid) {
  //       setToken(storedToken);
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const clientId = process.env.CLIENT_ID;
  //       const clientSecret = process.env.CLIENT_SECRET;

  //       if (!clientId || !clientSecret) {
  //         throw new Error(
  //           "Missing CLIENT_ID or CLIENT_SECRET in environment variables."
  //         );
  //       }

  //       const params = new URLSearchParams();
  //       params.append("grant_type", "client_credentials");
  //       params.append("client_id", clientId);
  //       params.append("client_secret", clientSecret);

  //       const response = await fetch(
  //         "https://test.api.amadeus.com/v1/security/oauth2/token",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //           },
  //           body: params,
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       const newToken = data.access_token;
  //       const expiryTime = Date.now() + data.expires_in * 1000; // expires_in is in seconds

  //       localStorage.setItem("token", newToken);
  //       localStorage.setItem("tokenExpiry", expiryTime.toString());

  //       setToken(newToken);
  //     } catch (error) {
  //       console.error("Failed to fetch token:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchToken();
  // }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem("token");
      const storedExpiry = localStorage.getItem("tokenExpiry");

      const isTokenValid =
        storedToken && storedExpiry && Date.now() < parseInt(storedExpiry);

      if (isTokenValid) {
        setToken(storedToken);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/token", {
          method: "POST",
        });

        const data = await response.json();

        const newToken = data.access_token;
        const expiryTime = Date.now() + data.expires_in * 1000;

        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        setToken(newToken);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, loading }}>
      {children}
    </TokenContext.Provider>
  );
}
