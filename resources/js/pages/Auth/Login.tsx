import { FormEventHandler, useEffect, useState } from "react";
import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@/components/theme-provider";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const { theme } = useTheme();

    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div
            className={`wrapper ${processing && "cursor-wait"
                } min-h-screen lg:max-h-screen flex justify-center lg:justify-center`}
        >
            <Head title="Sign In" />
            <div className="image-wrapper w-7/12 p-7 hidden  lg:block">
                <img
                    src="/images/bg-signin.jpg"
                    alt="image"
                    className="w-full object-cover h-full rounded-md max-h-dvh"
                />
            </div>
            <div className="card-wrapper max-w-lg lg:max-w-full rounded-md lg:w-5/12 w-full p-4 flex justify-center items-center">
                <Card className="w-full lg:max-w-lg">
                    <form onSubmit={submit}>
                        <CardHeader>
                            <CardTitle>Harjaya</CardTitle>
                            <CardDescription>
                                Masukkan email dan pasword anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-primary" />

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 relative">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-primary"
                                />

                                <Input
                                    id="password"
                                    type={isOpen ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <div
                                    onClick={() => setisOpen(!isOpen)}
                                    className="icon-wrapper absolute top-8 right-3 cursor-pointer "
                                >
                                    {isOpen ? <EyeOff /> : <Eye />}
                                </div>

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="items-top flex space-x-2 mt-4">
                                <Checkbox
                                    id="remember"
                                    type="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="terms1"
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex w-full">
                            <div className="flex items-center w-full justify-end mt-4">
                                <Button
                                    className="ms-4 w-full"
                                    disabled={processing}
                                >
                                    <ScaleLoader
                                        color={
                                            theme === "light"
                                                ? "#F2F2F2"
                                                : "#09090B"
                                        }
                                        width={2}
                                        height={21}
                                        className="me-1"
                                        loading={processing}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    Sign in
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
