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
import { CalendarIcon, ChevronDown, MoreHorizontal, SlidersHorizontal, X } from "lucide-react";
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
import { useEffect, useRef, useState } from "react";
import { User } from "@/support/models/Index";
import { PaginateResponse } from "@/support/interfaces/others/PaginateResponse";
import { ShipmentResource } from "@/support/interfaces/resources/ShipmentResource";
import { shipmentService } from "@/services/shipmentService";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@/components/theme-provider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Supplier } from "@/support/models/Supplier";
import { RawGoodType } from "@/support/models/RawGoodType";
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { ShipmentFilters } from "@/support/interfaces/filters/ShipmentFilters";
import { CheckedState } from "@radix-ui/react-checkbox";
import { router, usePage } from "@inertiajs/react";

type Shipment = {
    auth: {
        user: User
    },
    suppliers: Supplier[],
    rawGoodTypes: RawGoodType[]
}

export default function Index({ auth, suppliers, rawGoodTypes }: Shipment) {
    const [shipmentResponse, setShipmentResponse] = useState<PaginateResponse<ShipmentResource>>();
    const [isDisabled, setIsDisabled] = useState(true);
    const { url } = usePage();
    let isNeedUpdate: Boolean = true;

    const popoverWrapperref = useRef<HTMLDivElement>(null);
    const popoverContentref = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const [isPopoverOpen, setisPopoverOpen] = useState(false);

    const [extractedParams, setExtractedParams] = useState<Record<string, string | string[] | number | number[]>>();

    const { theme } = useTheme();

    const [filters, setFilters] = useState<ShipmentFilters>({
        page: 1,
        limit: 10,
    });



    const handleClickOutside = (event: MouseEvent) => {
        if (popoverWrapperref.current && !popoverWrapperref.current.contains(event.target as Node) && popoverContentref.current && !popoverContentref.current.contains(event.target as Node)) {
            setisPopoverOpen(false);
        }
    };

    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    const handleClickPagination = (page: number) => {
        const newPageFilter = { ...filters, page: page }
        setFilters({ ...filters, page: page })
        pushUrl();
    }

    async function fetchShipments() {
        try {
            setIsLoading(true)
            const extracted: Record<string, string | string[] | number | number[]> = extractQueryParams(window.location.href);
            const res = await shipmentService.getAll(extracted)
            setShipmentResponse(res);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setFilters(current => {
                const { type } = current
                if (type) {
                    return {
                        ...filters,
                        query: e.target.value
                    }
                } else {
                    return {
                        ...filters,
                        query: e.target.value,
                        type: "id"
                    }
                }

            })

            return
        }

        setFilters(current => {
            const { query, ...rest } = current;
            return rest;
        })

    }

    const handleSuppliersCheckboxChange = (checked: CheckedState, supplier: Supplier) => {
        if (checked) {
            return setFilters({
                ...filters,
                suppliers_id: [...(filters.suppliers_id || []), supplier.id]
            })
        }

        return setFilters(current => {
            const newState = { ...current }
            newState.suppliers_id = current?.suppliers_id?.filter((value) => value !== supplier.id)
            if (newState.suppliers_id?.length === 0) delete newState.suppliers_id
            return newState
        })
    }

    const handleRawGoodsCheckboxChange = (checked: CheckedState, rawGoodType: RawGoodType) => {
        if (checked) {
            return setFilters({
                ...filters,
                raw_good_types_id: [...(filters.raw_good_types_id || []), rawGoodType.id]
            })
        }

        return setFilters(current => {
            const newState = { ...current }
            newState.raw_good_types_id = current?.raw_good_types_id?.filter((value) => value !== rawGoodType.id)
            if (newState.raw_good_types_id?.length === 0) delete newState.raw_good_types_id
            return newState
        })
    }

    const handleClearDate = () => {
        setDate({ ...date, to: undefined, from: undefined })
    }

    const handleClearCheckbox = () => {
        const { suppliers_id, raw_good_types_id, ...rest } = filters;
        setFilters((current) => {
            const { suppliers_id, raw_good_types_id, ...rest } = current
            return rest
        })

        setisPopoverOpen(!isPopoverOpen)
    }

    const pushUrl = () => {
        router.get(url.split('?')[0], { ...filters });
    }

    useEffect(() => {
        if (isNeedUpdate) {
            if (date?.from && date?.to) {
                setFilters({
                    ...filters,
                    start_created_at: date.from.toISOString(),
                    end_created_at: date.to.toISOString()
                }
                )
            } else if (date?.from === undefined && date?.to === undefined) {
                setFilters((current) => {
                    const { start_created_at, end_created_at, ...rest } = current
                    return rest
                })
            }
        }

        isNeedUpdate = true
    }, [date]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const requiredFields: (keyof ShipmentFilters)[] = [
            'query',
            'suppliers_id',
            'raw_good_types_id',
            'start_created_at',
            'end_created_at',
        ];

        let isDisable = !requiredFields.some((field) => filters[field]);


        if (extractedParams?.query !== filters?.query) {
            isDisable = false
        }

        console.log("is disable 2")
        console.log(isDisable)
        setIsDisabled(isDisable)
    }, [filters.query, filters.suppliers_id, filters.raw_good_types_id, filters.start_created_at, filters.end_created_at])

    useEffect(() => {
        const extracted: Record<string, string | string[] | number | number[]> = extractQueryParams(window.location.href);

        setExtractedParams(extracted);

        const { start_created_at, end_created_at } = extracted;

        if (start_created_at && end_created_at) {
            isNeedUpdate = false
            setDate({ from: new Date(start_created_at.toString()), to: new Date(end_created_at.toString()) })
        }

        setFilters(prevState => ({
            ...prevState,
            ...extracted
        }))
        console.log("use effect-1")


    }, []);

    useEffect(() => {
        console.log("use effect-2")

        fetchShipments();
    }, [filters?.start_created_at]);


    const extractQueryParams = (url: string): Record<string, string | string[] | number | number[]> => {
        const parsedUrl = new URL(url);
        const queryParams = new URLSearchParams(parsedUrl.search);

        // Convert to an object
        const paramsObject: Record<string, string | string[] | number | number[]> = {};

        for (const [key, value] of queryParams.entries()) {
            const arrayKeyMatch = key.match(/(.+)\[(\d+)\]/);

            const parsedValue = !isNaN(Number(value)) ? Number(value) : value; // Convert numeric strings to numbers


            if (arrayKeyMatch) {
                const baseKey = arrayKeyMatch[1];
                const index = Number(arrayKeyMatch[2]);

                if (!paramsObject[baseKey]) {
                    paramsObject[baseKey] = [];
                }

                // Assign the value to the correct index
                (paramsObject[baseKey] as (string | number)[])[index] = parsedValue;
            } else {
                paramsObject[key] = parsedValue;
            }
        }

        // Clean up any empty slots in the arrays
        for (const key in paramsObject) {
            if (Array.isArray(paramsObject[key])) {
                paramsObject[key] = (paramsObject[key] as string[]).filter(item => item !== undefined);
            }
        }

        return paramsObject

    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Data Pengiriman"}
            breadcrumbItems={DataBelanjaBreadcrumbs}
        >
            {console.log("filters")}
            {console.log(filters)}
            <Card className="pb-12">
                <CardHeader >
                    <CardTitle>Data Pengiriman</CardTitle>
                    <CardDescription>
                        List Data pengiriman perusahaan
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="filter-wrapper space-y-3 lg:space-y-0 lg:flex items-center gap-2 text-md font-medium">
                        <div className="lg:w-1/12 w-full border-2 rounded-md">
                            <Select defaultValue={filters?.limit?.toString()} value={filters?.limit?.toString()} onValueChange={(e) => {
                                setFilters({
                                    ...filters,
                                    limit: parseInt(e.valueOf())
                                })

                                setIsDisabled(false)

                            }}>
                                <SelectTrigger className="w-full py-0 border-none rounded-md rounded-r-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0">
                                    <SelectValue placeholder="Data" defaultValue={10} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="search-bar-filter-wrapper w-full lg:w-5/12 lg:flex text-inherit">

                            <div className="wrapper border-2 w-full lg:w-1/3 rounded-t-md lg:rounded-l-md lg:rounded-r-none">
                                <Select defaultValue={filters?.type} value={filters?.type} onValueChange={(e) => setFilters({
                                    ...filters,
                                    type: e.valueOf()
                                })}>
                                    <SelectTrigger className="w-full py-0 border-none rounded-md rounded-r-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Pilih Kolom" defaultValue={"id"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="id">ID</SelectItem>
                                            <SelectItem value="driver_name">Driver</SelectItem>
                                            <SelectItem value="plat_number">Nomor Plat</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="wrapper w-full border-2 lg:w-2/3 rounded-b-md lg:rounded-r-md lg:rounded-l-none lg:border-s-0 border-t-0 lg:border-t-2">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    value={filters?.query || ""}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md lg:rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                        </div>
                        <div ref={popoverWrapperref} className="popover-wrapper border-2 rounded-md w-full lg:w-2/12 text-inherit" >
                            <Popover open={isPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button onClick={() => setisPopoverOpen(!isPopoverOpen)} variant="outline" className="rounded-md justify-between border-none w-full hover:bg-transparent"><span className="text-muted-foreground text-md font-medium flex items-center"><SlidersHorizontal className="h-4 w-4 me-2" />Filter Data</span> <ChevronDown className="h-4 w-4 opacity-50" /></Button>
                                </PopoverTrigger>
                                <PopoverContent ref={popoverContentref} className="lg:w-[38rem] md:w-[30rem] w-[25rem]" id="">
                                    <div className="h-72 overflow-auto p-2 space-y-3">
                                        <div className="header-wrapper space-y-2 lg:space-y-2">
                                            <h4 className="text-md leading-none">Filter Data</h4>
                                            <div className="desc-wrapper lg:flex lg:justify-between items-baseline space-y-1">
                                                <p className="text-sm text-muted-foreground w-full lg:w-4/6">
                                                    Pilih supplier atau jenis barang untuk menyaring data
                                                </p>
                                                <div className="action-btn-wrapper flex lg:justify-end gap-2 w-2/6">
                                                    <Button variant={"outline"} disabled={filters?.suppliers_id || filters?.raw_good_types_id ? false : true} onClick={handleClearCheckbox}>Clear</Button>
                                                    <Button variant={"default"} onClick={() => pushUrl()}>Add Filter</Button>
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
                                                        <div className="flex items-center space-x-2" key={index} >
                                                            <Checkbox checked={filters?.suppliers_id?.includes(supplier.id) || false} id="suppliers" value={supplier.id} onCheckedChange={(checked) => handleSuppliersCheckboxChange(checked, supplier)} />
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
                                                            <Checkbox checked={filters.raw_good_types_id?.includes(rawGoodType.id) || false} id="rawGoodType" value={rawGoodType.id} onCheckedChange={(checked) => handleRawGoodsCheckboxChange(checked, rawGoodType)} />
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
                                <div className="flex  items-center border-2 rounded-md">
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={
                                                "border-0 flex w-10/12 justify-between items-center font-normal hover:bg-transparent rounded-md"
                                            }
                                        >
                                            <div className="content-wrapper overflow-hidden flex items-center">
                                                {date?.from && date?.to ? (
                                                    <span className="text-sm">
                                                        {format(date.from, "dd/LL/y")} -{" "}
                                                        {format(date.to, "dd/LL/y")}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <CalendarIcon className="mr-2 text-muted-foreground h-4 w-4" />

                                                        <span className="text-muted-foreground text-md font-medium">Rentang Tanggal</span>
                                                    </>
                                                )}
                                            </div>

                                        </Button>
                                    </PopoverTrigger>

                                    {date?.from && date?.to && (<div className="w-2/12 flex justify-center items-center">
                                        <X className="h-4 w-4" onClick={handleClearDate} />
                                    </div>)}
                                </div>
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
                        <div className="lg:w-2/12 w-full text-inherit flex gap-1">
                            <Button variant={"default"} onClick={() => pushUrl()} className="w-full" disabled={isDisabled}>Terapkan</Button>
                        </div>
                    </div>
                    {!isLoading && extractedParams && (
                        <div className="filters-wrapper mx-2">
                            <div className="header flex">Total {shipmentResponse?.meta.total}</div>
                        </div>
                    )}
                    {
                        isLoading ? (
                            <div className="loading-wrapper p-8 flex items-center justify-center">
                                <ScaleLoader
                                    color={
                                        theme === "light"
                                            ? "#09090B"
                                            : "#F2F2F2"
                                    }
                                    width={7}
                                    height={48}

                                    loading={true}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                        ) : shipmentResponse?.meta!.total! > 0 ? (
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
                                    }
                                </TableBody>
                            </Table>
                        ) : (<div className="flex flex-col items-center justify-center mx-3">
                            <div className="img-wrapper w-1/12">
                                {theme == "light" ? (
                                    <img
                                        src="/images/Light-Mode-Empty-Data.png"
                                        alt="image"
                                        className="w-full h-full opacity-70"
                                    />
                                ) : (
                                    <img
                                        src="/images/Dark-Mode-Empty-Data.png"
                                        alt="image"
                                        className="w-full h-full opacity-70"
                                    />
                                )}

                            </div>
                            <p className="text-sm text-primary">Data tidak ditemukan</p>

                        </div>)
                    }
                </CardContent>
                {
                    shipmentResponse?.links && shipmentResponse?.meta && (
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>{shipmentResponse?.meta?.from}-{shipmentResponse?.meta?.to}</strong> of <strong>{shipmentResponse?.meta.total}</strong> Data
                            </div>
                            <Pagination className="justify-end">
                                <PaginationContent>
                                    {
                                        shipmentResponse.links?.prev && (
                                            <PaginationItem>
                                                <PaginationPrevious href={shipmentResponse.links.prev} />
                                            </PaginationItem>
                                        )
                                    }
                                    {shipmentResponse?.meta?.links?.map((page, index) => (
                                        page?.url &&
                                        <PaginationItem key={index} className="cursor-pointer">
                                            <PaginationLink onClick={() => handleClickPagination(parseInt(page?.label))} isActive={page?.active}>{page?.label}</PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    {
                                        shipmentResponse.links?.next && (
                                            <PaginationItem>
                                                <PaginationNext href={shipmentResponse.links.next} />
                                            </PaginationItem>
                                        )
                                    }
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    )
                }
            </Card>
        </AuthenticatedLayout >
    );
}
