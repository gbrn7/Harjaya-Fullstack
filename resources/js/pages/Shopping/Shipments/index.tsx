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
import { CalendarIcon, ChevronDown, MoreHorizontal, Search, SlidersHorizontal, X } from "lucide-react";
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
import React, { useEffect, useState } from "react";
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
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { ShipmentFilters } from "@/support/interfaces/filters/ShipmentFilters";

export default function Index({ auth, suppliers, rawGoodTypes }: { auth: { user: User }, suppliers: Supplier[], rawGoodTypes: RawGoodType[] }) {

    const [shipmentResponse, setShipmentResponse] = useState<PaginateResponse<ShipmentResource>>();

    const [isLoading, setIsLoading] = useState(false);

    const { theme } = useTheme();

    const [filters, setFilters] = useState<ServiceFilterOptions<ShipmentFilters>>({
        page: 1,
        per_page: 10,
        query: {
            keyword: {
                column: "id",
                value: "",
            },
            dateRange: {
                from: undefined,
                to: undefined
            },
            suppliers: [],
            rawGoodTypes: [],
        },
    });

    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    async function fetchShipments() {
        try {
            setIsLoading(true)
            const res = await shipmentService.getAll(filters)
            setShipmentResponse(res);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchShipments();
    }, [filters]);

    useEffect(() => {
        if (date?.from && date?.to) {
            setFilters({
                ...filters,
                query: {
                    ...filters.query,
                    dateRange: {
                        from: date.from.toLocaleDateString(),
                        to: date.to.toLocaleDateString()
                    }
                }
            }
            )
        } else if (date?.from === undefined && date?.to === undefined) {
            setFilters({
                ...filters,
                query: {
                    ...filters.query,
                    dateRange: {
                        from: null,
                        to: null
                    }
                }
            }
            )
        }
    }, [date]);

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
                    <div className="filter-wrapper space-y-3 lg:space-y-0 lg:flex items-center gap-2 text-md font-medium">
                        <div className="search-bar-filter-wrapper w-full lg:w-6/12 lg:flex text-inherit">

                            <div className="wrapper border-2 w-full lg:w-1/3 rounded-t-md lg:rounded-l-md lg:rounded-r-none ">
                                <Select defaultValue={filters?.query?.keyword?.column} onValueChange={(e) => setFilters({
                                    ...filters,
                                    query: {
                                        ...filters.query,
                                        keyword: {
                                            ...filters?.query?.keyword,
                                            column: e.valueOf()
                                        }
                                    }
                                })}>
                                    <SelectTrigger className="w-full py-0 border-none rounded-md rounded-r-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Pilih Kolom" defaultValue={filters?.query?.keyword?.column} />
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
                            <div className="wrapper w-full border-2 lg:w-2/3 rounded-b-md lg:rounded-r-md lg:rounded-l-none lg:border-s-0 border-t-0 lg:border-t-2">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    value={filters?.query?.keyword?.value}
                                    onChange={(e) => setFilters(
                                        {
                                            ...filters,
                                            query: {
                                                ...filters.query,
                                                keyword: {
                                                    ...filters.query.keyword,
                                                    value: e.target.value
                                                }
                                            }
                                        })}
                                    className="w-full rounded-md lg:rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                        </div>
                        <div className="popover-wrapper border-2 rounded-md w-full lg:w-2/12 text-inherit">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="rounded-md justify-between border-none w-full hover:bg-transparent"><span className="text-muted-foreground text-md font-medium flex items-center"><SlidersHorizontal className="h-4 w-4 me-2" />Filter Data</span> <ChevronDown className="h-4 w-4 opacity-50" /></Button>
                                </PopoverTrigger>
                                <PopoverContent className="lg:w-[38rem] md:w-[30rem] w-[25rem]">
                                    <div className="h-72 overflow-auto p-2 space-y-3">
                                        <div className="header-wrapper space-y-2 lg:space-y-2">
                                            <h4 className="text-md leading-none">Filter Data</h4>
                                            <div className="desc-wrapper lg:flex lg:justify-between items-baseline space-y-1">
                                                <p className="text-sm text-muted-foreground w-full lg:w-4/6">
                                                    Pilih supplier atau jenis barang untuk menyaring data
                                                </p>
                                                <div className="action-btn-wrapper flex lg:justify-end gap-2 w-2/6">
                                                    <Button variant={"outline"} >Clear</Button>
                                                    <Button variant={"default"} >Add Filter</Button>
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
                                                            <Checkbox id="suppliers" value={supplier.id} onCheckedChange={(e) => setFilters({
                                                                ...filters,
                                                                query: {
                                                                    ...filters.query,
                                                                    suppliers: [
                                                                        ...filters?.query?.suppliers,
                                                                        {
                                                                            id: supplier.id,
                                                                            value: supplier.name,
                                                                            label: "Supplier"
                                                                        }
                                                                    ]
                                                                }
                                                            })} />
                                                            <label
                                                                htmlFor="suppliers"
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
                                                            <Checkbox id="rawGoodType" value={rawGoodType.id} onCheckedChange={(e) => setFilters({
                                                                ...filters,
                                                                query: {
                                                                    ...filters.query,
                                                                    rawGoodTypes: [
                                                                        ...filters.query.rawGoodTypes,
                                                                        {
                                                                            id: rawGoodType.id,
                                                                            value: rawGoodType.name,
                                                                            label: "Jenis Barang"
                                                                        }
                                                                    ]
                                                                }
                                                            })} />
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
                        <div className="overflow-hidden w-full lg:w-2/12 text-inherit">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={
                                            "border-2 flex justify-between items-center font-normal w-full hover:bg-transparent rounded-md"
                                        }
                                    >
                                        <div className="content-wrapper flex items-center">
                                            <CalendarIcon className="mr-2 text-muted-foreground h-4 w-4" />
                                            {date?.from && date?.to ? (
                                                date.to ? (
                                                    <>
                                                        {format(date.from, "dd/LL/y")} -{" "}
                                                        {format(date.to, "dd/LL/y")}
                                                    </>
                                                ) : (
                                                    format(date.from, "dd/LL/y")
                                                )
                                            ) : (
                                                <span className="text-muted-foreground text-md font-medium">Rentang Tanggal</span>
                                            )}
                                        </div>
                                        {date?.from || date?.to ? <X className="h-4 w-4" onClick={() => setDate({ ...date, to: undefined, from: undefined })} /> : ""}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="lg:w-2/12 w-full text-inherit">
                            <Button variant={"secondary"} className="w-full">Apply</Button>
                        </div>
                    </div>

                    <Table className="mt-2">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell font-bold">ID Pengiriman</TableHead>
                                <TableHead className="font-bold">Supplier</TableHead>
                                <TableHead className="hidden md:table-cell font-bold">Nomor Plat</TableHead>
                                <TableHead className="hidden md:table-cell font-bold">
                                    Driver
                                </TableHead>
                                <TableHead>
                                    Tanggal Diterima
                                </TableHead>
                                <TableHead className="font-bold">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                isLoading ? (
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
                                ) : shipmentResponse?.data.length ? (
                                    shipmentResponse?.data?.map((shipment, index) => (
                                        <TableRow key={index} className="font-medium">
                                            <TableCell className="hidden md:table-cell">
                                                {shipment.id}
                                            </TableCell>
                                            <TableCell>
                                                {shipment.supplier.name}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {shipment.plat_number}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {shipment.driver_name}
                                            </TableCell>
                                            <TableCell>
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="text-center text-md" colSpan={6}>
                                            Data Tidak Ditemukan
                                        </TableCell>
                                    </TableRow>
                                )
                            }
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
