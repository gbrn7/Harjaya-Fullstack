import AuthenticatedLayout from "@/Layouts/Authenticated/Index";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { ProfileBreadcrumbs } from "@/Constants/Index";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout auth={auth} breadcrumbItems={ProfileBreadcrumbs}>
            <Head title="Profile" />

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
