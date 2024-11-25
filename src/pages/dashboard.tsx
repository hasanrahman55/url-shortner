import Error from "@/components/error";
import LinkCard from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicks } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hook/use-fetch";
import { url } from "inspector";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingclicks,

    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filterUrls = urls
    ? urls.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <>
      <div className="flex flex-col gpa-8">
        {loading && loadingclicks && (
          <BarLoader width={"100%"} color="#36d7b7" />
        )}

        <div className="grid grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{urls?.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{clicks?.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-16">
          <h1>My Links</h1>
          <Button>Create Like</Button>
        </div>

        <div className="relative mt-4">
          <Input
            type="text"
            placeholder="Filter Links ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Filter className="absolute top-2 right-2 w-4 h-4" />
        </div>
        {error && <Error message={error.message} />}
        {(filterUrls || []).map((url, id) => (
          <LinkCard key={id} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
