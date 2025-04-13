import InvitationLoader from "@/components/invitation/invitation-loader"
import ReceiverInvitation from "@/components/invitation/receiver-invitation"
import InvitationError from "@/components/invitation/invitation-error"
import { answer, getById } from "@/services/invitations"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import SenderInvitation from "@/components/invitation/sender-invitation"
import { InvitationStatus } from "@/types/invitation"

export default function InvitationPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { data: invitation, isLoading, error, refetch } = useQuery({
    queryKey: ['invitations'],
    queryFn: () => id ? getById(id) : Promise.reject(new Error("Invalid ID")),
    refetchOnWindowFocus: false
  })
  const invitationAnswer = useMutation({
    mutationFn: (status: InvitationStatus) =>
      id ? answer(id, status) : Promise.reject(new Error('Invalid ID')),
      onSettled: () => refetch(),
  })

  if (isLoading) return <InvitationLoader />

  if (error || !invitation) return <InvitationError />

  if (user?.id === invitation?.sender_id)
    return <SenderInvitation invitation={invitation} />

  return (
    <ReceiverInvitation
      invitation={invitation}
      isAnswering={invitationAnswer.isPending}
      handleAnswer={invitationAnswer.mutate}
    />
  )
}