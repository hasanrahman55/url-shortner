import Login from "@/components/login";
import SignUp from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { isAuthenticated, loading } = UrlState();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-10">
      <h1>{longLink ? "login in first" : "Login/sign up"}</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
