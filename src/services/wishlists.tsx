import { HttpRequest } from "@/lib/http";
import { SharedWishList, WishList, WishlistCreateDto } from "@/types/wishlists";

export async function getByUser(id: string): Promise<WishList[]> {
  return await new HttpRequest().get(`wishlists/user/${id}`).then(res => res.data)
}

export async function create(wishlists: WishlistCreateDto[]) {
  return await new HttpRequest().post('wishlists', wishlists)
}

export async function share(id: string, emails: string[]) {
  return await new HttpRequest().post(`wishlists/share/${id}`, emails)
}

export async function updateAccess(id: string, emails: string[]) {
  return await new HttpRequest().patch(`wishlists/share/${id}`, emails)
}

export async function getSharedToUser(id: string): Promise<SharedWishList[]> {
  return await new HttpRequest().get(`wishlists/shared/${id}`).then(res => res.data)
}

export async function getSharedEmails(id: string) {
  return await new HttpRequest().get(`wishlists/shared/${id}/emails`).then(res => res.data)
}