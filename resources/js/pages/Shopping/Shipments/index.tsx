import AuthenticatedLayout from "@/layouts/Authenticated/Index";
import { DataBelanjaBreadcrumbs } from "@/constants/Index";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { User } from "@/support/models/Index";
import { Shipment } from "@/support/models/Shipment";
import { PaginateResponse } from "@/support/interfaces/others/PaginateResponse";
import { ShipmentResource } from "@/support/interfaces/resources/ShipmentResource";
import { ServiceFilterOptions } from "@/support/interfaces/others/ServiceFilterOptions";
import { shipmentService } from "@/services/shipmentService";
import { ScaleLoader } from "react-spinners";
// import { usePage } from "@inertiajs/react";
import { useTheme } from "@/components/theme-provider";

export default function Index({ auth }: { auth: { user: User }, shipments?: Shipment[] }) {

    const [shipmentResponse, setShipmentResponse] = useState<PaginateResponse<ShipmentResource>>();

    const [isLoading, setIsLoading] = useState(false);

    const { theme } = useTheme();

    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        per_page: 10,
    });

    // const { auth } = usePage().props;

    const fetchShipments = async () => {
        setIsLoading(true)

        try {
            shipmentService.getAll(filters).then(res => {
                setShipmentResponse(res);
                setIsLoading(false)
            })

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchShipments();
    }, [filters]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Data Pengiriman"}
            breadcrumbItems={DataBelanjaBreadcrumbs}
        >
            <Card className="pb-12">
                <CardHeader >
                    <CardTitle>Data Pengiriman</CardTitle>
                    <CardDescription>
                        Data pengiriman perusahaan.
                    </CardDescription>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Supplier</TableHead>
                                <TableHead>Nomor Plat</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Nama Driver
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Tanggal Diterima
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                isLoading && (
                                    <TableCell className="text-center" colSpan={6}>
                                        <div className="wrapper">
                                            <ScaleLoader
                                                color={
                                                    theme === "light"
                                                        ? "#09090B"
                                                        : "#F2F2F2"
                                                }
                                                width={2}
                                                height={21}
                                                className="me-1"
                                                loading={true}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    </TableCell>
                                )
                            }

                            {shipmentResponse?.data?.map((shipment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {shipment.supplier.name}
                                    </TableCell>
                                    <TableCell>
                                        {shipment.plat_number}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {shipment.driver_name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {shipment.shipment_date}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Toggle menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Aksi
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        products
                    </div>
                    <Pagination className="justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
