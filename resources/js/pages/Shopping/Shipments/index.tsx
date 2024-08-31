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
import { User } from "@/support/models";
import { Shipment } from "@/support/models/Shipments";


export default function Index({ auth, shipments }: { auth: { User: User }, shipments: Shipment[] }) {
    const [keyword, setkeyword] = useState("");

    const [filters, setFilters] = useState({
        page: 1,
        per_page: 10,
    });


    useEffect(() => { }, []);

    return (
        <AuthenticatedLayout
            user={auth.User}
            header={"Data Pengiriman"}
            breadcrumbItems={DataBelanjaBreadcrumbs}
        >
            <Card className="pb-12">
                <CardHeader >
                    <CardTitle>Data Pengiriman</CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[336px]"
                            value={keyword}
                            onChange={(e) => setkeyword(e.target.value)}
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
                            {shipments.map((shipment, Index) => (
                                <TableRow key={Index}>
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
