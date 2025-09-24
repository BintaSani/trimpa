// "use client";

// import React, { createContext, useState, useEffect, ReactNode } from "react";

// interface TokenContextType {
//   token: string | null;
//   loading: boolean;
// }

// const defaultContextValue: TokenContextType = {
//   token: null,
//   loading: true,
// };

// export const TokenContext =
//   createContext<TokenContextType>(defaultContextValue);

// interface TokenProviderProps {
//   children: ReactNode;
// }

// export function TokenProvider({ children }: TokenProviderProps) {
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchToken = async () => {
//       const storedToken = localStorage.getItem("token");
//       const storedExpiry = localStorage.getItem("tokenExpiry");

//       const isTokenValid =
//         storedToken && storedExpiry && Date.now() < parseInt(storedExpiry);

//       if (isTokenValid) {
//         setToken(storedToken);
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("/api/token", {
//           method: "POST",
//         });

//         const data = await response.json();

//         const newToken = data.access_token;
//         const expiryTime = Date.now() + data.expires_in * 1000;
//         console.log(data);
//         localStorage.setItem("token", newToken);
//         localStorage.setItem("tokenExpiry", expiryTime.toString());

//         setToken(newToken);
//       } catch (error) {
//         console.error("Failed to fetch token:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchToken();
//   }, []);

//   return (
//     <TokenContext.Provider value={{ token, loading }}>
//       {children}
//     </TokenContext.Provider>
//   );
// }

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

  // Helper function to fetch a new token
  const fetchToken = async () => {
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

      // schedule refresh a bit before expiry (e.g., 30 seconds early)
      scheduleRefresh(data.expires_in - 30);
    } catch (error) {
      console.error("Failed to fetch token:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Schedule refresh
  const scheduleRefresh = (expiresInSeconds: number) => {
    setTimeout(() => {
      fetchToken();
    }, expiresInSeconds * 1000);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpiry = localStorage.getItem("tokenExpiry");

    if (storedToken && storedExpiry && Date.now() < parseInt(storedExpiry)) {
      setToken(storedToken);
      setLoading(false);

      const remainingTime = parseInt(storedExpiry) - Date.now() - 30 * 1000; // refresh 30s early
      if (remainingTime > 0) {
        scheduleRefresh(remainingTime / 1000);
      }
    } else {
      fetchToken();
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, loading }}>
      {children}
    </TokenContext.Provider>
  );
}
