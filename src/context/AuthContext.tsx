/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../supabase";

interface AuthContextType {
  session: any;
  signUpNewUser: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    data?: any;
    error?: any;
  }>;
  signInUser: (
    email: string,
    password: string
  ) => Promise<
    | {
        success: boolean;
        data?: any;
        error?: any;
      }
    | undefined
  >;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<any>(undefined);

  //   Sign up
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(`There was a problem signing up: ${error}`);
      return { success: false, error };
    }
    return { success: true, data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //   Sign in
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(`Sign in error occurred: ${error}`);
        return { success: false, error: error };
      }
      return { success: true, data };
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  //   Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(`There was an error: ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signOut, signInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
