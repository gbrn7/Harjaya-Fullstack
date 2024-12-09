import { PaginateLinks } from "@/support/interfaces/others/PaginateLinks";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { PaginateMeta } from "@/support/interfaces/others/PaginateMeta";
import { useEffect, useState } from "react";
import { PaginateMetaLink } from "@/support/interfaces/others/PaginateMetaLink";

export function GenericPagination({ links, meta, elipsisLimit, clickAction, className }: {
  links: PaginateLinks,
  meta: PaginateMeta,
  elipsisLimit: number,
  clickAction: (page: number) => void,
  className: string
}) {

  const [metaLinks, setMetaLinks] = useState<PaginateMetaLink[]>([])
  useEffect(() => {
    meta?.links?.shift()
    meta?.links?.pop()
    setMetaLinks(meta?.links)
  }, [])

  return (
    <>
      <Pagination className={className}>
        <PaginationContent>
          {
            links?.prev && (
              <PaginationItem >
                <PaginationPrevious href={links.prev} />
              </PaginationItem>
            )
          }

          {console.log("meta link")}
          {console.log(metaLinks)}
          {console.log(metaLinks.length)}

          {
            metaLinks.map((page, index) => (
              page?.url && !isNaN(parseInt(page?.label)) && (index + 1) == meta?.last_page || index == 0 ?
                <PaginationItem key={index} className="cursor-pointer">
                  <PaginationLink onClick={() => clickAction} isActive={page?.active}>{page?.label}</PaginationLink>
                </PaginationItem>
                : (index + 1) < (meta?.current_page - elipsisLimit) || (index + 1) > (meta?.current_page + elipsisLimit) ?
                  (index + 1) == (meta?.current_page - elipsisLimit - 1) || (index + 1) == (meta?.last_page - 1) ?
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                    : ""
                  :
                  <PaginationItem key={index} className="cursor-pointer">
                    <PaginationLink onClick={() => clickAction} isActive={page?.active}>{page?.label}</PaginationLink>
                  </PaginationItem>
            ))
          }
          {
            links?.next && (
              <PaginationItem>
                <PaginationNext href={links.next} />
              </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>
    </>
  )
}