import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function InvitationLoader() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-background">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-2">
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 justify-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-4">
              <Skeleton className="h-12 flex-1 rounded-full" />
              <Skeleton className="h-12 flex-1 rounded-full" />
            </div>
          </CardFooter>
        </Card>
      </div>
  )
}