import { HttpRequest } from "@/lib/http"
import { Wish, WishCreateDto } from "@/types/wishes"

export async function getAll() {
  return await new HttpRequest().get('wishes').then(res => res.data)
}

export async function getByWishlist(id: string): Promise<Wish[]> {
  return await new HttpRequest().get(`wishes/wishlist/${id}`).then(res => res.data)
}

export async function getSharedByWishlist(id: string): Promise<Wish[]> {
  return await new HttpRequest().get(`wishes/shared/${id}`).then(res => res.data)
}

export async function create(wishes: WishCreateDto[]) {
  return await new HttpRequest().post('wishes', wishes)
}

export async function update(wish: Partial<Wish>) {
  return await new HttpRequest().patch(`wishes/${wish.id}`, wish)
}

export async function remove(id: string) {
  return await new HttpRequest().delete(`wishes/${id}`)
}