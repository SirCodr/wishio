export type Invitation = {
  id: string
  wishlist_id: string
  wishlist_name: string
  wishes_count: number
  sender_name: string
  sender_id: string
  status: "pending" | "accepted" | "rejected"
}