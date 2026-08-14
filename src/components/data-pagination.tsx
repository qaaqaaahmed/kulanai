import { Button } from "@/components/ui/button";
//you will notice that on page change is set filters which basically sets the page to the url then component is rerendered with
//the new page and then a fetch is made with usesuspensequery on the view page and data is fetched for that page
//this works hand in hand with the backend that gets a page say its gets page 2, the offset will be 2-1 * 10 =  it will
//skip the first 10 results and go from there, alos limit helps limit the number of results returned so that db reconciles
//what numbers to skip

interface Props {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}
export const DataPagination = ({ page, onPageChange, totalPages }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={page >= totalPages || totalPages === 0}
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
