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
import { ChevronDown, MoreHorizontal, Search } from "lucide-react";
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
import { useTheme } from "@/components/theme-provider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Supplier } from "@/support/models/Supplier";
import { RawGoodType } from "@/support/models/RawGoodType";

export default function Index({ auth, suppliers, rawGoodTypes }: { auth: { user: User }, suppliers: Supplier[], rawGoodTypes: RawGoodType[] }) {

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
                        List Data pengiriman perusahaan
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="filter-wrapper space-y-3 lg:space-y-0 lg:flex items-center gap-2">
                        <div className="search-bar-filter-wrapper w-full lg:w-6/12 lg:flex">

                            <div className="wrapper border-2 w-full lg:w-1/3 rounded-md rounded-r-none">
                                <Select>
                                    <SelectTrigger className="w-full py-0 border-none rounded-md rounded-r-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Pilih Kolom" defaultValue="id" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="id">ID</SelectItem>
                                            <SelectItem value="driver">Driver</SelectItem>
                                            <SelectItem value="plat_number">Nomor Plat</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="wrapper w-full border-2 lg:w-2/3 rounded-md rounded-l-none lg:border-s-0 border-t-0 lg:border-t-2">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-md rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                        </div>

                        <div className="popover-wrapper border-2 rounded-md w-full lg:w-2/12">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="rounded-md justify-between border-none w-full hover:bg-transparent"><span className="text-muted-foreground">Filter Data</span> <ChevronDown className="h-4 w-4 opacity-50" /></Button>
                                </PopoverTrigger>
                                <PopoverContent className="lg:w-[38rem] md:w-[30rem] w-[25rem]">
                                    <div className="h-72 overflow-auto p-2 space-y-3">
                                        <div className="header-wrapper space-y-1">
                                            <h4 className="text-md leading-none">Filter Data</h4>
                                            <div className="desc-wrapper lg:flex lg:justify-between items-baseline space-y-2">
                                                <p className="text-sm text-muted-foreground w-full lg:w-4/6">
                                                    Pilih supplier atau jenis barang untuk menyaring data
                                                </p>
                                                <div className="action-btn-wrapper flex lg:justify-end gap-2 w-2/6">
                                                    <Button variant={"outline"} >Clear</Button>
                                                    <Button variant={"secondary"} >Add Filter</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-wrapper w-full flex h-full ">
                                            <div className="supplier-filter-wrapper w-1/2">
                                                <div className="header w-full py-2 border border-gray-400 border-x-0 border-t-0">
                                                    Supplier
                                                </div>
                                                <div className="filter-list-wrapper space-y-3  overflow-hidden py-2">
                                                    {suppliers.map((supplier, index) => (
                                                        <div className="flex items-center space-x-2" key={index}>
                                                            <Checkbox id="terms" />
                                                            <label
                                                                htmlFor="terms"
                                                                className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {supplier.name}
                                                            </label>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                            <div className="goodType-filter-wrapper w-1/2">
                                                <div className="header w-full py-2 ps-2 border-t-0 border border-gray-400 border-e-0">
                                                    Jenis Barang
                                                </div>
                                                <div className="filter-list-wrapper space-y-3  h-full overflow-hidden border border-y-0 border-gray-400 border-e-0 py-2 ps-2">
                                                    {rawGoodTypes.map((rawGoodType, index) => (
                                                        <div className="flex items-center space-x-2" key={index}>
                                                            <Checkbox id="terms" />
                                                            <label
                                                                htmlFor="terms"
                                                                className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {rawGoodType.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>

                    <Table className="mt-2">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell font-bold">ID Pengiriman</TableHead>
                                <TableHead className="font-bold">Supplier</TableHead>
                                <TableHead className="font-bold">Nomor Plat</TableHead>
                                <TableHead className="hidden md:table-cell font-bold">
                                    Driver
                                </TableHead>
                                <TableHead className="hidden md:table-cell font-bold">
                                    Tanggal Diterima
                                </TableHead>
                                <TableHead className="font-bold">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                isLoading && (
                                    <TableRow>
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
                                    </TableRow>
                                )
                            }

                            {shipmentResponse?.data?.map((shipment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="hidden md:table-cell">
                                        {shipment.id}
                                    </TableCell>
                                    <TableCell>
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
        </AuthenticatedLayout >
    );
}
