import AuthenticatedLayout from "@/layouts/Authenticated/Index";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={"Dashboard"}
            >
                <h1>haloo</h1>
            </AuthenticatedLayout>
        </>
    );
}
