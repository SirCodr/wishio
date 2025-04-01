export type Invitation = {
  id: string
  wishlist_name: string
  wishes_count: number
  sender_name: string
  status: "pending" | "accepted" | "rejected"
}