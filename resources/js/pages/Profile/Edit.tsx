import AuthenticatedLayout from "@/layouts/Authenticated/Index";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { ProfileBreadcrumbs } from "@/constants/Index";
import { PageProps } from "@/types";

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout user={auth.user} breadcrumbItems={ProfileBreadcrumbs} header="Profile">
            <div>
                <div className="p-4 sm:p-8 bg-background border shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 sm:p-8 mt-3 bg-background border shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
