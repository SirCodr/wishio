"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, LinkButton } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { answer, send } from "@/services/invitations"
import { Invitation } from "@/types/invitation"
import { useMutation } from "@tanstack/react-query"
import { ArrowLeft, Check, Clock, Copy, ExternalLink, Gift, Loader2, Send, Trash, User, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

type Props = {
  invitation: Invitation
}

export default function SenderInvitation({ invitation }: Props) {
  const navigate = useNavigate()
  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: () => answer(invitation.id, 'rejected'),
    onSuccess: () => {
      toast(
        "Invitation cancelled",
        {
          description: `The invitation to ${invitation.receiver_email} has been cancelled.`,
        })
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000)
    },
    onError: (err) => {
      console.error("Failed to cancel invitation", err)
      toast.error(
        "Failed to cancel",
        {
          description: "Could not cancel the invitation. Please try again.",
        })
    }
  })
  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: () => send(invitation.id),
    onSuccess: () => {
      toast(
        "Invitation resent",
        {
          description: `The invitation has been resent to ${invitation.receiver_email}.`,
        })
    },
    onError: (err) => {
      console.error("Failed to resend invitation", err)
      toast.error(
        "Failed to resend",
        {
          description: "Could not resend the invitation. Please try again.",
        })
    },
  })

  const formattedDate = new Date(invitation.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleCopyLink = () => {
    const invitationUrl = window.location.href
    navigator.clipboard.writeText(invitationUrl).then(
      () => {
        toast("Link copied", { description: "Invitation link copied to clipboard." })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast.error(
          "Failed to copy",
          {
            description: "Could not copy the invitation link.",
          })
      },
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Invitation Details</h1>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Status Banner */}
        <div
          className={`
          w-full py-3 px-4 text-center text-white font-medium
          ${
            invitation.status === "accepted"
              ? "bg-green-600"
              : invitation.status === "rejected"
                ? "bg-red-600"
                : "bg-amber-500"
          }
        `}
        >
          {invitation.status === "accepted"
            ? "Invitation Accepted"
            : invitation.status === "rejected"
              ? "Invitation Declined"
              : "Invitation Pending"}
        </div>

        <CardContent className="p-0">
          {/* Main Content */}
          <div className="p-6 bg-gradient-to-b from-background to-muted/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Wishlist Info */}
              <div className="flex items-center">
                <div className="bg-primary/10 p-4 rounded-full mr-4">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{invitation.wishlist_name}</h2>
                  <p className="text-sm text-muted-foreground">Shared on {formattedDate}</p>
                </div>
              </div>

              {/* receiver Info */}
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src="/placeholder.svg" alt={invitation.receiver_name} />
                  <AvatarFallback className="bg-secondary">
                    <User className="h-6 w-6 text-secondary-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium capitalize">{invitation.receiver_name}</h3>
                    <Badge
                      variant="outline"
                      className={`
                        ml-2 text-xs
                        ${
                          invitation.status === "accepted"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : invitation.status === "rejected"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      `}
                    >
                      {invitation.status === "accepted" ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : invitation.status === "rejected" ? (
                        <X className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {invitation.status === "accepted"
                        ? "Accepted"
                        : invitation.status === "rejected"
                          ? "Declined"
                          : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{invitation.receiver_email}</p>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div
              className={`
              mt-6 p-4 rounded-lg
              ${
                invitation.status === "accepted"
                  ? "bg-green-50 text-green-800 border border-green-100"
                  : invitation.status === "rejected"
                    ? "bg-red-50 text-red-800 border border-red-100"
                    : "bg-amber-50 text-amber-800 border border-amber-100"
              }
            `}
            >
              {invitation.status === "accepted" && (
                <p className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="capitalize">{invitation.receiver_name}</strong> has accepted your invitation and can now view your
                    wishlist.
                    {/* {invitation.lastViewed && (
                      <span> They last viewed it on {new Date(invitation.lastViewed).toLocaleDateString()}.</span>
                    )} */}
                  </span>
                </p>
              )}

              {invitation.status === "rejected" && (
                <p className="flex items-start">
                  <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="capitalize">{invitation.receiver_name}</strong> has declined your invitation. You can send a new
                    invitation if needed.
                  </span>
                </p>
              )}

              {invitation.status === "pending" && (
                <p className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="capitalize">{invitation.receiver_name}</strong> hasn't responded to your invitation yet.
                    //TODO: Add last viewed date
                    {/* {invitation.lastViewed ? (
                      <span>
                        {" "}
                        They viewed it on {new Date(invitation.lastViewed).toLocaleDateString()} but haven't accepted or
                        declined.
                      </span>
                    ) : (
                      <span> They haven't viewed the invitation yet.</span>
                    )} */}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-muted/30 border-t">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>

              <LinkButton variant="outline" size="sm" href={`/wishlists/${invitation.wishlist_id}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Wishlist
              </LinkButton>

              {invitation.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => resend()} disabled={isResending}>
                    {isResending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Resend
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" disabled={isCancelling}>
                        {isCancelling ? (
                          <>
                            Cancelling...
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          </>
                         ) : (
                          <>
                            <Trash className="h-4 w-4 mr-2" />
                            Cancel Invitation
                          </>
                         )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Invitation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel the invitation? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="outline" disabled={isCancelling}>
                          Cancel
                        </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button variant="destructive" onClick={() => cancel()} disabled={isCancelling}>
                          {isCancelling ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            "Yes, Cancel"
                          )}
                        </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
