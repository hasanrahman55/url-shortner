import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  }
  return (
    <div className="flex flex-col justify-start items-center gap-6">
      <h1>This is Landing page</h1>
      <form
        onSubmit={handleSubmit}
        className="sm:h-14 flex sm:flex-row flex-col w-full  md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your url"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
    </div>
  );
};

export default LandingPage;
