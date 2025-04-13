export type Invitation = {
  id: string
  wishlist_id: string
  wishlist_name: string
  wishes_count: number
  sender_name: string
  sender_id: string
  receiver_name: string
  receiver_email: string
  status: InvitationStatus
  created_at: string
}

export type InvitationStatus = "pending" | "accepted" | "rejected"