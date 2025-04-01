import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { AlertTriangle, Check, Gift, Loader2, User, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InvitationPage() {
  const { isLoading, error } = useQuery({queryKey: ['invitations'], queryFn: () => new Promise((resolve) => setTimeout(resolve, 2000)), refetchOnWindowFocus: false})
  const navigate = useNavigate()

  const invitation = {
  senderName: "John Doe",
  wishlistName: "Birthday Wishlist",
  itemCount: 5,
  status: "pending", // Puede ser "pending", "accepted" o "rejected"
};

const isAccepting = false
const isRejecting = false
const handleAccept = () => {}
const handleReject = () => {}

  if (isLoading) return <InvitationLoader />

  if (error) return <InvitationError />

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-background p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Wishlist Invitation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sender Information */}
          <div className="flex items-center justify-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src="/placeholder.svg" alt={invitation.senderName} />
              <AvatarFallback className="bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">{invitation.senderName}</p>
              <p className="text-sm text-muted-foreground">has invited you to view their wishlist</p>
            </div>
          </div>

          {/* Wishlist Information */}
          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <Gift className="h-10 w-10 mx-auto mb-2 text-primary" />
            <h3 className="text-xl font-bold mb-1">{invitation.wishlistName}</h3>
            <p className="text-muted-foreground">
              {invitation.itemCount} {invitation.itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Status Messages */}
          {invitation.status === "accepted" && (
            <div className="bg-green-50 text-green-700 rounded-lg p-6 text-center">
              <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Check className="h-8 w-8" />
              </div>
              <p className="font-medium text-lg">You've accepted this invitation</p>
              <p className="text-sm mt-2">Redirecting to the wishlist...</p>
            </div>
          )}

          {invitation.status === "rejected" && (
            <div className="bg-red-50 text-red-700 rounded-lg p-6 text-center">
              <div className="rounded-full bg-red-100 p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <X className="h-8 w-8" />
              </div>
              <p className="font-medium text-lg">You've declined this invitation</p>
              <p className="text-sm mt-2">You can close this page now</p>
            </div>
          )}
        </CardContent>

        {invitation.status === "pending" && (
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-center text-sm text-muted-foreground mb-2">Would you like to join this wishlist?</p>
            <div className="flex w-full space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 rounded-full border-2 border-red-200 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                onClick={handleReject}
                disabled={isAccepting || isRejecting}
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Declining...
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 mr-2" />
                    Decline
                  </>
                )}
              </Button>
              <Button
                size="lg"
                className="flex-1 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-200"
                onClick={handleAccept}
                disabled={isAccepting || isRejecting}
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Accept
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}

        {invitation.status === "rejected" && (
          <CardFooter>
            <Button variant="outline" className="w-full rounded-full" onClick={() => navigate("/")}>
              Close
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

function InvitationLoader() {
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

function InvitationError({ message }: { message?: string }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-background">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Invitation Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              {message || "This invitation may have expired or been removed."}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
  )
}