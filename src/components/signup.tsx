import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hook/use-fetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

export default function SignUp() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignUp } = useFetch(signUp, formData);

  const { fnUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fnUser();
    }
  }, [data, error]);

  const handleSignUp = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("email is required"),
        password: Yup.string()
          .min(6, "Password Must be at least 6 characters")
          .required("password is required"),

        profile_pic: Yup.mixed().required("Profile Pic is Required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnSignUp();
    } catch (error) {
      const newErrors = {};
      error.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-1">
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <div className="space-y-1">
            <Input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp}>
            {loading ? <BeatLoader /> : "SignUp"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
